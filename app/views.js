// views.js — Setiap halaman situs sebagai fungsi yang mengembalikan HTML.
// Semua angka datang dari data.js; tidak ada angka yang ditulis langsung
// di markup halaman, supaya sumber dan tahunnya selalu konsisten.

import { META, SERIES, KEY_INDICATORS, GDP_SECTORS, AGE_GROUPS, TOP_PROVINCES, LABOUR, RELEASES, INDICATORS } from './data.js';
import { lineChart, barChart, hbarChart, pyramidChart, donutChart, PALETTE } from './charts.js';

const src = (text) => `<p class="source">Sumber: ${text}</p>`;
const fmtId = (n, d = 1) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

function kpiCards() {
  return '<div class="kpi-grid">' + KEY_INDICATORS.map((k) => `
    <article class="kpi">
      <p class="kpi-note">${k.note}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-change">${k.change}</p>
      <p class="kpi-year">Tahun ${k.year} · BPS</p>
    </article>`).join('') + '</div>';
}

function chartCard(title, body, sourceText, extra = '') {
  return `<section class="card chart-card">
    <h2>${title}</h2>${extra}${body}${src(sourceText)}
  </section>`;
}

function linkCards() {
  const links = [
    ['#/ekonomi', 'Ekonomi', 'PDB, pertumbuhan, perdagangan luar negeri'],
    ['#/penduduk', 'Penduduk', 'Jumlah, struktur umur, dan provinsi'],
    ['#/tenaga-kerja', 'Tenaga kerja', 'Pengangguran, angkatan kerja, dan upah'],
    ['#/harga', 'Harga', 'Inflasi, nilai tukar, dan suku bunga'],
    ['#/data', 'Penjelajah data', 'Semua indikator dalam satu tabel'],
    ['#/metodologi', 'Metodologi', 'Sumber, definisi, dan cara membaca data'],
  ];
  return '<div class="link-grid">' + links.map(([href, t, d]) => `
    <a class="link-card" href="${href}"><strong>${t}</strong><span>${d}</span></a>`).join('') + '</div>';
}

export function viewHome() {
  return `
  <section class="hero">
    <p class="eyebrow">Portal statistik · Indonesia</p>
    <h1>Angka resmi Indonesia,<br>dalam satu tempat.</h1>
    <p class="lede">Penduduk, ekonomi, harga, dan tenaga kerja — dari data resmi BPS,
    Bank Indonesia, dan Dukcapil — disajikan dengan grafik yang bisa dibaca
    sekilas dan tabel yang bisa diurutkan.</p>
    <p class="hero-meta">Data terbaru tahun ${META.latestYear} · Diperbarui ${META.updated}</p>
  </section>
  ${kpiCards()}
  <div class="two-col">
    ${chartCard('Penduduk terus bertambah',
      lineChart({ ...SERIES.population, label: 'Jumlah penduduk Indonesia 2015–2024' }),
      SERIES.population.source)}
    ${chartCard('Pertumbuhan ekonomi 2015–2024',
      barChart({ ...SERIES.gdpGrowth, label: 'Pertumbuhan PDB Indonesia 2015–2024' }),
      SERIES.gdpGrowth.source)}
  </div>
  <section class="card">
    <h2>Provinsi terpadat</h2>
    <p class="card-sub">Enam provinsi dengan penduduk terbanyak, pertengahan 2024. Lebih dari separuh penduduk Indonesia tinggal di Pulau Jawa.</p>
    ${hbarChart({ rows: TOP_PROVINCES.map((p) => ({ name: p.name, value: p.pop })), valueFmt: (v) => `${fmtId(v)} jt`, label: 'Penduduk enam provinsi terpadat 2024' })}
    ${src('BPS, Proyeksi Penduduk 2020–2050 (pertengahan tahun 2024)')}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Rilisan terbaru</h2>
      <ul class="releases">${RELEASES.map((r) => `
        <li><span class="tag">${r.tag}</span><span class="rel-date">${r.date}</span>
        <span class="rel-title">${r.title}</span></li>`).join('')}
      </ul>
    </section>
    <section class="card">
      <h2>Mulai dari sini</h2>
      ${linkCards()}
    </section>
  </div>`;
}

