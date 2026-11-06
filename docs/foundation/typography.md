# Typography

> 글꼴, 글자 크기·행간, 굵기 토큰.

## 개요

- 글꼴은 **Pretendard** 하나입니다 (`--font-family-body`, fallback `-apple-system, "Apple SD Gothic Neo", sans-serif`).
- 모든 스타일에 **letter-spacing -1%**(`--letter-spacing-base`)를 씁니다.
- 스타일마다 크기(`--text-*-size`)와 행간(`--text-*-leading`)이 **짝**을 이루고, 굵기(`--font-weight-*`)는 따로 고릅니다.
- 어드민이라 **글자는 작게** 씁니다. 테이블 12, 버튼 13, 페이지 제목 20.

## 크기 · 행간

| 스타일 | CSS 토큰 | 크기 / 행간 | 클래스 |
|---|---|---|---|
| Heading1 | `--text-heading1-size` · `--text-heading1-leading` | 20 / 30 | `.t-h1` |
| Heading1 (Bold, 촘촘) | `--text-heading1-size` · `--text-heading1-tight-leading` | 20 / 28 | `.t-h1b` |
| Heading2 | `--text-heading2-size` · `--text-heading2-leading` | 18 / 27 | `.t-h2m` |
| Body1 | `--text-body1-size` · `--text-body1-leading` | 16 / 24 | `.t-b1m` |
| Body2 | `--text-body2-size` · `--text-body2-leading` | 14 / 21 | `.t-b2` |
| Body3 | `--text-body3-size` · `--text-body3-leading` | 13 / 20 | `.t-b3` `.t-b3m` |
| Body4 | `--text-body4-size` · `--text-body4-leading` | 12 / 18 | `.t-b4` `.t-b4m` |
| Caption | `--text-caption-size` · `--text-caption-leading` | 11 / 14 | `.t-cap` |

## 굵기

| CSS 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `--font-weight-regular` | 400 | 본문, 표, 설명 |
| `--font-weight-medium` | 500 | 버튼 라벨, 폼 라벨, 모달 제목, 강조 값 |
| `--font-weight-bold` | 700 | 캠페인 요약 숫자 |

## 스타일별 쓰는 곳

| 문서 이름 | Size/Weight/LH | 주 용도 |
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

> **예외**: `.modal-note`의 행간 22는 스케일 밖 값입니다. 피그마 값이라 `token-ok`로 남겨 두었고, 확정되면 `--text-body3-leading`(20)으로 맞출지 정합니다.

## 사용 예

```css
/* 크기와 행간은 같은 스타일의 짝으로 */
.btn { font-size: var(--text-body3-size); line-height: var(--text-body3-leading);
       font-weight: var(--font-weight-medium); }
```

```html
<!-- 마크업에서는 클래스로 -->
<h1 class="t-h1">공지사항</h1>
<p class="t-b3">등록된 공지를 확인하고 관리합니다.</p>
```

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 크기와 행간은 같은 스타일의 토큰을 짝으로 쓴다 (`body3-size` + `body3-leading`) |
| **Do** | 위계는 굵기와 색으로 먼저 나눈다. 본문을 회색으로 작게 줄여 위계를 만들지 않는다 |
| **Do** | 마크업에서는 `.t-*` 클래스를 쓴다 |
| **Don't** | `font-size:13px`, `font-weight:500`처럼 숫자를 직접 쓰지 않는다 |
| **Don't** | 스타일을 섞지 않는다 (`body3-size` + `body4-leading`) |
| **Don't** | Pretendard 외 글꼴을 쓰지 않는다 |
