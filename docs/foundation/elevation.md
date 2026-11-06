# Elevation (Shadow · Layer)

> 그림자와 쌓임 순서(z-index) 토큰.

## 개요

그림자는 표면을 배경과 구분하고, z-index는 무엇이 무엇 위에 올라오는지를 정합니다. 둘 다 토큰으로만 씁니다.

## Shadow

그림자는 **얼마나 진하게 보이고 싶은지가 아니라 무엇 위에 떠 있는지**로 고릅니다. 한 표면에는 한 단계만 씁니다.

| CSS 토큰 | 문서 이름 | 값 | 언제 | 쓰는 곳 |
|---|---|---|---|---|
| (없음) | — | `none` | 다른 표면 안에 박혀 있을 때 | 모달 안 카드 (테두리로 구분) |
| `--shadow-low` | `Shadow/Low` | `0 0 8px rgba(69,72,76,.08)` | 페이지 위에 놓였지만 배경과 구분이 필요할 때 | 사이드바, 테이블, Summary Bar, 필터 카드, 로그인 카드, 세그먼트 선택 칩 |
| `--shadow-med` | `Shadow/Med` | `0 4px 16px rgba(69,72,76,.12)` | 같은 화면의 다른 콘텐츠 위에 뜰 때 | 드롭다운 메뉴, 달력, 토스트, 툴팁 |
| `--shadow-high` | `Shadow/High` | `2px 4px 20px rgba(0,0,0,.13)` | 화면 전체 위에 뜰 때 (딤과 함께) | 모달 |
| `--focus-ring` | `Shadow/Input-Hover` | `0 0 0 2px` + `--purple-100` | 포커스 | 인풋·Text Area·버튼 키보드 포커스 |

> 2026-11-06 재배치: 이전 `Level 1`(Summary Bar·필터 카드·로그인 카드)은 `low`로 옅어졌고, 이전 `Level 2`를 쓰던 모달은 `high`, 토스트·달력은 `med`로 올라갔습니다. 툴팁에는 `med`를 새로 넣었습니다.

> **모달 안의 카드에는 그림자를 쓰지 않습니다.** 대신 1px `--border-divider` 테두리를 씁니다 (예: 순위 보고서 카드, 로직관리 목록, 단가설정 패널).

## Layer (z-index)

아래에서 위 순서입니다. 컴포넌트 안쪽 쌓임(0·1)은 숫자로 둡니다.

| CSS 토큰 | 값 | 대상 |
|---|---|---|
| `--z-mobile-header` | 15 | 모바일 상단 헤더 |
| `--z-sidebar` | 20 | 사이드바 |
| `--z-backdrop` | 30 | 모바일 사이드바 뒤 배경 |
| `--z-mobile-sidebar` | 40 | 모바일 사이드바 |
| `--z-modal` | 50 | 모달 딤 |
| `--z-toast` | 60 | 토스트 |
| `--z-calendar` | 70 | 달력 |
| `--z-tooltip` | 80 | 툴팁 |
| `--z-loading` | 90 | 로딩 화면 |

## 사용 예

```css
.table-wrap { box-shadow: var(--shadow-low); }
.dp { box-shadow: var(--shadow-med); }
.modal { box-shadow: var(--shadow-high); }
.field:focus-within { box-shadow: var(--focus-ring); }
.toast { z-index: var(--z-toast); }
```

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 겹치는 두 표면 중 위에 있는 쪽이 더 높은 단계를 쓴다 |
| **Do** | 다른 것과 겹치지 않는 표면은 없음이나 `low`만 쓴다. `med`·`high`는 쓰지 않는다 |
| **Do** | 포커스는 `--focus-ring`으로 표시한다 |
| **Do** | 새로 뜨는 표면은 표의 순서 안에서 자리를 정하고, 필요하면 토큰을 추가한다 |
| **Don't** | `box-shadow`를 직접 쓰지 않는다 |
| **Don't** | 모달 안 카드에 그림자를 쓰지 않는다. 테두리로 구분한다 |
| **Don't** | 그림자를 장식용 테두리 대신 쓰지 않는다 |
| **Don't** | `z-index:999`처럼 큰 숫자로 덮지 않는다 |