export function viewEkonomi() {
  const tradeRows = SERIES.exports.years.map((y, i) => ({
    year: y,
    ekspor: SERIES.exports.values[i],
    impor: SERIES.imports.values[i],
    surplus: +(SERIES.exports.values[i] - SERIES.imports.values[i]).toFixed(2),
  }));
  return `
  <section class="page-head">
    <p class="eyebrow">Ekonomi</p>
    <h1>Perekonomian Indonesia</h1>
    <p class="lede">PDB Rp22.139,0 triliun pada 2024, tumbuh 5,03 persen. Industri pengolahan
    tetap menjadi lapangan usaha terbesar, dan neraca perdagangan surplus
    US$31,04 miliar.</p>
  </section>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-note">PDB harga berlaku</p><p class="kpi-value">Rp22.139 T</p><p class="kpi-change">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-note">Pertumbuhan ekonomi</p><p class="kpi-value">5,03%</p><p class="kpi-change">2024, dari 5,05% di 2023</p></article>
    <article class="kpi"><p class="kpi-note">PDB per kapita</p><p class="kpi-value">US$4.960</p><p class="kpi-change">Rp78,6 juta per orang</p></article>
    <article class="kpi"><p class="kpi-note">Ekspor − Impor</p><p class="kpi-value">US$264,7 M</p><p class="kpi-change">Impor US$233,66 M · Surplus US$31,04 M</p></article>
  </div>
  <div class="two-col">
    ${chartCard('Pertumbuhan PDB 2015–2024',
      barChart({ ...SERIES.gdpGrowth, label: 'Pertumbuhan PDB 2015–2024' }),
      SERIES.gdpGrowth.source)}
    ${chartCard('PDB atas dasar harga berlaku',
      barChart({ ...SERIES.gdpNominal, label: 'PDB harga berlaku 2016–2024', decimals: 0 }),
      SERIES.gdpNominal.source)}
  </div>
  <div class="two-col">
    <section class="card">
      <h2>Struktur PDB 2024</h2>
      <p class="card-sub">Lima lapangan usaha terbesar menyumbang 63,90% PDB.</p>
      ${donutChart({ rows: GDP_SECTORS, label: 'Struktur PDB 2024 menurut lapangan usaha' })}
      ${src('BPS, Berita Resmi Statistik Pertumbuhan Ekonomi 2024')}
    </section>
    <section class="card">
      <h2>Pertumbuhan per lapangan usaha</h2>
      <p class="card-sub">Laju tumbuh 2024 (y-on-y) menurut lapangan usaha.</p>
      <table class="data-table">
        <thead><tr><th>Lapangan usaha</th><th>Pangsa PDB</th><th>Tumbuh</th></tr></thead>
        <tbody>${GDP_SECTORS.map((s) => `
          <tr><td>${s.name}</td><td>${fmtId(s.share)}%</td><td>${fmtId(s.growth)}%</td></tr>`).join('')}
        </tbody>
      </table>
      ${src('BPS, Berita Resmi Statistik Pertumbuhan Ekonomi 2024')}
    </section>
  </div>
  <section class="card">
    <h2>Perdagangan luar negeri 2015–2024</h2>
    <p class="card-sub">Ekspor dan impor barang (US$ miliar). Indonesia surplus neraca perdagangan
    lima tahun berturut-turut sejak 2020.</p>
    ${lineChart({ years: SERIES.exports.years, values: SERIES.exports.values, unit: 'US$ miliar', color: PALETTE.blue, label: 'Ekspor Indonesia 2015–2024' })}
    <table class="data-table">
      <thead><tr><th>Tahun</th><th>Ekspor</th><th>Impor</th><th>Neraca</th></tr></thead>
      <tbody>${tradeRows.map((r) => `
        <tr><td>${r.year}</td><td>US$${fmtId(r.ekspor)} M</td><td>US$${fmtId(r.impor)} M</td>
        <td class="${r.surplus >= 0 ? 'pos' : 'neg'}">${r.surplus >= 0 ? '+' : ''}US$${fmtId(r.surplus)} M</td></tr>`).join('')}
      </tbody>
    </table>
    ${src('BPS, Statistik Perdagangan Luar Negeri; Kemendag (PDSI)')}
  </section>`;
}

