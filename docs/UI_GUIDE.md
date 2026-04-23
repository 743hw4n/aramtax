# UI 디자인 가이드

## 디자인 원칙
1. **전문적 신뢰감 우선** — 세무법인 홈페이지. 화려함보다 신뢰와 전문성이 먼저다.
2. **최소한의 UI** — 불필요한 장식 없이 콘텐츠가 중심. 컴포넌트가 많을수록 나쁘다.
3. **따뜻한 중성 팔레트** — stone 계열 색상. 차갑지 않으면서 고급스러운 전문가 이미지.

## AI 슬롭 안티패턴 — 하지 마라

| 금지 사항 | 이유 |
|-----------|------|
| `backdrop-filter: blur()` | glass morphism은 AI 템플릿의 가장 흔한 징후 |
| gradient-text (배경 그라데이션 텍스트) | AI가 만든 SaaS 랜딩의 1번 특징 |
| `"Powered by AI"` 배지 | 기능이 아니라 장식. 사용자에게 가치 없음 |
| box-shadow 글로우 애니메이션 | 네온 글로우 = AI 슬롭 |
| 보라/인디고 브랜드 색상 | "AI = 보라색" 클리셰. 세무법인에 어울리지 않음 |
| 모든 카드에 동일한 `rounded-2xl` | 균일한 둥근 모서리는 템플릿 느낌 |
| 배경 gradient orb (`blur-3xl` 원형) | 모든 AI 랜딩 페이지에 있는 장식 |

## 색상

### 배경
| 용도 | 값 |
|------|------|
| 페이지 기본 | `#fafaf9` (따뜻한 오프화이트) |
| 카드 / 폼 | `#ffffff` |
| 서브 섹션 | `bg-stone-50` |

### 텍스트
| 용도 | 값 |
|------|-----|
| 주 강조 / 다크 버튼 | `#262422` |
| 주 버튼 hover | `#3f3a36` |
| 본문 | `text-stone-700` |
| 보조 | `text-stone-500` |
| 힌트 / 캡션 | `text-stone-400` |
| 비활성 | `text-stone-300` |

### 시맨틱 색상
| 용도 | 클래스 |
|------|--------|
| 성공 메시지 | `bg-green-50 text-green-700 border border-green-100` |
| 에러 메시지 | `bg-red-50 text-red-700 border border-red-100` |
| 상태: 접수대기 | `bg-stone-100 text-stone-600` |
| 상태: 진행중 | `bg-[#262422] text-stone-100` |
| 상태: 완료 | `bg-green-50 text-green-700 border border-green-100` |

## 컴포넌트

### 카드 / 폼 컨테이너
```
bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden
```

### 버튼
```
Primary : w-full py-4 bg-[#262422] text-stone-100 font-bold rounded-xl hover:bg-[#3f3a36] transition-all duration-300 disabled:opacity-50
```

### 입력 필드 (input / select / textarea)
```
w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 focus:ring-0 transition-colors bg-[#fafaf9]
```

### 상태 배지
```
px-3 py-1 rounded-full text-xs font-bold
```

### 파일 드롭존
```
border-2 border-dashed border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all
```

## 페이지 헤더 (히어로 섹션)
```
wrapper  : py-24 relative overflow-hidden
배경      : absolute inset-0 bg-[url('/assets/xxx.jpg')] bg-cover bg-center
오버레이  : absolute inset-0 bg-black/60
eyebrow  : text-stone-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block text-center
heading  : text-4xl lg:text-5xl font-bold text-stone-100 text-center font-serif
subtext  : text-stone-400 text-center mt-6 max-w-xl mx-auto font-light leading-relaxed
```

## 레이아웃
- 페이지 래퍼: `container mx-auto px-4`
- 폼 최대 너비: `max-w-3xl mx-auto`
- 결과 목록 최대 너비: `max-w-4xl mx-auto`
- 섹션 패딩: `py-20`
- 정렬: 폼/결과는 중앙 정렬

## 타이포그래피

| 용도 | 스타일 |
|------|--------|
| 페이지 제목 | `text-4xl lg:text-5xl font-bold font-serif` |
| 섹션 / 카드 제목 | `text-2xl font-bold font-serif` |
| 폼 라벨 | `text-sm font-bold text-stone-700` |
| 본문 | `text-sm text-stone-500 leading-relaxed` |
| 캡션 / 힌트 | `text-xs text-stone-400 italic` |
| eyebrow (섹션 태그) | `text-xs font-bold tracking-[0.3em] uppercase text-stone-400` |

## 아이콘
- 라이브러리: `@heroicons/react/24/outline` (기본), `@heroicons/react/24/solid` (강조/알림)
- 크기: `h-4 w-4` (인라인), `h-5 w-5` (버튼/메시지 옆), `h-6 w-6`~`h-8 w-8` (섹션 아이콘)
- 아이콘을 둥근 배경 박스로 감싸지 않는다. 단독 사용.

## 애니메이션
- 허용: `transition-colors`, `transition-all duration-300` (버튼/입력 hover)
- 허용: `animate-in fade-in duration-300` (결과 영역 등장)
- 그 외 모든 애니메이션 금지 (slide, bounce, spin 등)
