# Size · Breakpoint

> 컨트롤·아이콘 크기 토큰과 화면 폭 기준.

## 개요

컨트롤 높이는 **40**이 기본입니다. 버튼·인풋·드롭다운 옵션·테이블 행이 모두 40이고, 작은 요소(테이블 헤더 34, Chip 32)만 예외입니다.
크기는 구조 값이라 `width`/`height`에 px를 써도 되지만, 반복해서 쓰는 크기는 토큰을 씁니다.

## 토큰

| CSS 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `--size-control` | 40 | 버튼, 인풋, 드롭다운 옵션 |
| `--table-row-h` | 40 (`--size-control`) | 테이블 행 |
| `--table-head-h` | 34 | 테이블 헤더, Compact Row |
| `--size-chip` | 32 | Chip, Option Cell, 세그먼트 항목 |
| `--size-checkbox` | 16 | 체크박스 |
| `--size-icon` | 16 | 기본 아이콘 |
| `--size-icon-lg` | 24 | 모바일 메뉴, 모달 닫기 |
| `--size-icon-xl` | 28 | 토스트 아이콘 |
| `--layout-sidebar-w` | 240 | 사이드바 폭 |
| `--layout-gutter` | 40 / 모바일 16 | Contents 좌우 여백 |

그 밖의 고정 크기: Toggle 28×16 · Icon Button 22 · 스크롤바 6 (thumb `--scrollbar-thumb`, hover `--scrollbar-thumb-hover`, 트랙 투명).

## Breakpoint

- **Desktop**: 기준 1920 (Contents 1680). 1600에서도 표가 넘치지 않게 긴 텍스트 열은 말줄임 — 링크형 셀 220px, 일반 셀 240px(1800 이상은 둘 다 360px).
- **Mobile**: `max-width: 767px`, 기준 375. 미디어 쿼리 조건에는 CSS 변수를 쓸 수 없으니 `767px`를 그대로 씁니다.

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 한 줄(툴바·필터 행)에 들어가는 컨트롤은 높이를 하나로 맞춘다 |
| **Do** | 아이콘은 `.ic` / `.ic-24` / `.ic-28` 클래스로 크기를 고른다 |
| **Don't** | 컨트롤 높이를 화면마다 다르게 만들지 않는다 |
| **Don't** | 767 외의 브레이크포인트를 새로 만들지 않는다 |
