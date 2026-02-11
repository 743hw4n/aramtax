from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Consultation
from .emails import send_new_consultation_alert, send_response_notification

@receiver(post_save, sender=Consultation)
def consultation_post_save(sender, instance, created, **kwargs):
    if created:
        # 새로운 상담 신청 시 관리자에게 알림 이메일 전송
        send_new_consultation_alert(instance)
    else:
        # 기존 상담에 답변이 새로 추가되거나 변경되었을 때만 알림 이메일 전송
        if getattr(instance, '_response_changed', False):
            send_response_notification(instance)