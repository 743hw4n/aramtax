# Step 3: backend-email

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/docs/ADR.md`
- `/backend/consultations/models.py`
- `/backend/consultations/emails.py`
- `/backend/consultations/signals.py`
- `/backend/consultations/apps.py`
- `/backend/config/settings/base.py`

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

이메일 발송 시스템을 구현하거나 기존 구현을 검증/보완하라.

이메일은 두 시점에 발송된다:
1. **상담 신청 시** → 관리자에게 새 상담 접수 알림
2. **관리자 답변 작성 시** → 신청자에게 답변 완료 알림

### 3-1. `emails.py` 검토

`backend/consultations/emails.py`에 아래 함수가 있어야 한다:

```python
def send_new_consultation_alert(consultation):
    """상담 신청 완료 시 ADMIN_EMAIL로 알림 발송"""
    # subject: f'[새 상담] {name} - {consultation_type_display}'
    # body: 이름, 이메일, 연락처, 상담유형, 내용
    # to: [settings.ADMIN_EMAIL]

def send_response_notification(consultation):
    """관리자 답변 작성 완료 시 신청자 이메일로 알림 발송"""
    # subject: '[세무법인 아람] 상담 답변이 등록되었습니다'
    # body: 신청자 이름, 상담유형, 답변 내용
    # to: [consultation.email]
```

### 3-2. `signals.py` 검토

`backend/consultations/signals.py`에 아래 시그널이 있어야 한다:

```python
@receiver(post_save, sender=Consultation)
def consultation_post_save(sender, instance, created, **kwargs):
    if created:
        # 새 상담 → 관리자 알림
        send_new_consultation_alert(instance)
    elif getattr(instance, '_response_changed', False):
        # 관리자 답변 변경 → 신청자 알림
        send_response_notification(instance)
```

`_response_changed`는 `Consultation.save()` 오버라이드에서 답변이 새로 작성/변경될 때 `True`로 설정된다.

### 3-3. `apps.py` 확인

`backend/consultations/apps.py`의 `ready()` 메서드에서 signals를 import해야 한다:

```python
class ConsultationsConfig(AppConfig):
    def ready(self):
        import consultations.signals  # noqa
```

### 3-4. Django 이메일 설정 확인

`backend/config/settings/base.py`에 아래 설정이 있어야 한다:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER')
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')
```

로컬 개발 시 실제 이메일 발송 없이 콘솔에 출력하려면 `local.py`에 추가하라:
```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

## Acceptance Criteria

```bash
# Docker 실행 중 상태에서 (docker compose up)
# 콘솔 출력은 docker compose logs -f backend 로 확인
# 또는 네이티브: cd backend && python manage.py runserver

# 상담 신청 → 콘솔에 이메일 내용 출력 확인
curl -X POST http://localhost:8000/api/consultations/ \
  -F "consultation_type=corporate_tax" \
  -F "name=홍길동" \
  -F "email=test@example.com" \
  -F "phone=010-1234-5678" \
  -F "password=test1234"

# 서버 콘솔에 이메일 내용 출력되어야 함:
# Subject: [새 상담] 홍길동 - 법인세
# To: <ADMIN_EMAIL>
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. 아키텍처 체크리스트:
   - View가 아닌 signal에서 이메일을 발송하는가?
   - `apps.py`에서 signals를 import하는가?
   - 로컬 환경에서 `EMAIL_BACKEND = console`로 설정되어 있는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 3 status를 업데이트한다.

## 금지사항
- View에서 직접 `send_new_consultation_alert()`를 호출하지 마라. 이유: 관심사 분리, signals가 담당.
- Gmail 계정 정보를 코드에 하드코딩하지 마라. 이유: 보안.
- 이 step에서 프론트엔드를 수정하지 마라.
- 기존 테스트를 깨뜨리지 마라.
