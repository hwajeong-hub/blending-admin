# Color

> 배경·글자·테두리·아이콘·상태에 쓰는 색 토큰. 구조와 이름 규칙은 [tokens.md](tokens.md)를 먼저 봅니다.

## 개요

색은 **용도**로 고릅니다. 화면에서는 `--bg-*` `--text-*` `--border-*` `--icon-*` `--status-*` `--role-*`만 쓰고, 원래 색(Primitive)은 이 Semantic 토큰들이 참조합니다.
브랜드 색은 보라 `#7740FE`(`--purple-500`) **하나뿐**입니다. 다른 강조색을 새로 만들지 않습니다.

## Primitive

| 그룹 | 문서 이름 | CSS 토큰 | HEX |
|---|---|---|---|
| Purple | `Purple/50` | `--purple-50` | `#F5F2FF` |
| | `Purple/100` | `--purple-100` | `#E8DFFF` |
| | `Purple/300` | `--purple-300` | `#9065FC` |
| | `Purple/500` | `--purple-500` | `#7740FE` ← **브랜드** |
| Grayscale | `Grayscale/100` | `--gray-100` | `#FFFFFF` |
| | `Grayscale/200` | `--gray-200` | `#FBFBFB` |
| | `Grayscale/300` | `--gray-300` | `#FAFAFA` |
| | `Grayscale/400` | `--gray-400` | `#F1F2F5` |
| | `Grayscale/500` | `--gray-500` | `#E3E6EB` |
| | `Grayscale/600` | `--gray-600` | `#C8CACE` |
| | `Grayscale/700` | `--gray-700` | `#9398A0` |
| | `Grayscale/800` | `--gray-800` | `#6A6F75` ← 2026-11-06 `#767B82`에서 변경 (피그마 반영 완료) |
| | `Grayscale/850` | `--gray-850` | `#666666` |
| | `Grayscale/900` | `--gray-900` | `#45484C` |
| Blue | `Blue/100` | `--blue-100` | `#FAFCFE` |
| | `Blue/500` | `--blue-500` | `#1B4ECE` |
| Red | `Red/100` | `--red-100` | `#FFECEC` |
| | `Red/300` | `--red-300` | `#FFE2E2` |
| | `Red/500` | `--red-500` | `#FF6868` |
| Green | `Green/300` | `--green-300` | `#22A55B` |
| Yellow | `Yellow/300` | `--yellow-300` | `#F59E0B` |

## Semantic

### Background

| CSS 토큰 | 문서 이름 | 참조 | 용도 |
|---|---|---|---|
| `--bg-page` | `Bg/Page` | `--gray-200` | 페이지 배경, Page Header |
| `--bg-surface` | `Bg/Surface` | `--gray-100` | 카드, 사이드바, 인풋, 테이블 셀, 모달 |
| `--bg-brand` | `Bg/Brand` | `--purple-500` | Primary 버튼, 체크박스 ON, 활성 페이지 번호, 토글 ON, 달력 선택 |
| `--bg-brand-hover` | `Bg/Brand-Hover` | `--purple-300` | Primary hover |
| `--bg-brand-light` | `Bg/Brand-Light` | `--purple-100` | 선택된 Option Cell, Lv2 메뉴 hover |
| `--bg-brand-light-hover` | `Bg/Brand-Light-Hover` | `--purple-50` | 선택된 Chip, 달력 날짜 hover |
| `--bg-disabled` | `Bg/Disabled` | `--gray-400` | 비활성 버튼·인풋·토글, 세그먼트 바탕, 패널 헤더 |
| `--bg-danger` / `-hover` | — | `--red-100` / `--red-300` | Danger 버튼 |
| `--bg-dim` | `Bg/Dim` | gray-900 @ 40% `rgba(69,72,76,.4)` | 모달 뒤 딤 |
| `--bg-veil` | Loading Veil | `rgba(226,226,228,.72)` + blur 12 | 데이터 추출 로딩 (Figma 342:43868) |

### Text

| CSS 토큰 | 문서 이름 | 참조 | 용도 |
|---|---|---|---|
| `--text-primary` | `Text/Primary` | `--gray-900` `#45484C` | 본문, 제목, 테이블 값, 요약 항목 제목 |
| `--text-secondary` | `Text/Secondary` | `--gray-850` `#666666` | 설명, 폼 라벨, 사이드바 메뉴, 안내 문구 |
| `--text-tertiary` | `Text/Tertiary` | `--gray-800` `#6A6F75` | 토스트 메시지, 페이지 번호, Line hover, 헬퍼, 빈 상태 2줄, 통계 라벨, 페이지 이동 문구, 세그먼트 비선택, 달력 요일·월, 프로필 권한, 상태 '대기', 체크박스 라벨 |
| `--text-quaternary` | `Text/Quaternary` | `--gray-700` `#9398A0` | **읽지 않아도 되는 글자만**: placeholder, 선택 전 문구, 비활성 인풋 값, 비활성 선택지, 시간 구분 `~` |
| `--text-disabled` | `Text/Disabled` | `--gray-600` `#C8CACE` | 비활성 |
| `--text-inverse` | `Text/Inverse` | `--gray-100` | 보라 배경 위 |
| `--text-brand` / `-hover` | `Text/Brand` / `-Hover` | `--purple-500` / `--purple-300` | 활성 메뉴·탭·필터, Secondary 버튼 |