export function viewPenduduk() {
  return `
  <section class="page-head">
    <p class="eyebrow">Penduduk</p>
    <h1>281,6 juta jiwa</h1>
    <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Hampir 70 persen
    penduduknya berada pada usia produktif, dan 55,9 persen tinggal di Pulau Jawa.</p>
  </section>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-note">Jumlah penduduk</p><p class="kpi-value">281,6 jt</p><p class="kpi-change">Pertengahan 2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-note">Usia produktif (15–64 th)</p><p class="kpi-value">69,58%</p><p class="kpi-change">196,6 juta jiwa · Dukcapil 2024</p></article>
    <article class="kpi"><p class="kpi-note">Rasio ketergantungan</p><p class="kpi-value">43,7</p><p class="kpi-change">Per 100 penduduk usia produktif</p></article>
    <article class="kpi"><p class="kpi-note">Kepadatan penduduk</p><p class="kpi-value">148/km²</p><p class="kpi-change">Rata-rata nasional 2024</p></article>
  </div>
  <div class="two-col">
    ${chartCard('Jumlah penduduk 2015–2024',
      lineChart({ ...SERIES.population, label: 'Jumlah penduduk 2015–2024' }),
      SERIES.population.source)}
    <section class="card">
      <h2>Bonus demografi</h2>
      <p class="card-sub">Struktur umur 2024 (Dukcapil Kemendagri, Semester I 2024):</p>
      <ul class="fact-list">
        <li><strong>22,95%</strong> — penduduk usia muda (0–14 tahun), 64,8 juta jiwa</li>
        <li><strong>69,58%</strong> — penduduk usia produktif (15–64 tahun), 196,6 juta jiwa</li>
        <li><strong>7,46%</strong> — penduduk usia tua (65 tahun ke atas), 21,1 juta jiwa</li>
        <li><strong>45,05</strong> — rasio ketergantungan menurut SUPAS 2025 (BPS)</li>
      </ul>
      <p>Indonesia masih menikmati bonus demografi: setiap 100 penduduk usia produktif
      menanggung sekitar 44 penduduk usia nonproduktif. Jendela ini diperkirakan
      berlangsung hingga awal 2030-an.</p>
      ${src('Ditjen Dukcapil Kemendagri, Data Kependudukan Bersih Semester I 2024; BPS, SUPAS 2025')}
    </section>
  </div>
  <section class="card">
    <h2>Penduduk menurut kelompok umur</h2>
    <p class="card-sub">Piramida penduduk Februari 2026 — kelompok umur 10–14 tahun adalah yang
    terbesar (24,1 juta jiwa), diikuti 25–29 tahun (22,5 juta jiwa).</p>
    ${pyramidChart({ groups: AGE_GROUPS, label: 'Penduduk menurut kelompok umur, Februari 2026' })}
    ${src('BPS, Jumlah Penduduk menurut Kelompok Umur dan Jenis Kelamin, Februari 2026')}
  </section>
  <section class="card">
    <h2>Provinsi terpadat</h2>
    <p class="card-sub">Enam provinsi terpadat, pertengahan 2024, beserta kepadatannya.</p>
    <table class="data-table">
      <thead><tr><th>#</th><th>Provinsi</th><th>Penduduk</th><th>Pangsa</th><th>Kepadatan</th></tr></thead>
      <tbody>${TOP_PROVINCES.map((p, i) => `
        <tr><td>${i + 1}</td><td>${p.name}</td><td>${fmtId(p.pop)} jt</td>
        <td>${fmtId(p.share)}%</td><td>${p.density.toLocaleString('id-ID')} jiwa/km²</td></tr>`).join('')}
      </tbody>
    </table>
    ${src('BPS, Proyeksi Penduduk 2020–2050 (pertengahan tahun 2024)')}
  </section>`;
}

