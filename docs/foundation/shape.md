# Shape (Radius)

> 모서리 둥글기 토큰.

## 개요

모서리는 크기가 아니라 **쓰는 자리**로 고릅니다. 기본은 컨트롤의 4(`--radius-element`)이고, 안에서 밖으로 갈수록(조각 → 컨트롤 → 묶음 → 떠 있는 표면 → 페이지) 커집니다.
이전 이름(XS~3XL)은 피그마와 대응할 때만 씁니다.

## 토큰

| CSS 토큰 | 값 | 이전 이름 | 쓰는 자리 |
|---|---|---|---|
| `--radius-inner` | 2 | XS | 안쪽 작은 조각: 프로그레스, 파일선택 버튼 |
| **`--radius-element`** | **4** | SM | 컨트롤: 버튼, 인풋, 체크박스, Chip, 페이지 번호, 툴팁, 세그먼트 항목, 달력 화살표 |
| `--radius-item` | 6 | MD | 목록 항목: Nav Item, 아바타, 세그먼트 바탕 |
| `--radius-panel` | 8 | LG | 큰 입력·패널: Text Area, 토글, 패널 |
| `--radius-container` | 10 | XL | 페이지 위 묶음: Summary, 테이블, 순위 카드 |
| `--radius-overlay` | 12 | 2XL | 떠 있는 표면: 모달, 토스트 |
| `--radius-page` | 24 | 3XL | 페이지 단위 카드: 로그인 카드 |
| `--radius-full` | 999 | Full | 알약 모양 |

**정해진 예외** (`token-ok`): 달력 날짜 알약 13(26 높이의 절반), 스크롤바 3(6 폭의 절반), 오늘 표시 밑줄 1, 원형은 `50%`.

## 사용 예

```css
.btn   { border-radius: var(--radius-element); }
.table-wrap { border-radius: var(--radius-container); }
.modal { border-radius: var(--radius-overlay); }
```

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 컨트롤(버튼·인풋·선택)은 `--radius-element` |
| **Do** | 페이지 위에 놓이는 묶음(카드·표·요약)은 `--radius-container`, 위에 뜨는 표면(모달·토스트)은 `--radius-overlay` |
| **Don't** | 작은 요소에 `--radius-page`를 쓰지 않는다. 페이지 단위 카드 전용이다 |
| **Don't** | `border-radius:6px`처럼 숫자를 직접 쓰지 않는다 |
