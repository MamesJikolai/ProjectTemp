from django.shortcuts import redirect, get_object_or_404
from django.utils import timezone
from django.conf import settings
from django.views.decorators.cache import never_cache

from .models import CampaignTarget


def _get_client_ip(request):
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    if xff:
        return xff.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


@never_cache
def phishing_click(request, token):
    """
    Employees land here after clicking the phishing link in their email.

    1. Records the click (timestamp, IP, user-agent)
    2. Triggers manager notification if enabled and this is the first click
    3. Redirects to the React frontend LMS page
    """
    target = get_object_or_404(CampaignTarget, token=token)

    is_first_click = not target.link_clicked_at

    # Record first click only
    if is_first_click:
        target.link_clicked_at  = timezone.now()
        target.click_ip         = _get_client_ip(request)
        target.click_user_agent = request.META.get('HTTP_USER_AGENT', '')[:500]
        target.save(update_fields=['link_clicked_at', 'click_ip', 'click_user_agent'])

        # Queue manager notification on first click
        if target.manager_email:
            try:
                from apps.settings_app.models import PlatformSettings
                ps = PlatformSettings.get()
                if ps.manager_notify_enabled:
                    from django_q.tasks import async_task
                    async_task(
                        'apps.campaigns.tasks.send_manager_notification',
                        target.id,
                        task_name=f'mgr-notify-{target.id}',
                    )
            except Exception as e:
                # Non-fatal — log but don't break the redirect
                import logging
                logging.getLogger(__name__).warning(
                    f'Manager notification queueing failed for {target.email}: {e}'
                )

    # Read frontend_url and lms_path from PlatformSettings (with .env fallback)
    try:
        from apps.settings_app.models import PlatformSettings
        ps           = PlatformSettings.get()
        frontend_url = ps.frontend_url.rstrip('/')
        lms_path     = ps.lms_path.strip('/')
    except Exception:
        frontend_url = settings.FRONTEND_URL.rstrip('/')
        lms_path     = 'lms'

    path_part = f'/{lms_path}' if lms_path else ''
    return redirect(f'{frontend_url}{path_part}?token={token}')