export function viewTenagaKerja() {
  return `
  <section class="page-head">
    <p class="eyebrow">Tenaga kerja</p>
    <h1>152,11 juta angkatan kerja</h1>
    <p class="lede">Dari 152,11 juta angkatan kerja pada Agustus 2024, sebanyak 144,64 juta orang
    bekerja dan 7,47 juta orang menganggur. Tingkat pengangguran terbuka 4,91 persen —
    terendah sejak 2015.</p>
  </section>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-note">Angkatan kerja</p><p class="kpi-value">152,11 jt</p><p class="kpi-change">Agustus 2024 · Sakernas</p></article>
    <article class="kpi"><p class="kpi-note">Penduduk bekerja</p><p class="kpi-value">144,64 jt</p><p class="kpi-change">Naik 4,79 jt dari 2023</p></article>
    <article class="kpi"><p class="kpi-note">Pengangguran terbuka</p><p class="kpi-value">4,91%</p><p class="kpi-change">7,47 juta orang</p></article>
    <article class="kpi"><p class="kpi-note">Upah rata-rata buruh</p><p class="kpi-value">Rp3,04 jt</p><p class="kpi-change">Per bulan, Agustus 2024</p></article>
  </div>
  ${chartCard('Tingkat pengangguran terbuka 2015–2024',
    lineChart({ ...SERIES.unemployment, label: 'Tingkat pengangguran terbuka 2015–2024' }),
    SERIES.unemployment.source)}
  <section class="card">
    <h2>Angkatan kerja 2020–2024</h2>
    <table class="data-table">
      <thead><tr><th>Tahun (Agustus)</th><th>Angkatan kerja</th><th>Bekerja</th><th>Menganggur</th><th>TPT</th></tr></thead>
      <tbody>${LABOUR.years.map((y, i) => `
        <tr><td>${y}</td><td>${fmtId(LABOUR.labourForce[i])} jt</td><td>${fmtId(LABOUR.employed[i])} jt</td>
        <td>${fmtId(LABOUR.labourForce[i] - LABOUR.employed[i])} jt</td>
        <td>${fmtId(SERIES.unemployment.values[SERIES.unemployment.years.indexOf(y)])}%</td></tr>`).join('')}
      </tbody>
    </table>
    ${src(LABOUR.source)}
  </section>
  <section class="card">
    <h2>Membaca angka ini</h2>
    <p>Pengangguran turun 0,41 poin dibanding Agustus 2023 (5,32%). Penurunan terbesar
    terjadi setelah pandemi: dari 7,07% pada Agustus 2020 menjadi 4,91% pada Agustus 2024.
    Upah rata-rata buruh naik menjadi Rp3,04 juta per bulan — naik dari Rp3,01 juta pada
    Agustus 2023. Angka pengangguran dihitung dari penduduk usia kerja (15 tahun ke atas)
    yang tidak bekerja namun sedang mencari pekerjaan, mempersiapkan usaha, atau bersedia bekerja.</p>
    ${src('BPS, Sakernas Agustus 2024')}
  </section>`;
}

