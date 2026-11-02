/* 공지사항 프로토타입 데이터 (목록·등록 페이지가 함께 씀) */
window.NoticeStore = (function () {
  const KEY = 'blending.notices';
  const seed = [
    { id: 1, title: '[필독] 블렌딩 안내사항', date: '2025-02-27', pinned: true, popup: false, body: '안녕하세요. 블렌딩 관리자입니다.' },
    { id: 2, title: '공지사항 추가', date: '2026-10-12', pinned: false, popup: false, body: '' },
  ];
  function all() {
    try { const v = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(v)) return v; } catch (e) {}
    return seed.slice();
  }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }
  return {
    all,
    get: (id) => all().find((n) => n.id === id),
    upsert(n) {
      const list = all();
      if (n.id) { const i = list.findIndex((x) => x.id === n.id); list[i] = { ...list[i], ...n }; }
      else { n.id = Math.max(0, ...list.map((x) => x.id)) + 1; n.date = new Date().toISOString().slice(0, 10); list.push(n); }
      save(list); return n;
    },
    remove(ids) { save(all().filter((n) => !ids.includes(n.id))); },
  };
})();
