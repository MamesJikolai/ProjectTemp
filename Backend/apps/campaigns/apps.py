from django.apps import AppConfig


class CampaignsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name  = 'apps.campaigns'
    label = 'campaigns'

    def ready(self):
        """
        Register Django-Q2 scheduled tasks on startup.
        - check_scheduled_campaigns: every minute — auto-launch scheduled campaigns
        - check_reminder_emails: every hour — send reminders to overdue employees
        """
        try:
            from django_q.models import Schedule

            Schedule.objects.get_or_create(
                func='apps.campaigns.tasks.check_scheduled_campaigns',
                defaults={
                    'name':          'Check Scheduled Campaigns',
                    'schedule_type': Schedule.MINUTES,
                    'minutes':       1,
                    'repeats':       -1,
                }
            )

            Schedule.objects.get_or_create(
                func='apps.campaigns.tasks.check_reminder_emails',
                defaults={
                    'name':          'Send Reminder Emails',
                    'schedule_type': Schedule.HOURS,
                    'hours':         1,
                    'repeats':       -1,
                }
            )
        except Exception:
            pass