export function viewHarga() {
  return `
  <section class="page-head">
    <p class="eyebrow">Harga</p>
    <h1>Inflasi 1,57% pada 2024</h1>
    <p class="lede">Inflasi Desember 2024 (y-on-y) sebesar 1,57 persen — terendah dalam satu dekade
    terakhir, turun dari 2,61 persen pada 2023 dan 5,51 persen pada 2022.</p>
  </section>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-note">Inflasi (Des y-on-y)</p><p class="kpi-value">1,57%</p><p class="kpi-change">Desember 2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-note">Inflasi 2023</p><p class="kpi-value">2,61%</p><p class="kpi-change">Dalam sasaran BI 2,5% ± 1%</p></article>
    <article class="kpi"><p class="kpi-note">Nilai tukar rupiah</p><p class="kpi-value">Rp16.157</p><p class="kpi-change">Per US$, 31 Des 2024 · BI</p></article>
    <article class="kpi"><p class="kpi-note">BI-Rate</p><p class="kpi-value">6,00%</p><p class="kpi-change">Desember 2024 · BI</p></article>
  </div>
  ${chartCard('Inflasi tahunan 2015–2024',
    barChart({ ...SERIES.inflation, label: 'Inflasi Desember y-on-y 2015–2024' }),
    SERIES.inflation.source)}
  <section class="card">
    <h2>Inflasi 2015–2024</h2>
    <table class="data-table">
      <thead><tr><th>Tahun</th><th>Inflasi (Des, y-on-y)</th><th>Catatan</th></tr></thead>
      <tbody>
        <tr><td>2015</td><td>3,35%</td><td>Setelah penyesuaian harga BBM</td></tr>
        <tr><td>2016</td><td>3,02%</td><td>Dalam sasaran</td></tr>
        <tr><td>2017</td><td>3,61%</td><td>Dalam sasaran</td></tr>
        <tr><td>2018</td><td>3,13%</td><td>Dalam sasaran</td></tr>
        <tr><td>2019</td><td>2,72%</td><td>Dalam sasaran</td></tr>
        <tr><td>2020</td><td>1,68%</td><td>Permintaan melemah saat pandemi</td></tr>
        <tr><td>2021</td><td>1,87%</td><td>Pemulihan bertahap</td></tr>
        <tr><td>2022</td><td>5,51%</td><td>Kenaikan harga BBM bersubsidi</td></tr>
        <tr><td>2023</td><td>2,61%</td><td>Kembali dalam sasaran</td></tr>
        <tr><td>2024</td><td>1,57%</td><td>Terendah dalam satu dekade</td></tr>
      </tbody>
    </table>
    ${src('BPS, Berita Resmi Statistik Inflasi')}
  </section>
  <section class="card">
    <h2>Membaca angka ini</h2>
    <p>Inflasi diukur dari Indeks Harga Konsumen (IHK) di 90 kota. Bank Indonesia
    menjaga inflasi dalam sasaran 2,5% ± 1%. Pada 2022 inflasi melonjak ke 5,51 persen
    setelah harga BBM bersubsidi naik pada September 2022; sejak itu inflasi kembali
    turun dan bertahan di bawah 3 persen sepanjang 2023–2024.</p>
    ${src('BPS; Bank Indonesia')}
  </section>`;
}

export function viewData() {
  const cats = [...new Set(INDICATORS.map((i) => i.category))];
  return `
  <section class="page-head">
    <p class="eyebrow">Penjelajah data</p>
    <h1>Semua indikator, satu tabel</h1>
    <p class="lede">Cari, saring berdasarkan kategori, atau urutkan berdasarkan kolom.
    Unduh hasilnya sebagai CSV untuk diolah lebih lanjut.</p>
  </section>
  <section class="card">
    <div class="explorer-bar">
      <label class="search-box">Cari indikator
        <input id="q" type="search" placeholder="mis. penduduk, PDB, inflasi…" autocomplete="off">
      </label>
      <div class="filters" role="group" aria-label="Saring kategori">
        <button class="filter-btn active" data-cat="Semua">Semua</button>
        ${cats.map((c) => `<button class="filter-btn" data-cat="${c}">${c}</button>`).join('')}
      </div>
      <button id="csvBtn" class="btn" type="button">Unduh CSV</button>
    </div>
    <p id="countLine" class="count-line"></p>
    <div class="table-wrap">
      <table class="data-table sortable" id="explorerTable">
        <thead><tr>
          <th data-key="name">Indikator</th>
          <th data-key="value">Nilai</th>
          <th data-key="unit">Satuan</th>
          <th data-key="year">Tahun</th>
          <th data-key="category">Kategori</th>
          <th data-key="source">Sumber</th>
        </tr></thead>
        <tbody id="explorerBody"></tbody>
      </table>
    </div>
    ${src('BPS, Bank Indonesia, Ditjen Dukcapil Kemendagri — angka terbaru 2024 kecuali dinyatakan lain')}
  </section>`;
}

