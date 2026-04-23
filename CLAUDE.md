# 프로젝트: 세무법인 아람 (aramtax)

## 기술 스택

### 백엔드
- Python 3.9 / Django 4.2 / Django REST Framework 3.15
- PostgreSQL (Docker — dev + prod 동일)
- django-storages + AWS S3 (첨부파일, production)
- Gmail SMTP (이메일 발송)
- gunicorn + Docker

### 프론트엔드
- React 19 / Vite 7 (port 3000)
- Tailwind CSS 3
- axios, react-router-dom v7
- @heroicons/react

### 인프라
- Docker / docker-compose
- GitHub Actions (CI/CD) → ECR → NAS 서버 자동 배포

## 아키텍처 규칙
- CRITICAL: 모든 API 로직은 백엔드 Django 뷰에서만 처리한다. 프론트엔드에서 직접 DB나 S3에 접근하지 않는다.
- CRITICAL: 비밀번호는 반드시 Django의 `make_password` / `check_password`를 통해 해시화한다. 평문 저장 절대 금지.
- CRITICAL: 이메일 발송은 Django signals를 통해 처리한다. View에서 직접 이메일 함수를 호출하지 않는다.
- CRITICAL: CORS 설정은 환경변수로만 관리한다. 코드에 도메인을 하드코딩하지 않는다.
- 환경변수는 `.env.*` 파일로 관리하며, 절대 커밋하지 않는다 (`.env.example`만 커밋).
- 첨부파일: production은 S3 (`USE_S3=True`), 개발은 로컬 MEDIA_ROOT (`USE_S3=False`).
- 컴포넌트는 `frontend/src/components/`, 페이지는 `frontend/src/pages/`에 분리.

## 개발 프로세스
- CRITICAL: 새 기능 구현 시 테스트를 함께 작성할 것
- 커밋 메시지는 conventional commits 형식을 따를 것 (`feat:`, `fix:`, `docs:`, `refactor:`)

## 개발 환경 실행

```bash
# 최초 세팅
cp .env.example .env.dev   # 값 채우기

# 실행
docker compose up --build

# 또는
./start.sh
```
- 백엔드: http://localhost:8000
- 프론트엔드: http://localhost:3000
- Vite proxy: `/api/*` → `http://backend:8000` (컨테이너 서비스명)

## 자주 쓰는 명령어
```bash
# 마이그레이션
docker compose exec backend python manage.py migrate

# 슈퍼유저 생성 (Django Admin 접근용)
docker compose exec backend python manage.py createsuperuser

# 백엔드 테스트
docker compose exec backend python manage.py test consultations

# 프론트엔드 빌드 검증
docker compose exec frontend npm run build

# 이메일 콘솔 출력 확인 (local.py에 console backend 설정 시)
docker compose logs -f backend

# 패키지 추가 후 이미지 재빌드
docker compose build backend
docker compose build frontend
```
