# Architecture Decision Records

## 철학
MVP 속도 최우선. 외부 의존성 최소화. 작동하는 최소 구현을 선택. 오버엔지니어링 금지.

---

### ADR-001: Django REST Framework 선택
**결정**: 백엔드 API 프레임워크로 DRF 선택 (FastAPI 대신)
**이유**: Django Admin을 무료로 얻어 관리자 UI를 별도 개발할 필요 없음. Django ORM + SMTP + 파일 업로드 생태계를 그대로 활용 가능.
**트레이드오프**: FastAPI 대비 성능은 낮고 보일러플레이트가 많음. MVP 규모에서는 무의미한 차이.

---

### ADR-002: React SPA + Django 완전 분리 아키텍처
**결정**: 프론트엔드 React(Vite), 백엔드 Django를 별개 서비스로 분리.
**이유**: 역할 분리 명확. 향후 모바일 앱 추가 시 API 재사용 가능. Vite proxy로 개발 환경 CORS 문제 없이 단일 포트 사용.
**트레이드오프**: SSR 없음 → SEO 불리. 세무 상담 서비스 특성상 검색 노출보다 기능 구현이 우선이라 허용.

---

### ADR-003: 이메일+비밀번호 기반 상담 조회 (JWT 인증 없음)
**결정**: JWT / 세션 기반 인증 없이, 이메일+비밀번호로 상담 내역 직접 조회.
**이유**: MVP에서 회원 시스템 구축 비용 절감. 상담 조회라는 단순한 용도에 인증 시스템은 과도함.
**트레이드오프**: Rate limiting 없음, 세션 없음 → 보안이 상대적으로 약함. 향후 로그인 시스템 추가 시 구조 변경 필요.

---

### ADR-004: 첨부파일 스토리지 전략
**결정**: Production은 NAS 로컬 Docker 볼륨(`media_volume`) 사용 (`USE_S3=False`). 개발도 동일하게 로컬 MEDIA_ROOT.
**이유**: 현재 트래픽 규모에서 S3 비용 및 AWS 자격증명 관리 부담이 이점보다 큼. `docker-compose.prod.yaml`의 named volume으로 컨테이너 재시작/재배포 시에도 파일 유지됨.
**백업**: S3는 직접 서빙 용도가 아닌 백업 용도로만 사용 — `scripts/backup.sh`가 `media_volume`을 주기적으로 S3에 업로드.
**트레이드오프**: NAS 디스크 장애 시 볼륨 데이터 유실 위험. 단, backup.sh 정기 실행으로 S3에 복사본 유지. 향후 트래픽 증가 시 `USE_S3=True`로 전환 가능하도록 production.py에 분기 구현 유지.

---

### ADR-005: Django Admin 활용 (별도 관리자 대시보드 없음)
**결정**: 관리자 기능(상담 내역 조회, 답변 작성, 상태 변경)은 Django Admin으로만 제공.
**이유**: MVP에서 커스텀 어드민 개발 비용 절감. 기본 CRUD와 답변 작성 용도로 충분.
**트레이드오프**: UX가 투박함. 세무법인 담당자가 Django Admin에 익숙해져야 함.

---

### ADR-006: 개발 환경 Full Docker
**결정**: 개발 환경은 `docker compose up` 하나로 통일. 네이티브 실행 방식은 지원하지 않는다.
**이유**: PostgreSQL 격리, 개발/운영 환경 패리티, 단일 명령 실행. 볼륨 마운트(`./backend:/app`, `./frontend:/app`)로 코드 변경이 즉시 반영되므로 컨테이너 안에서도 핫리로드 됨. 혼자 개발이라 팀 일관성 목적은 아니지만, 로컬에 Python 버전/postgres를 별도 관리할 필요가 없다는 실용적 이유가 있음.
**트레이드오프**: Docker 설치 필요. 패키지 추가 시 이미지 재빌드 필요 (`docker compose build backend` / `frontend`).

---

### ADR-007: 환경변수 관리 전략
**결정**: 로컬 개발은 `.env.dev` 파일, Production은 GitHub Secrets → CI에서 파일 생성.
**이유**:
- 로컬 개발: `docker compose`의 `env_file: .env.dev`로 주입. `.env.example`을 복사해서 사용. GitHub Secrets는 CI/CD 파이프라인 전용이라 로컬 개발에 사용 불가.
- Production: `deploy-nas.yaml`에서 `echo "${{ secrets.ENV_PROD }}" > .env.prod` 방식으로 배포 시 그 자리에서 생성. 서버에 `.env.prod` 파일을 미리 올려두지 않아도 됨.
**트레이드오프**: 로컬 `.env.dev` 파일은 실수로 커밋될 위험 있음 → `.gitignore`에 추가하고 `.env.example`로 관리.
