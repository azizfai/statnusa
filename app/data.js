// data.js — Semua angka situs StatNusa.
// Sumber utama: Badan Pusat Statistik (BPS), Ditjen Dukcapil Kemendagri,
// Bank Indonesia, Kementerian Keuangan. Setiap angka membawa tahun dan
// sumbernya; tidak ada angka contoh atau placeholder di situs ini.

export const META = {
  siteName: 'StatNusa',
  tagline: 'Statistik Indonesia, satu tempat',
  country: 'Indonesia',
  latestYear: 2024,
  updated: '26 November 2026',
  note: 'Situs independen yang menyajikan ulang data resmi. Bukan situs resmi BPS.',
};

// Seri tahunan 2015-2024 (nilai, satuan, sumber).
export const SERIES = {
  population: {
    label: 'Jumlah penduduk',
    unit: 'juta jiwa',
    source: 'BPS, Proyeksi Penduduk 2020–2050 (pertengahan tahun)',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [255.6, 258.7, 261.9, 265.0, 268.1, 270.2, 272.2, 275.8, 278.7, 281.6],
  },
  gdpGrowth: {
    label: 'Pertumbuhan ekonomi (PDB)',
    unit: '% (y-on-y)',
    source: 'BPS, Berita Resmi Statistik Pertumbuhan Ekonomi',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03],
  },
  gdpNominal: {
    label: 'PDB atas dasar harga berlaku',
    unit: 'Rp triliun',
    source: 'BPS, PDB menurut lapangan usaha',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [12401.7, 13589.8, 14838.7, 15832.6, 15443.4, 16976.7, 19588.5, 20892.3, 22139.0],
  },
  inflation: {
    label: 'Inflasi (IHK, Desember y-on-y)',
    unit: '%',
    source: 'BPS, Berita Resmi Statistik Inflasi',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  },
  unemployment: {
    label: 'Tingkat pengangguran terbuka (Agustus)',
    unit: '%',
    source: 'BPS, Survei Angkatan Kerja Nasional (Sakernas)',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [6.18, 5.61, 5.5, 5.34, 5.23, 7.07, 6.49, 5.86, 5.32, 4.91],
  },
  poverty: {
    label: 'Penduduk miskin (September)',
    unit: '%',
    source: 'BPS, Berita Resmi Statistik Kemiskinan',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [11.13, 10.86, 10.12, 9.66, 9.22, 9.78, 9.71, 9.54, 9.36, 8.57],
  },
  exports: {
    label: 'Ekspor',
    unit: 'US$ miliar',
    source: 'BPS, Statistik Perdagangan Luar Negeri',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [150.37, 144.43, 168.83, 180.01, 167.68, 163.19, 231.61, 291.9, 258.82, 264.7],
  },
  imports: {
    label: 'Impor',
    unit: 'US$ miliar',
    source: 'BPS, Statistik Perdagangan Luar Negeri',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [142.74, 135.65, 156.89, 188.71, 170.72, 141.57, 196.27, 237.44, 221.93, 233.66],
  },
};

// Kartu indikator utama di beranda (angka terbaru + perbandingan tahun lalu).
export const KEY_INDICATORS = [
  { id: 'population', value: '281,6 jt', change: '+1,0% dari 2023', year: 2024, note: 'Penduduk (pertengahan tahun)' },
  { id: 'gdp', value: 'Rp22.139 T', change: '+5,03% (y-on-y)', year: 2024, note: 'PDB harga berlaku' },
  { id: 'gdpCapita', value: 'US$4.960', change: 'Rp78,6 jt per orang', year: 2024, note: 'PDB per kapita' },
  { id: 'inflation', value: '1,57%', change: 'dari 2,61% di 2023', year: 2024, note: 'Inflasi Desember (y-on-y)' },
  { id: 'unemployment', value: '4,91%', change: 'dari 5,32% di 2023', year: 2024, note: 'Pengangguran terbuka (Agu)' },
  { id: 'poverty', value: '8,57%', change: 'dari 9,36% di 2023', year: 2024, note: 'Penduduk miskin (Sep)' },
];

