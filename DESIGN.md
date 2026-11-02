# BLENDING 어드민 — DESIGN.md

> 누구나(사람이든 AI 에이전트든) 피그마 없이 **같은 규칙으로** BLENDING(블렌딩) 어드민 화면을 만들고, 새 화면을 설계할 수 있도록 정리한 디자인 규칙입니다.
>
> - **출처**: Figma `BLENDING 블랜딩` 파일의 **❖ Design System · 🧩 Asset · Draft** 페이지 + 이 저장소의 HTML 프로토타입에서 확정한 내용 (2026-11-02 기준)
> - **단위**: 모든 수치는 px, 폰트는 Pretendard
> - **(추정)** 표시: 피그마에 값이 없어 관례로 정한 항목입니다. 팀에서 확정하면 표시를 지워 주세요.
> - **구현 기준 파일**: [`assets/blending.css`](assets/blending.css) · [`assets/blending.js`](assets/blending.js) — 이 문서와 코드가 다르면 **문서를 먼저 고치고** 코드를 맞춥니다.

## 목차

0. [먼저 읽을 원칙](#0-먼저-읽을-원칙)
1. [Foundation](#1-foundation) — 색 · 글자 · 간격 · 모서리 · 그림자 · 모션 · 레이어 · 브레이크포인트
2. [Assets](#2-assets) — 로고 · 아이콘
3. [Components](#3-components) — 버튼 · 입력 · 선택 · 표 · 요약 · 오버레이
4. [Layout](#4-layout) — 데스크톱 · 사이드바 · 모바일 · 로그인 · 폼
5. [Screens](#5-screens) — 메뉴별 화면과 모달 명세
6. [Interaction & State Rules](#6-interaction--state-rules)
7. [Copy](#7-copy-문구-규칙) — 문구 규칙과 토스트 문구 모음
8. [Implementation](#8-implementation-코드로-만들-때) — 파일 구조 · CSS 클래스 · JS API
9. [Figma Map](#9-figma-map)
10. [체크리스트](#10-체크리스트) · [미확정 항목](#11-미확정-항목)

---

## 0. 먼저 읽을 원칙

1. **색은 토큰 이름으로만 쓴다.** HEX를 직접 쓰지 않는다. 브랜드 색은 보라 `#7740FE` 하나뿐이다.
2. **화면 = Sidebar(240) + Contents.** Contents는 위에서부터 `Page Header → (Summary/Filter) → (Tabs) → Toolbar → Table → Pagination`.
3. **컨트롤 높이는 40.** 버튼·인풋·드롭다운 옵션·테이블 행 모두 40 (테이블 헤더 34, Chip·Option Cell 32).
4. **모서리는 4가 기본.** 카드·테이블 10, 모달·토스트 12, 로그인 카드 24, 사이드바 메뉴·세그먼트 6.
5. **글자는 작게.** 테이블 12(Body4), 버튼 13(Body3/Medium), 페이지 제목 20(Heading1/Regular).
6. **영역당 Primary 버튼은 하나**, 툴바 맨 오른쪽. 나머지는 Line 버튼.
7. **위험한 동작(삭제)은 확인 모달을 거친다.** 결과는 상단 가운데 토스트로 알린다.
8. **입력이 유효하지 않으면 확인 버튼을 Disabled로 둔다.** 형식이 틀린 칸은 빨간 테두리 + 경고 토스트로 알리고, 빨간 인라인 문장은 쓰지 않는다.
9. **빈 상태는 두 줄**: 1줄 상황, 2줄 다음 행동.
10. **모바일(≤767)은 같은 구조를 세로로 쌓는다.** 사이드바는 햄버거, 넓은 표는 가로 스크롤, 모달은 343폭.
11. **새 화면은 기존 컴포넌트를 조합한다.** 새 모양을 만들기 전에 [3장](#3-components)과 [5장](#5-screens)에 비슷한 것이 있는지 먼저 찾는다.

---

## 1. Foundation

### 1.1 Color — Primitive

| 그룹 | 토큰 | HEX |
|---|---|---|
| Purple | `Purple/50` | `#F5F2FF` |
| | `Purple/100` | `#E8DFFF` |
| | `Purple/300` | `#9065FC` |
| | `Purple/500` | `#7740FE` ← **브랜드** |
| Grayscale | `Grayscale/100` | `#FFFFFF` |
| | `Grayscale/200` | `#FBFBFB` |
| | `Grayscale/300` | `#FAFAFA` |
| | `Grayscale/400` | `#F1F2F5` |
| | `Grayscale/500` | `#E3E6EB` |
| | `Grayscale/600` | `#C8CACE` |
| | `Grayscale/700` | `#9398A0` |
| | `Grayscale/800` | `#767B82` |
| | `Grayscale/850` | `#666666` |
| | `Grayscale/900` | `#45484C` |
| Blue | `Blue/100` | `#FAFCFE` |
| | `Blue/500` | `#1B4ECE` |
| Red | `Red/100` | `#FFECEC` |
| | `Red/300` | `#FFE2E2` |
| | `Red/500` | `#FF6868` |
| Green | `Green/300` | `#22A55B` |
| Yellow | `Yellow/300` | `#F59E0B` |

### 1.2 Color — Semantic

**Background**

| 토큰 | 참조 | HEX | 용도 |
|---|---|---|---|
| `Bg/Page` | Grayscale/200 | `#FBFBFB` | 페이지 배경, Page Header |
| `Bg/Surface` | Grayscale/100 | `#FFFFFF` | 카드, 사이드바, 인풋, 테이블 셀, 모달 |
| `Bg/Brand` | Purple/500 | `#7740FE` | Primary 버튼, 체크박스 ON, 활성 페이지 번호, 토글 ON, 달력 선택 |
| `Bg/Brand-Hover` | Purple/300 | `#9065FC` | Primary hover |
| `Bg/Brand-Light` | Purple/100 | `#E8DFFF` | 선택된 Option Cell, Lv2 메뉴 hover |
| `Bg/Brand-Light-Hover` | Purple/50 | `#F5F2FF` | 선택된 Chip, 달력 날짜 hover |
| `Bg/Table-Header` | Purple/100 | `#E8DFFF` | 테이블 헤더 |
| `Bg/Table-Row-Hover` | Blue/100 | `#FAFCFE` | 테이블 행 hover |
| `Bg/Disabled` | Grayscale/400 | `#F1F2F5` | 비활성 버튼·인풋·토글, 세그먼트 바탕, 패널 헤더 |
| `Bg/Dim` | Grayscale/900 @ 40% | `rgba(69,72,76,.4)` | 모달 뒤 딤 |
| Loading Veil | — | `rgba(226,226,228,.72)` + blur 12 | 데이터 추출 로딩 (Figma 342:43868) |

**Text**

| 토큰 | HEX | 용도 |
|---|---|---|
| `Text/Primary` | `#45484C` | 본문, 제목, 테이블 값, 요약 항목 제목 |
| `Text/Secondary` | `#666666` | 설명, 폼 라벨, 사이드바 메뉴, 안내 문구 |
| `Text/Tertiary` | `#767B82` | 토스트 메시지, 페이지 번호, Line hover |
| `Text/Quaternary` | `#9398A0` | placeholder, 보조 라벨, 헬퍼, 빈 상태 2줄 |
| `Text/Disabled` | `#C8CACE` | 비활성 |
| `Text/Inverse` | `#FFFFFF` | 보라 배경 위 |
| `Text/Brand` / `-Hover` | `#7740FE` / `#9065FC` | 활성 메뉴·탭·필터, Secondary 버튼 |

**Border** — `Border/Default #C8CACE`(인풋·Line·체크박스) · `Border/Strong #9398A0`(Icon Button) · `Border/Divider #F1F2F5`(행·카드·구분선) · `Border/Brand #7740FE` · `Border/Brand-Hover #9065FC`

**Icon** — `Icon/Default #45484C` · `Icon/Secondary #767B82` · `Icon/Tertiary #9398A0` · `Icon/Disabled #C8CACE` · `Icon/Brand #7740FE`

**Status / Role**

| 토큰 | HEX | 의미 |
|---|---|---|
| `Status/Success` | `#22A55B` | 정상, 성공 토스트 아이콘 |
| `Status/Error` | `#FF6868` | 오류, 필수 `*`, 마감 임박 날짜, Danger 텍스트, 잘못된 입력 테두리, **순위 상승 ↑** |
| `Status/Warning` | `#F59E0B` | 경고 토스트 아이콘 |
| `Role/General` | `#1B4ECE` | 권한: 일반, **순위 하락 ↓** |
| `Role/Agency` | `#22A55B` | 권한: 대행사 |
| `Role/Distributor` | `#F59E0B` | 권한: 총판 |

> 순위 등락은 국내 관례(상승 빨강, 하락 파랑)를 따른다. 정상/오류 상태색과는 의미가 다르니 순위 화면에서만 쓴다.

### 1.3 Typography

- 폰트 **Pretendard** (fallback `-apple-system, "Apple SD Gothic Neo", sans-serif`), 모든 스타일 **letter-spacing -1%**

| 스타일 | Size/Weight/LH | 주 용도 |
|---|---|---|
| `Heading1/Bold` | 20/700/28 | 캠페인 요약 숫자 |
| `Heading1/Regular` | 20/400/30 | **페이지 제목** |
| `Heading2/Medium` | 18/500/27 | **모달 제목**, Lv1 메뉴 hover, 아바타 |
| `Heading2/Regular` | 18/400/27 | 사이드바 Lv1 메뉴 |
| `Body1/Medium` | 16/500/24 | 요약 값, 텍스트 모달 메시지, 활성 페이지 번호 |
| `Body1/Regular` | 16/400/24 | 페이지 번호, Lv2 메뉴 |
| `Body2/Medium` | 14/500/21 | 로직관리 매체명·유입 수 |
| `Body2/Regular` | 14/400/21 | "N개 선택", 토스트, 드롭다운 옵션, 모달 설명 |
| `Body3/Medium` | 13/500/20 | **버튼 라벨**, Chip, 세그먼트, 모달 안내 bullet |
| `Body3/Regular` | 13/400/20 | 페이지 설명, 탭, Option Cell, 요약 항목 제목, 각주 |
| `Body4/Medium` | 12/500/18 | **폼 라벨**, 로그아웃 |
| `Body4/Regular` | 12/400/18 | **테이블 헤더/셀**, 인풋 값, 툴팁 |
| `Caption/Regular` | 11/400/14 | 헬퍼, 요약 설명, 파일선택 버튼, 진행 수 |

### 1.4 Spacing

스케일 `0 2 4 6 8 10 12 14 16 18 20 24 28 30 32 34 36 40 48 64 80`

| 값 | 쓰는 곳 |
|---|---|
| 4 | 버튼 아이콘-라벨, 페이지 번호 사이, 사이드바 메뉴 사이 |
| 6 | 툴바 버튼 사이, 라벨-인풋 |
| 8 | Page Header 제목-설명, Controls, Chip 사이 |
| 12 | 인풋·버튼·셀 좌우 패딩, 요약 항목 제목-값 |
| 16 | 툴바 좌측, 표 블록 세로 간격, 모바일 좌우 여백, 순위 보고서 요소 간격, 요약 항목 좌우 |
| 20 | 모달 좌우 패딩·요소 간격, 모달 폼 필드 간격(시간·슬롯 모달) |
| 24 | 폼 필드 간격, 요약 바·필터 카드 패딩 |
| 40 | **Contents 좌우 여백** |

### 1.5 Radius

`XS 2`(프로그레스·파일선택·스크롤바 6px의 절반 3) · **`SM 4`**(버튼·인풋·체크박스·Chip·페이지번호·툴팁·세그먼트 항목) · `MD 6`(Nav Item·아바타·세그먼트 바탕) · `LG 8`(Text Area·토글·패널) · `XL 10`(Summary·테이블·순위 카드) · `2XL 12`(모달·토스트) · `3XL 24`(로그인 카드) · `Full 999`

### 1.6 Size

| 항목 | 값 |
|---|---|
| Control | 40 (버튼·인풋·옵션·행) |
| Table Header / Compact Row | 34 |
| Chip · Option Cell · 세그먼트 항목 | 32 |
| Checkbox | 16 · Toggle 28×16 · Icon Button 22 |
| 아이콘 | 16 기본 · 24 모바일 메뉴·모달 닫기 · 28 토스트 |
| 스크롤바 | 6 (thumb `Grayscale/400`, hover `Grayscale/500`, 트랙 투명) |

### 1.7 Shadow

| 토큰 | CSS | 쓰는 곳 |
|---|---|---|
| `Shadow/Level 1` | `2px 4px 20px rgba(0,0,0,.13)` | Summary Bar, 필터 카드, 로그인 카드 |
| `Shadow/Level 2` | `0 0 8px rgba(69,72,76,.08)` | 사이드바, 테이블, 모달, 토스트, 드롭다운, 달력, 세그먼트 선택 칩 |
| `Shadow/Input-Hover` | `0 0 0 2px #E8DFFF` | 포커스 링 (인풋·Text Area·버튼 키보드 포커스) |

> **모달 안의 카드에는 그림자를 쓰지 않는다.** 대신 1px `Border/Divider` 테두리 (예: 순위 보고서 카드, 로직관리 목록, 단가설정 패널).

### 1.8 Motion

| 대상 | 값 |
|---|---|
| 버튼·Chip·인풋 색/테두리/포커스 링 | 150ms |
| 세그먼트 선택 칩 이동 | **220ms `cubic-bezier(.2,.8,.2,1)`**, 글자색 200ms 페이드 |
| 토스트 | 위로 12px에서 내려오며 200ms 페이드, **2.5초 뒤 사라짐** |
| 툴팁 | 120ms 페이드 |
| 모바일 사이드바 | 왼쪽에서 200ms 슬라이드 |
| 로딩 로고 | 1.2s 깜빡임(opacity 1 ↔ .45) (추정) |

- `prefers-reduced-motion: reduce`면 이동·깜빡임 애니메이션을 끈다.
- 처음 그려질 때(모달이 열릴 때 등)는 애니메이션 없이 제자리에 둔다.

### 1.9 Layer (z-index)

`사이드바 20` < `모바일 백드롭 30` < `모바일 사이드바 40` < `모달 딤 50` < `토스트 60` < `달력 70` < `툴팁 80` < `로딩 90`

### 1.10 Breakpoint

- **Desktop**: 기준 1920 (Contents 1680). 1600에서도 표가 넘치지 않게 긴 텍스트 열은 말줄임 — 링크형 셀 220px, 일반 셀 240px(1800 이상은 둘 다 360px).
- **Mobile**: `max-width: 767px`, 기준 375.

---

## 2. Assets

### 2.1 Logo — [`assets/logo.svg`](assets/logo.svg)

원본 164×25, 워드마크 `#211F2C` + G 꼬리 `#7740FE`. 사이드바·로그인·로딩 164×25, 모바일 헤더 100×15, 모바일 로딩 124×19. 색·비율을 바꾸지 않는다.

### 2.2 Icons — [`assets/icons/`](assets/icons/)

16×16, stroke 1.33, round cap/join. `currentColor`로 저장 → 부모 `color`로 칠한다. `sort-*`만 2톤 고정.

| 파일 | 쓰는 곳 |
|---|---|
| `search` | 검색 인풋, 페이지 이동 |
| `download` / `upload` | 추출·엑셀 저장 / 업로드 버튼 |
| `plus` / `plus-square` | 슬롯 추가 / 추가 |
| `chevron-left/right` · `chevrons-left/right` | 페이지네이션, 활성 메뉴 표시, 달력 이동 |
| `chevron-down/up` | 드롭다운·선택 상자 |
| `close` | 모달 닫기(24, `Icon/Disabled`), 인풋 지우기 |
| `calendar` | 날짜·기간 인풋 |
| `file-delete` | 정산관리 삭제로그 보기 |
| `arrow-up` / `arrow-down` | 순위 등락 표시 |
| `check` / `alert-circle` | 성공 / 경고 토스트(28) |
| `menu` | 모바일 햄버거(24) |
| `edit` | 테이블 수정·정답 수정 |
| `eye` / `eye-off` | 비밀번호 보기/숨기기 |
| `sort-none/asc/desc` | 정렬 가능한 헤더 |

---

## 3. Components

> 표기: `H` 가로, `V` 세로, padding `상/우/하/좌`.

### 3.1 Button

공통: **높이 40**, padding `0 12`, radius 4, 아이콘 16 + 간격 4, `Body3/Medium`, 폭은 내용에 맞춤.

| Style | Default | Hover | Disabled |
|---|---|---|---|
| **Primary** | `Bg/Brand` + `Text/Inverse` | `Bg/Brand-Hover` | `Bg/Disabled` + `Text/Disabled` |
| **Line** | 흰색 + 1px `Border/Default` + `Text/Primary` | `Text/Tertiary` | `Bg/Disabled` + `Text/Disabled` |
| **Secondary** | 흰색 + 1px `Border/Brand` + `Text/Brand` | `#9065FC` | Line Disabled와 같음 |
| **Danger** | `#FFECEC` + `Status/Error` | `#FFE2E2` | `Bg/Disabled` |

- Primary = 화면 핵심 동작(등록·추가·연장·로그인·정산 다운로드·모달 확인), 영역당 1개
- Line = 보조 동작(수정·삭제·업로드·추출·엑셀 저장·단가설정·취소·닫기). **삭제도 Line** — 위험은 확인 모달로
- Danger = 주의가 필요한 설정 진입(계정관리 "사이트 설정")
- **Icon Button** 22×22, radius 4, 1px `Border/Strong`. Disabled는 `Border/Default` + `Icon/Disabled`
- **CTA Button**(모달 하단): 폭을 꽉 채움. 2-Button `[Line 닫기/취소][Primary 확인]` 1:1, 간격 10. 1-Button `[Line 닫기]`
- **Link Button**: 테두리·배경 없이 `Body3/Regular` `Text/Brand` + 밑줄(예: 로직관리 "균등분배")
- **Cell Link**: 표 안 클릭 가능한 텍스트. 평소 `Text/Primary`, hover 시 `Text/Brand` + 밑줄. 상품명(새 탭 링크), 순위(순위 보고서 열기)

### 3.2 Input

**Text Input** — 40 높이, padding `0 12`, radius 4, 1px `Border/Default`, 간격 4. 값 `Body4/Regular`. 오른쪽에 아이콘 16 → 필수 `*`(16/500 `Status/Error`, 세로 가운데로 0.16em 내림) 순서.

| State | 표현 |
|---|---|
| Default | placeholder `Text/Quaternary` |
| Hover / Focus | + 포커스 링 `Shadow/Input-Hover` |
| Filled | 값 `Text/Primary` |
| Disabled / 읽기 전용 | bg `Bg/Disabled`, 값 `Text/Quaternary` |
| **Invalid** | 테두리 `Status/Error` (형식이 틀린 칸만, 다시 입력하면 해제) |

- **Box** = 라벨(`Body4/Medium` `Text/Secondary`) + 간격 6 + 인풋 + (헬퍼 `Caption` `Text/Quaternary`). PC 360, 모달 안 100%, 모바일 303
- **Search** 280×40, 오른쪽 `search`. placeholder에 검색 대상을 쓴다("번호, 아이디, 키워드, 상품명, MID")
- **Select**(드롭다운 필드): 인풋과 같은 모양 + 오른쪽 `chevron-down`. 선택 전 문구 "소속 그룹을 선택해주세요" 등은 `Text/Quaternary`
- **Date / Range** 필드: 오른쪽 `calendar`, 누르면 [달력](#38-overlay). 값 형식은 `YYYY-MM-DD` / `YYYY-MM-DD ~ YYYY-MM-DD`, 작업일 입력은 `2026. 11. 03.`. 지울 수 있는 필드는 값이 있을 때 `close`(지우기) 표시
- **Time Range**: `[00:00] ~ [21:00]` 두 칸(같은 폭) + 가운데 `~`(`Text/Quaternary`), 간격 16. 숫자만 쳐도 `HH:MM`으로 맞춘다(2130 → 21:30)
- **Password**: 오른쪽 `eye-off`/`eye` 토글 → `*`
- **Text Area** 최소 87, padding 12, radius 8. 공지 본문은 높이 300
- **File Input** 40 높이, 왼쪽 "파일 선택"(bg `#F1F2F5`, radius 2, `Caption`) + 파일명 `Body3`(없으면 `Text/Disabled` "선택된 파일 없음")

### 3.3 Dropdown

Menu 폭 360, 1px `Border/Default`, radius `0 0 4 4`, `Shadow/Level 2`. 상단 검색 줄 38 + 옵션 40(`Body2/Regular`, hover `#F1F2F5`). 페이지 크기 "10개씩 보기" 120×40. (프로토타입은 브라우저 기본 선택 상자에 같은 모양을 입혔다.)

### 3.4 Selection

- **Checkbox** 16, radius 4. ON `Bg/Brand` + 흰 체크. Checkbox Field = 체크박스 + 8 + `Body4/Regular` `Text/Tertiary`. 폼에서는 라벨 위·체크박스 아래 세로형도 쓴다
- **Option Cell / Option Wrap**(하나만 고르는 칸 묶음): 셀 32, `Body3/Regular`, 셀끼리 붙임(바깥 모서리만 4). Default 흰색+`Border/Default`+`Text/Secondary` · Selected `Bg/Brand-Light`+`Border/Brand`+`Text/Brand` · Disabled `Bg/Disabled`
  - **2×2 그리드형**: 항목이 4개이고 이름이 길면 두 줄로(예: 광고 수정 > 로직 1~4)
- **Chip**(필터) 32, padding `0 12`, `Body3/Medium`. Default 흰색+테두리 · Hover `Text/Tertiary` · Selected `#F5F2FF`+`#9065FC` 테두리+`Text/Brand`
  - **Large Chip**(기간 프리셋, 정산관리): 높이 40, Selected는 `Bg/Brand` 꽉 채움 + 흰 글자
  - 모바일에서는 줄바꿈 없이 가로 스크롤
- **Segmented Control**(보기 전환): 바탕 `#F1F2F5`, padding 4, radius 6. 항목 32, `Body3/Medium`, 비선택 `Text/Quaternary`. 선택 칩(흰색+`Shadow/Level 2`)이 선택 항목으로 **220ms 미끄러진다**. 모바일·모달 안에서는 폭을 균등 분배
  - 쓰는 곳: 캠페인 정산 "오늘/이번달", 순위 보고서 "가격비교/플러스스토어"
- **Tabs**(하위 메뉴 이동): 41 높이, 하단 1px `Border/Divider`, 탭 간격 20, 왼쪽 40. Active `Text/Brand` + 하단 2px
- **Toggle** 28×16. ON `Bg/Brand`, OFF `Bg/Disabled`. 켜고 끄기 전에 확인 모달

### 3.5 Table

구조: `Toolbar → 16 → Table → 16 → Pagination`

- **Toolbar** 40: 왼쪽 `"N개 선택"`(Body2) + Search(간격 16) / 오른쪽 Line 버튼들 … **Primary 1개**(간격 6). 선택이 없는 표(로그·캠페인)는 "N개 선택"을 빼고 필터를 둔다
- **Table 컨테이너**: radius 10, `Shadow/Level 2`, 바깥 테두리 없음, 넘치면 가로 스크롤
- **Header** 34, `Bg/Table-Header`, `Body4/Regular`, 가운데. 정렬 가능한 열은 `sort-*`(없음→오름→내림→없음 순환). 첫 열 체크박스 40
- **Body** 40, 하단 1px `Border/Divider`, hover `#FAFCFE`. Compact(모달 안 보조 표) 34
- **Cell 종류**: Text(긴 글은 말줄임 + [툴팁](#38-overlay)) · Checkbox · Status Badge · Role 색 · Toggle · Action(Icon Button `edit`/`plus`/`file-delete`, 못 쓰면 Disabled) · Link(상품명 → 새 탭) · Rank(순위 → 순위 보고서, 툴팁 "순위보기")
- 마감 임박 날짜는 `Status/Error`. 가장 긴 열(상품명·메모·제목)이 남는 폭을 채운다. 기본 10행
- **Status Badge**: 점 6 + 4 + `Body4`. 정상 `Status/Success` · 오류 `Status/Error` · 대기 점 `Icon/Tertiary` + 글자 `Text/Quaternary`
- **Empty**: 헤더 유지, 본문 가운데 두 줄(1줄 `Body2` `Text/Primary`, 2줄 `Body3` `Text/Quaternary`), padding 64
- **Plain Table**(모달 안 정보 표, 예: 단가설정 "전체 단가"): 배경 없음, 헤더 하단 1px `Border/Default`, 행 40

### 3.6 Pagination

한 줄 40을 3등분: 빈칸 · 가운데 번호 · 오른쪽 Controls.
- `« ‹` + 번호(간격 4) + `› »`(간격 10). Page Item 28×35, `Body1/Regular` `Text/Tertiary`, Active `Bg/Brand` + `Body1/Medium` 흰색
- 번호는 데스크톱 10개, **모바일 5개**씩 + `…` + 마지막 번호
- Controls: "페이지로 이동"(`Body2` `Text/Quaternary`) + 80×40 숫자 인풋 + 120×40 "10개씩 보기"(10·20·50)
- 모바일은 번호 줄 아래에 Controls 줄

### 3.7 Summary

- **Slot Summary Item**(공통 요약 칸): V 간격 12, 좌우 16. 제목 `Body3/Regular` `Text/Primary` (+ 설명 `Caption` `Icon/Tertiary`, 간격 8) / 값 `Body1/Medium`. 칸 사이 1px `Border/Divider` 세로선
- **Slot Summary Bar**(광고관리): 흰 카드, padding 24, radius 10, `Shadow/Level 1`. 전체·정상·오류·대기·마감예정·종료. **각 칸이 표 필터 버튼** — hover 시 제목·값 `Text/Brand-Hover`, 클릭 시 `Text/Brand`로 활성화되고 아래 표가 그 조건으로 바뀜(기본 "전체"). 모바일 2열×3행
- **Filter Card**(정산관리): Summary Bar 모양 안에 `[기간 필드 200][Large Chip 프리셋…]` 줄 + 아래 합계 칸(조회기간·수량 합계·발주일수 합계, 칸 폭 240)
- **Stats Bar**(캠페인 요약): 카드 없이 한 줄. 값 `Heading1/Bold` + 라벨 `Body4` `Text/Quaternary`(간격 2), 칸 간격 32, 오른쪽 기간 필드

### 3.8 Overlay

**Modal** — radius 12, `Shadow/Level 2`, padding `30 20`, 요소 간격 20, 딤 `Bg/Dim`. 제목 `Heading2/Medium`(두 줄일 땐 의미 단위로 줄바꿈), 오른쪽 위 `close` 24. Esc·딤 클릭으로 닫힘.

| 폭 | 쓰는 곳 |
|---|---|
| **400** (모바일 343) | 기본 폼 모달 대부분 |
| 630 | 단가설정(설명 + 입력 패널 + 표) |
| 800 | 순위 보고서 |
| 본문 폭(최대 1440) | 넓은 표 모달(정산관리 삭제로그) |

- 모달 안 폼: Box를 간격 24(시간·슬롯처럼 같은 칸이 반복되면 20)로 쌓는다
- 모달 안 안내: `· ` bullet 목록 `Body3/Medium` `Text/Secondary`, 간격 2
- 모달 안 카드/패널: 1px `Border/Divider`, radius 8~10, **그림자 없음**. 입력 묶음 패널은 bg `Bg/Page`
- 내용이 길면 **모달 전체가 아니라 안쪽 카드·표만** 스크롤해서 제목·요약·버튼을 고정한다

**Text Modal**(확인) — 400, padding `30 20 20 20`, 간격 24, 가운데 정렬. 메시지 `Body1/Medium` + 설명 `Body2` `Text/Secondary`(간격 4) → `[닫기/취소][확인 동작]`

**Toast** — 312×60(내용이 길면 줄바꿈), padding `16 20`, 간격 16, radius 12. 아이콘 28(성공 `check` `Status/Success`, 경고 `alert-circle` `Status/Warning`) + `Body2` `Text/Tertiary`. **상단 가운데 20**, 2.5초 후 사라짐.

**Tooltip** — padding `2 8`(높이 22), 글자 폭에 맞춤, bg `#666666`, radius 4, `Body4` 흰색. **대상 글자 바로 아래 4px 가운데**(화면 아래쪽이면 위). 키보드 포커스에도 뜬다. 말줄임된 값 → 전체 텍스트, 순위 → "순위보기".

**Date Picker** — 664, 1px `Border/Default`, radius 4, `Shadow/Level 2`. 필드 아래 4px(공간 없으면 위).
- 상단(bg `#F1F2F5`, padding 10): 시작/종료 표시 36, 고르는 쪽 `Border/Brand`, `Oct 7, 2026` 형식
- 이동: 좌우 24 버튼 + 가운데 월·연도 선택. 두 달 나란히(간격 24). Day 44×36, `Body3`. 오늘은 숫자 아래 18×2 보라 바
- 선택 범위는 **한 줄짜리 보라 띠**(`Bg/Brand` + 흰 숫자). 시작·일요일·1일은 왼쪽, 끝·토요일·말일은 오른쪽을 13 둥글게
- 첫 클릭 시작일 → 두 번째 클릭 종료일(더 이르면 시작일 재선택). 고르는 동안 hover 위치까지 미리보기. 종료일을 고르면 닫힘
- 단일 날짜: 334폭, 한 달, 상단 표시 없음. 모바일: 화면 아래 시트, 한 달
- 직접 고르면 연결된 프리셋(Chip·세그먼트) 선택은 해제

**Loading**(데이터 추출) — 화면 전체 blur 12 + `rgba(226,226,228,.72)` 베일, 가운데 로고(164×25, 모바일 124×19). 끝나면 닫고 완료 토스트. (진행률 모달은 쓰지 않는다)

---

## 4. Layout

### 4.1 Desktop (1920×1200)

```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │ Page Header  (padding 32/40, 하단 Divider)     │
│  240     │   제목 Heading1/Regular · 설명 Body3 (간격 8)   │
│  흰색     ├──────────────────────────────────────────────┤
│  Shadow2 │ [Summary · Filter Card] (padding 24/40)       │
│          │ [Tabs] (왼쪽 40)        ← 하위 메뉴가 있을 때    │
│          ├──────────────────────────────────────────────┤
│          │ Table Block (padding 30/40/40/40, 간격 16)     │
│          │   Toolbar · Table · Pagination                │
└──────────┴──────────────────────────────────────────────┘
  배경 Bg/Page
```

Contents 좌우 40 고정, 블록은 폭 100%. 표 아래 남는 공간은 비운다.

### 4.2 Sidebar

240×100vh, 흰색, `Shadow/Level 2`, padding `40 16 0 16`. 위: 로고 → 80 → 메뉴(간격 4) / 아래: 프로필(아바타 40 + 역할·아이디, 하단 Divider) → 로그아웃.

| Level | 크기 | 기본 | Active | Hover |
|---|---|---|---|---|
| 1 | 208×38, padding `0 10`, r6 | `Heading2/Regular` `Text/Secondary` | `Text/Brand` + `chevron-right` | `Heading2/Medium` `Text/Brand` |
| 2 | 208×34, padding `0 10 0 24` | `Body1/Regular` `Text/Secondary` | `Text/Brand` | bg `Bg/Brand-Light` |

메뉴: **공지사항 · 계정관리 · 광고관리 · 정산관리 · 캠페인**(하위: 캠페인 요약 · 캠페인 관리 · 정산관리 — 캠페인 안에서만 펼침)

### 4.3 Mobile (375)

- Mobile Header 56: `[menu 24][로고 100×15][빈칸 40]`, 햄버거 → 사이드바가 왼쪽에서 열리고 뒤에 딤
- Page Header padding `24 16`, 본문 여백 16
- Summary 2열, Toolbar는 검색 아래로 버튼 줄바꿈(간격 8), 표는 가로 스크롤, 페이지 번호 5개
- 모달 343, Box 100%, 달력은 아래 시트

### 4.4 로그인

배경 `Bg/Page`, 카드 360(padding `48 30`, r24, `Shadow/Level 1`) 정가운데. 로고 → 40 → 아이디 → 비밀번호 → 16 → "아이디 기억하기" → 로그인 Primary(꽉 채움). 모바일은 카드 없이 전체 화면.

### 4.5 등록/수정 폼 페이지

Form padding `40 20`, 필드 간격 24. 짧은 입력 Box 360, 긴 입력 100%. 하단 `[Line 취소][Primary 추가/저장]`(왼쪽 정렬, 간격 6). 필수값 전까지 Primary Disabled.

---

## 5. Screens

> 프로토타입 파일 → 화면. 새 화면을 만들 때는 가장 비슷한 화면을 복사해서 시작한다.

### 5.1 로그인 — [`login.html`](login.html)
- 빈 칸으로 로그인 → 경고 "아이디와 비밀번호를 입력해주세요." / 실패 → "아이디 또는 비밀번호가 일치하지 않습니다."

### 5.2 공지사항 — [`notice.html`](notice.html), [`notice-form.html`](notice-form.html)
- 표: ☐ · 번호 · 제목(가변, 고정글은 `[고정]` 접두) · 작성일자. Toolbar `수정 · 삭제 · [등록]`
- 등록/수정 페이지: 고정·팝업 체크 → 팝업이면 팝업 기간(달력) → 제목* → 내용*(300) → `[취소][추가/저장]`

### 5.3 계정관리 — [`account.html`](account.html)
- 표: ☐ · 번호↕ · 아이디↕ · 비밀번호 · 권한↕(Role 색) · 총판 · 수량↕ · 슬롯 추가(+) · 메모(가변) · 수정
- Toolbar `[Danger 사이트 설정] · 삭제 · [추가]`
- **계정 추가 모달** "계정 등록정보를 입력해주세요."(400): 아이디* · 비밀번호*(보기 토글, 헬퍼 "영문과 숫자로 4자 이상…") · 권한 Option Wrap(총판/대행사/일반) · **소속**(대행사 → "총판" 선택, 일반 → "대행사" 선택, 선택지 `아이디 [회사명]`) 또는 총판이면 회사명* · 메모
- **계정 수정 모달**: 아이디·**권한·회사명은 읽기 전용 Disabled 칸**(권한을 옵션 칸으로 보여주지 않는다), 비밀번호·메모만 수정
- **슬롯 추가 모달**(일반 계정만 + 활성) "광고 추가정보를⏎입력해 주세요.": 아이디(읽기 전용) · 수량* · 일수*(기본 10) · 작업 시작일*(달력, `2026. 11. 03.`) · 작업 종료일(읽기 전용, **시작일 + 일수 − 1** 자동) → `[닫기][추가]`
- **사이트 설정 모달** "광고 정보를⏎입력해 주세요.": Time Range 4줄 — 광고 오픈 시간 · 광고 수정 가능 시간 · 광고 삭제 가능 시간 · 광고 연장 가능 시간 → `[닫기][수정]`

### 5.4 광고관리 — [`ad.html`](ad.html)
- Summary Bar(필터 겸용) → 표: ☐ · 번호↕ · 아이디 · 상태 · 로직구분↕ · 키워드(툴팁) · 가격비교(순위) · 플러스(순위) · 상품명(링크·말줄임) · 상품MID · 가격비교 MID · 작업일수 · 작업시작일↕ · 작업종료일↕ · 수정
- Toolbar `로직관리 · ⬆발주데이터 업로드 · ⬇순위데이터 추출 · ⬇발주데이터 추출 · 수정 · 삭제 · [연장]`
- **광고 수정**(400) "광고의 수정 내용을 입력해주세요.": 상품 URL* · 가격비교 URL · 순위조회 키워드* · 로직(2×2: 로직 1~4) · 메모 → `[닫기][수정]`
- **연장**(400) "광고의 연장 일수를 선택해 주세요.": 번호(읽기 전용, 여러 개면 `106850 외 2건`) · 연장 일수*(기본 10) + 빠른 선택 1일/3일/7일/10일(입력값과 같으면 선택 표시) → `[닫기][수정]`
- **로직관리**(400): bullet 3줄(분배 비율·합계 100%·유입수 기준) → 매체 8줄 `[매체명][% 입력 74][%][N 유입]`(구분선) → `합계 N%`(100이 아니면 빨강) · `총 유입 44,622` · Link "균등분배" → `[닫기][수정]`
- **발주데이터 업로드**(400) "광고 엑셀 업로드": 유저 선택 · 엑셀 파일 → `[닫기][등록]`
- **순위 보고서**(800, 셀 클릭): 아래 [5.4.1](#541-순위-보고서)
- 데이터 추출 → [Loading](#38-overlay) → 완료 토스트

#### 5.4.1 순위 보고서
- 제목 "광고의 순위 보고서를 확인해 주세요.", 요소 간격 16
- Segmented `가격비교 / 플러스스토어`(누른 셀의 종류가 선택된 채 열림)
- 요약 카드(Slot Summary Item ×4): 키워드 · 금일 순위 · 시작 순위 · 시작일 대비
  - 숫자가 작아지면 `↑ n위` 빨강 · 커지면 `↓ n위` 파랑 · 순위 밖→안 `↑ 순위 진입` · 안→밖 `↓ 순위 이탈` · 비교 불가 `-`
- 일자별 카드: 작업시작일~오늘(최대 120일) 최신순 `MM/DD (요일)` + `n위`/`순위 밖`, **한 줄 7일 그리드**(모바일 3칸), 4줄(312) 넘으면 카드 안 세로 스크롤
- 기록 없음: "아직 수집된 순위 기록이 없습니다."
- 각주 "* 등락 표시는 시작일 순위 기준 대비 등하락입니다." → `[닫기]`

### 5.5 정산관리 — [`settle.html`](settle.html) (발주·환불 로그)
- Filter Card: 기간 필드 + Large Chip `오늘 · 1일전 · 이번달 · 9월 · 8월 · 7월` + 합계(조회기간·수량 합계·발주일수 합계)
- 표(선택 없음): 번호 · 구분(생성/환불/연장) · 총판 · 대행사 · 일반 · 로직 · 수량 · 기간 · 일수합계 · 생성일시 · 작업시작일 · 삭제로그(`file-delete`, 환불 행만 활성)
- Toolbar: 검색 · `⬇엑셀 저장`
- **삭제로그 모달**(본문 폭): Compact 표(번호·상품명(200 말줄임+툴팁)·MID·시작일·종료일·환불요청일·환불일수), 헤더 고정, 4행 넘으면 세로 스크롤 → `[닫기]` 꽉 채움

### 5.6 캠페인 — Tabs `캠페인 요약 · 캠페인 관리 · 정산관리`
- **요약** [`campaign-summary.html`](campaign-summary.html): Stats Bar(등록된 광고수·오늘 소진 목표량·오늘 소진 횟수) + 기간 → 표(날짜·목표 소진·현재 소진·남은 소진·오답수·참여자수·퍼펙트 참여자수)
- **관리** [`campaign-manage.html`](campaign-manage.html): 등록일(단일 달력, 지우기) · 상품명 검색 → 표(상품명·할당량·소진 횟수·남은 횟수·오답수·등록일·광고 노출 Toggle·정답 수정). 토글 → "광고를 ON/OFF 하겠습니까?" `[취소][확인]`. **정답 수정** 모달: 입력 1칸 + 헬퍼 "저장을 누르면 즉시 반영됩니다." → `[닫기][저장]`
- **정산관리** [`campaign-settle.html`](campaign-settle.html): 매체 Chip(전체·아바티·체리포인트·머니닷·TNK·애드팝콘·플코·NBT·아바티 매체사) → 기간 + Segmented 오늘/이번달 + `단가설정 · [정산 다운로드]` → 표(날짜·구분·목표유입수·소진유입수·유입당원가·매체단가·VAT(10%)·총정산금액, 금액 `₩ 1,234`). "전체"는 날짜별 매체 합산
  - **단가설정**(630): bullet 2줄 → 패널[매체·카테고리·적용 시작일 / 단가(원)·NET(원) / `[추가하기]`] → "전체 단가" Plain Table → `[닫기]`

---

## 6. Interaction & State Rules

| 상황 | 규칙 |
|---|---|
| 목록 선택 | 체크하면 "N개 선택" 갱신. 헤더 체크박스는 현재 페이지 전체 |
| 선택 없이 수정·삭제·연장 | 실행하지 않고 경고 "○○을 선택해주세요." |
| 수정 | 1개만. 여러 개면 경고 "수정할 ○○을 1개만 선택해주세요." |
| **계정 삭제** | **1개만.** 여러 개면 경고 "하나의 계정만 삭제할 수 있습니다." |
| 광고·공지 삭제 | 여러 개 가능. 확인 모달 → 완료 토스트 |
| 연장 | 여러 개 가능, 번호 칸에 `첫 번호 외 N건` |
| 등록·수정 완료 | 모달을 닫고 목록에 반영 + 성공 토스트 (페이지 이동이 있으면 이동한 뒤 토스트) |
| 입력 검증 | 필수값·형식이 맞을 때만 확인 버튼 활성. 숫자 칸은 숫자만 남긴다. 제출 시 형식 오류는 칸 빨간 테두리 + 첫 칸에 포커스 + 경고 토스트 |
| 서버 오류 | 중복 아이디·엑셀 형식 등은 경고 토스트(필요하면 2줄) |
| 읽기 전용 값 | Disabled 칸으로 보여준다(옵션·토글을 비활성으로 두지 않는다) |
| 자동 계산 | 종료일, 유입 수, 합계처럼 계산되는 값은 입력과 동시에 바뀐다 |
| 권한별 동작 | 슬롯 추가는 **일반 계정만**. 소속 선택은 대행사→총판, 일반→대행사 |
| 요약 카드 필터 | 누른 항목만 활성, 표는 그 조건 + 검색·정렬·페이지 유지 |
| 기간 프리셋 | 프리셋을 누르면 기간 필드를 채우고, 달력으로 직접 고르면 프리셋 선택 해제 |
| 토글 | 바꾸기 전 확인 모달, 취소하면 원래대로 |
| 데이터 추출·다운로드 | 로딩 화면 → 파일 저장 → 성공 토스트. 받을 데이터가 없으면 경고 |
| 긴 목록이 모달 안에 | 안쪽 카드·표만 스크롤, 헤더 고정 |
| 키보드 | Esc로 모달·달력 닫기, 포커스 링 표시, 툴팁은 포커스에도 |
| 권한이 없는 버튼 | 숨긴다 (추정) |

---

## 7. Copy (문구 규칙)

- 존댓말 "~합니다 / ~해주세요", 문장 끝 마침표. 모달 제목은 "○○을/를 입력해 주세요." 형태
- 버튼은 2–6자 동사: 등록 · 추가 · 수정 · 삭제 · 연장 · 저장 · 취소 · 닫기 · 확인
- 수량 `674개` · 순위 `3위`/`순위 밖` · 기간 `81일` · 날짜 `YYYY-MM-DD` · 일시 `YYYY-MM-DD HH:MM:SS` · 금액 `₩ 1,234` · 천 단위 콤마
- placeholder 기본 "내용을 입력해주세요". 검색은 대상을 쉼표로 나열

**토스트 문구 모음**

| 종류 | 문구 |
|---|---|
| 성공 | 계정이 추가되었습니다. · 계정 정보가 수정되었습니다. · 계정이 삭제되었습니다. · 슬롯 N개가 추가되었습니다. · 이용시간 설정이 완료되었습니다. · 수정이 완료되었습니다. · 연장이 완료되었습니다. · 로직 수정이 완료되었습니다. · 광고가 삭제되었습니다. · 발주데이터가 업로드되었습니다. · ○○ 추출이 완료되었습니다. · 공지사항이 등록/수정/삭제되었습니다. · 정답이 수정되었습니다. · 광고가 ON/OFF 되었습니다. · 단가 설정이 추가되었습니다. |
| 경고 | ○○을 선택해주세요. · 수정할 ○○을 1개만 선택해주세요. · 하나의 계정만 삭제할 수 있습니다. · 계정 추가에 실패했습니다.⏎이미 사용 중인 아이디입니다. · 올바른 숫자를 기입해주세요. · 합계는 100%여야 합니다. · 올바른 시간을 입력해주세요. · 3행 로직이 올바르지 않습니다.⏎로직 1~로직 4 중 하나만 입력해주세요. · 아이디와 비밀번호를 입력해주세요. · 아이디 또는 비밀번호가 일치하지 않습니다. |

**빈 상태 문구** — 등록된 ○○이 없습니다. / ○○을 등록해 주세요. · 검색 결과가 없습니다. / 다른 검색어로 다시 검색해 주세요. · 누적된 로그가 없습니다. / 조회기간을 바꿔 다시 확인해 주세요. · 아직 수집된 순위 기록이 없습니다.

---

## 8. Implementation (코드로 만들 때)

### 8.1 파일 구조

```
DESIGN.md                 ← 이 문서 (규칙의 원본)
assets/blending.css       ← 토큰 + 모든 컴포넌트 스타일
assets/blending.js        ← 사이드바·토스트·모달·표·달력·툴팁·로딩·세그먼트
assets/logo.svg, assets/icons/*.svg
login.html · notice.html · notice-form.html · account.html · ad.html
settle.html · campaign-summary.html · campaign-manage.html · campaign-settle.html
```

- 페이지는 `<div class="app" data-menu="ad" data-sub="…">` 하나로 시작하면 사이드바·모바일 헤더가 자동으로 붙는다
- 공통 파일은 `assets/blending.css?v=날짜시간`처럼 버전을 붙여 불러온다. 공통 파일을 고치면 모든 페이지의 버전을 함께 올린다

### 8.2 주요 CSS 클래스

| 클래스 | 컴포넌트 |
|---|---|
| `.btn .btn-primary/-line/-secondary/-danger` · `.icon-btn` · `.link-btn` · `.cell-link` | 버튼 |
| `.box .box-label .box-helper` · `.field` (`.is-disabled` `.is-invalid` `.is-placeholder`) · `.req` · `.textarea` · `.file` · `.time-range` | 입력 |
| `.cb` · `.options` (`.options-grid`) · `.chips .chip` (`.chip-lg`) · `.seg` · `.tabs .tab` · `.toggle` | 선택 |
| `.toolbar` · `.table-wrap .table` (`.table-compact`, `.table-scroll`) · `.status-*` · `.role-*` · `.pagination` · `.empty` | 표 |
| `.summary .summary-item` (`.metric`) · `.filter-card` · `.stats-bar` | 요약 |
| `.dim .modal` (`.modal-wide/-rank/-full/-text`) · `.cta` · `.bullets` · `.panel` · `.rank-card` | 모달 |

### 8.3 JS API (`window.Blending`)

| 함수 | 용도 |
|---|---|
| `list({ root, columns, data, searchKeys, empty, selectable })` | 표 + 선택 + 검색 + 정렬 + 페이지. 반환값 `.selected`, `.set(data)`, `.clear()` |
| `toast(msg, 'success' \| 'warning')` | 토스트 |
| `confirm({ message, desc, ok, cancel })` | 확인 모달, `Promise<boolean>` |
| `openModal(id)` / `closeModal(id)` | 모달 열기/닫기 (`[data-close]` 클릭, Esc, 딤 클릭으로도 닫힘) |
| `datePicker(input, { mode: 'range'\|'single', today, value, format, onChange })` | 달력 |
| `loading(promise, label)` | 로딩 화면 |
| `data-tip="문구"` 속성 | 툴팁 (어느 요소든) |

---

## 9. Figma Map

Figma 파일 `BLENDING 블랜딩` (`6Wke1WAjjytQxYK5HI6GBY`)

| 위치 | 내용 |
|---|---|
| ❖ Design System | Foundation(색·글자), Components, Blending_Components(Sidebar·Table·Summary·Header) |
| 🧩 Asset | Logo, Icon 23종 |
| Draft › 1. 로그인/로그아웃 | 로그인, 실패 토스트, 모바일 메뉴 |
| Draft › 2. 공지사항 | 홈·등록·수정·삭제·보기 |
| Draft › 3. 계정관리 | 홈·검색·등록(권한 옵션 상태 326:34825)·수정·삭제(**여러 개 선택 오류 501:52898**)·사이트 설정(라벨 4종)·**슬롯 추가 499:53101** |
| Draft › 4. 광고관리 | 홈·로직관리·발주데이터 업로드·수정/삭제/연장(수정 모달 로직 1~4)·데이터 추출(Loading)·**순위 보고서 506:53674** |
| Draft › 5. 로그관리 | = 사이드바 "정산관리" 화면, 삭제로그 |
| Draft › 6. 캠페인 [마스터] | 요약·관리(정답 수정, ON/OFF)·정산관리(단가설정) |

---

## 10. 체크리스트

- [ ] HEX 대신 토큰을 썼는가? 보라 외 강조색을 새로 만들지 않았는가?
- [ ] 높이 40(헤더 34, Chip 32)을 지켰는가?
- [ ] Contents 여백 40(모바일 16)인가?
- [ ] Primary가 영역당 1개, 맨 오른쪽인가?
- [ ] 표 12px, 버튼 13px Medium, 모달 제목 18px Medium인가?
- [ ] 기본 · 빈 상태 · 선택 없음 · 입력 오류 · 완료 · 실패 화면을 함께 만들었는가?
- [ ] 375 모바일에서 가로로 넘치지 않는가? (표는 표 안에서만 가로 스크롤)
- [ ] 삭제·토글 같은 위험 동작에 확인 모달이 있는가?
- [ ] 모달 안 긴 내용은 안쪽만 스크롤되고 버튼이 보이는가?
- [ ] 말줄임된 텍스트에 툴팁이 있는가?
- [ ] 키보드로 열고 닫을 수 있는가? (Esc, 포커스 링)

---

## 11. 미확정 항목

- 권한이 없는 버튼은 숨김 처리 (추정)
- 총판 계정 추가 시 "회사명" 직접 입력 (피그마에 없음)
- 순위 하락색으로 `Role/General` 파랑을 빌려 씀 — 전용 토큰 필요 여부
- 연장 일수 범위 1~365, 연장 확인 버튼 문구 "수정"(피그마 기준) — "연장"으로 바꿀지
- 소속 드롭다운의 검색 기능(피그마 Dropdown은 검색 포함, 프로토타입은 기본 선택 상자)
- 로딩 로고 깜빡임 애니메이션 (피그마는 정지 화면)
- 상품 URL·가격비교 URL 실제 주소 형식
