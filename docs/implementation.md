# Implementation — 코드로 만들 때

> [DESIGN.md](../DESIGN.md)의 8장입니다. 값은 [Foundation](foundation/tokens.md) 토큰을 씁니다.

## 8.1 파일 구조

```
DESIGN.md                 ← 입구: 원칙 · 목차 · 체크리스트 · 미확정 항목
docs/foundation/*.md      ← 토큰 규칙 (tokens · color · typography · spacing · shape · elevation · motion · size)
docs/*.md                 ← assets · components · layout · screens · interaction · copy · implementation · figma-map
docs/tokens.html          ← blending.css의 토큰을 읽어 그리는 견본 페이지 (로컬 서버로 연다)
assets/blending.css       ← 토큰 + 모든 컴포넌트 스타일
assets/blending.js        ← 사이드바·토스트·모달·표·달력·툴팁·로딩·세그먼트
assets/logo.svg, assets/icons/*.svg
scripts/check-tokens.py   ← 토큰 규칙 검사
login.html · notice.html · notice-form.html · account.html · ad.html
settle.html · campaign-summary.html · campaign-manage.html · campaign-settle.html
```

- login.html도 공통 CSS·JS를 쓴다. 화면 틀(`.login-*`)만 파일 안 `<style>`에 둔다
- 페이지는 `<div class="app" data-menu="ad" data-sub="…">` 하나로 시작하면 사이드바·모바일 헤더가 자동으로 붙는다
- 공통 파일은 `assets/blending.css?v=날짜시간`처럼 버전을 붙여 불러온다. 공통 파일을 고치면 모든 페이지의 버전을 함께 올린다

## 8.2 주요 CSS 클래스

| 클래스 | 컴포넌트 |
|---|---|
| `.btn .btn-primary/-line/-secondary/-danger` · `.icon-btn` · `.link-btn` · `.cell-link` | 버튼 |
| `.box` (`.box-block` 폭 100%) `.box-label .box-helper` (`.is-detached` 필드와 20 띄움) · `.field` (`.is-disabled` `.is-invalid` `.is-placeholder`) · `.req` · `.textarea` · `.file` · `.time-range` | 입력 |
| `.cb` · `.options` (`.options-grid`) · `.chips .chip` (`.chip-lg`) · `.seg` · `.tabs .tab` · `.toggle` | 선택 |
| `.toolbar` · `.table-wrap .table` (`.table-compact`, `.table-scroll`) · `.status-*` · `.role-*` · `.pagination` · `.empty` | 표 |
| `.summary .summary-item` (`.metric`) · `.filter-card` · `.stats-bar` | 요약 |
| `.section` (`.tabs + .section` 위 16, `.is-summary` 위 24) · `.textarea-lg`(높이 300) | 레이아웃·입력 |
| `.dim .modal` (`.modal-wide/-rank/-full/-text`) · `.modal-body.is-compact`(간격 20) · `.cta` · `.bullets` · `.panel` · `.rank-card` | 모달 |

## 8.3 JS API (`window.Blending`)

| 함수 | 용도 |
|---|---|
| `list({ root, columns, data, searchKeys, empty, selectable })` | 표 + 선택 + 검색 + 정렬 + 페이지. 반환값 `.selected`, `.set(data)`, `.clear()` |
| `toast(msg, 'success' \| 'warning')` | 토스트 |
| `confirm({ message, desc, ok, cancel })` | 확인 모달, `Promise<boolean>` |
| `openModal(id)` / `closeModal(id)` | 모달 열기/닫기 (`[data-close]` 클릭, Esc, 딤 클릭으로도 닫힘) |
| `datePicker(input, { mode: 'range'\|'single', today, value, format, onChange })` | 달력 |
| `loading(promise, label)` | 로딩 화면 |
| `data-tip="문구"` 속성 | 툴팁 (어느 요소든) |