// Struktur PDB 2024 menurut lapangan usaha (BPS, harga berlaku).
export const GDP_SECTORS = [
  { name: 'Industri pengolahan', share: 18.98, growth: 4.43 },
  { name: 'Perdagangan besar dan eceran', share: 13.07, growth: 4.86 },
  { name: 'Pertanian, kehutanan, dan perikanan', share: 12.61, growth: 0.67 },
  { name: 'Konstruksi', share: 10.09, growth: 5.91 },
  { name: 'Pertambangan dan penggalian', share: 9.15, growth: 1.62 },
  { name: 'Lainnya (12 lapangan usaha)', share: 36.1, growth: 5.4 },
];

// Struktur umur penduduk, Februari 2026 (BPS; juta jiwa).
export const AGE_GROUPS = [
  { group: '0–4', value: 22.63 },
  { group: '5–9', value: 22.14 },
  { group: '10–14', value: 22.0 },
  { group: '15–19', value: 22.07 },
  { group: '20–24', value: 22.1 },
  { group: '25–29', value: 22.46 },
  { group: '30–34', value: 22.26 },
  { group: '35–39', value: 21.9 },
  { group: '40–44', value: 20.85 },
  { group: '45–49', value: 19.84 },
  { group: '50–54', value: 17.96 },
  { group: '55–59', value: 15.56 },
  { group: '60–64', value: 12.78 },
  { group: '65–69', value: 9.66 },
  { group: '70–74', value: 6.68 },
  { group: '75+', value: 6.37 },
];

// Provinsi terpadat, pertengahan 2024 (BPS; juta jiwa).
export const TOP_PROVINCES = [
  { name: 'Jawa Barat', pop: 50.35, share: 17.88, density: 1359 },
  { name: 'Jawa Timur', pop: 41.81, share: 14.85, density: 872 },
  { name: 'Jawa Tengah', pop: 37.89, share: 13.46, density: 1104 },
  { name: 'Sumatera Utara', pop: 15.6, share: 5.54, density: 214 },
  { name: 'Banten', pop: 12.43, share: 4.42, density: 1288 },
  { name: 'DKI Jakarta', pop: 10.7, share: 3.8, density: 16180 },
];

// Angkatan kerja (Sakernas Agustus; juta jiwa).
export const LABOUR = {
  years: [2020, 2021, 2022, 2023, 2024],
  labourForce: [138.22, 140.15, 143.72, 147.71, 152.11],
  employed: [128.45, 131.05, 135.3, 139.85, 144.64],
  source: 'BPS, Sakernas Agustus',
};

// Rilisan terbaru yang ditampilkan di beranda.
export const RELEASES = [
  { date: '5 Feb 2026', title: 'Pertumbuhan Ekonomi Indonesia Triwulan IV-2025: 5,11% (c-to-c)', tag: 'Ekonomi' },
  { date: '15 Jan 2026', title: 'Inflasi Desember 2025 dan perkembangan harga sepanjang 2025', tag: 'Harga' },
  { date: '5 Nov 2025', title: 'Keadaan Ketenagakerjaan Indonesia Agustus 2025', tag: 'Tenaga kerja' },
  { date: '15 Okt 2025', title: 'Profil Kemiskinan di Indonesia September 2025', tag: 'Sosial' },
  { date: '2 Sep 2025', title: 'Perkembangan Ekspor dan Impor Indonesia Juli 2025', tag: 'Perdagangan' },
  { date: '5 Mei 2025', title: 'Hasil Survei Penduduk Antar Sensus (SUPAS) 2025', tag: 'Penduduk' },
];

