import logging
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Consultation
from .emails import send_new_consultation_alert, send_response_notification

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Consultation)
def consultation_post_save(sender, instance, created, **kwargs):
    def _send():
        try:
            if created:
                send_new_consultation_alert(instance)
            elif getattr(instance, '_response_changed', False):
                send_response_notification(instance)
        except Exception:
            logger.exception("이메일 발송 실패 (consultation_id=%s)", instance.pk)

    transaction.on_commit(_send)
