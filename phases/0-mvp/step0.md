# Step 0: project-setup

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/docs/ADR.md`
- `/.env.example`
- `/.gitignore`
- `/docker-compose.yaml`
- `/frontend/vite.config.js`
- `/backend/config/settings/base.py`
- `/backend/config/settings/local.py`
- `/backend/requirements.txt`
- `/frontend/package.json`

## 작업

개발 환경이 정상적으로 실행되는지 검증하고, 누락된 설정이 있으면 보완하라.

### 0-1. `.env.example` 확인
- `.env.example`에 로컬 Docker 개발에 필요한 모든 환경변수가 문서화되어 있는지 확인하라.
- 필수 환경변수 목록:
  - `SECRET_KEY`, `DEBUG`, `DJANGO_ENV`
  - `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`
  - `SQL_ENGINE`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, `SQL_HOST`, `SQL_PORT`, `DATABASE`
  - `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `ADMIN_EMAIL`
  - `USE_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME`, `AWS_S3_REGION_NAME`
- 누락된 변수가 있으면 `.env.example`에 추가하라 (실제 값은 넣지 않는다).
- 개발 시 `SQL_HOST`는 `db` (docker-compose 서비스명)이어야 한다.

### 0-2. `docker-compose.yaml` 검토
- 백엔드(port 8000), 프론트엔드(port 3000), DB(PostgreSQL) 서비스가 올바르게 정의되어 있는지 확인.
- 볼륨 마운트 `./backend:/app`, `./frontend:/app`이 있는지 확인 (핫리로드에 필수).
- `env_file: .env.dev`가 backend 서비스에 설정되어 있는지 확인.

### 0-3. `vite.config.js` 검토
- `server.port: 3000`으로 설정되어 있는지 확인.
- `server.proxy`에 `/api`, `/admin`이 백엔드로 프록시 설정되어 있는지 확인:
  ```js
  proxy: {
    '/api': process.env.VITE_BACKEND_URL || 'http://localhost:8000',
    '/admin': process.env.VITE_BACKEND_URL || 'http://localhost:8000'
  }
  ```
- `docker-compose.yaml`에서 `VITE_BACKEND_URL=http://backend:8000` 환경변수가 frontend 서비스에 설정되어 있는지 확인. Docker 환경에서 `backend`는 컨테이너 서비스명이므로 `localhost:8000`이 아닌 `http://backend:8000`을 써야 한다.

### 0-4. Django 설정 검토
- `local.py`에 로컬 스토리지 설정(`MEDIA_ROOT`, `STATIC_ROOT`)이 있는지 확인.
- `local.py`에 아래 설정이 있는지 확인:
  ```python
  EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
  ```
  이 설정이 있으면 `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` 없이도 동작하며, 이메일 내용이 `docker compose logs -f backend` 에 출력된다.

### 0-5. `.gitignore` 확인
- `.env`, `.env.dev`, `.env.prod`, `.env.prod.db`가 모두 포함되어 있는지 확인.

## Acceptance Criteria

```bash
# 최초 세팅
cp .env.example .env.dev
# → .env.dev에 최솟값 설정:
#   SECRET_KEY=임의_문자열_32자_이상
#   ALLOWED_HOSTS=localhost 127.0.0.1
#   CORS_ALLOWED_ORIGINS=http://localhost:3000
#   SQL_HOST=db  (docker-compose 서비스명 — localhost가 아님)
#   EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, ADMIN_EMAIL은 빈 채로 두어도 됨
#   (local.py에서 console 백엔드로 오버라이드되므로 SMTP 인증 불필요)

# Docker로 전체 스택 실행
docker compose up --build

# 정상 실행 확인 (별도 터미널)
curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8000/api/consultations/
# 405 (Method Not Allowed)이면 백엔드 정상

curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
# 200이면 프론트엔드 정상
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. 아키텍처 체크리스트:
   - `.env.example`에 모든 필수 환경변수(AWS 포함)가 있는가?
   - `local.py`에 `EMAIL_BACKEND = console`이 설정되어 있는가?
   - `.gitignore`에 `.env`와 `.env.dev`가 모두 포함되어 있는가?
   - Vite proxy가 `/api`를 백엔드로 전달하는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 0 status를 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "개발환경 설정 검증 완료. .env.example 보완, local.py EMAIL_BACKEND console 추가."`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러 내용"`
   - 환경변수 값(SECRET_KEY, AWS 자격증명 등) 수동 입력 필요 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항
- 실제 `.env.dev` / `.env` 파일을 커밋하지 마라. `.env.example`만 커밋한다.
- AWS 자격증명(access key, secret)을 코드에 하드코딩하지 마라.
- 이 step에서 비즈니스 로직(모델, 뷰 등)을 변경하지 마라. 환경 설정만 다룬다.
- `docker-compose.local.yaml`이라는 파일명을 만들지 마라. 개발용 파일은 `docker-compose.yaml`이다.
