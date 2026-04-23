# Step 6: frontend-lookup

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/CLAUDE.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/frontend/src/pages/Lookup.jsx`
- `/frontend/src/App.jsx`

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

상담 조회 페이지 (`/lookup`)를 구현하거나 기존 구현을 검증/보완하라.

### 6-1. `Lookup.jsx` 검토

아래 기능이 모두 구현되어 있는지 확인하라:

**조회 폼**:
- `email`: email input (필수)
- `password`: password input (필수)
- 조회 버튼 (로딩 중 disabled + "조회 중...")

**API 연동**:
- `axios.post('/api/consultations/lookup/', {email, password})`
- 성공(200): 상담 목록 표시
- 404: "이메일 또는 비밀번호가 일치하지 않습니다." 에러 메시지
- 기타 에러: "조회 중 오류가 발생했습니다." 메시지

**결과 카드 표시**:
- 상담 유형 배지 (한국어로 변환: corporate_tax → 법인세 등)
- 신청일 (한국어 형식: 2024년 1월 1일 오후 3:00)
- 진행 상태 배지 (접수대기/진행중/완료) — `UI_GUIDE.md`의 시맨틱 색상 사용
- 신청자 이름, 연락처
- 상담 내용 (있는 경우)
- 관리자 답변 (있는 경우) + 답변 일시
- 첨부파일 다운로드 링크 (있는 경우)

**빈 결과 처리**:
- 조회했지만 결과 없음: 별도 안내 UI 표시

**UI 규칙** (`/docs/UI_GUIDE.md` 참조):
- 페이지 상단: 히어로 섹션
- 조회 폼: `max-w-xl mx-auto`
- 결과 목록: `max-w-4xl mx-auto`
- 카드: `bg-white rounded-3xl shadow-sm border border-stone-100`
- 상태 배지: `UI_GUIDE.md` 시맨틱 색상 참조

## Acceptance Criteria

```bash
# Docker로 전체 실행 (권장)
docker compose up

# 브라우저에서 확인 (포트는 항상 3000)
open http://localhost:3000/lookup

# 수동 테스트:
# 1. step 5에서 신청한 상담의 이메일+비밀번호 입력 → 상담 목록 표시
# 2. 잘못된 비밀번호 → "이메일 또는 비밀번호가 일치하지 않습니다." 표시
# 3. 조회 결과에서 상태 배지, 신청일, 상담 내용 표시 확인

# 빌드 에러 없음
npm run build
```

## 검증 절차

1. 위 AC 커맨드를 실행한다.
2. UI 체크리스트:
   - 상태 배지 색상이 `UI_GUIDE.md`와 일치하는가?
   - AI 슬롭 안티패턴을 사용하지 않았는가?
   - 빈 결과 처리가 되는가?
3. **최종 MVP 통합 확인**:
   - 상담 신청 (`/consultation`) → 백엔드 저장 → 콘솔 이메일 출력
   - 상담 조회 (`/lookup`) → 신청 목록 + 상태 표시
   - 전체 플로우가 오류 없이 동작하는가?
4. 결과에 따라 `phases/0-mvp/index.json`의 step 6 status를 업데이트한다.

## 금지사항
- `backdrop-filter: blur()`, gradient orb, 보라/인디고 색상을 사용하지 마라.
- 프론트엔드에서 직접 DB를 조회하지 마라. 이유: 모든 데이터는 API를 통해야 한다.
- 이 step에서 백엔드를 수정하지 마라.
- 기존 테스트를 깨뜨리지 마라.
