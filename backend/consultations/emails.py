from django.core.mail import send_mail
from django.conf import settings

def send_new_consultation_alert(consultation):
    """ 상담 신청 시 관리자에게 알림 이메일 전송 """
    subject = f'[새 상담] {consultation.name} - {consultation.get_consultation_type_display()}'
    message = f"""
        새로운 상담이 접수되었습니다.
        이름: {consultation.name}
        이메일: {consultation.email}
        연락처: {consultation.phone}
        상담유형: {consultation.get_consultation_type_display()}

        내용: {consultation.message}

        관리자 페이지에서 확인하세요.
        """

    send_mail(
        subject,                        # 제목
        message,                        # 내용
        settings.DEFAULT_FROM_EMAIL,    # 보내는 사람
        [settings.ADMIN_EMAIL]          # 받는 사람
    )

def send_response_notification(consultation):
    """ 답변 완료 시 신청자에게 알림 이메일 전송 """
    subject = '[세무법인 아람] 상담 답변이 등록되었습니다'
    message = f"""
        {consultation.name}님, 안녕하세요.

        요청하신 상담에 대한 답변이 등록되었습니다.

        상담 유형: {consultation.get_consultation_type_display()}
        답변 내용: {consultation.admin_response}

        감사합니다.
        세무법인 아람 드림
        """

    send_mail(
        subject,                        # 제목
        message,                        # 내용
        settings.DEFAULT_FROM_EMAIL,    # 보내는 사람
        [consultation.email]            # 받는 사람
    )