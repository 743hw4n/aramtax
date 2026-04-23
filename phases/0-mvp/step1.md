# Step 1: backend-consultation

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/docs/ADR.md`
- `/backend/consultations/models.py`
- `/backend/consultations/serializers.py`
- `/backend/consultations/views.py`
- `/backend/consultations/urls.py`
- `/backend/config/urls.py`

## 작업

상담 신청 API (`POST /api/consultations/`)를 구현하거나 기존 구현을 검증/보완하라.

### 1-1. `Consultation` 모델 검토

`backend/consultations/models.py`가 아래 필드를 포함하는지 확인하라:

```python
class Consultation(models.Model):
    CONSULTATION_TYPES = [
        ('corporate_tax', '법인세'),
        ('income_tax', '소득세'),
        ('vat', '부가가치세'),
        ('comprehensive_income', '종합소득세'),
        ('other', '기타'),
    ]
    STATUS_CHOICES = [
        ('pending', '접수대기'),
        ('in_progress', '진행중'),
        ('completed', '완료'),
    ]
    consultation_type: CharField
    name: CharField(100)
    email: EmailField
    phone: CharField(128)
    password_hash: CharField(128)  # make_password로 해시화
    message: TextField(blank=True)
    status: CharField(default='pending')
    admin_response: TextField(blank=True)
    created_at: DateTimeField(auto_now_add=True)
    updated_at: DateTimeField(auto_now=True)
    responded_at: DateTimeField(null=True, blank=True)

    def set_password(self, raw_password): ...
    def check_password(self, raw_password): ...
    def save(self, *args, **kwargs): ...  # admin_response 변경 시 responded_at, status 자동 업데이트

class ConsultationFile(models.Model):
    consultation: FK → Consultation (CASCADE)
    file: FileField(upload_to='consultation/%Y/%m/%d/')
    uploaded_at: DateTimeField(auto_now_add=True)
```

누락/불일치가 있으면 수정하고 마이그레이션을 생성하라:
```bash
cd backend && python manage.py makemigrations && python manage.py migrate
```

### 1-2. `ConsultationSerializer` 검토

`backend/consultations/serializers.py`에 아래 시리얼라이저가 있어야 한다:

```python
class ConsultationSerializer(ModelSerializer):
    # 쓰기 전용: password (평문) → password_hash로 변환
    # 읽기 전용: password_hash 노출 금지
    # files: ConsultationFileSerializer (read_only, many=True)
    # uploaded_files: write-only ListField → ConsultationFile 생성

class ConsultationFileSerializer(ModelSerializer):
    # file URL 반환

class ConsultationLookupSerializer(Serializer):
    # email, password 검증용 (DB 저장 없음)
```

주의: `password_hash`는 API 응답에 절대 포함하지 마라.

### 1-3. `ConsultationCreateView` 검토

`backend/consultations/views.py`:
```python
class ConsultationCreateView(CreateAPIView):
    # POST /api/consultations/
    # parser_classes: [MultiPartParser, JSONParser]
    # permission_classes: [AllowAny]
    # 성공 시 201 응답 + message + data 반환
```

### 1-4. URL 라우팅 확인

`backend/consultations/urls.py`:
```python
urlpatterns = [
    path('', ConsultationCreateView.as_view(), name='consultation-create'),
    path('lookup/', ConsultationLookupView.as_view(), name='consultation-lookup'),
]
```

`backend/config/urls.py`:
```python
path('api/consultations/', include('consultations.urls'))
```

## Acceptance Criteria

```bash
# Docker 실행 중 상태에서 (docker compose up)
# 마이그레이션은 docker-compose.yaml의 command에서 자동 실행됨
# 또는 네이티브: cd backend && python manage.py migrate && python manage.py runserver

curl -X POST http://localhost:8000/api/consultations/ \
  -F "consultation_type=corporate_tax" \
  -F "name=홍길동" \
  -F "email=test@example.com" \
  -F "phone=010-1234-5678" \
  -F "password=test1234" \
  -F "message=법인세 관련 문의"

# 응답: HTTP 201 + {"message": "상담 신청이 완료되었습니다.", "data": {...}}
# data에 password_hash가 포함되지 않아야 한다
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. 아키텍처 체크리스트:
   - `password_hash`가 API 응답에 노출되지 않는가?
   - `password`가 DB에 해시로 저장되는가?
   - 파일 업로드 시 `ConsultationFile`이 생성되는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 1 status를 업데이트한다.

## 금지사항
- `password_hash` 필드를 시리얼라이저 응답에 포함하지 마라. 이유: 보안 취약점.
- View에서 직접 이메일을 발송하지 마라. 이유: signals에서 처리한다 (step 3에서 구현).
- 이 step에서 프론트엔드를 수정하지 마라.
- 기존 마이그레이션 파일을 삭제하지 마라.
