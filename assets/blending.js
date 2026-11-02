/* BLENDING Admin — 공통 레이아웃·컴포넌트 동작 */
(function () {
  const MENU = [
    { key: 'notice',  label: '공지사항', href: 'notice.html' },
    { key: 'account', label: '계정관리', href: 'account.html' },
    { key: 'ad',      label: '광고관리', href: 'ad.html' },
    { key: 'settle',  label: '정산관리', href: 'settle.html' },
    { key: 'campaign',label: '캠페인',   href: 'campaign-summary.html', children: [
      { key: 'campaign-summary', label: '캠페인 요약', href: 'campaign-summary.html' },
      { key: 'campaign-manage',  label: '캠페인 관리', href: 'campaign-manage.html' },
      { key: 'campaign-settle',  label: '정산관리',    href: 'campaign-settle.html' },
    ] },
  ];
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ── Shell: Sidebar + Mobile Header ── */
  function mountShell() {
    const app = document.querySelector('.app');
    if (!app) return;
    const active = app.dataset.menu, sub = app.dataset.sub;
    const nav = MENU.map((m) =>
      `<a class="nav-item${m.key === active ? ' is-active' : ''}" href="${m.href}"${m.href === '#' ? ' aria-disabled="true"' : ''}>
         <span>${m.label}</span><i class="ic ic-chevron-right"></i></a>` +
      (m.children && m.key === active
        ? m.children.map((c) => `<a class="nav-sub${c.key === sub ? ' is-active' : ''}" href="${c.href}">${c.label}</a>`).join('')
        : '')).join('');
    app.insertAdjacentHTML('afterbegin', `
      <header class="mheader">
        <button type="button" data-nav-toggle aria-label="메뉴 열기"><i class="ic ic-24 ic-menu"></i></button>
        <img src="assets/logo.svg" alt="BLENDING"><span class="spacer"></span>
      </header>
      <aside class="sidebar">
        <div class="sidebar-top">
          <img class="sidebar-logo" src="assets/logo.svg" alt="BLENDING">
          <nav class="nav">${nav}</nav>
        </div>
        <div>
          <div class="profile">
            <div class="avatar">B</div>
            <div><div class="profile-role">관리자</div><div class="profile-id">mastersung</div></div>
          </div>
          <button type="button" class="logout" data-logout>로그아웃</button>
        </div>
      </aside>
      <div class="nav-backdrop" data-nav-toggle></div>`);
    app.querySelectorAll('[data-nav-toggle]').forEach((el) => el.addEventListener('click', () => app.classList.toggle('nav-open')));
    app.querySelectorAll('.nav-item[aria-disabled]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); toast('준비 중인 메뉴입니다.', 'warning'); }));
    app.querySelector('[data-logout]').addEventListener('click', () => { location.href = 'login.html'; });
  }

  /* ── Toast ── */
  let toastEl, toastTimer;
  function toast(msg, type = 'success') {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.innerHTML = '<i class="ic ic-28"></i><span></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.className = `toast ${type} show`;
    toastEl.querySelector('.ic').className = `ic ic-28 ${type === 'success' ? 'ic-check' : 'ic-alert'}`;
    toastEl.querySelector('span').textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
  }

  /* ── Modal ── */
  function openModal(id) { const d = document.getElementById(id); d.classList.add('is-open'); const f = d.querySelector('input:not([disabled]),textarea,button.btn'); f && f.focus(); }
  function closeModal(id) { document.getElementById(id).classList.remove('is-open'); }
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-close]');
    if (c) c.closest('.dim').classList.remove('is-open');
    else if (e.target.classList.contains('dim')) e.target.classList.remove('is-open');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.dim.is-open').forEach((d) => d.classList.remove('is-open')); });

  /* 텍스트 확인 모달 (삭제 등) */
  function confirm({ message, desc = '', ok = '확인', cancel = '닫기' }) {
    return new Promise((resolve) => {
      const dim = document.createElement('div');
      dim.className = 'dim is-open';
      dim.innerHTML = `<div class="modal modal-text" role="dialog" aria-modal="true">
          <button class="modal-close" data-x aria-label="닫기"><i class="ic ic-close"></i></button>
          <div><p class="msg">${esc(message)}</p>${desc ? `<p class="desc">${esc(desc)}</p>` : ''}</div>
          <div class="cta"><button class="btn btn-line" data-x>${esc(cancel)}</button><button class="btn btn-primary" data-ok>${esc(ok)}</button></div>
        </div>`;
      const done = (v) => { dim.remove(); resolve(v); };
      dim.addEventListener('click', (e) => { if (e.target === dim || e.target.closest('[data-x]')) done(false); if (e.target.closest('[data-ok]')) done(true); });
      document.body.appendChild(dim);
      dim.querySelector('[data-ok]').focus();
    });
  }

  /* ── List: 테이블 + 선택 + 검색 + 정렬 + 페이지네이션 ── */
  function list(opts) {
    const { root, columns, rowKey = 'id', empty, emptySearch, selectable = true } = opts;
    const el = typeof root === 'string' ? document.querySelector(root) : root;
    const tableEl = el.querySelector('table');
    const countEl = el.querySelector('[data-count]');
    const searchEl = el.querySelector('[data-search]');
    const pagEl = el.querySelector('[data-pagination]');
    const state = { data: opts.data.slice(), query: '', sort: null, page: 1, size: opts.pageSize || 10, selected: new Set() };

    const sortIcon = (key) => {
      const dir = state.sort && state.sort.key === key ? state.sort.dir : 'none';
      return `<img src="assets/icons/sort-${dir}.svg" alt="">`;
    };
    function filtered() {
      let rows = state.data;
      if (state.query) {
        const q = state.query.toLowerCase();
        rows = rows.filter((r) => (opts.searchKeys || columns.map((c) => c.key)).some((k) => String(r[k] ?? '').toLowerCase().includes(q)));
      }
      if (state.sort) {
        const { key, dir } = state.sort;
        rows = rows.slice().sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * (dir === 'asc' ? 1 : -1));
      }
      return rows;
    }
    function render() {
      const rows = filtered();
      const pages = Math.max(1, Math.ceil(rows.length / state.size));
      state.page = Math.min(state.page, pages);
      const view = rows.slice((state.page - 1) * state.size, state.page * state.size);
      const allChecked = view.length > 0 && view.every((r) => state.selected.has(r[rowKey]));

      const checkHead = selectable ? `<th class="col-check"><label class="cb"><input type="checkbox" data-all ${allChecked ? 'checked' : ''} aria-label="전체 선택"><span class="cb-box"></span></label></th>` : '';
      const checkCell = (r) => selectable ? `<td class="col-check"><label class="cb"><input type="checkbox" data-row ${state.selected.has(r[rowKey]) ? 'checked' : ''} aria-label="선택"><span class="cb-box"></span></label></td>` : '';
      const head = `<tr>${checkHead}${
        columns.map((c) => `<th${c.fill ? ' class="col-fill"' : ''}>${c.sort ? `<button class="th-sort" data-sort="${c.key}">${c.label}${sortIcon(c.key)}</button>` : c.label}</th>`).join('')}</tr>`;
      let body;
      if (!view.length) {
        const msg = state.query ? (emptySearch || ['검색 결과가 없습니다.', '다른 검색어로 다시 검색해 주세요.']) : empty;
        body = `<tr><td colspan="${columns.length + (selectable ? 1 : 0)}"><div class="empty"><p>${msg[0]}</p>${msg[1] ? `<p>${msg[1]}</p>` : ''}</div></td></tr>`;
      } else {
        body = view.map((r) => `<tr data-id="${esc(r[rowKey])}">${checkCell(r)}${
          columns.map((c) => `<td${c.ellipsis ? ` class="ellipsis" data-tip="${esc(r[c.key])}"` : ''}>${c.render ? c.render(r) : esc(r[c.key])}</td>`).join('')}</tr>`).join('');
      }
      tableEl.innerHTML = `<thead>${head}</thead><tbody>${body}</tbody>`;
      if (countEl) countEl.textContent = `${state.selected.size}개 선택`;
      renderPagination(pages);
    }
    function renderPagination(pages) {
      if (!pagEl) return;
      const p = state.page;
      const nums = [];
      // 모바일은 5개씩, 데스크톱은 10개씩 번호를 보여준다
      const win = mobileQuery.matches ? 5 : 10;
      const start = Math.floor((p - 1) / win) * win + 1, end = Math.min(start + win - 1, pages);
      for (let i = start; i <= end; i++) nums.push(`<button class="page-num${i === p ? ' is-active' : ''}" data-page="${i}">${i}</button>`);
      if (end < pages) nums.push(`<span class="page-gap">…</span><button class="page-num" data-page="${pages}">${pages}</button>`);
      pagEl.innerHTML = `<span class="spacer"></span>
        <div class="pages">
          <div class="page-arrows"><button data-page="1" ${p === 1 ? 'disabled' : ''} aria-label="처음"><i class="ic ic-chevrons-left"></i></button><button data-page="${p - 1}" ${p === 1 ? 'disabled' : ''} aria-label="이전"><i class="ic ic-chevron-left"></i></button></div>
          <div class="page-nums">${nums.join('')}</div>
          <div class="page-arrows"><button data-page="${p + 1}" ${p === pages ? 'disabled' : ''} aria-label="다음"><i class="ic ic-chevron-right"></i></button><button data-page="${pages}" ${p === pages ? 'disabled' : ''} aria-label="끝"><i class="ic ic-chevrons-right"></i></button></div>
        </div>
        <div class="page-controls">
          <span>페이지로 이동</span>
          <form class="field" style="width:80px" data-jump><input inputmode="numeric" value="${p}" aria-label="이동할 페이지"><button class="field-icon-btn" aria-label="이동"><i class="ic ic-search"></i></button></form>
          <label class="field" style="width:120px"><select data-size aria-label="페이지당 개수">${[10, 20, 50].map((n) => `<option value="${n}" ${n === state.size ? 'selected' : ''}>${n}개씩 보기</option>`).join('')}</select><i class="ic ic-chevron-down"></i></label>
        </div>`;
    }

    el.addEventListener('click', (e) => {
      const s = e.target.closest('[data-sort]');
      if (s) {
        const key = s.dataset.sort, cur = state.sort && state.sort.key === key ? state.sort.dir : null;
        state.sort = cur === 'asc' ? { key, dir: 'desc' } : cur === 'desc' ? null : { key, dir: 'asc' };
        render();
      }
      const pg = e.target.closest('[data-page]');
      if (pg && !pg.disabled) { state.page = +pg.dataset.page; render(); }
    });
    el.addEventListener('change', (e) => {
      if (e.target.matches('[data-all]')) {
        const rows = filtered().slice((state.page - 1) * state.size, state.page * state.size);
        rows.forEach((r) => (e.target.checked ? state.selected.add(r[rowKey]) : state.selected.delete(r[rowKey])));
        render();
      } else if (e.target.matches('[data-row]')) {
        const id = e.target.closest('tr').dataset.id;
        const key = state.data.find((r) => String(r[rowKey]) === id)[rowKey];
        e.target.checked ? state.selected.add(key) : state.selected.delete(key);
        render();
      } else if (e.target.matches('[data-size]')) { state.size = +e.target.value; state.page = 1; render(); }
    });
    el.addEventListener('submit', (e) => {
      if (e.target.matches('[data-jump]')) { e.preventDefault(); const n = parseInt(e.target.querySelector('input').value, 10); if (n > 0) { state.page = n; render(); } }
    });
    if (searchEl) {
      searchEl.addEventListener('submit', (e) => { e.preventDefault(); state.query = searchEl.querySelector('input').value.trim(); state.page = 1; render(); });
      searchEl.querySelector('input').addEventListener('input', (e) => { if (!e.target.value) { state.query = ''; render(); } });
    }

    mobileQuery.addEventListener('change', render);
    render();
    return {
      get selected() { return state.data.filter((r) => state.selected.has(r[rowKey])); },
      get data() { return state.data; },
      set(data) { state.data = data; state.selected = new Set([...state.selected].filter((k) => data.some((r) => r[rowKey] === k))); render(); },
      clear() { state.selected.clear(); render(); },
      render,
    };
  }

  /* 파일 인풋 */
  document.addEventListener('change', (e) => {
    if (!e.target.matches('.file input')) return;
    const wrap = e.target.closest('.file');
    const f = e.target.files[0];
    wrap.classList.toggle('is-selected', !!f);
    wrap.querySelector('.file-name').textContent = f ? f.name : '선택된 파일 없음';
  });

  /* ── Loading (Figma 342:43868): 화면 전체 블러 + 가운데 로고. 작업(promise)이 끝나면 닫힌다 ── */
  async function loading(work, label = '불러오는 중') {
    const el = document.createElement('div');
    el.className = 'loading';
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-busy', 'true');
    el.innerHTML = `<img class="loading-logo" src="assets/logo.svg" alt=""><span class="sr-only">${esc(label)}</span>`;
    document.body.appendChild(el);
    try { return await work; } finally { el.remove(); }
  }

  /* ── Tooltip (DESIGN.md §3.8): [data-tip] 요소에 마우스를 올리면 텍스트 바로 아래에 표시 ── */
  let tipEl, tipTarget;
  function showTip(target) {
    const text = target.dataset.tip;
    if (!text) return;
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.className = 'tooltip';
      tipEl.setAttribute('role', 'tooltip');
      tipEl.id = 'blending-tooltip';
      document.body.appendChild(tipEl);
    }
    tipTarget = target;
    tipEl.textContent = text;
    tipEl.classList.add('show');
    target.setAttribute('aria-describedby', tipEl.id);
    // 기준은 셀이 아니라 글자 자체: 글자 아래 4px, 가운데 정렬, 화면 밖으로 나가지 않게
    const r = (target.querySelector('[data-tip-anchor]') || target).getBoundingClientRect();
    const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(8, Math.min(left, innerWidth - w - 8));
    let top = r.bottom + 4;
    if (top + h > innerHeight - 8) top = r.top - h - 4;
    tipEl.style.left = `${left}px`;
    tipEl.style.top = `${top}px`;
  }
  function hideTip() {
    if (!tipEl) return;
    tipEl.classList.remove('show');
    if (tipTarget) tipTarget.removeAttribute('aria-describedby');
    tipTarget = null;
  }
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-tip]');
    if (t !== tipTarget) (t ? showTip(t) : hideTip());
  });
  document.addEventListener('focusin', (e) => { const t = e.target.closest('[data-tip]'); if (t) showTip(t); });
  document.addEventListener('focusout', hideTip);
  window.addEventListener('scroll', hideTip, true);

  /* ── Date Picker (DESIGN.md §3.8 Date Range Picker) ── */
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return { y, m: m - 1, d }; };
  const pretty = (s) => { if (!s) return ''; const { y, m, d } = parse(s); return `${MONTHS[m].slice(0, 3)} ${d}, ${y}`; };
  const todayIso = () => { const t = new Date(); return iso(t.getFullYear(), t.getMonth(), t.getDate()); };
  let openPicker = null;

  function datePicker(input, opts = {}) {
    const mode = opts.mode || 'range';
    const sep = ' ~ ';
    const today = opts.today || todayIso();
    let from = null, to = null, side = 'start', hover = null, view;
    const pop = document.createElement('div');
    pop.className = `dp${mode === 'single' ? ' dp-single' : ''}`;
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', mode === 'range' ? '기간 선택' : '날짜 선택');

    // opts.format이 있으면(단일 날짜) 화면에는 형식화한 값, 실제 값(YYYY-MM-DD)은 data-iso에 둔다
    const show = (f, t) => (mode === 'range' ? (f && t ? `${f}${sep}${t}` : '') : f ? (opts.format ? opts.format(f) : f) : '');
    function readInput() {
      const raw = opts.format ? input.dataset.iso || '' : input.value;
      const parts = raw.split(sep).map((s) => s.trim()).filter(Boolean);
      from = parts[0] || null;
      to = mode === 'range' ? parts[1] || null : null;
      const base = parse(from || today);
      view = { y: base.y, m: base.m };
    }
    function write() {
      input.value = show(from, to);
      input.dataset.iso = from || '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      opts.onChange && opts.onChange(from, to);
    }
    function monthHtml(y, m) {
      const first = new Date(y, m, 1).getDay();
      const days = new Date(y, m + 1, 0).getDate();
      const prevDays = new Date(y, m, 0).getDate();
      const end = mode === 'range' ? to || (side === 'end' && hover && from && hover > from ? hover : null) : null;
      const cells = [];
      for (let i = 0; i < 42; i++) {
        const d = i - first + 1;
        const col = i % 7;
        if (d < 1 || d > days) {
          // 이전/다음 달 날짜는 흐리게만 표시한다 (Outside)
          const od = d < 1 ? prevDays + d : d - days;
          if (i >= 35 && d > days && cells.length % 7 === 0) break;
          cells.push(`<span class="dp-day is-outside"><span class="dp-pill">${od}</span></span>`);
          continue;
        }
        const date = iso(y, m, d);
        const inRange = from && end && date >= from && date <= end;
        const isStart = date === from, isEnd = date === (end || from);
        const sel = inRange || isStart;
        const cls = ['dp-day'];
        if (sel) cls.push('is-sel');
        if (sel && (isStart || col === 0 || d === 1)) cls.push('r-l');
        if (sel && (isEnd || col === 6 || d === days)) cls.push('r-r');
        if (date === today) cls.push('is-today');
        cells.push(`<button type="button" class="${cls.join(' ')}" data-date="${date}" aria-label="${date}"${sel ? ' aria-pressed="true"' : ''}><span class="dp-pill">${d}</span></button>`);
      }
      return `<div class="dp-month"><p class="dp-month-label">${MONTHS[m].slice(0, 3)} ${y}</p>
        <div class="dp-grid">${WEEK.map((w) => `<span class="dp-week">${w}</span>`).join('')}${cells.join('')}</div></div>`;
    }
    function render() {
      const next = view.m === 11 ? { y: view.y + 1, m: 0 } : { y: view.y, m: view.m + 1 };
      const years = []; for (let y = view.y - 5; y <= view.y + 5; y++) years.push(y);
      pop.innerHTML = `
        ${mode === 'range' ? `<div class="dp-display">
          <button type="button" class="dp-date${side === 'start' ? ' is-active' : ''}" data-side="start">${pretty(from) || '시작일'}</button>
          <button type="button" class="dp-date${side === 'end' ? ' is-active' : ''}" data-side="end">${pretty(to) || '종료일'}</button>
        </div>` : ''}
        <div class="dp-nav">
          <button type="button" class="dp-arrow" data-move="-1" aria-label="이전 달"><i class="ic ic-chevron-left"></i></button>
          <div class="dp-selects">
            <label><select data-pick="m" aria-label="월">${MONTHS.map((n, i) => `<option value="${i}" ${i === view.m ? 'selected' : ''}>${n}</option>`).join('')}</select><i class="ic ic-chevron-down"></i></label>
            <label><select data-pick="y" aria-label="연도">${years.map((y) => `<option ${y === view.y ? 'selected' : ''}>${y}</option>`).join('')}</select><i class="ic ic-chevron-down"></i></label>
          </div>
          <button type="button" class="dp-arrow" data-move="1" aria-label="다음 달"><i class="ic ic-chevron-right"></i></button>
        </div>
        <div class="dp-months">${monthHtml(view.y, view.m)}${monthHtml(next.y, next.m)}</div>`;
    }
    function place() {
      if (mobileQuery.matches) { pop.style.left = pop.style.top = ''; return; }
      const r = input.closest('.field').getBoundingClientRect();
      const w = pop.offsetWidth, h = pop.offsetHeight;
      let left = Math.min(r.left, innerWidth - w - 16);
      let top = r.bottom + 4;
      if (top + h > innerHeight - 8 && r.top - h - 4 > 8) top = r.top - h - 4;
      pop.style.left = `${Math.max(16, left) + scrollX}px`;
      pop.style.top = `${top + scrollY}px`;
    }
    function open() {
      if (openPicker && openPicker !== api) openPicker.close();
      readInput();
      side = mode === 'range' && from && !to ? 'end' : 'start';
      render();
      document.body.appendChild(pop);
      place();
      openPicker = api;
    }
    function close() { pop.remove(); hover = null; if (openPicker === api) openPicker = null; }

    pop.addEventListener('click', (e) => {
      e.stopPropagation();
      const mv = e.target.closest('[data-move]');
      if (mv) { const t = new Date(view.y, view.m + +mv.dataset.move, 1); view = { y: t.getFullYear(), m: t.getMonth() }; render(); return; }
      const sd = e.target.closest('[data-side]');
      if (sd) { side = sd.dataset.side; render(); return; }
      const day = e.target.closest('[data-date]');
      if (!day) return;
      const d = day.dataset.date;
      if (mode === 'single') { from = d; write(); close(); return; }
      if (side === 'start' || !from || d < from) { from = d; to = null; side = 'end'; render(); return; }
      to = d; write(); close();
    });
    pop.addEventListener('change', (e) => {
      const s = e.target.closest('[data-pick]');
      if (!s) return;
      view[s.dataset.pick] = +s.value;
      render();
    });
    pop.addEventListener('mouseover', (e) => {
      if (mode !== 'range' || side !== 'end' || !from) return;
      const day = e.target.closest('[data-date]');
      const h = day ? day.dataset.date : null;
      if (h !== hover) { hover = h; render(); }
    });

    input.readOnly = true;
    const field = input.closest('.field');
    field.style.cursor = 'pointer';
    // <label class="field">는 클릭이 input으로 한 번 더 전달되므로 열기만 한다 (닫기는 바깥 클릭·Esc·선택 완료)
    field.addEventListener('click', (e) => { e.stopPropagation(); if (e.target.closest('[data-clear]') || openPicker === api) return; open(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); open(); } });

    const api = {
      open, close,
      get value() { return [from, to]; },
      set(f, t) { from = f; to = t; input.value = show(f, t); input.dataset.iso = f || ''; },
    };
    if (opts.value) api.set(opts.value[0], opts.value[1]);
    return api;
  }
  document.addEventListener('click', (e) => { if (openPicker && !e.target.closest('.dp')) openPicker.close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openPicker) openPicker.close(); });
  window.addEventListener('resize', () => openPicker && openPicker.close());

  /* ── Segmented Control: 선택 표시(흰 칩)가 선택된 항목으로 부드럽게 미끄러진다 ── */
  function initSeg(seg) {
    if (seg.querySelector('.seg-thumb')) return;
    const thumb = document.createElement('span');
    thumb.className = 'seg-thumb';
    thumb.setAttribute('aria-hidden', 'true');
    seg.prepend(thumb);
    seg.classList.add('has-thumb', 'is-instant'); // 처음 위치는 애니메이션 없이
    const place = () => {
      const sel = seg.querySelector('button.is-selected');
      if (!sel || !sel.offsetWidth) { thumb.style.opacity = '0'; return; }
      thumb.style.opacity = '1';
      thumb.style.width = `${sel.offsetWidth}px`;
      thumb.style.transform = `translateX(${sel.offsetLeft}px)`;
    };
    place();
    requestAnimationFrame(() => requestAnimationFrame(() => seg.classList.remove('is-instant')));
    // 선택(class) 변경 → 이동, 크기 변화(모달이 열려 보이게 될 때 등) → 즉시 재배치
    new MutationObserver(place).observe(seg, { subtree: true, attributes: true, attributeFilter: ['class'] });
    new ResizeObserver(() => { seg.classList.add('is-instant'); place(); requestAnimationFrame(() => seg.classList.remove('is-instant')); }).observe(seg);
  }

  document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('.seg').forEach(initSeg));
  document.addEventListener('DOMContentLoaded', mountShell);
  window.Blending = { toast, openModal, closeModal, confirm, list, esc, datePicker, loading };
})();