> **대비**: 흰 바탕 기준 Primary 9.19 · Secondary 5.74 · **Tertiary 5.07** · Quaternary 2.90 · Disabled 1.64 (:1). 작은 글자 기준(WCAG AA 4.5:1)을 넘는 것은 Tertiary까지입니다. 2026-11-06에 Tertiary를 `#767B82`(4.26)에서 `#6A6F75`로 진하게 바꾸고, 읽어야 하는 Quaternary 글자를 Tertiary로 옮겼습니다. Tertiary는 회색 바탕 `#F1F2F5` 위에서도 4.53입니다.

### Border · Icon

| CSS 토큰 | 문서 이름 | 참조 | 용도 |
|---|---|---|---|
| `--border-default` | `Border/Default` | `--gray-600` | 인풋, Line 버튼, 체크박스 |
| `--border-strong` | `Border/Strong` | `--gray-700` | Icon Button |
| `--border-divider` | `Border/Divider` | `--gray-400` | 행, 카드, 구분선 |
| `--border-brand` / `-hover` | `Border/Brand` / `-Hover` | `--purple-500` / `--purple-300` | 선택, Secondary 버튼 |
| `--icon-default` | `Icon/Default` | `--gray-900` | 기본 아이콘 |
| `--icon-secondary` | `Icon/Secondary` | `--gray-800` | 보조 아이콘 |
| `--icon-tertiary` | `Icon/Tertiary` | `--gray-700` | 흐린 아이콘 |
| `--icon-disabled` | `Icon/Disabled` | `--gray-600` | 비활성 |
| `--icon-brand` | `Icon/Brand` | `--purple-500` | 활성 |
| `--icon-inverse` | — | `--gray-100` | 보라 배경 위 (체크박스 체크) |

### Status · Role

| CSS 토큰 | 문서 이름 | 참조 | 의미 |
|---|---|---|---|
| `--status-success` | `Status/Success` | `--green-300` | 정상, 성공 토스트 아이콘 |
| `--status-error` | `Status/Error` | `--red-500` | 오류, 필수 `*`, 마감 임박 날짜, Danger 텍스트, 잘못된 입력 테두리, **순위 상승 ↑** |
| `--status-warning` | `Status/Warning` | `--yellow-300` | 경고 토스트 아이콘 |
| `--role-general` | `Role/General` | `--blue-500` | 권한: 일반, **순위 하락 ↓** |
| `--role-agency` | `Role/Agency` | `--green-300` | 권한: 대행사 |
| `--role-distributor` | `Role/Distributor` | `--yellow-300` | 권한: 총판 |

> 순위 등락은 국내 관례(상승 빨강, 하락 파랑)를 따릅니다. 정상/오류 상태색과는 의미가 다르니 순위 화면에서만 씁니다.

## Component

| CSS 토큰 | 참조 | 쓰는 곳 |
|---|---|---|
| `--table-header-bg` | `--bg-brand-light` | 테이블 헤더 |
| `--table-row-hover-bg` | `--blue-100` | 테이블 행 hover |
| `--tooltip-bg` | `--gray-850` | 툴팁 배경 |
| `--scrollbar-thumb` / `-hover` | `--gray-400` / `--gray-500` | 스크롤바 막대 (트랙은 투명) |

## 사용 예

```css
.btn-primary { background: var(--bg-brand); color: var(--text-inverse); }
.btn-primary:hover { background: var(--bg-brand-hover); }
.box-label { color: var(--text-secondary); }
.field.is-invalid { border-color: var(--status-error); }
```

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 용도에 맞는 Semantic 토큰을 고른다. 같은 HEX라도 용도가 다르면 다른 토큰이다 (`--text-brand`와 `--border-brand`) |
| **Do** | 상태색은 그 의미로만 쓴다. 성공은 `--status-success`, 오류는 `--status-error` |
| **Do** | 읽어야 하는 글자는 Primary · Secondary · Tertiary 중에서 고른다 |
| **Do** | Quaternary는 placeholder · 비활성 · 구분 기호에만, Disabled는 비활성 컨트롤에만 쓴다 |
| **Don't** | HEX나 `--purple-500` 같은 Primitive를 화면에서 바로 쓰지 않는다 |
| **Don't** | 헬퍼·빈 상태·라벨처럼 읽어야 하는 글자에 Quaternary를 쓰지 않는다 |
| **Don't** | 보라 외 강조색을 새로 만들지 않는다 |
| **Don't** | 순위 등락 색(빨강↑·파랑↓)을 순위 화면 밖에서 쓰지 않는다 |
