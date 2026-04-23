# Step 5: frontend-consultation

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/frontend/src/pages/Consultation.jsx`
- `/frontend/src/App.jsx`
- `/frontend/package.json`

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

상담 신청 페이지 (`/consultation`)를 구현하거나 기존 구현을 검증/보완하라.

### 5-1. `Consultation.jsx` 검토

아래 기능이 모두 구현되어 있는지 확인하라:

**폼 필드**:
- `consultation_type`: select (법인세/소득세/부가가치세/종합소득세/기타)
- `name`: text input (필수)
- `email`: email input (필수)
- `phone`: tel input (필수, placeholder: `010-1234-5678`)
- `password`: password input (필수, 조회 시 사용 안내 문구 포함)
- `message`: textarea (선택)
- 파일 업로드: `<input type="file" multiple>` (선택)

**API 연동**:
- `axios.post('/api/consultations/', FormData)` — multipart/form-data
- 파일은 `uploaded_files` 키로 append
- 제출 중 버튼 disabled + 텍스트 변경 ("제출 중입니다...")

**유효성 검사**:
- 필수 필드(`name`, `email`, `phone`, `password`)는 HTML5 `required` 속성으로 브라우저 레벨 검증. 별도 JS 검증 불필요.

**상태 피드백**:
- 성공 시: 초록 성공 메시지 표시 + 폼 초기화
- 실패 시(네트워크/서버 에러): 빨간 에러 메시지 표시

**UI 규칙** (`/docs/UI_GUIDE.md` 참조):
- 페이지 상단: 히어로 섹션 (배경 이미지 + 오버레이)
- 폼 컨테이너: `bg-white rounded-[2rem] shadow-[...] border border-stone-100`
- 입력 필드: `rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 bg-[#fafaf9]`
- 주 버튼: `bg-[#262422] text-stone-100 hover:bg-[#3f3a36]`

### 5-2. 라우팅 확인

`/frontend/src/App.jsx`에 `/consultation` 경로가 등록되어 있어야 한다.

## Acceptance Criteria

```bash
# Docker로 실행 중이라면:
docker compose up

# 또는 네이티브 실행:
# cd frontend && npm run dev  (port 3000 — vite.config.js 설정값)

# 브라우저에서 확인 (포트는 항상 3000)
open http://localhost:3000/consultation

# 수동 테스트:
# 1. 폼에 정보 입력 후 제출 → 성공 메시지 표시
# 2. 필수 필드 누락 후 제출 → 브라우저 validation 또는 에러 메시지
# 3. 파일 선택 → 파일명 목록 표시

# 프론트엔드 빌드 에러 없음 확인
cd frontend && npm run build
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. UI 체크리스트 (`UI_GUIDE.md` 기준):
   - `backdrop-filter: blur()` 사용하지 않았는가?
   - gradient-text 사용하지 않았는가?
   - 버튼/입력 스타일이 가이드와 일치하는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 5 status를 업데이트한다.

## 금지사항
- 프론트엔드에서 직접 DB나 S3에 접근하지 마라. 이유: 모든 API는 백엔드를 통해야 한다.
- `backdrop-filter: blur()`, gradient orb, 보라/인디고 색상을 사용하지 마라. 이유: AI 슬롭 안티패턴.
- `focus:ring`을 기본값으로 두지 마라 (`focus:ring-0`로 제거). 이유: 디자인 가이드.
- 이 step에서 백엔드를 수정하지 마라.
