# Components — 컴포넌트

> [DESIGN.md](../DESIGN.md)의 3장입니다. 값은 [Foundation](foundation/tokens.md) 토큰을 씁니다.

> 표기: `H` 가로, `V` 세로, padding `상/우/하/좌`.

## 3.1 Button

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

## 3.2 Input

**Text Input** — 40 높이, padding `0 12`, radius 4, 1px `Border/Default`, 간격 4. 값 `Body4/Regular`. 오른쪽에 아이콘 16 → 필수 `*`(16/500 `Status/Error`, 세로 가운데로 0.16em 내림) 순서.

| State | 표현 |
|---|---|
| Default | placeholder `Text/Quaternary` |
| Hover / Focus | + 포커스 링 `Shadow/Input-Hover` |
| Filled | 값 `Text/Primary` |
| Disabled / 읽기 전용 | bg `Bg/Disabled`, 값 `Text/Quaternary` |
| **Invalid** | 테두리 `Status/Error` (형식이 틀린 칸만, 다시 입력하면 해제) |

- **Box** = 라벨(`Body4/Medium` `Text/Secondary`) + 간격 6 + 인풋 + (헬퍼 `Caption` `Text/Tertiary`). PC 360, 모달 안 100%, 모바일 303
- **Search** 280×40, 오른쪽 `search`. placeholder에 검색 대상을 쓴다("번호, 아이디, 키워드, 상품명, MID")
- **Select**(드롭다운 필드): 인풋과 같은 모양 + 오른쪽 `chevron-down`. 선택 전 문구 "소속 그룹을 선택해주세요" 등은 `Text/Quaternary`
- **Date / Range** 필드: 오른쪽 `calendar`, 누르면 [달력](#38-overlay). 값 형식은 `YYYY-MM-DD` / `YYYY-MM-DD ~ YYYY-MM-DD`, 작업일 입력은 `2026. 11. 03.`. 지울 수 있는 필드는 값이 있을 때 `close`(지우기) 표시
- **Time Range**: `[00:00] ~ [21:00]` 두 칸(같은 폭) + 가운데 `~`(`Text/Quaternary`), 간격 16. 숫자만 쳐도 `HH:MM`으로 맞춘다(2130 → 21:30)
- **Password**: 오른쪽 `eye-off`/`eye` 토글 → `*`
- **Text Area** 최소 87, padding 12, radius 8. 공지 본문은 높이 300
- **File Input** 40 높이, 왼쪽 "파일 선택"(bg `#F1F2F5`, radius 2, `Caption`) + 파일명 `Body3`(없으면 `Text/Disabled` "선택된 파일 없음")

## 3.3 Dropdown

Menu 폭 360, 1px `Border/Default`, radius `0 0 4 4`, `Shadow/Med`. 상단 검색 줄 38 + 옵션 40(`Body2/Regular`, hover `#F1F2F5`). 페이지 크기 "10개씩 보기" 120×40. (프로토타입은 브라우저 기본 선택 상자에 같은 모양을 입혔다.)

## 3.4 Selection

- **Checkbox** 16, radius 4. ON `Bg/Brand` + 흰 체크. Checkbox Field = 체크박스 + 8 + `Body4/Regular` `Text/Tertiary`. 폼에서는 라벨 위·체크박스 아래 세로형도 쓴다
- **Option Cell / Option Wrap**(하나만 고르는 칸 묶음): 셀 32, `Body3/Regular`, 셀끼리 붙임(바깥 모서리만 4). Default 흰색+`Border/Default`+`Text/Secondary` · Selected `Bg/Brand-Light`+`Border/Brand`+`Text/Brand` · Disabled `Bg/Disabled`
  - **2×2 그리드형**: 항목이 4개이고 이름이 길면 두 줄로(예: 광고 수정 > 로직 1~4)
- **Chip**(필터) 32, padding `0 12`, `Body3/Medium`. Default 흰색+테두리 · Hover `Text/Tertiary` · Selected `#F5F2FF`+`#9065FC` 테두리+`Text/Brand`
  - **Large Chip**(기간 프리셋, 정산관리): 높이 40, Selected는 `Bg/Brand` 꽉 채움 + 흰 글자
  - 모바일에서는 줄바꿈 없이 가로 스크롤
- **Segmented Control**(보기 전환): 바탕 `#F1F2F5`, padding 4, radius 6. 항목 32, `Body3/Medium`, 비선택 `Text/Tertiary`. 선택 칩(흰색+`Shadow/Low`)이 선택 항목으로 **220ms 미끄러진다**. 모바일·모달 안에서는 폭을 균등 분배
  - 쓰는 곳: 캠페인 정산 "오늘/이번달", 순위 보고서 "가격비교/플러스스토어"
- **Tabs**(하위 메뉴 이동): 41 높이, 하단 1px `Border/Divider`, 탭 간격 20, 왼쪽 40. Active `Text/Brand` + 하단 2px
- **Toggle** 28×16. ON `Bg/Brand`, OFF `Bg/Disabled`. 켜고 끄기 전에 확인 모달

## 3.5 Table

구조: `Toolbar → 16 → Table → 16 → Pagination`

- **Toolbar** 40: 왼쪽 `"N개 선택"`(Body2) + Search(간격 16) / 오른쪽 Line 버튼들 … **Primary 1개**(간격 6). 선택이 없는 표(로그·캠페인)는 "N개 선택"을 빼고 필터를 둔다
- **Table 컨테이너**: radius 10, `Shadow/Low`, 바깥 테두리 없음, 넘치면 가로 스크롤
- **Header** 34, `Bg/Table-Header`, `Body4/Regular`, 가운데. 정렬 가능한 열은 `sort-*`(없음→오름→내림→없음 순환). 첫 열 체크박스 40
- **Body** 40, 하단 1px `Border/Divider`, hover `#FAFCFE`. Compact(모달 안 보조 표) 34
- **Cell 종류**: Text(긴 글은 말줄임 + [툴팁](#38-overlay)) · Checkbox · Status Badge · Role 색 · Toggle · Action(Icon Button `edit`/`plus`/`file-delete`, 못 쓰면 Disabled) · Link(상품명 → 새 탭) · Rank(순위 → 순위 보고서, 툴팁 "순위보기")
- 마감 임박 날짜는 `Status/Error`. 가장 긴 열(상품명·메모·제목)이 남는 폭을 채운다. 기본 10행
- **Status Badge**: 점 6 + 4 + `Body4`. 정상 `Status/Success` · 오류 `Status/Error` · 대기 점 `Icon/Tertiary` + 글자 `Text/Tertiary`
- **Empty**: 헤더 유지, 본문 가운데 두 줄(1줄 `Body2` `Text/Primary`, 2줄 `Body3` `Text/Tertiary`), padding 64
- **Plain Table**(모달 안 정보 표, 예: 단가설정 "전체 단가"): 배경 없음, 헤더 하단 1px `Border/Default`, 행 40

## 3.6 Pagination

한 줄 40을 3등분: 빈칸 · 가운데 번호 · 오른쪽 Controls.
- `« ‹` + 번호(간격 4) + `› »`(간격 8). Page Item 28×35, `Body1/Regular` `Text/Tertiary`, Active `Bg/Brand` + `Body1/Medium` 흰색
- 번호는 데스크톱 10개, **모바일 5개**씩 + `…` + 마지막 번호
- Controls: "페이지로 이동"(`Body2` `Text/Tertiary`) + 80×40 숫자 인풋 + 120×40 "10개씩 보기"(10·20·50)
- 모바일은 번호 줄 아래에 Controls 줄

## 3.7 Summary

- **Slot Summary Item**(공통 요약 칸): V 간격 12, 좌우 16. 제목 `Body3/Regular` `Text/Primary` (+ 설명 `Caption` `Icon/Tertiary`, 간격 8) / 값 `Body1/Medium`. 칸 사이 1px `Border/Divider` 세로선
- **Slot Summary Bar**(광고관리): 흰 카드, padding 24, radius 10, `Shadow/Low`. 전체·정상·오류·대기·마감예정·종료. **각 칸이 표 필터 버튼** — hover 시 제목·값 `Text/Brand-Hover`, 클릭 시 `Text/Brand`로 활성화되고 아래 표가 그 조건으로 바뀜(기본 "전체"). 모바일 2열×3행
- **Filter Card**(정산관리): Summary Bar 모양 안에 `[기간 필드 200][Large Chip 프리셋…]` 줄 + 아래 합계 칸(조회기간·수량 합계·발주일수 합계, 칸 폭 240)
- **Stats Bar**(캠페인 요약): 카드 없이 한 줄. 값 `Heading1/Bold` + 라벨 `Body4` `Text/Tertiary`(간격 2), 칸 간격 32, 오른쪽 기간 필드

## 3.8 Overlay

**Modal** — radius 12, `Shadow/High`, padding `32 20`, 요소 간격 20, 딤 `Bg/Dim`. 제목 `Heading2/Medium`(두 줄일 땐 의미 단위로 줄바꿈), 오른쪽 위 `close` 24. Esc·딤 클릭으로 닫힘.

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

**Text Modal**(확인) — 400, padding `32 20 20 20`, 간격 24, 가운데 정렬. 메시지 `Body1/Medium` + 설명 `Body2` `Text/Secondary`(간격 4) → `[닫기/취소][확인 동작]`

**Toast** — 312×60(내용이 길면 줄바꿈), padding `16 20`, 간격 16, radius 12. 아이콘 28(성공 `check` `Status/Success`, 경고 `alert-circle` `Status/Warning`) + `Body2` `Text/Tertiary`. **상단 가운데 20**, 2.5초 후 사라짐.

**Tooltip** — padding `2 8`(높이 22), 글자 폭에 맞춤, bg `#666666`, radius 4, `Body4` 흰색. **대상 글자 바로 아래 4px 가운데**(화면 아래쪽이면 위). 키보드 포커스에도 뜬다. 말줄임된 값 → 전체 텍스트, 순위 → "순위보기".

**Date Picker** — 664, 1px `Border/Default`, radius 4, `Shadow/Med`. 필드 아래 4px(공간 없으면 위).
- 상단(bg `#F1F2F5`, padding 8, 간격 8): 시작/종료 표시 36, 고르는 쪽 `Border/Brand`, `Oct 7, 2026` 형식
- 이동: 좌우 24 버튼 + 가운데 월·연도 선택. 두 달 나란히(간격 24). Day 44×36, `Body3`. 오늘은 숫자 아래 18×2 보라 바
- 선택 범위는 **한 줄짜리 보라 띠**(`Bg/Brand` + 흰 숫자). 시작·일요일·1일은 왼쪽, 끝·토요일·말일은 오른쪽을 13 둥글게
- 첫 클릭 시작일 → 두 번째 클릭 종료일(더 이르면 시작일 재선택). 고르는 동안 hover 위치까지 미리보기. 종료일을 고르면 닫힘
- 단일 날짜: 334폭, 한 달, 상단 표시 없음. 모바일: 화면 아래 시트, 한 달
- 직접 고르면 연결된 프리셋(Chip·세그먼트) 선택은 해제

**Loading**(데이터 추출) — 화면 전체 blur 12 + `rgba(226,226,228,.72)` 베일, 가운데 로고(164×25, 모바일 124×19). 끝나면 닫고 완료 토스트. (진행률 모달은 쓰지 않는다)

