# Assets — 로고 · 아이콘

> [DESIGN.md](../DESIGN.md)의 2장입니다. 값은 [Foundation](foundation/tokens.md) 토큰을 씁니다.

## 2.1 Logo — [`assets/logo.svg`](../assets/logo.svg)

원본 164×25, 워드마크 `#211F2C` + G 꼬리 `#7740FE`. 사이드바·로그인·로딩 164×25, 모바일 헤더 100×15, 모바일 로딩 124×19. 색·비율을 바꾸지 않는다.

## 2.2 Icons — [`assets/icons/`](../assets/icons/)

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

