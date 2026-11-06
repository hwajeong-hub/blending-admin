# BLENDING 어드민 — DESIGN.md

> 누구나(사람이든 AI 에이전트든) 피그마 없이 **같은 규칙으로** BLENDING(블렌딩) 어드민 화면을 만들고, 새 화면을 설계할 수 있도록 정리한 디자인 규칙의 **입구**입니다. 원칙과 체크리스트는 여기에, 세부 규칙은 `docs/`에 있습니다.
>
> - **출처**: Figma `BLENDING 블랜딩` 파일의 **❖ Design System · 🧩 Asset · Draft** 페이지 + 이 저장소의 HTML 프로토타입에서 확정한 내용 (2026-11-02 기준, 토큰 구조 2026-11-06 개편)
> - **단위**: 모든 수치는 px, 폰트는 Pretendard
> - **(추정)** 표시: 피그마에 값이 없어 관례로 정한 항목입니다. 팀에서 확정하면 표시를 지워 주세요.
> - **구현 기준 파일**: [`assets/blending.css`](assets/blending.css) · [`assets/blending.js`](assets/blending.js) — 문서와 코드가 다르면 **문서를 먼저 고치고** 코드를 맞춥니다.

## 문서 지도

**Foundation** — 토큰 규칙. 각 문서는 개요 → 토큰 표 → 사용 예 → Do/Don't 순서입니다.

| 문서 | 내용 | 언제 읽나 |
|---|---|---|
| [Tokens](docs/foundation/tokens.md) | 3층 구조, 이름 규칙, 직접 써도 되는 값, 검사 방법 | **처음 한 번, 그리고 새 값을 만들 때** |
| [Color](docs/foundation/color.md) | Primitive · Background · Text · Border · Icon · Status · Role | 색을 고를 때 |
| [Typography](docs/foundation/typography.md) | 글꼴, 크기·행간 짝, 굵기, 스타일별 쓰는 곳 | 글자 스타일을 고를 때 |
| [Spacing](docs/foundation/spacing.md) | 4px 그리드 스케일과 쓰는 곳 | 패딩·간격을 정할 때 |
| [Shape](docs/foundation/shape.md) | 쓰는 자리 기준 모서리 | 모서리를 정할 때 |
| [Elevation](docs/foundation/elevation.md) | 그림자, 포커스 링, z-index | 떠 있는 표면을 만들 때 |
| [Motion](docs/foundation/motion.md) | 전환 시간, easing, 동작 줄이기 | 애니메이션을 넣을 때 |
| [Size](docs/foundation/size.md) | 컨트롤·아이콘 크기, 브레이크포인트 | 크기와 반응형을 정할 때 |

**화면 만들기**

| 문서 | 내용 |
|---|---|
| [Assets](docs/assets.md) | 로고 · 아이콘 |
| [Components](docs/components.md) | 버튼 · 입력 · 드롭다운 · 선택 · 표 · 페이지네이션 · 요약 · 오버레이 |
| [Layout](docs/layout.md) | 데스크톱 · 사이드바 · 모바일 · 로그인 · 등록/수정 폼 |
| [Screens](docs/screens.md) | 메뉴별 화면과 모달 명세 |
| [Interaction & State](docs/interaction.md) | 동작과 상태 규칙 |
| [Copy](docs/copy.md) | 문구 규칙, 토스트 문구 모음 |
| [Implementation](docs/implementation.md) | 파일 구조 · CSS 클래스 · JS API |
| [Figma Map](docs/figma-map.md) | 피그마 페이지·노드 대응 |

**도구**

- [`docs/tokens.html`](docs/tokens.html) — `blending.css`의 토큰을 읽어 그리는 견본 페이지. 저장소에서 `python3 -m http.server 8765`를 띄우고 `http://127.0.0.1:8765/docs/tokens.html`로 엽니다.
- [`scripts/check-tokens.py`](scripts/check-tokens.py) — 토큰 규칙 검사. `python3 scripts/check-tokens.py`

