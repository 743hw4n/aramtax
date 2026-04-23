# Step 2: backend-lookup

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/backend/consultations/models.py`
- `/backend/consultations/serializers.py`
- `/backend/consultations/views.py`
- `/backend/consultations/urls.py`

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

상담 조회 API (`POST /api/consultations/lookup/`)를 구현하거나 기존 구현을 검증/보완하라.

### 2-1. `ConsultationLookupView` 검토

`backend/consultations/views.py`에 아래 뷰가 있어야 한다:

```python
class ConsultationLookupView(APIView):
    # POST /api/consultations/lookup/
    # permission_classes: [AllowAny]
    # 요청: {"email": "...", "password": "..."}
    # 처리:
    #   1. ConsultationLookupSerializer로 입력 검증
    #   2. email로 DB 조회
    #   3. check_password()로 비밀번호 검증
    #   4. 일치하는 상담만 ConsultationSerializer로 직렬화 후 반환
    # 응답:
    #   - 성공: HTTP 200 + [상담 목록]
    #   - 미일치: HTTP 404 + {"error": "이메일 또는 비밀번호가 일치하지 않습니다."}
```

주의: 이메일은 존재하지만 비밀번호가 틀린 경우도 404를 반환하라. 이유: 이메일 존재 여부를 노출하지 않기 위함.

### 2-2. `ConsultationLookupSerializer` 검토

```python
class ConsultationLookupSerializer(Serializer):
    email = EmailField()
    password = CharField()
    # DB 저장 없는 입력 검증 전용
```

## Acceptance Criteria

```bash
# Docker 실행 중 상태에서 (docker compose up)
# 또는 네이티브: cd backend && python manage.py runserver

# 정상 조회 (step 1에서 신청한 상담 조회)
curl -X POST http://localhost:8000/api/consultations/lookup/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test1234"}'
# 응답: HTTP 200 + [{"id": 1, "name": "홍길동", "status": "pending", ...}]
# 응답에 password_hash 포함 금지

# 잘못된 비밀번호
curl -X POST http://localhost:8000/api/consultations/lookup/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "wrong"}'
# 응답: HTTP 404 + {"error": "이메일 또는 비밀번호가 일치하지 않습니다."}

# 존재하지 않는 이메일
curl -X POST http://localhost:8000/api/consultations/lookup/ \
  -H "Content-Type: application/json" \
  -d '{"email": "nobody@example.com", "password": "test1234"}'
# 응답: HTTP 404
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. 아키텍처 체크리스트:
   - 응답에 `password_hash`가 포함되지 않는가?
   - 비밀번호 불일치 시 404를 반환하는가 (401이나 403이 아니라)?
   - 여러 상담이 있는 경우 모두 반환하는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 2 status를 업데이트한다.

## 금지사항
- 비밀번호 틀렸을 때 401/403을 반환하지 마라. 이유: 이메일 존재 여부 노출 방지를 위해 404 통일.
- 평문 비밀번호 비교를 하지 마라. 이유: 반드시 `check_password()`를 사용해야 한다.
- 이 step에서 프론트엔드를 수정하지 마라.