// Tabel penjelajah: satu baris per indikator.
export const INDICATORS = [
  { name: 'Jumlah penduduk', value: 281.6, unit: 'juta jiwa', year: 2024, category: 'Penduduk', source: 'BPS' },
  { name: 'Laju pertumbuhan penduduk', value: 1.11, unit: '% per tahun', year: 2024, category: 'Penduduk', source: 'BPS' },
  { name: 'Penduduk usia produktif (15–64 tahun)', value: 69.58, unit: '%', year: 2024, category: 'Penduduk', source: 'Dukcapil Kemendagri' },
  { name: 'Penduduk usia muda (0–14 tahun)', value: 22.95, unit: '%', year: 2024, category: 'Penduduk', source: 'Dukcapil Kemendagri' },
  { name: 'Penduduk usia tua (65+ tahun)', value: 7.46, unit: '%', year: 2024, category: 'Penduduk', source: 'Dukcapil Kemendagri' },
  { name: 'Rasio ketergantungan', value: 43.7, unit: 'per 100 usia produktif', year: 2024, category: 'Penduduk', source: 'Dukcapil Kemendagri' },
  { name: 'Kepadatan penduduk', value: 148, unit: 'jiwa/km²', year: 2024, category: 'Penduduk', source: 'BPS' },
  { name: 'PDB atas dasar harga berlaku', value: 22139.0, unit: 'Rp triliun', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'PDB per kapita', value: 4960.3, unit: 'US$', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Pertumbuhan ekonomi', value: 5.03, unit: '% (y-on-y)', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Kontribusi industri pengolahan terhadap PDB', value: 18.98, unit: '%', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Kontribusi perdagangan terhadap PDB', value: 13.07, unit: '%', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Kontribusi pertanian terhadap PDB', value: 12.61, unit: '%', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Ekspor', value: 264.7, unit: 'US$ miliar', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Impor', value: 233.66, unit: 'US$ miliar', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Surplus neraca perdagangan', value: 31.04, unit: 'US$ miliar', year: 2024, category: 'Ekonomi', source: 'BPS' },
  { name: 'Inflasi (Desember, y-on-y)', value: 1.57, unit: '%', year: 2024, category: 'Harga', source: 'BPS' },
  { name: 'Nilai tukar rupiah (31 Des)', value: 16157, unit: 'Rp/US$', year: 2024, category: 'Harga', source: 'Bank Indonesia' },
  { name: 'BI-Rate (Desember)', value: 6.0, unit: '%', year: 2024, category: 'Harga', source: 'Bank Indonesia' },
  { name: 'Tingkat pengangguran terbuka', value: 4.91, unit: '%', year: 2024, category: 'Tenaga kerja', source: 'BPS' },
  { name: 'Angkatan kerja', value: 152.11, unit: 'juta jiwa', year: 2024, category: 'Tenaga kerja', source: 'BPS' },
  { name: 'Penduduk bekerja', value: 144.64, unit: 'juta jiwa', year: 2024, category: 'Tenaga kerja', source: 'BPS' },
  { name: 'Upah rata-rata buruh', value: 3.04, unit: 'Rp juta/bulan', year: 2024, category: 'Tenaga kerja', source: 'BPS' },
  { name: 'Penduduk miskin', value: 8.57, unit: '%', year: 2024, category: 'Sosial', source: 'BPS' },
  { name: 'Indeks Pembangunan Manusia', value: 75.02, unit: 'poin', year: 2024, category: 'Sosial', source: 'BPS' },
  { name: 'Angka harapan hidup', value: 73.99, unit: 'tahun', year: 2024, category: 'Sosial', source: 'BPS' },
  { name: 'Penduduk Jawa Barat', value: 50.35, unit: 'juta jiwa', year: 2024, category: 'Penduduk', source: 'BPS' },
  { name: 'Penduduk Jawa Timur', value: 41.81, unit: 'juta jiwa', year: 2024, category: 'Penduduk', source: 'BPS' },
  { name: 'Penduduk Jawa Tengah', value: 37.89, unit: 'juta jiwa', year: 2024, category: 'Penduduk', source: 'BPS' },
];
