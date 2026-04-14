from django.db import models


class PlatformSettings(models.Model):
    """
    Singleton model — only one row ever exists (pk=1).
    Stores global platform configuration editable from /admin or the frontend.
    """
    platform_name = models.CharField(max_length=255, default='PhishingOps')
    platform_base_url = models.URLField(
        default='http://127.0.0.1:8000',
        help_text='Full URL used to build phishing links sent to employees.'
    )
    frontend_url = models.URLField(
        default='http://localhost:5173',
        help_text='React frontend URL — employees are redirected here after clicking a link.'
    )
    default_from_name = models.CharField(
        max_length=255,
        default='IT Security Team',
        help_text='Default sender display name pre-filled when creating campaigns.'
    )
    session_expiry_days = models.PositiveIntegerField(
        default=7,
        help_text='How many days a phishing link remains valid after being clicked.'
    )
    allow_quiz_retake = models.BooleanField(
        default=True,
        help_text='Allow employees to retake a quiz after failing.'
    )
    lms_path = models.CharField(
        max_length=100,
        default='',
        blank = True,
        help_text=(
            'Frontend path employees land on after clicking a phishing link. '
            'Do NOT include slashes — e.g. "lms", "training", "courses". '
            'Leave blank to redirect to the root: '
            '{frontend_url}/?token={uuid}'
        )
    )
    # ── Landing page content ──────────────────────────────────────────────────
    landing_title = models.CharField(
        max_length=255,
        default='Wait! This was a Phishing Simulation',
        help_text='Main heading shown on the employee LMS landing page.'
    )
    landing_message1 = models.TextField(
        default=(
            'Don\'t worry, your data is safe. However, a real attacker could have used that link to access your personal details, address, and credit information.'
        ),
        help_text='First paragraph shown below the title on the landing page.'
    )
    landing_message2 = models.TextField(
        default=(
            'Your security is a priority. Please follow the link below to complete your required phishing awareness module.'
        ),
        help_text='Second paragraph shown below Message 1 on the landing page.'
    )
    landing_button_text = models.CharField(
        max_length=100,
        default='Go to Training Portal',
        help_text='Text displayed on the button that starts the LMS course.'
    )

    # ── Reminder / notification settings ──────────────────────────────────────
    reminder_enabled = models.BooleanField(
        default=False,
        help_text='Enable automatic follow-up email to employees who clicked but have not completed training.'
    )
    reminder_days = models.PositiveIntegerField(
        default=3,
        help_text='Days after clicking the phishing link before a follow-up reminder is sent.'
    )
    # Separate SMTP for reminder and manager notification emails
    reminder_smtp_host = models.CharField(max_length=255, blank=True)
    reminder_smtp_port = models.IntegerField(default=587)
    reminder_smtp_user = models.CharField(max_length=255, blank=True)
    _reminder_smtp_password = models.TextField(
        db_column='reminder_smtp_password', blank=True
    )
    reminder_smtp_use_tls = models.BooleanField(default=True)
    reminder_smtp_use_ssl = models.BooleanField(default=False)
    reminder_from_email = models.EmailField(blank=True)
    reminder_from_name = models.CharField(
        max_length=255, blank=True, default='Security Awareness Team'
    )
    # Manager notification
    manager_notify_enabled = models.BooleanField(
        default=False,
        help_text='Notify the manager (if set on target) when their employee clicks the phishing link.'
    )

    logo = models.ImageField(
        upload_to='platform/', null=True, blank=True,
        help_text='Optional logo shown on the landing page. Leave blank to hide.'
    )
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def reminder_smtp_password(self):
        from apps.campaigns.models import decrypt_field
        return decrypt_field(self._reminder_smtp_password)

    @reminder_smtp_password.setter
    def reminder_smtp_password(self, value):
        from apps.campaigns.models import encrypt_field
        self._reminder_smtp_password = encrypt_field(value)

    class Meta:
        verbose_name = 'Platform Settings'
        verbose_name_plural = 'Platform Settings'

    def __str__(self):
        return f'Platform Settings — {self.platform_name}'

    @classmethod
    def get(cls):
        """Always return the single settings instance, creating it if needed."""
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
