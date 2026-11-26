// charts.js — Grafik SVG tanpa pustaka: digambar dari data.js saja.
// Semua grafik memakai satu palet yang sama dan menyertakan label angka
// langsung pada grafiknya, supaya tetap terbaca saat diperkecil.

export const PALETTE = {
  ink: '#12324a',
  blue: '#0e6ba8',
  teal: '#0f8a7a',
  amber: '#d9930d',
  coral: '#c94f32',
  slate: '#5b7a8c',
  light: '#dcebf3',
  grid: '#dfe9ef',
};

const fmt = (n, d = 1) =>
  n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" ` +
    `preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">`;
}

// Grafik garis dengan titik dan label nilai di ujungnya.
export function lineChart({ years, values, unit, color = PALETTE.blue, height = 260, label = '' }) {
  const W = 640; const H = height; const L = 56; const R = 18; const T = 18; const B = 34;
  const min = Math.min(...values); const max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  const lo = min - pad; const hi = max + pad;
  const x = (i) => L + (i * (W - L - R)) / (years.length - 1);
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const gridVals = [0.25, 0.5, 0.75].map((f) => lo + f * (hi - lo));
  let s = svgOpen(W, H, label);
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="none"/>`;
  for (const g of gridVals) {
    s += `<line x1="${L}" y1="${y(g)}" x2="${W - R}" y2="${y(g)}" stroke="${PALETTE.grid}" stroke-width="1"/>` +
      `<text x="${L - 8}" y="${y(g) + 4}" text-anchor="end" font-size="11" fill="${PALETTE.slate}">${fmt(g, 0)}</text>`;
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  values.forEach((v, i) => {
    s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`;
  });
  // Label nilai pertama dan terakhir supaya tren terbaca tanpa hover.
  s += `<text x="${x(0)}" y="${y(values[0]) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${PALETTE.ink}">${fmt(values[0])}</text>`;
  s += `<text x="${x(values.length - 1)}" y="${y(values[values.length - 1]) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${PALETTE.ink}">${fmt(values[values.length - 1])}</text>`;
  years.forEach((yr, i) => {
    if (i % 2 === 0 || i === years.length - 1) {
      s += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="${PALETTE.slate}">${yr}</text>`;
    }
  });
  s += `<text x="${L}" y="${H - 10}" dy="0" font-size="11" fill="${PALETTE.slate}"></text>`;
  s += `<text x="${W - R}" y="${T - 4}" text-anchor="end" font-size="11" fill="${PALETTE.slate}">${unit}</text>`;
  return s + '</svg>';
}

// Grafik batang vertikal dengan label nilai di atas tiap batang.
export function barChart({ years, values, unit, color = PALETTE.teal, height = 260, label = '', decimals = 2 }) {
  const W = 640; const H = height; const L = 56; const R = 18; const T = 24; const B = 34;
  const min = Math.min(0, ...values); const max = Math.max(...values);
  const lo = min - (max - min) * 0.05; const hi = max + (max - min) * 0.12;
  const slot = (W - L - R) / years.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const y0 = y(0);
  let s = svgOpen(W, H, label);
  for (const f of [0.25, 0.5, 0.75]) {
    const g = lo + f * (hi - lo);
    s += `<line x1="${L}" y1="${y(g)}" x2="${W - R}" y2="${y(g)}" stroke="${PALETTE.grid}" stroke-width="1"/>` +
      `<text x="${L - 8}" y="${y(g) + 4}" text-anchor="end" font-size="11" fill="${PALETTE.slate}">${fmt(g, 0)}</text>`;
  }
  s += `<line x1="${L}" y1="${y0}" x2="${W - R}" y2="${y0}" stroke="${PALETTE.slate}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const bx = L + i * slot + (slot - bw) / 2;
    const by = Math.min(y(v), y0);
    const bh = Math.abs(y(v) - y0);
    const fill = v < 0 ? PALETTE.coral : color;
    s += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${PALETTE.ink}">${fmt(v, decimals)}</text>`;
    s += `<text x="${(bx + bw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="${PALETTE.slate}">${years[i]}</text>`;
  });
  s += `<text x="${W - R}" y="${T - 8}" text-anchor="end" font-size="11" fill="${PALETTE.slate}">${unit}</text>`;
  return s + '</svg>';
}

