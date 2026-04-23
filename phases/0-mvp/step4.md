# Step 4: backend-tests

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/backend/consultations/models.py`
- `/backend/consultations/serializers.py`
- `/backend/consultations/views.py`
- `/backend/consultations/emails.py`
- `/backend/consultations/signals.py`
- `/backend/consultations/tests.py`

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

### 4-0. 버그 수정 (테스트 작성 전 먼저 수행)

#### 4-0-1. `serializers.py` — `transaction.atomic()` 추가

`ConsultationSerializer.create()`에서 `Consultation.objects.create()` 호출 후 `set_password()` + `save()` + `ConsultationFile` 생성이 순차적으로 일어난다. 첫 번째 `create()` 시점에 이미 DB에 저장되므로, 이후 단계에서 예외가 발생하면 `password_hash`가 없거나 파일이 누락된 불완전한 레코드가 남는다.

`create()` 메서드 전체를 `transaction.atomic()`으로 감싸라:

```python
from django.db import transaction

def create(self, validated_data):
    with transaction.atomic():
        # 기존 로직 그대로
```

#### 4-0-2. `signals.py` — `transaction.on_commit()` 추가

`post_save` 시그널에서 `send_new_consultation_alert()` / `send_response_notification()`을 직접 호출하면:
- SMTP 서버 장애 시 예외가 API까지 전파되어 상담 신청 자체가 500 에러로 실패함
- DB 트랜잭션 안에서 이메일이 발송되므로 롤백 시에도 이메일이 나갈 수 있음

`transaction.on_commit()`으로 감싸서 DB 커밋 완료 후에만 이메일을 시도하고, 이메일 실패는 로깅만 하고 예외를 삼켜라:

```python
from django.db import transaction
import logging

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
```

### 4-1. 모델 테스트 (`ConsultationModelTest`)

`backend/consultations/tests.py`에 아래 테스트를 작성하라.

```python
class ConsultationModelTest(TestCase):
    def test_password_hashed_on_set(self):
        # set_password() 호출 후 password_hash가 평문이 아닌 해시인지 확인

    def test_check_password_correct(self):
        # 올바른 비밀번호로 check_password() → True

    def test_check_password_wrong(self):
        # 틀린 비밀번호로 check_password() → False

    def test_status_changes_to_completed_on_admin_response(self):
        # admin_response 저장 시 status='completed', responded_at 설정 확인

    def test_responded_at_cleared_when_response_removed(self):
        # admin_response 삭제 시 responded_at=None 확인
```

### 4-2. 상담 신청 API 테스트 (`ConsultationCreateAPITest`)

```python
class ConsultationCreateAPITest(TestCase):
    def test_create_consultation_success(self):
        # POST /api/consultations/ → 201, DB에 저장됨

    def test_password_hash_not_in_response(self):
        # POST 응답에 password_hash 필드가 없어야 함

    def test_required_fields_validation(self):
        # name/email/phone/password 누락 시 400

    def test_invalid_consultation_type(self):
        # 잘못된 consultation_type 시 400
```

### 4-3. 상담 조회 API 테스트 (`ConsultationLookupAPITest`)

```python
class ConsultationLookupAPITest(TestCase):
    def test_lookup_success(self):
        # 올바른 email+password → 200, 상담 목록 반환

    def test_lookup_wrong_password(self):
        # 틀린 비밀번호 → 404

    def test_lookup_nonexistent_email(self):
        # 없는 이메일 → 404

    def test_password_hash_not_in_lookup_response(self):
        # 조회 응답에 password_hash 없어야 함
```

### 4-4. 이메일 테스트 (`ConsultationEmailTest`)

이메일 발송 테스트는 실제 SMTP가 아닌 `django.test.utils.override_settings`로 `EMAIL_BACKEND`를 `locmem` 백엔드로 교체하여 테스트한다.

```python
from django.core import mail
from django.test.utils import override_settings

@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class ConsultationEmailTest(TestCase):
    def test_admin_email_sent_on_create(self):
        # 상담 신청 → mail.outbox에 이메일 1개, 수신자 = ADMIN_EMAIL

    def test_response_email_sent_on_admin_reply(self):
        # admin_response 저장 → mail.outbox에 이메일 1개, 수신자 = consultation.email
```

## Acceptance Criteria

```bash
docker compose exec backend python manage.py test consultations -v 2

# 모든 테스트 통과 (0 failures, 0 errors)
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. 아키텍처 체크리스트:
   - 모든 테스트가 통과하는가?
   - 실제 SMTP를 사용하지 않는가 (locmem 백엔드 사용)?
   - password_hash 노출 테스트가 포함되어 있는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 4 status를 업데이트한다.

## 금지사항
- 테스트에서 실제 이메일 서버(SMTP)를 사용하지 마라. 이유: CI 환경에서 실패하고 실제 이메일이 발송됨.
- 테스트 통과를 위해 프로덕션 코드 로직을 우회하지 마라.
- 이 step에서 프론트엔드를 수정하지 마라.
