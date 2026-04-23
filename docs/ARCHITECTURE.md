# 아키텍처

## 시스템 구성

### 개발 환경 (docker-compose.yaml)
```
[브라우저 localhost:3000]
    |
    ↓ (Docker port mapping)
[Vite Dev Server :3000]  ── proxy /api/* ──→  [Django runserver :8000]
   (frontend 컨테이너)                           (backend 컨테이너)
                                                       |
                                               [PostgreSQL :5432]
                                                (db 컨테이너)
```
- 세 서비스 모두 Docker 컨테이너. Nginx 없음.
- Vite의 `server.proxy` 설정이 `/api/*` 요청을 backend 컨테이너로 전달 (`VITE_BACKEND_URL=http://backend:8000`).
- 핫리로드: 볼륨 마운트(`./backend:/app`, `./frontend:/app`)로 코드 변경 즉시 반영.

### 운영 환경 (docker-compose.prod.yaml)
```
[클라이언트 브라우저]
    |
    ↓ HTTPS
[Cloudflare Tunnel]
    |
    ↓
[Nginx (frontend 컨테이너)]
    /api/*  →  [gunicorn (backend 컨테이너)]
    /*      →  React 정적 파일 서빙
    |
    ├── [PostgreSQL]     데이터베이스 (Docker 볼륨)
    ├── [media 볼륨]     첨부파일 (로컬 스토리지, USE_S3=False)
    ├── [static 볼륨]    정적 파일 (collectstatic 결과물)
    └── [Gmail SMTP]     이메일 발송

※ 백엔드/DB는 외부에 포트 미노출
※ S3는 직접 서빙 아님 — scripts/backup.sh로 정기 백업 용도로만 사용
```

## 환경변수 관리

| 환경 | 파일 | 출처 |
|------|------|------|
| 로컬 Docker dev | `.env.dev` | 개발자 로컬 (`.env.example` 복사 후 값 채우기) |
| Production | `.env.prod`, `.env.prod.db` | GitHub Secrets → CI(`deploy-nas.yaml`)에서 배포 시 생성 |

`.env.*` 파일은 모두 `.gitignore`에 포함. `.env.example`만 커밋.

## 디렉토리 구조

```
aramtax/
├── CLAUDE.md
├── .env.example              # 환경변수 템플릿 (커밋됨)
├── docker-compose.yaml       # 개발용
├── docker-compose.prod.yaml  # 운영용
├── start.sh                  # docker compose up 래퍼
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── ADR.md
│   └── UI_GUIDE.md
├── phases/
│   ├── index.json
│   └── 0-mvp/
│       ├── index.json
│       └── step0.md ~ step6.md
├── scripts/
│   └── execute.py
├── backend/
│   ├── Dockerfile            # dev / prod 멀티스테이지
│   ├── entrypoint.sh         # prod 전용 (migrate + collectstatic + gunicorn)
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py       # 공통 설정
│   │   │   ├── local.py      # 개발 환경 오버라이드
│   │   │   └── production.py # 운영 환경 오버라이드 (S3, HTTPS 보안 헤더)
│   │   ├── storages.py       # S3 스토리지 클래스
│   │   └── urls.py
│   └── consultations/        # 상담 앱 (유일한 Django 앱)
│       ├── models.py         # Consultation, ConsultationFile
│       ├── serializers.py
│       ├── views.py          # ConsultationCreateView, ConsultationLookupView
│       ├── urls.py
│       ├── signals.py        # post_save → 이메일 트리거
│       ├── emails.py         # 이메일 발송 함수
│       └── tests.py
├── frontend/
│   ├── Dockerfile            # dev / builder / prod(nginx) 멀티스테이지
│   ├── vite.config.js        # port:3000, proxy /api → backend
│   ├── nginx.conf            # prod 전용
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Services.jsx
│       │   ├── Consultation.jsx  # 상담 신청 폼
│       │   └── Lookup.jsx        # 상담 조회
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       ├── App.jsx
│       └── main.jsx
└── .github/
    └── workflows/
        └── deploy-nas.yaml   # main push → ECR build/push → self-hosted runner 배포
```

## API 엔드포인트

| Method | URL | Content-Type | 설명 |
|--------|-----|------|------|
| POST | `/api/consultations/` | `multipart/form-data` | 상담 신청 (파일 포함) |
| POST | `/api/consultations/lookup/` | `application/json` | 상담 조회 (email + password) |

## 데이터 모델

```
Consultation
├── id: BigAutoField (PK)
├── consultation_type: CharField  # corporate_tax / income_tax / vat / comprehensive_income / other
├── name: CharField(100)
├── email: EmailField
├── phone: CharField(128)
├── password_hash: CharField(128) # make_password() 해시 — API 응답에 절대 노출 금지
├── message: TextField (blank=True)
├── status: CharField             # pending / in_progress / completed
├── admin_response: TextField (blank=True)
├── created_at: DateTimeField (auto_now_add)
├── updated_at: DateTimeField (auto_now)
└── responded_at: DateTimeField (null, blank)  # admin_response 저장 시 자동 설정

ConsultationFile
├── id: BigAutoField (PK)
├── consultation: FK → Consultation (CASCADE)
├── file: FileField (dev: MEDIA_ROOT, prod: S3)
└── uploaded_at: DateTimeField (auto_now_add)
```

## 데이터 흐름

```
# 상담 신청
Consultation.jsx → axios.post('/api/consultations/', FormData)
  → Vite proxy → ConsultationCreateView.create()
  → ConsultationSerializer.validate() + save()
  → post_save signal → send_new_consultation_alert() → 관리자 이메일

# 상담 조회
Lookup.jsx → axios.post('/api/consultations/lookup/', {email, password})
  → ConsultationLookupView.post()
  → email 필터 → check_password() 검증
  → ConsultationSerializer(many=True) → JSON

# 관리자 답변
Django Admin에서 admin_response 저장
  → Consultation.save() 오버라이드
  → status='completed', responded_at=now(), _response_changed=True
  → post_save signal → send_response_notification() → 신청자 이메일
```

## 상태 관리

- 서버: Django ORM (PostgreSQL)
- 클라이언트: React `useState` (폼, 로딩, 에러, 결과)
- 전역 상태 관리 없음 (Context API 불필요)