// Grafik batang horizontal berlabel (untuk provinsi dan sektor).
export function hbarChart({ rows, valueFmt = (v) => fmt(v), color = PALETTE.blue, label = '' }) {
  const rowH = 34; const W = 640; const H = rows.length * rowH + 14;
  const max = Math.max(...rows.map((r) => r.value));
  const L = 210; const R = 64;
  let s = svgOpen(W, H, label);
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const w = ((W - L - R) * r.value) / max;
    s += `<text x="${L - 10}" y="${y + 15}" text-anchor="end" font-size="12" fill="${PALETTE.ink}">${r.name}</text>`;
    s += `<rect x="${L}" y="${y + 2}" width="${Math.max(w, 2).toFixed(1)}" height="18" rx="3" fill="${r.color || color}"/>`;
    s += `<text x="${(L + w + 8).toFixed(1)}" y="${y + 16}" font-size="12" font-weight="700" fill="${PALETTE.ink}">${valueFmt(r.value)}</text>`;
  });
  return s + '</svg>';
}

// Piramida penduduk sederhana: satu batang per kelompok umur.
export function pyramidChart({ groups, label = '' }) {
  const rowH = 26; const W = 640; const H = groups.length * rowH + 30;
  const max = Math.max(...groups.map((g) => g.value));
  const L = 64; const R = 74;
  let s = svgOpen(W, H, label);
  s += `<text x="${W / 2}" y="14" text-anchor="middle" font-size="12" font-weight="700" fill="${PALETTE.ink}">Juta jiwa per kelompok umur</text>`;
  groups.forEach((g, i) => {
    const y = 22 + i * rowH;
    const w = ((W - L - R) * g.value) / max;
    const x = (W - w) / 2;
    s += `<text x="${W / 2 - w / 2 - 8}" y="${y + 13}" text-anchor="end" font-size="11" fill="${PALETTE.slate}">${g.group}</text>`;
    s += `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="16" rx="3" fill="${i % 2 ? PALETTE.teal : PALETTE.blue}"/>`;
    s += `<text x="${(W / 2 + w / 2 + 8).toFixed(1)}" y="${y + 13}" font-size="11" font-weight="700" fill="${PALETTE.ink}">${fmt(g.value)}</text>`;
  });
  return s + '</svg>';
}

// Donat komposisi dengan legenda angka.
export function donutChart({ rows, label = '' }) {
  const size = 260; const cx = size / 2; const cy = size / 2; const r = 92; const th = 34;
  const total = rows.reduce((a, b) => a + b.share, 0);
  const colors = [PALETTE.blue, PALETTE.teal, PALETTE.amber, PALETTE.coral, PALETTE.slate, '#9db8c6'];
  let s = svgOpen(size, size, label);
  let a0 = -Math.PI / 2;
  rows.forEach((row, i) => {
    const frac = row.share / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0); const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1); const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + (r - th) * Math.cos(a1); const yi1 = cy + (r - th) * Math.sin(a1);
    const xi0 = cx + (r - th) * Math.cos(a0); const yi0 = cy + (r - th) * Math.sin(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} ` +
      `L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${r - th} ${r - th} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    a0 = a1;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="800" fill="${PALETTE.ink}">${fmt(total, 0)}%</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${PALETTE.slate}">dari PDB 2024</text>`;
  s += '</svg>';
  let legend = '<ul class="legend">';
  rows.forEach((row, i) => {
    legend += `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>` +
      `${row.name} — <strong>${fmt(row.share)}%</strong></li>`;
  });
  legend += '</ul>';
  return `<div class="donut-wrap">${s}${legend}</div>`;
}
