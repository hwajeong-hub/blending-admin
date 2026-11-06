# Layout — 화면 틀

> [DESIGN.md](../DESIGN.md)의 4장입니다. 값은 [Foundation](foundation/tokens.md) 토큰을 씁니다.

## 4.1 Desktop (1920×1200)

```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │ Page Header  (padding 32/40, 하단 Divider)     │
│  240     │   제목 Heading1/Regular · 설명 Body3 (간격 8)   │
│  흰색     ├──────────────────────────────────────────────┤
│  Shadow2 │ [Summary · Filter Card] (padding 24/40)       │
│          │ [Tabs] (왼쪽 40)        ← 하위 메뉴가 있을 때    │
│          ├──────────────────────────────────────────────┤
│          │ Table Block (padding 30/40/40/40, 간격 16)     │
│          │   Toolbar · Table · Pagination                │
└──────────┴──────────────────────────────────────────────┘
  배경 Bg/Page
```

Contents 좌우 40 고정, 블록은 폭 100%. 표 아래 남는 공간은 비운다.

## 4.2 Sidebar

240×100vh, 흰색, `Shadow/Low`, padding `40 16 0 16`. 위: 로고 → 80 → 메뉴(간격 4) / 아래: 프로필(아바타 40 + 역할·아이디, 하단 Divider) → 로그아웃.

| Level | 크기 | 기본 | Active | Hover |
|---|---|---|---|---|
| 1 | 208×38, padding `0 8`, r6 | `Heading2/Regular` `Text/Secondary` | `Text/Brand` + `chevron-right` | `Heading2/Medium` `Text/Brand` |
| 2 | 208×34, padding `0 8 0 24` | `Body1/Regular` `Text/Secondary` | `Text/Brand` | bg `Bg/Brand-Light` |

메뉴: **공지사항 · 계정관리 · 광고관리 · 정산관리 · 캠페인**(하위: 캠페인 요약 · 캠페인 관리 · 정산관리 — 캠페인 안에서만 펼침)

## 4.3 Mobile (375)

- Mobile Header 56: `[menu 24][로고 100×15][빈칸 40]`, 햄버거 → 사이드바가 왼쪽에서 열리고 뒤에 딤
- Page Header padding `24 16`, 본문 여백 16
- Summary 2열, Toolbar는 검색 아래로 버튼 줄바꿈(간격 8), 표는 가로 스크롤, 페이지 번호 5개
- 모달 343, Box 100%, 달력은 아래 시트

## 4.4 로그인

배경 `Bg/Page`, 카드 360(padding `48 32`, r24, `Shadow/Low`) 정가운데. 로고 → 40 → 아이디 → 비밀번호 → 16 → "아이디 기억하기" → 로그인 Primary(꽉 채움). 모바일은 카드 없이 전체 화면.

## 4.5 등록/수정 폼 페이지

Form padding `40 20`, 필드 간격 24. 짧은 입력 Box 360, 긴 입력 100%. 하단 `[Line 취소][Primary 추가/저장]`(왼쪽 정렬, 간격 6). 필수값 전까지 Primary Disabled.

