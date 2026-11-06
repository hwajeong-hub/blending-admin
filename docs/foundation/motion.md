# Motion

> 전환 시간과 easing 토큰.

## 개요

움직임은 **무엇이 바뀌었는지 알려 줄 때만** 씁니다. 색·테두리처럼 자주 바뀌는 것은 짧게, 위치가 바뀌는 것은 조금 길게 둡니다.

## 토큰

| CSS 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `--duration-instant` | 120ms | 툴팁 페이드 |
| `--duration-fast` | 150ms | 버튼·Chip·인풋의 색, 테두리, 포커스 링 |
| `--duration-base` | 200ms | 토스트, 모바일 사이드바 슬라이드, 세그먼트 글자색 페이드 |
| `--duration-move` | 220ms | 세그먼트 선택 칩 이동 |
| `--duration-loop` | 1.2s | 로딩 로고 깜빡임 (opacity 1 ↔ .45) (추정) |
| `--ease-standard` | `ease` | 기본 |
| `--ease-move` | `cubic-bezier(.2,.8,.2,1)` | 위치 이동 (세그먼트 칩) |

## 대상별 정리

| 대상 | 값 |
|---|---|
| 버튼·Chip·인풋 색/테두리/포커스 링 | `--duration-fast` |
| 세그먼트 선택 칩 이동 | **`--duration-move` `--ease-move`**, 글자색 `--duration-base` 페이드 |
| 토스트 | 위로 12px에서 내려오며 `--duration-base` 페이드, **2.5초 뒤 사라짐** (JS) |
| 툴팁 | `--duration-instant` 페이드 |
| 모바일 사이드바 | 왼쪽에서 `--duration-base` 슬라이드 |
| 로딩 로고 | `--duration-loop` 깜빡임 |

## 사용 예

```css
.btn { transition: background var(--duration-fast), color var(--duration-fast); }
.seg-thumb { transition: transform var(--duration-move) var(--ease-move); }
@media (prefers-reduced-motion: reduce) { .seg-thumb { transition: none; } }
```

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | `prefers-reduced-motion: reduce`면 이동·깜빡임 애니메이션을 끈다 |
| **Do** | 처음 그려질 때(모달이 열릴 때 등)는 애니메이션 없이 제자리에 둔다 |
| **Do** | 표 행 hover처럼 자주 일어나는 동작은 `--duration-fast` 이하로 둔다 |
| **Don't** | `.2s`, `150ms`처럼 시간을 직접 쓰지 않는다 |
| **Don't** | 애니메이션이 끝날 때까지 다음 동작을 막지 않는다 |
