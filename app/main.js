// main.js — Router hash, penjelajah data, dan unduhan CSV.
// Satu-satunya skrip yang dimuat halaman; semua logika interaksi ada di sini.

import { ROUTES, NAV } from './views.js';
import { INDICATORS } from './data.js';

const app = document.getElementById('app');
const navEl = document.getElementById('nav');

// Bilah navigasi dibangun dari NAV supaya tautan dan halaman selalu cocok.
navEl.innerHTML = NAV.map(([href, label]) =>
  `<a href="#${href}" data-route="${href}">${label}</a>`).join('');

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  navEl.querySelectorAll('a').forEach((a) =>
    a.classList.toggle('active', a.dataset.route === route));
  document.title = `StatNusa — ${NAV.find(([h]) => h === route)?.[1] ?? 'Beranda'} | Statistik Indonesia`;
  if (route === '/data') wireExplorer();
  window.scrollTo(0, 0);
}

// --- Penjelajah data: cari, saring kategori, urutkan kolom, unduh CSV. ---
let explorerState = { q: '', cat: 'Semua', sortKey: 'name', sortDir: 1 };

function filteredRows() {
  const { q, cat, sortKey, sortDir } = explorerState;
  const needle = q.trim().toLowerCase();
  const rows = INDICATORS.filter((r) =>
    (cat === 'Semua' || r.category === cat) &&
    (!needle || r.name.toLowerCase().includes(needle) ||
      r.category.toLowerCase().includes(needle) ||
      r.source.toLowerCase().includes(needle)));
  rows.sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv : String(av).localeCompare(String(bv), 'id');
    return cmp * sortDir;
  });
  return rows;
}

function renderExplorerRows() {
  const rows = filteredRows();
  const body = document.getElementById('explorerBody');
  const count = document.getElementById('countLine');
  body.innerHTML = rows.map((r) => `<tr>
    <td>${r.name}</td>
    <td>${r.value.toLocaleString('id-ID')}</td>
    <td>${r.unit}</td><td>${r.year}</td>
    <td>${r.category}</td><td>${r.source}</td></tr>`).join('') ||
    '<tr><td colspan="6">Tidak ada indikator yang cocok. Coba kata kunci lain.</td></tr>';
  count.textContent = `Menampilkan ${rows.length} dari ${INDICATORS.length} indikator.`;
  document.querySelectorAll('#explorerTable th').forEach((th) => {
    th.classList.remove('sorted-asc', 'sorted-desc');
    if (th.dataset.key === explorerState.sortKey) {
      th.classList.add(explorerState.sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
    }
  });
}

function downloadCsv() {
  const rows = filteredRows();
  const head = 'Indikator,Nilai,Satuan,Tahun,Kategori,Sumber';
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [head, ...rows.map((r) =>
    [r.name, r.value, r.unit, r.year, r.category, r.source].map(esc).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'statnusa-indikator.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function wireExplorer() {
  document.getElementById('q').addEventListener('input', (e) => {
    explorerState.q = e.target.value;
    renderExplorerRows();
  });
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      explorerState.cat = btn.dataset.cat;
      renderExplorerRows();
    });
  });
  document.querySelectorAll('#explorerTable th').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (explorerState.sortKey === key) explorerState.sortDir *= -1;
      else { explorerState.sortKey = key; explorerState.sortDir = 1; }
      renderExplorerRows();
    });
  });
  document.getElementById('csvBtn').addEventListener('click', downloadCsv);
  renderExplorerRows();
}

window.addEventListener('hashchange', render);
render();