### 새 화면을 만드는 순서

1. 아래 **원칙**을 읽는다.
2. [Screens](docs/screens.md)와 [Components](docs/components.md)에서 비슷한 화면·컴포넌트를 찾는다.
3. [Layout](docs/layout.md)으로 틀을 잡고, 값은 Foundation 토큰으로만 쓴다.
4. 빈 상태 · 오류 · 완료 같은 상태를 [Interaction & State](docs/interaction.md)와 [Copy](docs/copy.md)에 맞춰 함께 만든다.
5. `python3 scripts/check-tokens.py`를 돌리고 아래 **체크리스트**를 확인한다.

---

## 원칙

1. **값은 토큰으로만 쓴다.** HEX·간격·글자 크기를 직접 쓰지 않는다 ([Tokens](docs/foundation/tokens.md)). 브랜드 색은 보라 `#7740FE` 하나뿐이다.
2. **화면 = Sidebar(240) + Contents.** Contents는 위에서부터 `Page Header → (Summary/Filter) → (Tabs) → Toolbar → Table → Pagination`.
3. **컨트롤 높이는 40.** 버튼·인풋·드롭다운 옵션·테이블 행 모두 40 (테이블 헤더 34, Chip·Option Cell 32).
4. **모서리는 4가 기본.** 카드·테이블 10, 모달·토스트 12, 로그인 카드 24, 사이드바 메뉴·세그먼트 6.
5. **글자는 작게.** 테이블 12(Body4), 버튼 13(Body3/Medium), 페이지 제목 20(Heading1/Regular).
6. **영역당 Primary 버튼은 하나**, 툴바 맨 오른쪽. 나머지는 Line 버튼.
7. **위험한 동작(삭제)은 확인 모달을 거친다.** 결과는 상단 가운데 토스트로 알린다.
8. **입력이 유효하지 않으면 확인 버튼을 Disabled로 둔다.** 형식이 틀린 칸은 빨간 테두리 + 경고 토스트로 알리고, 빨간 인라인 문장은 쓰지 않는다.
9. **빈 상태는 두 줄**: 1줄 상황, 2줄 다음 행동.
10. **모바일(≤767)은 같은 구조를 세로로 쌓는다.** 사이드바는 햄버거, 넓은 표는 가로 스크롤, 모달은 343폭.
11. **새 화면은 기존 컴포넌트를 조합한다.** 새 모양을 만들기 전에 [Components](docs/components.md)와 [Screens](docs/screens.md)에 비슷한 것이 있는지 먼저 찾는다.

---

## 체크리스트

- [ ] `python3 scripts/check-tokens.py`가 위반 없이 끝나는가? (HEX·px 간격·글자 크기·인라인 스타일)
- [ ] 보라 외 강조색을 새로 만들지 않았는가?
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

## 미확정 항목

- 권한이 없는 버튼은 숨김 처리 (추정)
- 총판 계정 추가 시 "회사명" 직접 입력 (피그마에 없음)
- 순위 하락색으로 `Role/General` 파랑을 빌려 씀 — 전용 토큰 필요 여부
- 연장 일수 범위 1~365, 연장 확인 버튼 문구 "수정"(피그마 기준) — "연장"으로 바꿀지
- 소속 드롭다운의 검색 기능(피그마 Dropdown은 검색 포함, 프로토타입은 기본 선택 상자)
- 로딩 로고 깜빡임 애니메이션 (피그마는 정지 화면)
- 상품 URL·가격비교 URL 실제 주소 형식
- 피그마 `Grayscale/800`을 `#6A6F75`로, 그림자 스타일을 `Shadow/Low·Med·High`로 갱신 ([Color](docs/foundation/color.md), [Elevation](docs/foundation/elevation.md))
- `.modal-note` 행간 22 (스케일 밖)

