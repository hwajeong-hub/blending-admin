# Tokens — 토큰 구조와 규칙

> Foundation 문서를 읽기 전에 먼저 보는 문서입니다. 토큰이 어떻게 나뉘고, 어떤 이름을 쓰며, 무엇을 직접 써도 되는지 정합니다.
> 실제 값은 [`assets/blending.css`](../../assets/blending.css)의 `:root`에 있고, [`docs/tokens.html`](../tokens.html)에서 견본으로 볼 수 있습니다.

## 개요

화면 코드는 색이나 숫자를 직접 쓰지 않고 **용도 이름**(토큰)을 씁니다. 그래야 값 하나를 고칠 때 모든 화면이 같이 바뀌고, 사람과 AI 에이전트가 같은 규칙으로 화면을 만들 수 있습니다.

## 세 층

각 층은 바로 아래 층만 참조합니다.

| 층 | 이름 기준 | 예 | 누가 쓰나 |
|---|---|---|---|
| ① Primitive | 생김새 (색 이름·단계) | `--purple-500`, `--gray-900` | Semantic 토큰만. 화면·컴포넌트에서 직접 쓰지 않는다 |
| ② Semantic | 용도 | `--bg-brand`, `--text-secondary`, `--radius-element`, `--spacing-4` | 모든 화면과 컴포넌트 |
| ③ Component | 한 컴포넌트 전용 | `--table-header-bg`, `--tooltip-bg` | 그 컴포넌트만 |

```css
:root {
  --purple-100: #E8DFFF;                      /* ① Primitive */
  --bg-brand-light: var(--purple-100);        /* ② Semantic  */
  --table-header-bg: var(--bg-brand-light);   /* ③ Component */
}
.table th { background: var(--table-header-bg); }
```

## 이름 규칙

- 형식은 `--{분류}-{용도}-{상태}`입니다. 예) `--bg-brand-hover`, `--text-quaternary`, `--border-divider`
- **문서 이름 ↔ CSS 이름**: 피그마·문서의 `Bg/Brand-Hover`는 CSS의 `--bg-brand-hover`입니다. 슬래시는 하이픈으로, 대문자는 소문자로 바꿉니다.

| 분류 | CSS 토큰 | 문서 |
|---|---|---|
| 색 Primitive | `--purple-*` `--gray-*` `--blue-*` `--red-*` `--green-*` `--yellow-*` | [color.md](color.md) |
| 색 Semantic | `--bg-*` `--text-*` `--border-*` `--icon-*` `--status-*` `--role-*` | [color.md](color.md) |
| 글자 | `--font-family-body` · `--letter-spacing-base` · `--font-weight-{regular,medium,bold}` · `--text-{heading1,heading2,body1~4,caption}-{size,leading}` | [typography.md](typography.md) |
| 간격 | `--spacing-{0,0-5,1,1-5,2,3,4,5,6,7,8,10,12,16,20}` — 숫자 × 4 = px | [spacing.md](spacing.md) |
| 모서리 | `--radius-{inner,element,item,panel,container,overlay,page,full}` | [shape.md](shape.md) |
| 그림자·레이어 | `--shadow-{low,med,high}` `--focus-ring` · `--z-*` | [elevation.md](elevation.md) |
| 모션 | `--duration-{instant,fast,base,move,loop}` · `--ease-{standard,move}` | [motion.md](motion.md) |
| 크기·레이아웃 | `--size-{control,chip,checkbox,icon,icon-lg,icon-xl}` · `--layout-sidebar-w` · `--layout-gutter` | [size.md](size.md) |
| 컴포넌트 | `--table-header-bg` `--table-row-hover-bg` `--table-row-h` `--table-head-h` `--tooltip-bg` `--scrollbar-thumb(-hover)` | 각 문서 |

## 직접 써도 되는 값

- `width` `height` `top` `left` 같은 **크기·위치**(구조와 기하)는 px를 씁니다.
- `1px` 테두리와 테두리 겹침용 `-1px`는 그대로 씁니다.
- 그 밖의 **색·글자·간격·모서리·모션·레이어**는 토큰만 씁니다.
- 꼭 필요한 예외(예: 26px 알약의 반지름 13)는 같은 줄에 `/* token-ok: 이유 */`를 붙입니다.

## 새 값이 필요할 때

1. 스케일 안에서 먼저 고릅니다. 없으면 디자인을 다시 봅니다.
2. 그래도 필요하면 해당 Foundation 문서에 값과 쓰는 곳을 먼저 적습니다.
3. `assets/blending.css`의 `:root`에 같은 이름으로 넣고, 공통 파일 버전(`?v=`)을 모든 페이지에서 올립니다.

## 검사

```bash
python3 scripts/check-tokens.py            # 저장소 전체
python3 scripts/check-tokens.py ad.html    # 파일 하나
```

규칙을 어긴 곳을 `파일:줄`로 알려 주고, 위반이 있으면 실패(종료 코드 1)로 끝납니다. 공통 CSS나 화면을 고친 뒤 커밋 전에 돌립니다.

## Do / Don't

| | 규칙 |
|---|---|
| **Do** | 화면과 컴포넌트에서는 ② Semantic 토큰을 쓴다 |
| **Do** | 한 컴포넌트에서만 쓰는 값은 ③ Component 토큰으로 만들고 Semantic을 참조한다 |
| **Do** | 화면마다 다른 여백은 수정 클래스(`.is-compact`, `.box-block`)로 만든다 |
| **Don't** | HEX나 `--purple-500` 같은 Primitive를 화면에서 바로 쓰지 않는다 |
| **Don't** | 인라인 `style=""`을 쓰지 않는다 |
| **Don't** | 이유 없는 `token-ok` 예외를 두지 않는다 |