export function viewMetodologi() {
  return `
  <section class="page-head">
    <p class="eyebrow">Metodologi</p>
    <h1>Sumber, definisi, dan cara membaca</h1>
    <p class="lede">Setiap angka di situs ini berasal dari publikasi resmi. Halaman ini menjelaskan
    dari mana angka itu datang dan apa artinya.</p>
  </section>
  <section class="card">
    <h2>Sumber data</h2>
    <ul class="fact-list">
      <li><strong>Badan Pusat Statistik (BPS)</strong> — penduduk, PDB, inflasi, pengangguran,
      kemiskinan, IPM, perdagangan luar negeri. Rilis melalui Berita Resmi Statistik dan publikasi tahunan.</li>
      <li><strong>Ditjen Dukcapil, Kementerian Dalam Negeri</strong> — struktur umur dan
      Data Kependudukan Bersih Semester I 2024.</li>
      <li><strong>Bank Indonesia</strong> — nilai tukar rupiah dan BI-Rate.</li>
      <li><strong>Kementerian Perdagangan (PDSI)</strong> — rekap ekspor-impor bulanan dari data BPS.</li>
    </ul>
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Definisi penting</h2>
      <dl class="defs">
        <dt>PDB</dt><dd>Nilai tambah seluruh barang dan jasa yang dihasilkan di Indonesia dalam setahun.</dd>
        <dt>Inflasi (y-on-y)</dt><dd>Perubahan Indeks Harga Konsumen dibanding bulan yang sama tahun sebelumnya.</dd>
        <dt>TPT</dt><dd>Tingkat pengangguran terbuka: penganggur dibagi angkatan kerja, Agustus setiap tahun.</dd>
        <dt>Rasio ketergantungan</dt><dd>Jumlah penduduk usia nonproduktif (0–14 dan 65+) per 100 penduduk usia produktif (15–64).</dd>
        <dt>IPM</dt><dd>Indeks Pembangunan Manusia, gabungan kesehatan, pendidikan, dan standar hidup layak.</dd>
      </dl>
    </section>
    <section class="card">
      <h2>Catatan dan batasan</h2>
      <ul class="fact-list">
        <li>Angka 2024 adalah angka terakhir yang lengkap saat situs ini disusun (November 2026).</li>
        <li>Angka penduduk memakai proyeksi BPS pertengahan tahun; angka Dukcapil memakai data administrasi kependudukan — keduanya bisa berbeda sedikit.</li>
        <li>Angka ekspor-impor 2024 bertanda sementara (angka sementara BPS).</li>
        <li>StatNusa adalah situs independen yang menyajikan ulang data resmi dan <strong>bukan situs resmi BPS</strong>. Untuk data mentah dan tabel lengkap, lihat publikasi sumbernya.</li>
      </ul>
    </section>
  </div>
  <section class="card">
    <h2>Pertanyaan yang sering dicari</h2>
    <dl class="defs">
      <dt>Berapa penduduk Indonesia sekarang?</dt><dd>281,6 juta jiwa pada pertengahan 2024 (BPS).</dd>
      <dt>Berapa pertumbuhan ekonomi Indonesia?</dt><dd>5,03 persen pada 2024 (BPS).</dd>
      <dt>Berapa inflasi Indonesia?</dt><dd>1,57 persen pada Desember 2024 (y-on-y, BPS).</dd>
      <dt>Berapa tingkat pengangguran?</dt><dd>4,91 persen pada Agustus 2024 (BPS, Sakernas).</dd>
      <dt>Berapa penduduk miskin?</dt><dd>8,57 persen pada September 2024 (BPS).</dd>
    </dl>
  </section>`;
}

export const ROUTES = {
  '/': viewHome,
  '/ekonomi': viewEkonomi,
  '/penduduk': viewPenduduk,
  '/tenaga-kerja': viewTenagaKerja,
  '/harga': viewHarga,
  '/data': viewData,
  '/metodologi': viewMetodologi,
};

export const NAV = [
  ['/', 'Beranda'],
  ['/ekonomi', 'Ekonomi'],
  ['/penduduk', 'Penduduk'],
  ['/tenaga-kerja', 'Tenaga kerja'],
  ['/harga', 'Harga'],
  ['/data', 'Data'],
  ['/metodologi', 'Metodologi'],
];
