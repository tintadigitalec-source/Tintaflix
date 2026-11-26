/* =====================================================================
   TINTAFLIX · CINE
   Motor de episodios animados con línea de tiempo sincronizada.
   - Un episodio es una lista de planos (shots) con duración calculada a
     partir del texto (ritmo de lectura) y de la composición.
   - Un reloj maestro (requestAnimationFrame) avanza el tiempo global.
   - Cada plano se arma con animaciones CSS; el reloj las controla con la
     Web Animations API (currentTime), así pausa, salto y velocidad quedan
     sincronizados con subtítulos, contadores y resaltados.
   ===================================================================== */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = s => String(s || '').replace(/<b>(.*?)<\/b>/g, '*$1*').replace(/\*\*(.+?)\*\*/g, '*$1*').replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const kw = s => esc(String(s || '')).replace(/\*(.+?)\*/g, '<span class="k">$1</span>');
  const clean = s => String(s || '').replace(/\*/g, '');
  const words = s => clean(s).split(/\s+/).filter(Boolean).length;
  const ICONS = n => (window.ICON ? window.ICON(n) : '');
  const fmt = s => { s = Math.max(0, Math.floor(s)); const m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0') };
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  let A = null; /* API de la app (la pasa app.js) */

  /* ---------------- subtítulos karaoke ---------------- */
  const CON = new Set(['y', 'e', 'o', 'u', 'ni', 'pero', 'porque', 'aunque', 'para', 'como', 'desde', 'hasta', 'sin', 'con', 'mientras', 'también', 'tampoco', 'entre', 'sino', 'después', 'antes', 'luego']);
  /* El texto es el narrador: frases de lectura (no subtítulos de 3-5 palabras).
     Cada frase dura según su extensión (≈2,5 palabras/s + 0,7 s) y sus palabras
     entran de forma progresiva durante el primer tercio de su ventana. */
  function tokens(n) {
    const W = []; let key = false, cur = null;
    const push = () => { if (cur && cur.w) W.push(cur); cur = null };
    for (const ch of String(n || '')) {
      if (ch === '*') { key = !key; continue }
      if (/\s/.test(ch)) { push(); continue }
      if (!cur) cur = { w: '', key: false };
      cur.w += ch; if (key) cur.key = true;
    }
    push();
    W.forEach(w => { const b = w.w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''); w.con = !w.key && CON.has(b); w.num = /\d/.test(w.w) && !w.key });
    return W;
  }
  function phrases(W) {
    const P = []; let g = [];
    const close = () => { if (g.length) P.push(g); g = [] };
    W.forEach((w, i) => {
      g.push(i);
      const stop = /[.?!:]$/.test(w.w), soft = /[,;]$/.test(w.w);
      if (stop && g.length >= 3) close();
      else if (soft && g.length >= 10) close();
      else if (g.length >= 16) close();
    });
    close();
    if (P.length > 1 && P[P.length - 1].length < 3) { const l = P.pop(); P[P.length - 1].push(...l) }
    return P;
  }
  const winOf = n => Math.max(2.3, n / 2.5 + .7);
  function needOf(n) { const W = tokens(n); return W.length ? .35 + phrases(W).reduce((a, g) => a + winOf(g.length), 0) + .25 : 0 }
  function parseKara(n, d) {
    const W = tokens(n); if (!W.length) return { W, G: [] };
    const P = phrases(W), wins = P.map(g => winOf(g.length)), tot = .35 + wins.reduce((a, b) => a + b, 0) + .25;
    const k = Math.max(1, (d - .6) / (tot - .6));
    let t = .35; const G = [];
    P.forEach((g, pi) => {
      const win = wins[pi] * k, rev = Math.min(1.3, win * .38);
      g.forEach((ix, j) => { W[ix].t = t + rev * j / Math.max(1, g.length) });
      G.push({ ix: g, t: t - .05, end: t + win }); t += win;
    });
    return { W, G };
  }
  /* ---------------- duraciones ---------------- */
  const EXTRA = { board: 2.8, bioOpen: 2.4, bioTL: 2.6, bioStamp: 1.6, bioCut: 1.8, bioEnd: 2.2, col: 2.4, open: 3.2, metroc: 2.4, cifra: 1.6, mapa: 1.8, doc: 2.6, metro: 1.8, titulo: 1.8, indice: 2.4, etiqueta: 1.0, palabra: 1.4, diag: 2.2, tl: 2.4, falta: 1.4, tunel: 1.6, avenida: 1.4, pagos: 1.6, dos: 2.0, mesa: 1.8, est: 1.6, calle: 1.8, baches: 1.8, abs: 1.6, reloj: 2.0, remate: 2.2, idea: 1.6, pasos: 1.6, sello: 1.4, arch: 1.6 };
  function shotDur(s) {
    if (s.d) return s.d;
    let d = words(s.n) / 2.6 + (EXTRA[s.c] || 1.5);
    if (s.c === 'falta') d += (s.items || []).reduce((a, x) => a + words(x), 0) / 3.2;
    if (s.c === 'tl') d += (s.items || []).length * .7;
    if (s.c === 'col' && s.B) d += ((s.B.steps || []).reduce((a, x) => a + words(x), 0) / 4.2) + (s.B.fig ? 1.2 : 0) + (s.B.doc ? 1.5 : 0);
    if (s.c === 'pasos') d += (s.items || []).reduce((a, x) => a + words(x), 0) / 3.4;
    if (s.c === 'bioTL') d += (s.items || []).reduce((a, x) => a + words(x[0] + ' ' + (x[1] || '')), 0) / 3.4;
    if (s.c === 'arch') d += (s.items || []).reduce((a, x) => a + words(x[0] + ' ' + (x[1] || '')), 0) / 3.4;
    if (s.c === 'sello') d += words(s.rest) / 3.2;
    if (s.c === 'indice') d += (s.items || []).length * .35;
    d = Math.max(d, needOf(s.n) + (s.c === 'open' ? 1.4 : s.c === 'col' ? .9 + (s.B && s.B.steps ? s.B.steps.length * .6 : 0) : .6));
    return Math.max(3.4, Math.round(d * 10) / 10);
  }

  /* ---------------- piezas SVG ---------------- */
  const SV = (vb, inner, cls = '') => `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${inner}</svg>`;
  const dd = (x, extra = '') => `style="--d:${(+x).toFixed(2)}s${extra ? ';' + extra : ''}"`;
  function torn(x, y, txt, fs, d, rot = -1.5, cls = 'a-pop') {
    const w = clean(txt).length * fs * .5 + fs * 1.8, h = fs * 2.1;
    return `<g transform="translate(${x},${y}) rotate(${rot})"><g class="${cls}" ${dd(d)}><image href="tex/rasgado2.png" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" preserveAspectRatio="none"/><text x="0" y="${fs * .36}" text-anchor="middle" font-size="${fs}" style="fill:#0b0b0c">${esc(clean(txt))}</text></g></g>`;
  }
  const pathD = (d, cls, delay, dur = 1.4, extra = '') => `<path d="${d}" pathLength="1" class="${cls} dr" style="--d:${delay.toFixed(2)}s;--dur:${dur}s" ${extra}/>`;
  const dots = (d, delay, cls = 'dots') => `<path d="${d}" class="${cls} a-fi ants" ${dd(delay)}/>`;
  const quito = 'M300 60 C350 58 372 110 360 170 C350 230 372 300 364 380 C356 460 372 540 352 610 C336 670 316 712 296 716 C270 712 250 668 244 610 C236 540 252 470 244 390 C236 310 250 240 242 170 C236 110 252 62 300 60Z';

  /* ---------------- composiciones ---------------- */
  const C = {};
  C.cifra = (s, X) => {
    const d = X.d; const one = v => typeof v === 'number' ? `<span data-cnt="0|${v}|.25|${Math.min(1.6, d * .3).toFixed(2)}">0</span>` : esc(v);
    const v = Array.isArray(s.v) ? `${one(s.v[0])}<span>–</span>${one(s.v[1])}` : one(s.v);
    return `<div class="comp c-cifra"><div class="box"><div class="num${Array.isArray(s.v) ? ' rng' : ''} a-slam" ${dd(.1)}>${s.pre ? `<span class="pre">${esc(s.pre)}</span>` : ''}${v}${s.unit ? `<span class="k u">${esc(s.unit)}</span>` : ''}</div>
      ${s.lbl ? `<span class="torn md a-drop" ${dd(d * .3, '--r:-2deg')}>${esc(s.lbl)}</span>` : ''}
      ${s.tags ? `<div class="tags">${s.tags.map((t, i) => `<span class="torn sm a-pop" ${dd(d * (.48 + i * .1), `--r:${i % 2 ? 2 : -2}deg`)}>${esc(t)}</span>`).join('')}</div>` : ''}</div></div>`;
  };
  C.mapa = (s, X) => {
    const d = X.d;
    return `<div class="comp c-mapa"><div class="wrap full">${SV('0 0 600 760', `
      ${pathD(quito, 'chalk tk', 0, 1.6)}
      <path d="M250 70 l50 -40 l50 40" pathLength="1" class="chalk th dr" style="--d:.9s;--dur:.6s"/>
      <text x="300" y="22" text-anchor="middle" font-size="22" class="a-fi" ${dd(1.1)}>NORTE</text>
      <circle cx="300" cy="380" r="16" class="fillw a-pop" ${dd(.5)}/>
      <circle cx="300" cy="380" r="30" class="chalk th a-pop" ${dd(.6)}/>
      ${torn(300, 440, 'Hipercentro', 30, .7, 1.5)}
      <circle cx="300" cy="130" r="11" class="fillw a-pop" ${dd(d * .18)}/>
      ${torn(430, 120, 'Calderón', 28, d * .2, -2)}
      ${dots('M300 148 C300 230 300 290 300 350', d * .28)}
      <path d="M470 330 C520 330 560 380 556 430 C552 480 510 500 470 492" pathLength="1" class="chalk dr" style="--d:${(d * .3).toFixed(2)}s"/>
      <circle cx="500" cy="420" r="11" class="fillw a-pop" ${dd(d * .34)}/>
      ${torn(505, 540, 'Los valles', 28, d * .36, 2)}
      ${dots('M488 416 C430 400 380 388 330 382', d * .42)}
      <g transform="translate(130,300)"><g class="a-slam" ${dd(d * .55)}>${burst(0, 0, 92)}<text x="0" y="-6" text-anchor="middle" font-size="28" style="fill:#0b0b0c">MÁS DE</text><text x="0" y="34" text-anchor="middle" font-size="46" style="fill:#0b0b0c">2 h</text></g></g>
    `)}</div><span class="note a-fi" ${dd(1)}>Esquema ilustrativo · no está a escala</span></div>`;
  };
  function burst(cx, cy, r, n = 16) {
    let p = ''; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2, rr = i % 2 ? r * .74 : r; p += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1) }
    return `<path d="${p}Z" fill="#f4f1e9"/><path d="${p}Z" fill="url(#halftone)" opacity=".5"/>`;
  }
  C.doc = (s, X) => {
    const d = X.d, M = (window.DOCMETA || {})[s.doc] || { hl: {} };
    const boxes = (s.hl || []).flatMap(k => (M.hl[k] || []));
    const n = boxes.length || 1, span = d * .5;
    const first = boxes[0] || [0, 0, 100, 100];
    const ox = s.ox || ((first[0] + first[2]) / 2) + '%', oy = s.oy || ((first[1] + first[3]) / 2) + '%';
    return `<div class="comp c-doc"><div class="sheet a-drop" ${dd(.05, '--r:-1.6deg')}><span class="ptag torn sm a-pop" ${dd(.5, '--r:3deg')}>${esc(s.tag || 'Plan de trabajo')}</span>
      <div class="clip"><div class="zoom" style="--z:${s.z || 1.15};--zp:${s.zp || (M.w / M.h > 2.2 ? 2 : M.w / M.h > 1.3 ? 1.3 : (s.z || 1.15))};--ox:${ox};--oy:${oy}"><div class="pg"><img src="docs/${esc(s.doc)}.jpg" alt="Fragmento del plan de trabajo, ${esc(s.tag || '')}" width="${M.w || 600}" height="${M.h || 400}">
      ${boxes.map((b, i) => `<span class="hl a-hl" style="left:${b[0]}%;top:${b[1]}%;width:${b[2] - b[0]}%;height:${b[3] - b[1]}%;--d:${(d * .22 + i * span / n).toFixed(2)}s"></span>`).join('')}</div></div></div></div></div>`;
  };
  C.metro = (s, X) => {
    const d = X.d, ram = s.mode === 'ramales';
    const st = [110, 200, 290, 380, 470, 560, 650];
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 760', `
      ${pathD('M300 650 L300 110', 'chalk tk', .1, 1.3)}
      ${st.map((y, i) => `<circle cx="300" cy="${y}" r="${i === 0 || i === 6 ? 13 : 8}" class="fillw a-pop" ${dd(.3 + i * .12)}/>`).join('')}
      ${torn(160, 650, 'Quitumbe', 28, .9, -2)}${torn(440, 110, 'El Labrador', 28, 1.1, 2)}
      <g class="a-fi" ${dd(.9)}><g style="offset-path:path('M300 650 L300 110');offset-rotate:0deg;animation:ride ${(d * .9).toFixed(1)}s linear .9s both"><rect x="-14" y="-26" width="28" height="52" rx="8" class="filly"/></g></g>
      ${ram ? `
        <path d="M300 110 C330 70 380 50 440 36" class="dots a-fi" ${dd(d * .2)}/>
        <path d="M300 380 C380 380 440 410 520 450" class="dots a-fi" ${dd(d * .32)}/>
        <path d="M300 650 C280 690 250 720 200 740" class="dots a-fi" ${dd(d * .44)}/>
        ${torn(490, 70, 'Norte', 26, d * .24, 3)}${torn(520, 500, 'Valles', 26, d * .36, -3)}${torn(130, 720, 'Sur', 26, d * .48, 2)}
        ${torn(150, 300, 'Ramales: en estudio', 30, d * .6, -3)}` : `
        ${torn(150, 380, 'Una sola línea', 32, d * .45, -3)}`}
    `)}</div></div>`;
  };
  C.titulo = (s, X) => {
    const e = X.e, r = X.r, t = String(e.t), parts = t.split(' ');
    const tk = parts.length > 2 ? parts.slice(0, -2).join(' ') + ' <span class="k">' + esc(parts.slice(-2).join(' ')) + '</span>' : '<span class="k">' + esc(t) + '</span>';
    const ph = A && A.foto ? A.foto(r, 'clg') : null;
    return `<div class="comp c-titulo">${ph ? `<img class="foto a-fi" ${dd(.6)} src="${esc(ph)}" alt="">` : `<span class="bignum a-fi" ${dd(.5)}>${String(e.n).padStart(2, '0')}</span>`}
      <div class="box"><span class="torn md a-drop" ${dd(.1, '--r:-2deg')}>Capítulo ${e.n} · ${esc(e.k)}</span>
      <h2 class="a-up" ${dd(.35)}>${tk}</h2>
      <p class="cwho a-fi" ${dd(.9)}>${esc(r.short)}<small>${esc(r.org)} · Plan de trabajo 2027–2031</small></p></div>
      <img class="ttf a-fi" ${dd(1.2)} src="img/tintaflix-logo.png" alt=""></div>`;
  };
  C.indice = (s, X) => {
    const d = X.d, L = s.items || [];
    return `<div class="comp c-indice"><div class="grid" style="--cols:${L.length > 4 ? Math.ceil(L.length / 2) : L.length}">${L.map((x, i) => `<div class="it a-pop" ${dd(.25 + i * (d * .45 / Math.max(1, L.length)))}><span class="cic"><b>${i + 1}</b>${ICONS(x.icon)}</span><span>${esc(x.t)}</span></div>`).join('')}</div></div>`;
  };
  const ring = d => `<svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" pathLength="1" class="chalk dr" style="--d:${d}s;--dur:.9s;transform:rotate(-90deg);transform-origin:50% 50%"/></svg>`;
  C.etiqueta = (s, X) => `<div class="comp c-etiqueta"><div class="box"><span class="cic a-pop" ${dd(.05)}>${ring(.1)}${ICONS(s.icon).replace('<svg ', '<svg class="icon" ')}</span>
      <span class="num a-fi" ${dd(.3)}>Propuesta ${s.i}${X.np ? ' de ' + X.np : ''}</span><h3 class="a-up" ${dd(.45)}>${esc(s.t)}</h3></div></div>`;
  C.palabra = (s, X) => {
    const d = X.d;
    return `<div class="comp c-palabra"><div class="box"><div class="big a-slam" ${dd(.15)}>${esc(s.big)}<svg class="uline" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M2 6 C30 2 70 9 98 4" pathLength="1" class="ychalk dr" style="--d:${(d * .25).toFixed(2)}s;--dur:.7s;stroke-width:1.6;vector-effect:non-scaling-stroke;stroke-width:5px"/></svg></div>
      ${s.vs ? `<div class="vs a-fi" ${dd(d * .35)}><span>no</span><s>${esc(s.vs[1])}</s></div>` : ''}
      ${s.sub ? `<p class="sub a-up" ${dd(d * .45)}>${esc(s.sub)}</p>` : ''}</div></div>`;
  };
  C.diag = (s, X) => {
    const d = X.d, N = s.nodes || [], O = s.outer || [];
    const cx = 300, cy = 330; const pos = (i, n, R, a0) => { const a = a0 + (Math.PI * 2 * i) / n; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R * .95] };
    const np = N.map((_, i) => pos(i, N.length, 220, N.length === 2 ? -Math.PI * .8 : -Math.PI / 2 - Math.PI / N.length));
    const op = O.map((_, i) => [150 + i * 300, 640]);
    return `<div class="comp c-diag"><div class="wrap full">${SV('0 0 600 720', `
      ${np.map(([x, y], i) => dots(`M${cx} ${cy} L${x.toFixed(0)} ${y.toFixed(0)}`, d * (.18 + i * .1))).join('')}
      ${op.map(([x, y], i) => dots(`M${cx} ${cy + 40} L${x} ${y - 30}`, d * (.45 + i * .08), 'dotsw')).join('')}
      <circle cx="${cx}" cy="${cy}" r="120" class="chalk th a-fi" ${dd(.2)} stroke-dasharray="4 10"/>
      ${torn(cx, cy, s.center, 34, .1, -2)}
      ${N.map((t, i) => torn(np[i][0], np[i][1], t, 30, d * (.24 + i * .1), i % 2 ? 2 : -2)).join('')}
      ${O.map((t, i) => torn(op[i][0], op[i][1], t, 28, d * (.5 + i * .08), i % 2 ? -2 : 2)).join('')}
    `)}</div></div>`;
  };
  C.tl = (s, X) => {
    const d = X.d, L = s.items || [], n = L.length;
    return `<div class="comp c-tl"><div class="wrap"><svg viewBox="0 0 40 100" preserveAspectRatio="none" aria-hidden="true"><path d="M20 0 L20 100" pathLength="1" class="chalk dr" style="--d:.1s;--dur:1.2s;vector-effect:non-scaling-stroke"/></svg>
      ${L.map(([y, t], i) => { const top = n === 1 ? 45 : 6 + i * (74 / (n - 1)); return `<span style="position:absolute;left:0;width:8cqmin;top:${top}%;height:0"><svg viewBox="0 0 40 40" style="position:absolute;left:0;top:-4cqmin;width:8cqmin;height:8cqmin;overflow:visible"><circle cx="20" cy="20" r="9" class="filly a-pop" ${dd(.3 + i * (d * .55 / n))}/></svg></span>
      <div class="it a-left" style="top:${top}%;--d:${(.35 + i * (d * .55 / n)).toFixed(2)}s"><span class="y">${esc(y)}</span><span class="t">${esc(t)}</span></div>` }).join('')}</div></div>`;
  };
  C.falta = (s, X) => {
    const d = X.d, L = s.items || [];
    return `<div class="comp c-falta"><div class="box"><svg class="lupa" viewBox="0 0 100 100" aria-hidden="true">${pathD('M42 14 a28 28 0 1 1 -0.1 0', 'chalk tk', .05, .8)}${pathD('M62 62 L88 88', 'chalk tk', .6, .4)}<text x="42" y="54" text-anchor="middle" font-size="34" class="a-pop" style="--d:.8s;fill:var(--y);font-family:Things,Instrument Serif">?</text></svg>
      <div class="hd a-up" ${dd(.2)}>Lo que el plan <span class="k">no dice</span></div>
      <div class="items">${L.map((t, i) => `<span class="torn md a-drop" ${dd(d * .22 + i * (d * .5 / Math.max(1, L.length)), `--r:${i % 2 ? 1.5 : -1.5}deg`)}>${esc(t)}</span>`).join('')}</div></div></div>`;
  };
  C.tunel = (s, X) => {
    const d = X.d;
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 700', `
      ${pathD('M0 470 L90 330 L150 380 L250 190 L330 290 L410 220 L520 360 L600 300', 'chalk tk', .05, 1.4)}
      ${pathD('M120 470 L120 420 C120 360 220 360 220 420 L220 470', 'chalk tk', .7, .8)}
      <path d="M0 470 L600 470" class="chalk" />
      <g style="offset-path:path('M -40 452 L 640 452');animation:ride ${(d * .5).toFixed(1)}s linear .8s infinite"><rect x="-14" y="-10" width="28" height="18" rx="4" class="fillw"/></g>
      ${pathD('M330 470 L330 420 C330 360 430 360 430 420 L430 470', 'ychalk', d * .35, 1)}
      ${torn(170, 540, 'Túnel actual', 26, .9, -2)}${torn(400, 560, 'Segundo túnel (propuesta)', 26, d * .42, 2)}
      ${torn(90, 600, 'Quito', 24, 1.1, -3)}${torn(500, 640, 'Cumbayá–Tumbaco', 24, 1.2, 2)}
    `)}</div></div>`;
  };
  C.avenida = (s, X) => {
    const d = X.d;
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 760', `
      <path d="${quito}" class="chalk th a-fi" style="--d:0s;opacity:.45"/>
      <circle cx="300" cy="380" r="13" class="fillw a-pop" ${dd(.3)}/>${torn(230, 380, 'Centro', 26, .4, -2)}
      ${pathD('M300 690 C380 640 400 560 392 470 C384 380 400 290 392 200 C386 140 360 100 320 70', 'ychalk', .5, 1.6, 'style="stroke-width:6"')}
      <g style="offset-path:path('M300 690 C380 640 400 560 392 470 C384 380 400 290 392 200 C386 140 360 100 320 70');animation:ride ${(d * .7).toFixed(1)}s linear 1.4s both"><rect x="-10" y="-16" width="20" height="32" rx="5" class="fillw"/></g>
      ${torn(500, 420, 'Av. Simón Bolívar', 28, d * .3, 3)}
      ${torn(300, 735, 'Sur', 24, d * .4, -2)}${torn(300, 30, 'Norte', 24, d * .45, 2)}
    `)}</div></div>`;
  };
  const card = (x, y, lbl, d, rot) => `<g transform="translate(${x},${y}) rotate(${rot})"><g class="a-drop" ${dd(d)}><rect x="-90" y="-56" width="180" height="112" rx="14" class="chalk tk"/><circle cx="-48" cy="-14" r="16" class="chalk"/><path d="M-20 -20 h80 M-20 0 h56" class="chalk th"/><text x="0" y="42" text-anchor="middle" font-size="26">${esc(lbl)}</text></g></g>`;
  C.pagos = (s, X) => {
    const d = X.d;
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 700', `
      ${card(150, 160, 'Metro', .2, -8)}${card(440, 250, 'Bus', .5, 6)}${card(200, 430, 'Alimentador', .8, -3)}
      ${torn(430, 470, 'poco integrado', 30, d * .35, 3)}
      <g transform="translate(470,600)"><g class="a-pop" ${dd(d * .55)}><circle r="44" class="filly"/><text y="18" text-anchor="middle" font-size="54" style="fill:#0b0b0c">$</text></g></g>
      ${torn(250, 620, 'economía familiar', 28, d * .6, -2)}
    `)}</div></div>`;
  };
  C.dos = (s, X) => {
    const d = X.d;
    return `<div class="comp c-dos"><div class="cols">
      <div class="col a-left" ${dd(.15)}>${SV('0 0 200 160', `<circle cx="40" cy="80" r="26" class="chalk tk"/><circle cx="160" cy="80" r="26" class="chalk tk"/>${dots('M66 80 L134 80', .5)}<text x="40" y="90" text-anchor="middle" font-size="26">M</text><text x="160" y="90" text-anchor="middle" font-size="26">B</text>`)}<span class="torn md">Integración física</span><span class="t">Pasar de un servicio a otro sin dar vueltas</span></div>
      <div class="col a-right" ${dd(d * .42)}>${SV('0 0 200 160', `<rect x="40" y="36" width="120" height="84" rx="12" class="chalk tk"/><circle cx="76" cy="70" r="14" class="filly"/><path d="M98 64 h44 M98 84 h30" class="chalk th"/>`)}<span class="torn md">Integración tarifaria</span><span class="t">Un pago común entre Metro, buses y alimentadores</span></div></div></div>`;
  };
  C.mesa = (s, X) => {
    const d = X.d, S = s.seats || [];
    const P = S.map((_, i) => { const a = -Math.PI / 2 + (Math.PI * 2 * i) / S.length; return [300 + Math.cos(a) * 210, 330 + Math.sin(a) * 200] });
    return `<div class="comp c-diag"><div class="wrap full">${SV('0 0 600 680', `
      ${pathD('M300 230 a100 100 0 1 1 -0.1 0', 'chalk tk', .1, 1)}
      ${torn(300, 330, 'Mesa de movilidad', 30, .7, -2)}
      ${P.map(([x, y], i) => dots(`M300 330 L${x.toFixed(0)} ${y.toFixed(0)}`, d * (.25 + i * .12))).join('')}
      ${S.map((t, i) => torn(P[i][0], P[i][1], t, 30, d * (.3 + i * .12), i % 2 ? 2 : -2)).join('')}
    `)}</div></div>`;
  };
  C.est = (s, X) => {
    const d = X.d;
    return `<div class="comp c-est"><div class="box"><div class="burst a-slam" ${dd(.1)}><svg viewBox="-110 -110 220 220" class="drift-s">${burst(0, 0, 106, 18)}</svg><b>${esc(s.v)}</b></div>
      ${s.lbl ? `<span class="torn md a-drop" ${dd(d * .3, '--r:-2deg')} style="white-space:normal;max-width:84cqw;text-align:center">${esc(s.lbl)}</span>` : ''}</div></div>`;
  };
  C.calle = (s, X) => {
    const d = X.d;
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 640', `
      ${pathD('M20 420 L580 420', 'chalk tk', .05, .8)}
      ${pathD('M20 380 L170 380 L170 420', 'chalk', .4, .6)}
      ${pathD('M430 380 L580 380 L580 420', 'chalk', .5, .6)}
      <path d="M190 400 L410 400" class="dotsw a-fi" ${dd(.8)}/>
      <g class="a-up" ${dd(d * .2)}><circle cx="95" cy="250" r="16" class="chalk tk"/><path d="M95 266 L95 330 M95 285 L70 310 M95 285 L120 310 M95 330 L75 372 M95 330 L115 372" class="chalk tk"/></g>
      <g class="a-up" ${dd(d * .32)}><circle cx="250" cy="350" r="30" class="chalk tk"/><circle cx="350" cy="350" r="30" class="chalk tk"/><path d="M250 350 L290 300 L350 350 M290 300 L320 300 M275 290 L300 290" class="chalk tk"/></g>
      <g class="a-up" ${dd(d * .44)}><circle cx="505" cy="250" r="16" class="chalk tk"/><path d="M505 266 L505 330 M505 285 L480 310 M505 285 L530 310 M505 330 L485 372 M505 330 L525 372" class="chalk tk"/></g>
      ${torn(110, 490, 'Aceras seguras', 26, d * .3, -2)}${torn(300, 540, 'Ciclovías', 26, d * .42, 2)}${torn(480, 490, 'Peatonalización', 26, d * .54, -2)}
    `)}</div></div>`;
  };
  C.baches = (s, X) => {
    const d = X.d, H = [[300, 260, 40], [240, 380, 60], [370, 470, 70], [290, 590, 80]];
    return `<div class="comp c-ilus"><div class="wrap">${SV('0 0 600 700', `
      ${pathD('M250 120 L60 680', 'chalk tk', .05, 1)}${pathD('M350 120 L540 680', 'chalk tk', .1, 1)}
      <path d="M300 130 L300 680" class="dotsw a-fi" ${dd(.6)}/>
      ${H.map(([x, y, r], i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .35}" class="chalk tk a-fi" ${dd(.6 + i * .15)}/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .35}" class="filly a-pop" ${dd(d * (.35 + i * .1))}/>`).join('')}
      ${torn(150, 90, 'Barrial y rural', 28, d * .3, -3)}
    `)}</div></div>`;
  };
  C.abs = (s, X) => `<div class="comp c-abs"><div class="ink"></div>${SV('0 0 600 600', Array.from({ length: 9 }, (_, i) => `<path d="M${-50 + i * 20} ${620 - i * 10} C ${150 + i * 25} ${380 - i * 30}, ${380 - i * 10} ${260 + i * 22}, ${660} ${-20 + i * 40}" class="${i % 3 ? 'dotsw' : 'dots'} ants" style="opacity:${.3 + (i % 3) * .2}"/>`).join(''), 'lines')}<div class="box a-slam" ${dd(.3)}>${kw(s.t)}</div></div>`;
  C.reloj = (s, X) => {
    const d = X.d;
    return `<div class="comp c-cifra"><div class="box">${SV('0 0 200 200', `${pathD('M100 18 a82 82 0 1 1 -0.1 0', 'chalk tk', .05, 1)}${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<path d="M${100 + Math.sin(a) * 70} ${100 - Math.cos(a) * 70} L${100 + Math.sin(a) * 78} ${100 - Math.cos(a) * 78}" class="chalk th a-fi" ${dd(.4 + i * .04)}/>` }).join('')}<g class="spin" style="--d:.6s;--dur:${(d * .5).toFixed(1)}s;--r0:0deg;--r1:-720deg;transform-origin:100px 100px;transform-box:view-box"><path d="M100 100 L100 40" class="ychalk" style="stroke-width:6"/></g><circle cx="100" cy="100" r="6" class="filly"/>`, '').replace('<svg ', '<svg style="width:clamp(120px,40cqmin,380px);height:auto" ')}
      <div class="num rng a-fi" ${dd(.4)}><span data-cnt="${s.from}|${s.to}|.6|${(d * .5).toFixed(1)}">${s.from}</span><span class="k">minutos</span></div>
      <span class="torn md a-drop" ${dd(d * .55, '--r:-2deg')}>Meta 2031 · ruralidad–hipercentro</span></div></div>`;
  };
  C.remate = (s, X) => {
    const d = X.d, html = esc(s.t).replace(/\*(.+?)\*/g, `<span class="k">$1<svg viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M2 6 C30 2 70 9 98 4" pathLength="1" class="ychalk dr" style="--d:${(d * .4).toFixed(2)}s;--dur:.7s;stroke-width:6px;vector-effect:non-scaling-stroke;filter:none"/></svg></span>`);
    return `<div class="comp c-remate"><div class="paper a-wipe" ${dd(.05)}></div><div class="txt a-up" ${dd(.45)}>${html}</div></div>`;
  };

  /* ===== MOTION COLLAGE: Metro (prueba de dirección de arte) =====
     Capas: 1 fondo · 2 materiales (cinta, papel) · 3 foto recortada de Quito · 4 mapa a tiza
     5 tipografía cinética · 6 documento y énfasis · 7 cámara. Los tiempos se anclan a palabras
     de la narración (s.k.W[i].t), así imagen y subtítulo avanzan juntos. */
  C.metroc = (s, X) => {
    const W = (s.k && s.k.W) || [], at = re => { const i = W.findIndex(w => re.test(w.w)); return i < 0 ? 0 : W[i].t };
    const tMetro = at(/^Metro/), tNorte = at(/^norte/), tSur = at(/^sur$/), tVal = at(/^valles/), tTren = at(/^tren/), tEst = at(/^estudios$/), t28 = at(/^2028/), tCons = at(/^Construir/), tCred = at(/^crédito/);
    const ph = (window.CIUDAD_FOTOS || {}).quito || [];
    const letters = 'METRO'.split('').map((l, i) => `<span class="cl ${i % 2 ? 'inv' : ''}" style="--d:${(Math.max(.15, tMetro - .5) + i * .07).toFixed(2)}s;--r:${[-4, 3, -2, 5, -3][i]}deg">${l}</span>`).join('');
    return `<div class="comp c-mc">
      <div class="mc-photo" style="--d:0s;--d2:${(tNorte - .3).toFixed(2)}s"><img src="${ph[2] || ''}" alt="Vista aérea de Quito"><img class="tp t1" src="tex/cinta.webp" alt=""><img class="tp t2" src="tex/cinta.webp" alt=""></div>
      <div class="mc-word" style="--d3:${(tEst - .2).toFixed(2)}s">${letters}</div>
      <div class="mc-train" style="--d:${(tTren - .6).toFixed(2)}s"><svg viewBox="0 0 420 90" aria-hidden="true"><defs><pattern id="pp" width="420" height="90" patternUnits="userSpaceOnUse"><image href="tex/rasgado2.png" x="-60" y="-30" width="540" height="150" preserveAspectRatio="none"/></pattern></defs>
        <path d="M6 70 L6 30 Q8 12 40 10 L392 10 Q414 12 414 40 L414 70 Z" fill="url(#pp)" stroke="#111" stroke-width="2"/>${[60, 130, 200, 270, 340].map(x => `<rect x="${x}" y="22" width="44" height="22" fill="#111"/>`).join('')}<rect x="0" y="52" width="420" height="7" fill="var(--y)"/>${[50, 110, 310, 370].map(x => `<circle cx="${x}" cy="76" r="9" fill="#111"/>`).join('')}</svg></div>
      <div class="mc-map" style="--dm:${(tCons - .6).toFixed(2)}s">${SV('0 0 600 760', `
        ${pathD(quito, 'chalk tk', tNorte - .6, 1.4)}
        ${pathD('M300 600 L300 170', 'chalk tk', tNorte - .2, 1)}
        <circle cx="300" cy="170" r="10" class="fillw a-pop" ${dd(tNorte)}/><circle cx="300" cy="600" r="10" class="fillw a-pop" ${dd(tNorte)}/>
        <path d="M300 170 C320 120 360 80 420 50" class="dots a-fi ants" ${dd(tNorte)}/>${torn(470, 80, 'Norte', 30, tNorte, 3)}
        <path d="M300 600 C282 650 250 690 200 720" class="dots a-fi ants" ${dd(tSur)}/>${torn(140, 700, 'Sur', 30, tSur, -2)}
        <path d="M300 390 C380 390 450 420 540 470" class="dots a-fi ants" ${dd(tVal)}/>${torn(500, 520, 'Valles', 30, tVal, -3)}
        ${torn(150, 380, 'Trazado sin definir', 22, tVal + .4, -2)}`)}</div>
      <div class="mc-est" style="--d:${(tEst - .1).toFixed(2)}s"><span class="k">estudios</span><i class="hlb" style="--d:${(tEst + .25).toFixed(2)}s"></i></div>
      <div class="mc-yr a-slam" style="--d:${(t28 - .15).toFixed(2)}s"><svg viewBox="-110 -110 220 220">${burst(0, 0, 104, 18)}</svg><b>2028</b><span class="torn sm" style="--r:3deg">estudios: inicio 2028 · meta 2031</span></div>
      <div class="mc-doc" style="--d:${(tCons - .5).toFixed(2)}s"><div class="win"><div class="inner"><img class="pg" src="docs/p7-costo.jpg" alt="Plan de César Díaz, p. 7: la construcción integral excede el financiamiento de un periodo"><i class="hl" style="--d:${(tCons + .3).toFixed(2)}s"></i></div></div><img class="tp" src="tex/cinta.webp" alt=""><span class="torn sm" style="--r:-3deg">Plan de trabajo · p. 7</span></div>
      <div class="mc-cred a-drop" style="--d:${(tCred - .3).toFixed(2)}s;--r:-2deg"><span class="torn md">Construcción completa: crédito multilateral adicional</span></div>
    </div>`;
  };
  /* =====================================================================
     FOTOMONTAJE CONCEPTUAL · composiciones por capas
     Capa 0: papeles de color · 1: escenario de fondo · 2: objetos y personas
     3: tipografía (Bebas Neue / Open Sans) · 4: cifras, documentos, pasos.
     Cada objeto tiene tres envolturas: .ly (posición, cambia de la fase A
     a la B), .en (entrada) y .fl (movimiento propio durante el plano).
     Los recursos salen de los collages de referencia de Tinta (clg/*.webp):
     son ilustrativos, no registran obras ni hechos reales.
     ===================================================================== */
  const PAL = { mov: ['#e5484d', '#ffd21f', '#f3c6c0'], agua: ['#2f6fb0', '#ffd21f', '#bcd6ee'], seg: ['#d93a2b', '#f5b301', '#3a3a3a'], amb: ['#3f8f3a', '#ffd21f', '#cfe3b8'], doc: ['#e5484d', '#ffd21f', '#d9d4c7'] };
  const BACK = { mov: ['mov-basilica', 'mov-volcan', 'mov-edificios'], agua: ['agua-basilica', 'agua-volcan', 'agua-represa'], seg: ['seg-plaza', 'seg-paradanoche', 'mov-basilica'], amb: ['amb-cascada', 'mov-volcan', 'amb-arroyo'] };
  const POOL = {
    mov: ['mov-bus', 'mov-metro', 'mov-ciclista', 'mov-semaforo', 'mov-cono', 'mov-parada', 'mov-viaducto', 'mov-tunel', 'mov-via', 'mov-arbol', 'mov-mapa', 'mov-barrera', 'mov-paso'],
    agua: ['agua-grifo', 'agua-tubo', 'agua-tanque', 'agua-obrero', 'agua-vaso', 'agua-nube', 'agua-planta', 'agua-descarga', 'agua-salpicadura', 'agua-represa'],
    seg: ['seg-guardia', 'seg-camara', 'seg-patrullero', 'seg-radio', 'seg-peatones', 'seg-municipio', 'seg-mapaaereo', 'mov-cono', 'seg-paradanoche'],
    amb: ['amb-guayacan', 'amb-brote', 'amb-reciclaje', 'amb-solar', 'amb-colibri', 'amb-oso', 'amb-respira', 'amb-ciclista', 'amb-hojas', 'amb-planta', 'amb-tortuga', 'amb-teleferico', 'amb-arroyo']
  };
  const KW = [
    [/metro|tren|ferro|riel/i, 'mov-metro'], [/bus|trole|ecov|alimentador|transporte p[uú]blico|flota|rutas?\b/i, 'mov-bus'], [/bici|ciclo/i, 'mov-ciclista'],
    [/sem[aá]for|tr[aá]nsito|intersecc|agentes? de tr/i, 'mov-semaforo'], [/t[uú]nel/i, 'mov-tunel'], [/paso (a desnivel|elevado)|viaduct|intercambiador|puente|elevad/i, 'mov-viaducto'],
    [/vial|v[ií]as?\b|calles?|avenida|asfalt|pavimen|bache/i, 'mov-via'], [/parada|estaci[oó]n|terminal|andén/i, 'mov-parada'], [/obra|mantenimiento|reparaci/i, 'mov-cono'], [/peat|acera|camin/i, 'mov-paso'], [/mapa|territor|sector|zona|parroquia|barrio/i, 'mov-mapa'],
    [/agua potable|grifo|llave|suministro|servicio de agua|abastec/i, 'agua-grifo'], [/tuber|red(es)? de|alcantarill|colector|conducci/i, 'agua-tubo'], [/reserv|tanque|almacen/i, 'agua-tanque'],
    [/t[eé]cnic|cuadrilla|obrer|trabajador|operador/i, 'agua-obrero'], [/consumo|calidad|potab|hogar|famil/i, 'agua-vaso'], [/lluvia|clim|inund|pluvial|riesgo/i, 'agua-nube'], [/planta|tratamiento|depura/i, 'agua-planta'],
    [/descarga|r[ií]o|quebrada|aguas servidas|residual/i, 'agua-descarga'], [/represa|embalse|captaci|fuente|p[aá]ramo|cuenca/i, 'agua-represa'], [/p[eé]rdida|fuga|tarifa|medidor/i, 'agua-salpicadura'],
    [/polic|agente|guardia|vigila|patrull|uniform|cuerpo de/i, 'seg-guardia'], [/c[aá]mara|videovig|monitoreo|anal[ií]tica|tecnolog/i, 'seg-camara'], [/patrull|veh[ií]cul|respuesta|reacci/i, 'seg-patrullero'],
    [/ecu ?911|radio|comunicaci|alarma|bot[oó]n|alerta|coordinaci/i, 'seg-radio'], [/comunidad|vecin|ciudadan|participaci|organizaci|brigada|j[oó]venes|prevenci[oó]n/i, 'seg-peatones'], [/municip|institucion|secretar[ií]a|consejo|gobierno|ordenanza/i, 'seg-municipio'],
    [/datos|inteligencia|focaliz|mapa del delito|georref|cr[ií]tic/i, 'seg-mapaaereo'], [/espacio p[uú]blico|parque|plaza|iluminaci|luminaria|recuper/i, 'seg-plaza'],
    [/[aá]rbol|arboriz|reforest|verde|bosque/i, 'amb-guayacan'], [/siembra|vivero|huerto|agricult|semilla/i, 'amb-brote'], [/reciclaj|residuo|basura|desecho|relleno|clasific/i, 'amb-reciclaje'],
    [/solar|energ[ií]a|renovable|el[eé]ctric|emisi/i, 'amb-solar'], [/biodivers|fauna|especie|protegid|conservaci/i, 'amb-colibri'], [/aire|contamin|respira|calidad del aire/i, 'amb-respira'], [/cable|telef[eé]rico/i, 'amb-teleferico'], [/fauna urbana|animal/i, 'amb-oso']
  ];
  const AR = n => (window.CLG_AR || {})[n] || 1;
  function pickEls(th, text, seed, n = 4) {
    const out = [], pool = POOL[th] || POOL.mov;
    KW.forEach(([re, el]) => { if (re.test(text) && !out.includes(el) && el.startsWith(th)) out.push(el) });
    KW.forEach(([re, el]) => { if (re.test(text) && !out.includes(el) && out.length < 2) out.push(el) });
    let i = seed; while (out.length < n) { const el = pool[i++ % pool.length]; if (!out.includes(el)) out.push(el) }
    return out.slice(0, n);
  }
  /* posiciones [x %, y %, ancho] · fase A y fase B · vertical (P) y horizontal (L) */
  /* fase A deja libre la franja central (46–64 %) para leer; fase B libera la zona de cifras/pasos */
  const SLOTS = [
    { P: { A: [[50, 33, 64], [17, 84, 34], [84, 82, 30], [86, 95, 22]], B: [[76, 86, 40], [16, 90, 26], [118, 38, 30], [118, 80, 30]] },
      L: { A: [[72, 48, 56], [92, 80, 26], [90, 22, 24], [56, 88, 20]], B: [[80, 50, 44], [93, 82, 22], [93, 20, 20], [118, 80, 24]] } },
    { P: { A: [[52, 34, 62], [84, 85, 32], [16, 82, 30], [14, 95, 22]], B: [[26, 86, 40], [84, 90, 26], [-20, 38, 30], [-20, 80, 30]] },
      L: { A: [[70, 50, 58], [90, 82, 26], [52, 24, 22], [52, 88, 20]], B: [[80, 52, 46], [92, 84, 22], [92, 20, 20], [118, 76, 26]] } },
    { P: { A: [[52, 32, 62], [20, 83, 34], [80, 86, 30], [86, 95, 20]], B: [[72, 86, 40], [20, 90, 28], [118, 74, 32], [-20, 34, 28]] },
      L: { A: [[70, 46, 54], [90, 78, 28], [54, 86, 22], [92, 22, 22]], B: [[80, 50, 44], [92, 82, 22], [-20, 74, 28], [93, 20, 20]] } }
  ];
  const MOT = n => /bus|metro|patrullero|ciclista/.test(n) ? 'drive' : /peatones/.test(n) ? 'walk' : /nube|colibri|hojas|salpicadura/.test(n) ? 'hover' : 'sway';
  let SEQ = 0;
  function blob(seed, color, x, y, w, h, d) {
    let s = seed * 9301 + 49297; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const pts = []; const K = 7 + Math.floor(rnd() * 3); const base = []; for (let i = 0; i < K; i++) { const a = Math.PI * 2 * (i + rnd() * .5) / K; const rr = .7 + rnd() * .3; base.push([50 + Math.cos(a) * 50 * rr, 50 + Math.sin(a) * 50 * rr]) } base.forEach((p, i) => { const q = base[(i + 1) % K]; for (let j = 0; j < 9; j++) { const t = j / 9; pts.push([p[0] + (q[0] - p[0]) * t + (rnd() - .5) * 1.6, p[1] + (q[1] - p[1]) * t + (rnd() - .5) * 1.6]) } })
    return `<svg class="blob" viewBox="0 0 100 100" preserveAspectRatio="none" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;--d:${d.toFixed(2)}s"><path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L')}Z" fill="${color}" stroke="#fff" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>`;
  }
  function layer(name, i, slot, tB, D, extra = '', flip = false) {
    const s = SLOTS[slot % SLOTS.length], P = s.P, L = s.L;
    const ar0 = AR(name), f = ar0 < 1 ? Math.max(.42, Math.sqrt(ar0) * .95) : Math.min(1.1, .9 + ar0 * .05); const v = (k, ph) => { const p = (k === 'P' ? P : L)[ph][i] || (k === 'P' ? P : L)[ph][0]; return `--${k}${ph}x:${flip ? 100 - p[0] : p[0]}%;--${k}${ph}y:${p[1]}%;--${k}${ph}w:${(p[2] * f).toFixed(1)}cqmin` };
    const from = ['l', 'r', 'b', 't'][(i + slot) % 4], mot = MOT(name), del = (.15 + i * .28).toFixed(2);
    const ar = AR(name);
    return `<div class="ly${tB ? ' ph' : ''}" style="${v('P', 'A')};${v('P', 'B')};${v('L', 'A')};${v('L', 'B')};--tB:${(tB || 0).toFixed(2)}s;--ar:${ar};z-index:${i === 0 ? 4 : 3 + (i % 2)}${extra}">
      <div class="en en-${from}" style="--d:${del}s"><img class="fl fl-${mot}" style="--D:${D}s;--r0:${(((i * 37 + slot * 11) % 7) - 3)}deg" src="clg/${name}.webp" alt="" draggable="false"></div></div>`;
  }
  function wordT(s, re, fb) { const W = (s.k && s.k.W) || []; const i = W.findIndex(w => re.test(w.w)); return i < 0 ? fb : W[i].t }
  function bigFig(f, d) {
    if (!f) return '';
    return `<div class="cfig" style="--d:${d.toFixed(2)}s">${f.pre ? `<span class="pre">${esc(f.pre)}</span>` : ''}<b>${esc(f.v)}</b>${f.u ? `<span class="u">${esc(f.u)}</span>` : ''}${f.l ? `<small>${esc(f.l)}</small>` : ''}</div>`;
  }
  /* Plano de propuesta: fase A (qué propone) → fase B (cómo / cifras / documento) */
  C.col = (s, X) => {
    const th = s.th || 'mov', pal = PAL[th] || PAL.mov, seed = (s.seed ?? s.i0 ?? 0), slot = (s.slot ?? seed) % SLOTS.length;
    const els = s.els || pickEls(th, (s.h || '') + ' ' + (s.n || ''), seed);
    const D = s.d, tB = s.tB ?? (s.tBw != null && s.k && s.k.W[s.tBw] ? Math.min(D * .7, s.k.W[s.tBw].t - .3) : null) ?? Math.min(D * .62, wordT(s, s.atB || /^(Para|Con|Mediante|Lo|La|El|Plantea|Incluye|Se)$/, D * .45));
    s._tB = tB; s._flip = seed % 2 === 1;
    const back = s.back ?? (BACK[th] || BACK.mov)[seed % 3];
    const B = s.B || {};
    const steps = (B.steps || []).slice(0, 5);
    const flip = seed % 2 ? ' flip' : '';
    return `<div class="comp c-col${flip}" style="--tB:${tB.toFixed(2)}s">
      ${blob(seed + 1, pal[0], flip ? 52 : -8, 18, 62, 34, .05)}${blob(seed + 7, pal[1], flip ? -6 : 58, 52, 46, 26, .2)}${blob(seed + 3, pal[2], 20, 66, 60, 22, .35)}
      ${back ? `<div class="bk" style="--d:0s"><img src="clg/${back}.webp" alt=""></div>` : ''}
      ${els.map((n, i) => layer(n, i, slot, tB, D, '', !!flip)).join('')}
      <div class="ctx-h">${s.kick ? `<span class="kick" style="--d:.1s">${esc(s.kick)}</span>` : ''}${s.h ? `<h3 class="hd" style="--d:.3s">${esc(s.h)}</h3>` : ''}${(s.p || []).length ? `<span class="pref" style="--d:.8s">Plan de trabajo · p. ${s.p.join(', ')}</span>` : ''}</div>
      <div class="phB">
        ${steps.length ? `<ol class="steps">${steps.map((t, i) => `<li style="--d:${(tB + .25 + i * Math.min(1.2, (D - tB - 1) / Math.max(1, steps.length))).toFixed(2)}s"><b>${i + 1}</b><span>${esc(t.charAt(0).toUpperCase() + t.slice(1))}</span></li>`).join('')}</ol>` : ''}
        ${B.note ? `<p class="note" style="--d:${(tB + .3).toFixed(2)}s">${esc(B.note)}</p>` : ''}
        ${bigFig(B.fig, tB + .15)}
        ${B.tags ? `<div class="tags">${B.tags.map((t, i) => `<span style="--d:${(tB + .5 + i * .25).toFixed(2)}s">${esc(t)}</span>`).join('')}</div>` : ''}
        ${B.doc ? (() => { const M = (window.DOCMETA || {})[B.doc] || { hl: {} }; const bx = (B.hl || []).flatMap(k => M.hl[k] || []); return `<div class="cdoc" style="--d:${(tB + .1).toFixed(2)}s"><div class="win"><div class="inn" style="transform:translateY(-${B.oy || '0%'})"><img src="docs/${esc(B.doc)}.jpg" alt="Fragmento del plan de trabajo">${bx.map((b, i) => `<i style="left:${b[0]}%;top:${b[1]}%;width:${b[2] - b[0]}%;height:${b[3] - b[1]}%;--d:${(tB + .7 + i * .4).toFixed(2)}s"></i>`).join('')}</div></div></div>` })() : ''}
      </div></div>`;
  };
  /* Apertura de episodio: escenario + objetos del tema + candidatura recortada */
  C.open = (s, X) => {
    const th = s.th || 'mov', pal = PAL[th] || PAL.mov, r = X.r, e = X.e;
    const ph = A && A.foto ? A.foto(r, 'clg') : '';
    const els = (s.els || POOL[th].slice(0, 4));
    const t = String(e.t);
    return `<div class="comp c-open">
      ${blob(3, pal[0], -10, 8, 70, 40, .05)}${blob(11, pal[1], 50, 46, 60, 34, .15)}
      <div class="bk wide" style="--d:0s"><img src="clg/${(BACK[th] || BACK.mov)[0]}.webp" alt=""></div>
      ${els.map((n, i) => layer(n, i + 1, 2, 0, X.d)).join('')}
      ${ph ? `<div class="who-ph"><img src="${esc(ph)}" alt="${esc(r.short)}"></div>` : ''}
      <div class="otx"><span class="kick">Cap. ${e.n} · ${esc(A.th(e.id).ax || e.k || '')}</span><h2>${esc(t)}</h2><p>${esc(r.short)} <small>${esc(r.org)}</small></p></div></div>`;
  };


  /* =====================================================================
     CAPÍTULOS 1–3 · ESTÉTICA DOCUMENTAL (fondo negro, fotos reales a color)
     Fotos de la carpeta de cada candidatura, rotando por plano. No se
     presentan como registro de un hecho concreto: acompañan el relato.
     ===================================================================== */
  function gal(r) { const L = []; const f = A.foto(r, 'foto'); if (f) L.push(f); ((window.GALERIA || {})[r.key] || []).forEach(g => { const u = A.foto(r, g); if (u) L.push(u) }); return L }
  const bioPh = (X, s, off = 0) => { const G = gal(X.r); return G.length ? G[(s.i0 + off) % G.length] : '' };
  const words2 = (t, d0, step) => esc(t).split(/\s+/).map((w, i) => `<span class="bw" style="--d:${(d0 + i * step).toFixed(2)}s">${w}</span>`).join(' ');
  C.bioOpen = (s, X) => {
    const e = X.e, r = X.r, ph = bioPh(X, s), cut = A.foto(r, 'clg');
    return `<div class="comp b-open">${ph ? `<div class="bph"><img src="${esc(ph)}" alt="${esc(r.short)}"></div>` : ''}<span class="bvig"></span>
      <span class="bnum" style="--d:.2s">${String(e.n).padStart(2, '0')}</span>
      <div class="btx"><span class="bkick" style="--d:.3s">Capítulo ${e.n} · ${esc(e.k)}</span><h2>${words2(e.t, .5, .14)}</h2><p class="bwho" style="--d:1.1s">${esc(r.short)} · ${esc(r.org)}</p></div>
      ${cut && !ph ? `<div class="bcut"><img src="${esc(cut)}" alt=""></div>` : ''}</div>`;
  };
  C.bioTL = (s, X) => {
    const L = s.items || [], d = X.d, ph = bioPh(X, s, 1), n = L.length;
    return `<div class="comp b-tl">${ph ? `<div class="bframe" style="--d:.1s"><img src="${esc(ph)}" alt=""></div>` : ''}<span class="bvig2"></span>
      <svg class="bline" viewBox="0 0 10 100" preserveAspectRatio="none"><path d="M5 0 L5 100" pathLength="1" class="dr" style="--d:.2s;--dur:${Math.min(2.4, d * .5).toFixed(1)}s"/></svg>
      <ol class="bitems">${L.map((x, i) => `<li style="--d:${(.4 + i * (d * .55 / Math.max(1, n))).toFixed(2)}s">${x[2] ? `<span class="by">${esc(x[2])}</span>` : ''}<b>${esc(x[0])}</b>${x[1] ? `<small>${esc(x[1])}</small>` : ''}</li>`).join('')}</ol></div>`;
  };
  C.bioStamp = (s, X) => {
    const ph = bioPh(X, s, 2), ok = /^No registra/i.test(s.t);
    return `<div class="comp b-stamp">${ph ? `<div class="bph dim"><img src="${esc(ph)}" alt=""></div>` : ''}<span class="bvig"></span>
      <div class="bst"><span class="bbig ${ok ? 'ok' : 'hit'}" style="--d:.2s">${esc(s.t)}</span>${s.rest ? `<p style="--d:${(X.d * .25).toFixed(2)}s">${esc(s.rest)}</p>` : ''}</div></div>`;
  };
  C.bioCut = (s, X) => {
    const cut = A.foto(X.r, 'clg'), ph = bioPh(X, s, 1);
    return `<div class="comp b-cut">${ph ? `<div class="bph dim2"><img src="${esc(ph)}" alt=""></div>` : ''}<span class="bvig"></span>
      ${cut ? `<div class="bcut"><img src="${esc(cut)}" alt=""></div>` : ''}
      <div class="bct">${s.kick ? `<span class="bkick" style="--d:.2s">${esc(s.kick)}</span>` : ''}<p class="bline2">${words2(clean(s.t), .45, .09)}</p></div></div>`;
  };
  C.bioEnd = (s, X) => {
    const ph = bioPh(X, s);
    return `<div class="comp b-end">${ph ? `<div class="bph dim"><img src="${esc(ph)}" alt=""></div>` : ''}<span class="bvig"></span>
      <p class="bfin">${esc(clean(s.t)).replace(/(\d+ de \w+(?: de \d{4})?)/, '<em>$1</em>')}</p></div>`;
  };

  C.board = (s, X) => window.BOARD_RENDER(s, X);
  /* genéricas (todas las candidaturas) */
  C.idea = (s, X) => `<div class="comp c-idea"><div class="box"><span class="cic a-pop" ${dd(.05)}>${ring(.1)}${ICONS(s.icon).replace('<svg ', '<svg class="icon" ')}</span>${s.kick ? `<span class="torn sm a-drop" ${dd(.3, '--r:-2deg')}>${esc(s.kick)}</span>` : ''}<p class="t a-up" ${dd(.5)}>${kw(s.t)}</p></div></div>`;
  C.pasos = (s, X) => {
    const d = X.d, L = s.items || [], dense = L.reduce((a, x) => a + words(x), 0) > 45;
    return `<div class="comp c-pasos${dense ? ' dense' : ''}"><div class="box"><p class="hd a-fi" ${dd(.1)}>${kw(s.hd || '¿Cómo lo *haría*?')}</p><ol>${L.map((x, i) => `<li class="a-left" ${dd(.4 + i * (d * .55 / Math.max(1, L.length)))}><b>${i + 1}</b><span>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</span></li>`).join('')}</ol></div></div>`;
  };
  C.sello = (s, X) => `<div class="comp c-sello"><div class="box"><div class="stamp a-slam" ${dd(.15)}>${esc(s.t)}</div>${s.rest ? `<p class="rest a-up" ${dd(X.d * .3)}>${esc(s.rest)}</p>` : ''}</div></div>`;
  C.arch = (s, X) => `<div class="comp c-arch">${A && A.foto && A.foto(X.r, 'clg') ? `<div class="arch-ph"><img src="${esc(A.foto(X.r, 'clg'))}" alt=""></div>` : ''}<div class="box">${(s.items || []).map((x, i) => `<div class="card a-drop" ${dd(.2 + i * (X.d * .5 / Math.max(1, s.items.length)), `--r:${i % 2 ? 1.2 : -1.2}deg`)}>${x[2] ? `<span class="yr">${esc(x[2])}</span>` : ''}<b>${esc(x[0])}</b>${x[1] ? `<small>${esc(x[1])}</small>` : ''}</div>`).join('')}</div></div>`;

  /* ---------------- armar el episodio ---------------- */
  function build(r, e, api) {
    if (api) A = api;
    const key = r.c.id + ':' + r.sur + '|' + e.id;
    const G = (window.GUION || {})[key];
    let chs, shots;
    if (G) { chs = G.chs; shots = G.shots.map(s => ({ ...s })) }
    else ({ chs, shots } = generic(r, e));
    if (['origen', 'tray', 'exp'].includes(e.id)) { const M = { titulo: 'bioOpen', arch: 'bioTL', sello: 'bioStamp', idea: 'bioCut', remate: 'bioEnd' }; shots.forEach(s => { if (M[s.c]) s.c = M[s.c] }); const BB = (window.BOARDS || {})[r.key + '|' + e.id]; if (BB && BB.shots) { shots = BB.shots.map((x, i) => ({ ...x, ch: x.ch || 'intro', c: 'board', board: BB, bk: i })); if (BB.chs) chs = BB.chs } else if (BB) shots.forEach((s, i) => { s.c = 'board'; s.board = BB; s.bk = i }) }
    /* índice con las propuestas reales del plan */
    const L = A.props(r, e.id) || [];
    shots.forEach(s => { if (s.c === 'indice' && !s.items) s.items = L.map(x => ({ t: x.t, icon: x.icon || 'documento' })) });
    let t = 0; const np = L.length;
    shots.forEach((s, i) => { s.i0 = i; s.d = shotDur(s); s.t0 = t; t += s.d; s.k = parseKara(s.n, s.d); s.np = np });
    chs.forEach(c => { const f = shots.find(s => s.ch === c.id); c.t0 = f ? f.t0 : 0; const l = [...shots].reverse().find(s => s.ch === c.id); c.t1 = l ? l.t0 + l.d : 0 });
    return { key, r, e, chs: chs.filter(c => shots.some(s => s.ch === c.id)), shots, total: t, rich: !!G };
  }
  function generic(r, e) {
    const S = [], chs = [{ id: 'intro', t: e.t, k: 'Apertura' }];
    S.push({ ch: 'intro', c: 'titulo', n: strip(e.d).split(/(?<=[.?!])\s/).slice(0, 2).join(' ') || e.t });
    if (e.id === 'origen') {
      if (r.f.length) {
        for (let i = 0; i < r.f.length; i += 3) { const it = r.f.slice(i, i + 3).map(x => [A.tc(x).replace(/\.$/, '')]); S.push({ ch: 'intro', c: 'arch', items: it, n: i ? 'Y también: ' + it.map(x => x[0]).join('; ') + '.' : '*Lo que registra* su hoja de vida: ' + it.map(x => x[0]).join('; ') + '.', src: 'hv' }) }
      } else S.push({ ch: 'intro', c: 'sello', t: 'Sin formación registrada', n: 'La hoja de vida inscrita *no registra* formación académica.', src: 'hv' });
    } else if (e.id === 'tray') {
      if (!r.e.length) S.push({ ch: 'intro', c: 'sello', t: 'Ningún cargo público previo', n: 'La hoja de vida inscrita *no registra* cargos públicos.', src: 'hv' });
      for (let i = 0; i < r.e.length; i += 3) {
        const it = r.e.slice(i, i + 3).map(([a, b]) => [A.tc(a), b ? A.tc(A.gad(b)) : '', A.rolePeriod(r, a) || '']);
        S.push({ ch: 'intro', c: 'arch', items: it, n: (i ? 'Después: ' : '*Su recorrido* en cargos públicos: ') + it.map(x => x[0] + (x[1] ? ' en ' + x[1] : '')).join('; ') + '.', src: 'hv' });
      }
      if (r.ult) S.push({ ch: 'intro', c: 'idea', icon: 'maletin', kick: 'Última escena registrada', t: `${r.ult[0]}, ${r.ult[1]} (${r.ult[2]})`, n: `La última escena registrada: *${r.ult[0]}*, ${r.ult[1]}, en ${r.ult[2]}.`, src: 'hv' });
    } else if (e.id === 'exp') {
      A.CHECKS.forEach(([f, l, dsc]) => { const hit = r.fl.includes(f); S.push({ ch: 'intro', c: 'sello', t: hit ? 'Sí registra' : 'No registra', rest: `${l} · ${dsc}`, n: `${l}: ${hit ? '*sí registra*' : '*no registra*'}. ${dsc}.`, src: 'consulta' }) });
      S.push({ ch: 'intro', c: 'remate', t: 'Consulta a registros públicos con corte al *24 de noviembre de 2026*.', n: 'Consulta a registros públicos con corte al *24 de noviembre* de 2026.', src: 'consulta' });
    } else {
      const R = A.rich(r), RX = R && R[e.id]; const L = A.props(r, e.id) || [], n = L.length, ax = (A.th(e.id).ax || '').toLowerCase();
      S.length = 0;
      S.push({ ch: 'intro', c: 'open', th: e.id, n: n ? `${r.short} lleva *${n} ${n === 1 ? 'propuesta' : 'propuestas'}* de ${ax} en su plan de trabajo.` : `El plan de ${r.short} *no incluye propuestas* de ${ax}.` });
      const ORD = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta', 'Séptima', 'Octava'];
      L.forEach((x, i) => {
        const ch = 'p' + i; chs.push({ id: ch, t: x.t, k: 'Propuesta ' + (i + 1) });
        const m = x.cmp, p = (m && m.p) || (x.p != null ? [].concat(x.p) : []);
        let q, how, B = {};
        if (m) {
          q = strip(m.propone); how = (m.como || []).join(', ');
          B.steps = m.como || []; const tg = [m.inst, m.rec, m.plazo].filter(t => t && t.length < 120); if (tg.length) B.tags = tg;
        } else {
          q = strip(x.q); how = strip(x.c);
          if (x.nodet) B.note = how; else { const st = how.split(/;\s+/); if (st.length > 1) B.steps = st; else B.note = how }
        }
        const lead = (ORD[i] || 'Otra') + (n === 1 ? ' y única' : '') + ':';
        const nar = `${lead} ${q} ${x.nodet ? '' : 'Para ejecutarlo: '}${how}`.replace(/El plan no detalla/, 'El plan *no detalla*');
        const tw = (lead + ' ' + q).split(/\s+/).length;
        S.push({ ch, c: 'col', th: e.id, seed: i + (+String(r.key).split('|')[1] || 0), kick: `Propuesta ${i + 1} de ${n}`, h: x.t, n: nar, B, p, tBw: tw, gl: x.nodet ? '' : '' });
      });
    }
    return { chs, shots: S };
  }

  /* ---------------- reproductor ---------------- */
  const E = { ep: null, t: 0, playing: false, rate: 1, cur: -1, anims: [], dyn: [], raf: 0, last: 0, saveT: 0, uiT: 0, endT: 0, endN: 0, panel: null, seenEnd: false };
  const SVGP = {
    play: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>',
    back: '<path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/>',
    rw: '<path d="M11.5 12 20 18V6zM11 6l-8.5 6 8.5 6z"/>', ff: '<path d="M4 18l8.5-6L4 6zm9-12v12l8.5-6z"/>',
    r10: '<path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/><text x="12" y="16" font-size="7" text-anchor="middle" font-family="Open Sans" font-weight="800">10</text>',
    f10: '<path d="M12 5V1l5 5-5 5V7a6 6 0 1 0 6 6h2a8 8 0 1 1-8-8z"/><text x="12" y="16" font-size="7" text-anchor="middle" font-family="Open Sans" font-weight="800">10</text>',
    restart: '<path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>', next: '<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>',
    fs: '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>',
    fsx: '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>',
    ch: '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>',
    src: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    txt: '<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z"/>', cc: '<path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1z"/>',
    plus: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>', check: '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>', close: '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>'
  };
  const ic = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${SVGP[n]}</svg>`;

  function ensureDOM() {
    if ($('cine')) return;
    const el = document.createElement('div'); el.id = 'cine'; el.hidden = true; el.setAttribute('role', 'region'); el.setAttribute('aria-label', 'Reproductor de episodios');
    el.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <filter id="chalkF" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>
      <pattern id="halftone" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.6" fill="#000"/></pattern></defs></svg>
      <div class="cv" id="cv"><div class="bg" id="cBg"></div><div class="stage" id="cStage"></div><div class="kara" id="cKara" aria-hidden="true"></div>
       <img class="marca" src="tex/tinta-marca.png" alt="Tinta Digital"><span class="tag-ctx" id="cCtx">Contexto Tinta</span></div>
      <div class="bigp" id="cBig"></div><div class="seekfx l" id="cSkL">« 10 s</div><div class="seekfx r" id="cSkR">10 s »</div>
      <div class="pui" id="cUI">
       <div class="ptop"><button class="ib" id="cBack" aria-label="Volver al catálogo">${ic('back')}</button><div class="tt" id="cTitle"></div>
        <button class="pill" id="cCmp" type="button"></button>
        <button class="ib hid-s" id="cTxtB" aria-label="Texto completo del episodio">${ic('txt')}</button></div>
       <div class="pbot">
        <div class="scrub" id="cScrub" role="slider" aria-label="Línea de tiempo del episodio" tabindex="0" aria-valuemin="0"><span class="tr"><span class="bf" id="cFill"></span></span><span id="cMarks"></span><span class="kn" id="cKnob"></span><span class="tip" id="cTip"></span></div>
        <div class="prow"><button class="ib" id="cPlay" aria-label="Reproducir">${ic('play')}</button>
         <button class="ib" id="cRw" aria-label="Retroceder 10 segundos">${ic('r10')}</button><button class="ib" id="cFf" aria-label="Avanzar 10 segundos">${ic('f10')}</button>
         <button class="ib hid-s" id="cRe" aria-label="Volver a empezar">${ic('restart')}</button>
         <span class="tm" id="cTime">0:00 / 0:00</span><span class="sp" id="cNow"></span>
         <button class="ib spd" id="cSpd" aria-label="Velocidad de reproducción">1×</button>
         <button class="ib" id="cSub" aria-label="Subtítulos" aria-pressed="true">${ic('cc')}</button>
         <button class="ib" id="cChB" aria-label="Capítulos del episodio">${ic('ch')}</button>
         <button class="ib" id="cSrcB" aria-label="Fuentes">${ic('src')}</button>
         <button class="ib hid-s" id="cNx" aria-label="Siguiente episodio">${ic('next')}</button>
         <button class="ib" id="cFs" aria-label="Pantalla completa">${ic('fs')}</button></div></div></div>
      <nav class="pnav" id="cNav" aria-label="Navegación del capítulo"><p class="phint" id="cHint">${matchMedia('(hover:hover) and (pointer:fine)').matches ? 'Haz clic o usa → para continuar' : 'Desliza para continuar'}</p>
       <div class="pbar"><button class="ib" id="cPrev" aria-label="Escena anterior">${ic('back')}</button><span class="pcount" id="cCount" aria-live="polite">01/01</span><button class="ib pnext" id="cNext" aria-label="Escena siguiente">${ic('back')}</button>
        <span class="psep"></span><button class="pill" id="cNSrc" type="button">${ic('src')}<span>Fuentes</span></button><button class="pill" id="cNTxt" type="button">${ic('txt')}<span>Texto</span></button><button class="pill" id="cNCat" type="button">${ic('ch')}<span>Episodios</span></button></div></nav>
      <aside class="pside" id="cSide" aria-label="Panel del episodio"><header><div class="tabs" id="cTabs"></div><button class="ib" id="cSideX" aria-label="Cerrar panel">${ic('close')}</button></header><div class="body" id="cSideB"></div></aside>
      <div class="pend" id="cEnd" aria-live="polite"></div><div class="ptoast" id="cToast"></div>`;
    document.body.appendChild(el);
    wire();
  }

  function open(r, e, t, api) {
    A = api; ensureDOM();
    const fresh = !E.ep || E.ep.r !== r || E.ep.e.id !== e.id;
    if (fresh) { E.ep = build(r, e); E.cur = -1 }
    const el = $('cine'); el.hidden = false; document.body.classList.add('lock');
    el.classList.toggle('rm', RM.matches); { const bio = ['origen', 'tray', 'exp'].includes(e.id); el.classList.toggle('light', !bio); el.classList.toggle('docu', bio) }
    $('cTitle').innerHTML = `<b>${esc(r.short)}</b><span>Cap. ${e.n} · «${esc(e.t)}»</span>`;
    $('cEnd').classList.remove('on'); clearInterval(E.endT); E.seenEnd = false;
    marks(); syncCmpBtn(); closePanel();
    const nx = nextEp(); $('cNx').hidden = !nx;
    E.t = Math.max(0, Math.min(+t || 0, E.ep.total - .5));
    if (E.t >= E.ep.total - 1) E.t = 0;
    E.inter = !!(E.ep.shots[0] && E.ep.shots[0].board && E.ep.shots[0].board.v === 2); E.rate = 1;
    $('cine').classList.toggle('inter', E.inter); $('cHint').classList.remove('off'); clearTimeout(E._hintT); E._hintT = setTimeout(() => $('cHint').classList.add('off'), 6500);
    if (E.inter) { const S = E.ep.shots; let i = S.findIndex(x => E.t >= x.t0 && E.t < x.t0 + x.d); if (i < 0) i = 0; E.t = S[i].t0 + .01; if (i > 0) $('cHint').classList.add('off') }
    render(true);
    play();
    showUI();
    setTimeout(() => $('cPlay').focus({ preventScroll: true }), 60);
  }
  function close(silent) {
    const el = $('cine'); if (!el || el.hidden) return;
    pause(true); saveProg(); el.hidden = true; document.body.classList.remove('lock');
    clearInterval(E.endT); closePanel();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
    const r = E.ep && E.ep.r; E.ep = null; E.cur = -1; $('cStage').innerHTML = '';
    /* si el episodio se abrió desde el comparador, se vuelve allí con la misma selección, tema y posición */
    let ret = null; if (!silent) try { ret = JSON.parse(sessionStorage.getItem('tfx_ret')); sessionStorage.removeItem('tfx_ret') } catch (_) { }
    if (!silent && r && ret && ret.key === r.key && Date.now() - ret.ts < 3 * 3600e3) { try { sessionStorage.setItem('tfx_ry', String(ret.y)) } catch (_) { } location.hash = ret.hash; return }
    if (!silent && r) location.hash = '#serie/' + encodeURIComponent(r.key);
  }
  const isOpen = () => $('cine') && !$('cine').hidden;

  /* reloj maestro */
  function loop(now) {
    E.raf = requestAnimationFrame(loop);
    const dt = Math.min(.1, (now - E.last) / 1000); E.last = now;
    if (!E.playing) return;
    E.t += dt * E.rate;
    if (E.inter) {
      const S = E.ep.shots, s = S[E.cur] || S[0];
      if (E.rate < 0 && E.t <= s.t0 + .001) { /* fin del recorrido inverso: aterriza en la escena anterior, ya armada */
        const p = S[Math.max(0, E.cur - 1)]; E.t = p.t0 + Math.min(p.d - .1, HOLD); E.rate = 1; render(); return }
      if (E.rate > 0 && E.t >= s.t0 + s.d - .08) { E.t = s.t0 + s.d - .08; render(); E.playing = false; hold(); saveProg(); return }
      render(); return }
    if (E.t >= E.ep.total) { E.t = E.ep.total; render(); ended(); return }
    render();
    if (now - E.saveT > 3000) { E.saveT = now; saveProg() }
  }
  /* ---- modo documental interactivo: el usuario decide cuándo avanzar ---- */
  const HOLD = 2.6, REV = 2.2;
  function hold() { const cb = $('cStage').querySelector('.c-board'); if (cb) cb.classList.add('hold') }
  function go(dir) {
    if (!E.inter || !E.ep) return; const S = E.ep.shots;
    $('cEnd').classList.remove('on'); $('cine').classList.remove('ended');
    if (dir > 0) {
      if (E.rate < 0) { const p = S[Math.max(0, E.cur - 1)]; E.t = p.t0 + HOLD; E.rate = 1 } /* cancela el retroceso en curso */
      if (E.cur >= S.length - 1) { pause(true); ended(); return }
      $('cHint').classList.add('off');
      E.t = S[E.cur + 1].t0 + .01; E.rate = 1; render(); play();
    } else {
      if (E.cur <= 0) return;
      if (E.rate < 0) { const p = S[E.cur - 1]; if (E.cur - 1 <= 0) { E.t = p.t0 + HOLD; E.rate = 1; render(); pause(true); saveProg(); return } E.t = p.t0 + REV; render() }
      else { const s = S[E.cur]; E.t = s.t0 + Math.min(E.t - s.t0, REV) }
      E.rate = -1.35; render(); play();
    }
    saveProg();
  }
  function play() {
    if (!E.ep) return; if (!E.inter && E.t >= E.ep.total - .05) E.t = 0;
    $('cEnd').classList.remove('on'); $('cine').classList.remove('ended'); clearInterval(E.endT);
    E.playing = true; E.last = performance.now(); cancelAnimationFrame(E.raf); E.raf = requestAnimationFrame(loop);
    $('cPlay').innerHTML = ic('pause'); $('cPlay').setAttribute('aria-label', 'Pausar'); armHide();
  }
  function pause(quiet) {
    E.playing = false; cancelAnimationFrame(E.raf);
    if ($('cPlay')) { $('cPlay').innerHTML = ic('play'); $('cPlay').setAttribute('aria-label', 'Reproducir') }
    if (!quiet) { showUI(true); saveProg() }
  }
  function toggle() { E.playing ? pause() : play(); flash(E.playing ? 'play' : 'pause') }
  function seek(t, fx) {
    if (!E.ep) return; E.t = Math.max(0, Math.min(t, E.ep.total - .01));
    $('cEnd').classList.remove('on'); $('cine').classList.remove('ended'); clearInterval(E.endT);
    render(); saveProg();
    if (fx) { const k = fx < 0 ? 'cSkL' : 'cSkR'; $(k).classList.add('on'); clearTimeout($(k)._t); $(k)._t = setTimeout(() => $(k).classList.remove('on'), 500) }
  }

  function render(force) {
    const ep = E.ep, S = ep.shots; let i = E.cur >= 0 && S[E.cur] && E.t >= S[E.cur].t0 && E.t < S[E.cur].t0 + S[E.cur].d ? E.cur : S.findIndex(s => E.t >= s.t0 && E.t < s.t0 + s.d);
    if (i < 0) i = S.length - 1;
    const s = S[i];
    if (i !== E.cur || force) mount(i);
    const lt = E.t - s.t0;
    for (const a of E.anims) { try { a.currentTime = lt * 1000 } catch (_) { } }
    for (const x of E.dyn) { const k = Math.max(0, Math.min(1, (lt - x.s) / x.d)); const e2 = 1 - Math.pow(1 - k, 3); x.el.textContent = Math.round(x.a + (x.b - x.a) * e2).toLocaleString('es') }
    kara(s, lt);
    /* fondo stop-motion: salta cada 4 cuadros (≈ 7,5 por segundo) */
    const f = Math.floor(E.t * 7.5); if (f !== E._bf) { E._bf = f; const h = (f * 9301 + 49297) % 233280 / 233280, h2 = (f * 4561 + 1231) % 9973 / 9973; $('cBg').style.transform = `translate(${(h * 1.4 - .7).toFixed(2)}%,${(h2 * 1.4 - .7).toFixed(2)}%) rotate(${(h - .5) * .5}deg)` }
    ui();
  }
  function mount(i) {
    E.cur = i; const s = E.ep.shots[i], X = { d: s.d, r: E.ep.r, e: E.ep.e, np: s.np };
    const html = (C[s.c] || C.idea)(s, X);
    const cam = s.cam || ({ board: '', bioOpen: 'push', bioTL: '', bioStamp: 'pull', bioCut: 'drift', bioEnd: 'push', doc: '', cifra: 'push', palabra: 'push', mapa: 'drift', metro: 'drift', titulo: 'pull', etiqueta: 'push', abs: 'push', est: 'push', remate: '', falta: 'drift', diag: 'drift', tl: 'drift' }[s.c] ?? 'drift');
    const st = $('cStage');
    st.innerHTML = `<div class="shot${s.c === 'board' && s.bk ? ' bcont' : ''}" style="--D:${s.d}s"><div class="cam ${cam}">${html}</div></div>`;
    const cb = st.querySelector('.c-board'); if (cb) { const w = $('cv').clientWidth, h = $('cv').clientHeight; cb.style.setProperty('--vw', String(Math.round(s.board && s.board.v === 2 ? (w > h ? Math.min(h * .74, w * .5) : w * (E.inter ? 1.0 : 1.1)) : (w > h ? w * .6 : w * 1.22)))) }
    E.anims = st.getAnimations ? st.getAnimations({ subtree: true }) : [];
    E.anims.forEach(a => { try { a.pause() } catch (_) { } });
    E.dyn = [...st.querySelectorAll('[data-cnt]')].map(el => { const [a, b, s0, d] = el.dataset.cnt.split('|').map(Number); return { el, a, b, s: s0, d } });
    $('cCtx').classList.toggle('on', !!s.ctx);
    $('cKara').innerHTML = ''; E._kg = -1;
    if (E.panel === 'src' || E.panel === 'txt') markPanel();
  }
  const COVERED = new Set(['bioTL', 'bioStamp', 'bioCut', 'bioEnd', 'arch', 'sello', 'idea', 'remate', 'pasos', 'falta', 'indice', 'etiqueta']);
  function narPos(s, lt) {
    if (COVERED.has(s.c)) return 'hide';
    if (s.c === 'col') { if (lt < (s._tB ?? 1e9)) return 'mid'; return s.B && (s.B.steps || s.B.note) ? 'hide' : (s.B && s.B.fig ? 'low' : 'mid') }
    if (s.c === 'board') return s.board && s.board.v === 2 ? 'hide' : 'brd';
    if (s.c === 'open' || s.c === 'titulo' || s.c === 'bioOpen') return 'low';
    return 'mid';
  }
  function kara(s, lt) {
    const K = s.k, el = $('cKara');
    if (!K || !K.W.length) { if (E._kg !== -2) { el.innerHTML = ''; el.className = 'kara nar hide'; E._kg = -2 } return }
    let g = 0; for (let j = 0; j < K.G.length; j++) if (lt >= K.G[j].t) g = j;
    const pos = narPos(s, lt), key = g + '|' + pos;
    if (key !== E._kg) {
      const newPh = !E._kg || String(E._kg).split('|')[0] !== String(g) || E._kshot !== s;
      E._kg = key; E._kshot = s;
      const ix = K.G[g].ix, big = ix.length <= 4 && ix.some(i => K.W[i].key || K.W[i].num);
      el.className = `kara nar ${pos}${big ? ' big' : ''}${s._flip ? ' flip' : ''}${newPh ? ' in' : ''}`;
      el.innerHTML = `<p>${ix.map(i => { const w = K.W[i]; return `<span class="kw${w.key ? ' key' : ''}${w.num ? ' num' : ''}${w.con ? ' con' : ''}" data-t="${w.t}">${esc(w.w)}</span>` }).join(' ')}</p>`;
      if (newPh) { void el.offsetWidth; }
    }
    el.querySelectorAll('.kw').forEach(sp => sp.classList.toggle('said', lt >= +sp.dataset.t));
  }
  /* ---------------- interfaz ---------------- */
  function marks() {
    const ep = E.ep; $('cMarks').innerHTML = ep.chs.slice(1).map(c => `<span class="mk" style="left:${(100 * c.t0 / ep.total).toFixed(2)}%"></span>`).join('');
    $('cScrub').setAttribute('aria-valuemax', Math.round(ep.total));
  }
  function chAt(t) { const ep = E.ep; let c = ep.chs[0]; ep.chs.forEach(x => { if (t >= x.t0) c = x }); return c }
  function ui() {
    const ep = E.ep, p = 100 * E.t / ep.total;
    $('cFill').style.width = p + '%'; $('cKnob').style.left = p + '%';
    $('cTime').textContent = `${fmt(E.t)} / ${fmt(ep.total)}`;
    if (E.inter) { const p2 = n => String(n).padStart(2, '0'), N = ep.shots.length; $('cCount').textContent = `${p2(E.cur + 1)}/${p2(N)}`; $('cPrev').disabled = E.cur <= 0; $('cNext').setAttribute('aria-label', E.cur >= N - 1 ? 'Terminar el capítulo' : 'Escena siguiente'); $('cNext').classList.toggle('last', E.cur >= N - 1) }
    $('cScrub').setAttribute('aria-valuenow', Math.round(E.t)); $('cScrub').setAttribute('aria-valuetext', `${fmt(E.t)} de ${fmt(ep.total)}`);
    const c = chAt(E.t); if (c !== E._chShown) { E._chShown = c; $('cNow').innerHTML = `${esc(c.k)}<small>${c.k !== c.t ? ' · ' + esc(c.t) : ''}</small>`; if (E.panel === 'ch') renderPanel('ch') }
  }
  function showUI(stay) { const el = $('cine'); el.classList.remove('hideui'); clearTimeout(E.uiT); if (!stay) armHide() }
  function armHide() { clearTimeout(E.uiT); E.uiT = setTimeout(() => { if (E.playing && !E.inter && !E.panel && !E.drag) $('cine').classList.add('hideui') }, 2800) }
  function flash(n) { const b = $('cBig'); b.innerHTML = ic(n); b.classList.add('on'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('on'), 450) }
  function toastP(html) { const t = $('cToast'); t.innerHTML = html; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 3800) }
  function syncCmpBtn() {
    if (!E.ep) return; const on = A.inCmp(E.ep.r.key), b = $('cCmp');
    b.classList.toggle('on', on); b.innerHTML = on ? `${ic('check')}<span>En tu lista</span>` : `${ic('plus')}<span>Añadir para comparar</span>`;
    b.setAttribute('aria-pressed', on);
  }
  function nextEp() { const eps = A.epList(E.ep.r); return eps.slice(E.ep.e.n).find(x => x.ok) }
  function saveProg() { if (!E.ep) return; A.saveProg(E.ep.r, E.ep.e.id, Math.floor(E.t), Math.ceil(E.ep.total)); try { history.replaceState(null, '', `#ver/${encodeURIComponent(E.ep.r.key)}/${E.ep.e.id}/${Math.max(0, Math.floor(E.t))}`) } catch (_) { } }

  /* ---- fin de temporada: reacción personal tras el último capítulo ---- */
  const SR_IC = {
    no: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 27V9h-6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h6Zm0 0 7 13c2.6 0 4.5-2.3 4-4.8L26.8 30H37a4 4 0 0 0 4-4.6l-1.9-12A4 4 0 0 0 35.2 10H17" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    mmm: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="18" cy="20" r="2.4" fill="currentColor"/><circle cx="30" cy="20" r="2.4" fill="currentColor"/><path d="M16.5 31h15" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>',
    si: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 21v18h-6a3 3 0 0 1-3-3V24a3 3 0 0 1 3-3h6Zm0 0 7-13c2.6 0 4.5 2.3 4 4.8L26.8 18H37a4 4 0 0 1 4 4.6l-1.9 12A4 4 0 0 1 35.2 38H17" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/></svg>' };
  const SR = [['no', 'Por ahí no es.'], ['mmm', 'Mmm… sigo pensando.'], ['si', 'Sí, va conmigo.']];
  function seasonEnd() {
    const ep = E.ep, r = ep.r, cur = A.seasonOf ? A.seasonOf(r) : null, bg = (A.foto && A.foto(r, 'foto')) || '';
    const el = $('cEnd');
    el.className = 'pend season on'; $('cine').classList.add('ended');
    el.innerHTML = `<div class="sfin${cur ? ' done' : ''}">${bg ? `<div class="sbg" style="background-image:url('${esc(bg)}')"></div>` : ''}<div class="svig"></div>
      <div class="sin">
        <p class="s0">${esc(r.short)} · ${esc(r.org)}</p>
        <h2 class="s1">Fin de temporada</h2>
        <p class="s2">Y después de todos estos capítulos…</p>
        <h3 class="s3">¿Sus propuestas van contigo?</h3>
        <div class="sreac" role="group" aria-label="Tu reacción a la temporada">${SR.map(([k, l], i) => `<button class="sr sr-${k}${cur && cur.v === k ? ' on' : ''}" data-sr="${k}" style="--i:${i}" aria-pressed="${!!(cur && cur.v === k)}"><span class="sic">${SR_IC[k]}<i class="burst"></i></span><span class="sl">${l}</span></button>`).join('')}</div>
        <p class="sok" aria-live="polite">${cur ? 'Guardado solo para ti.' : ''}</p>
        <button class="sskip" data-act="skip">Omitir</button>
        <p class="snote">Tu reacción se guarda solo en este dispositivo. No es un voto, no arma rankings y no es una recomendación.</p>
        <div class="snext"><p class="sq">¿Seguimos? Todavía quedan temporadas por descubrir.</p>
          <div class="sacts"><button class="sbtn pri" data-act="explore">${ic('play')}Explorar otra candidatura</button><button class="sbtn" data-act="compare">${ic('plus')}Comparar candidaturas</button></div>
          <button class="sagain" data-act="again">${ic('restart')}Ver este capítulo de nuevo</button></div>
        <button class="spc" data-act="post">Escena poscréditos ▸</button>
      </div></div>`;
    const done = (msg) => { const f = el.querySelector('.sfin'), first = !f.classList.contains('done'); f.classList.add('done'); el.querySelector('.sok').textContent = msg || '';
      /* la escena poscréditos se presenta sola una única vez; después, solo a pedido */
      if (first && window.POSTCRED && !POSTCRED.seen()) { clearTimeout(E._pcT); E._pcT = setTimeout(() => { if (el.classList.contains('on') && !POSTCRED.isOpen()) POSTCRED.open({ from: 'season' }) }, 2600) } };
    el.onclick = ev => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.sr) {
        const k = b.dataset.sr, again = cur && cur.v === k && b.classList.contains('on');
        el.querySelectorAll('.sr').forEach(x => { x.classList.toggle('on', x === b && !again); x.setAttribute('aria-pressed', x === b && !again); x.classList.remove('pick') });
        if (again) { A.setSeason(r, 'del'); done('Reacción borrada.'); return }
        A.setSeason(r, k); void b.offsetWidth; b.classList.add('pick'); done('Guardado solo para ti.'); return }
      const a = b.dataset.act;
      if (a === 'skip') done('');
      else if (a === 'explore') { close(true); location.hash = '#inicio' }
      else if (a === 'compare') { if (!A.inCmp(r.key)) A.toggleCmp(r.key, true); close(true); location.hash = '#comparar' }
      else if (a === 'post') { clearTimeout(E._pcT); window.POSTCRED && POSTCRED.open({ from: 'season' }) }
      else if (a === 'again') { el.className = 'pend'; el.innerHTML = ''; $('cine').classList.remove('ended'); seek(0); play() }
    };
  }
  function ended() {
    pause(true); saveProg(); showUI(true);
    const ep = E.ep, r = ep.r, e = ep.e, nx = nextEp(), isAx = !!A.TH[e.id], v = A.verdOf(r, e.id);
    clearInterval(E.endT);
    if (!nx && A.setSeason) { seasonEnd(); return }
    $('cEnd').className = 'pend';
    /* paréntesis de apoyo: una sola vez, tras completar el tercer capítulo; nunca durante la reproducción */
    const pz = !!(window.POSTCRED && POSTCRED.chapterDone && POSTCRED.chapterDone(r.key + '|' + e.id));
    let n = (E.inter || pz) ? 0 : 10;
    const draw = () => {
      const keep = $('cEnd').querySelector('.pz');
      $('cEnd').innerHTML = `<div class="in"><p class="kick">Fin del capítulo ${e.n}</p><h2>«${esc(e.t)}»</h2>
      ${nx ? `<div class="nx"><span class="ring"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="23" stroke="rgba(255,255,255,.25)"/><circle cx="27" cy="27" r="23" stroke="#e50914" stroke-dasharray="144.5" stroke-dashoffset="${(144.5 * n / 10).toFixed(1)}" style="transition:stroke-dashoffset 1s linear"/></svg><b>${n > 0 ? n : ''}</b></span>
        <div><small style="color:#bbb;font-size:12px">${n > 0 ? 'Siguiente episodio en ' + n + ' s' : 'Siguiente episodio'}</small><br><b style="font-size:16px">Cap. ${nx.n} · «${esc(nx.t)}»</b></div></div>` : ''}
      <div class="acts">${nx ? `<button class="pill on" data-act="next">${ic('play')}Reproducir ahora</button>${n > 0 ? `<button class="pill" data-act="cancel">Cancelar</button>` : ''}` : ''}
        <button class="pill" data-act="again">${ic('restart')}Ver de nuevo</button>
        <button class="pill" data-act="cmp">${ic(A.inCmp(r.key) ? 'check' : 'plus')}${A.inCmp(r.key) ? 'En tu lista para comparar' : 'Añadir para comparar'}</button>
        <button class="pill" data-act="cat">${ic('back')}Volver al catálogo</button></div>
      ${isAx ? `<div class="vrow"><p>¿Qué te dejó este capítulo? Nota personal, se guarda solo en este dispositivo; no es una encuesta.</p><div class="chips">${A.VOPTS.map(([k, l]) => `<button class="pill${v && v.v === k ? ' on' : ''}" data-verd="${k}">${l}</button>`).join('')}</div></div>` : ''}</div>`;
      if (keep) $('cEnd').appendChild(keep);
    };
    draw(); $('cEnd').classList.add('on'); $('cine').classList.add('ended'); E.seenEnd = true;
    if (pz) POSTCRED.pausa($('cEnd'), { next: nx ? goNext : null });
    clearInterval(E.endT);
    if (nx && n > 0) E.endT = setInterval(() => { n--; if (n <= 0) { clearInterval(E.endT); goNext(); return } draw() }, 1000);
    $('cEnd').onclick = ev => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.verd) { A.setVerd(r, e.id, b.dataset.verd); toastP(`${ic('check')} Guardado en Mi lista: ${esc(A.VLBL[b.dataset.verd])}`); clearInterval(E.endT); n = 0; draw(); return }
      const a = b.dataset.act;
      if (a === 'next') goNext(); else if (a === 'cancel') { clearInterval(E.endT); n = 0; draw() }
      else if (a === 'post') { clearTimeout(E._pcT); window.POSTCRED && POSTCRED.open({ from: 'season' }) }
      else if (a === 'again') { E.t = 0; render(true); play() }
      else if (a === 'cmp') { clearInterval(E.endT); n = 0; cmpToggle(); draw() }
      else if (a === 'cat') close();
    };
  }
  function goNext() { const nx = nextEp(); clearInterval(E.endT); if (nx) location.hash = `#ver/${encodeURIComponent(E.ep.r.key)}/${nx.id}/0` }
  function cmpToggle() {
    const r = E.ep.r, was = A.inCmp(r.key); A.toggleCmp(r.key, true); syncCmpBtn();
    const n = A.cmpCount();
    toastP(was ? 'Quitada de tu lista' : `${ic('check')} Añadida a tu lista${n >= 2 ? ` · <a href="#comparar">Comparar candidaturas (${n})</a>` : ' · añade otra para comparar'}`);
  }

  /* paneles: capítulos, fuentes, texto completo */
  const TABS = [['ch', 'Capítulos'], ['src', 'Fuentes'], ['txt', 'Texto completo']];
  function openPanel(k) { E.panel = k; $('cSide').classList.add('on'); showUI(true); renderPanel(k) }
  function closePanel() { E.panel = null; const s = $('cSide'); if (s) s.classList.remove('on'); if (E.playing) armHide() }
  function renderPanel(k) {
    const ep = E.ep, r = ep.r;
    $('cTabs').innerHTML = TABS.map(([id, l]) => `<button class="pill${id === k ? ' on' : ''}" data-tab="${id}">${l}</button>`).join('');
    let h = '';
    if (k === 'ch') {
      const cur = chAt(E.t);
      h = `<p class="note">La reproducción sigue mientras exploras. Toca un capítulo para saltar.</p>` + ep.chs.map((c, i) => { const pr = Math.max(0, Math.min(1, (E.t - c.t0) / (c.t1 - c.t0))); return `<button class="chap${c === cur ? ' now' : ''}" data-seek="${c.t0}"><span class="n">${i || '•'}</span><span style="flex:1"><b>${esc(c.t)}</b><small>${esc(c.k)}${E.inter ? '' : ` · ${fmt(c.t0)} · ${fmt(c.t1 - c.t0)}`}</small><span class="bar"><i style="width:${(pr * 100).toFixed(0)}%"></i></span></span></button>` }).join('');
    } else if (k === 'src') {
      const by = {}; ep.shots.forEach(s => (s.p || []).forEach(p => { (by[p] = by[p] || []).push(s) }));
      const pages = Object.keys(by).map(Number).sort((a, b) => a - b);
      const typ = ep.e.id === 'origen' || ep.e.id === 'tray' ? 'hv' : ep.e.id === 'exp' ? 'consulta' : 'plan';
      const BB = ep.shots[0] && ep.shots[0].board;
      if (BB && BB.src) { const cur = ep.shots[E.cur] || {}; h = `<p class="note">Fuentes consultadas para este capítulo. Las fotografías son de la candidatura y solo ilustran; no documentan los hechos narrados.</p>` + BB.src.map(([id, t, u]) => `<div class="srcit${(cur.fu || []).includes(id) ? ' now' : ''}" data-fu="${id}"><p><b>${esc(t)}</b>${u ? ` · <a href="${esc(u)}" target="_blank" rel="noopener">abrir</a>` : ''}</p><p class="note">${ep.shots.filter(s => (s.fu || []).includes(id)).map(s => `<button class="linkb" data-seek="${s.t0}" style="all:unset;cursor:pointer;text-decoration:underline">${(E.inter ? 'Escena ' + (s.i0 + 1) : fmt(s.t0))}</button>`).join(' · ')}</p></div>`).join('') } else
      h = typ === 'hv' ? `<div class="srcit"><p><b>Hoja de vida</b> de ${esc(r.full)} inscrita en el CNE.</p></div>`
        : typ === 'consulta' ? `<div class="srcit"><p><b>Consulta a registros públicos</b>: antecedentes penales (Ministerio del Interior), obligaciones tributarias en firme (SRI) y pensiones alimenticias pendientes. Corte: 24 de noviembre de 2026.</p></div>`
          : `<p>Plan de trabajo de <b>${esc(r.short)}</b> (${esc(r.org)}) inscrito en el Consejo Nacional Electoral. Numeración de páginas del PDF.</p>
        ${r.plan ? `<p><a href="${esc(r.plan)}" target="_blank" rel="noopener">Abrir el plan completo</a></p>` : '<p class="note">El documento no está disponible en línea.</p>'}
        ${pages.map(p => `<div class="srcit" data-pg="${p}"><p><b>Página ${p}</b>${r.plan ? ` · <a href="${esc(r.plan)}#page=${p}" target="_blank" rel="noopener">abrir</a>` : ''}</p><p class="note">${by[p].map(s => `<button class="linkb" data-seek="${s.t0}" style="all:unset;cursor:pointer;text-decoration:underline">${(E.inter ? 'Escena ' + (s.i0 + 1) : fmt(s.t0))}</button>`).join(' · ')}</p></div>`).join('')}
        <p class="note">Las escenas marcadas «Contexto Tinta» son explicaciones nuestras para entender el tema; no forman parte del plan.</p>`;
    } else {
      h = `<div class="trs"><p class="note">Versión en texto de todo el episodio. Toca un párrafo para ir a ese momento.</p>${ep.shots.map(s => `<p data-i="${s.i0}"><button data-seek="${s.t0}"><span class="tsm">${(E.inter ? 'Escena ' + (s.i0 + 1) : fmt(s.t0))}${s.ctx ? ' · Contexto Tinta' : ''}${(s.p || []).length ? ' · p. ' + s.p.join(', ') : ''}</span>${transcript(s)}</button></p>`).join('')}</div>`;
    }
    $('cSideB').innerHTML = h; markPanel();
  }
  function transcript(s) {
    const n = esc(s.n || '').replace(/\*(.+?)\*/g, '<mark>$1</mark>');
    const extra = s.c === 'falta' ? ' ' + (s.items || []).map(esc).join(' ') : s.c === 'tl' ? ' ' + (s.items || []).map(([y, t]) => `${esc(y)}: ${esc(t)}.`).join(' ') : s.c === 'pasos' ? ' ' + (s.items || []).map((x, i) => `${i + 1}. ${esc(x)}`).join(' ') : s.c === 'arch' ? '' : s.c === 'sello' && s.rest ? ' ' + esc(s.rest) : s.c === 'doc' ? ` <span class="note">[Fragmento del plan: ${esc(s.tag || '')}]</span>` : s.gl ? ' ' + esc(s.gl) : '';
    return n + extra;
  }
  function markPanel() {
    if (!E.panel || !E.ep) return; const s = E.ep.shots[E.cur]; if (!s) return;
    if (E.panel === 'txt') { $('cSideB').querySelectorAll('[data-i]').forEach(p => p.classList.toggle('now', +p.dataset.i === E.cur)); const n = $('cSideB').querySelector('.now'); if (n) n.scrollIntoView({ block: 'nearest' }) }
    if (E.panel === 'src') $('cSideB').querySelectorAll('[data-fu]').forEach(p => p.classList.toggle('now', (s.fu || []).includes(p.dataset.fu)));
    if (E.panel === 'src') $('cSideB').querySelectorAll('[data-pg]').forEach(p => p.classList.toggle('now', (s.p || []).includes(+p.dataset.pg)));
  }

  function wire() {
    const el = $('cine'), cv = $('cv');
    $('cPlay').onclick = () => { toggle() };
    $('cRw').onclick = () => seek(E.t - 10, -1); $('cFf').onclick = () => seek(E.t + 10, 1);
    $('cRe').onclick = () => { seek(0); play() };
    $('cBack').onclick = () => close();
    $('cPrev').onclick = () => go(-1); $('cNext').onclick = () => go(1); $('cNCat').onclick = () => close();
    $('cNSrc').onclick = () => E.panel === 'src' ? closePanel() : openPanel('src');
    $('cNTxt').onclick = () => E.panel === 'txt' ? closePanel() : openPanel('txt');
    /* deslizar (dedo o ratón) y gesto horizontal del trackpad */
    /* gesto robusto: puntero + táctil, con respaldo si el navegador cancela el puntero */
    let sx = null, sy = 0, st0 = 0, lx = 0, ly = 0, wl = 0;
    const gStart = (x, y) => { if (!E.inter || E.panel) return; sx = x; sy = y; lx = x; ly = y; st0 = Date.now() };
    const gMove = (x, y) => { if (sx != null) { lx = x; ly = y } };
    const gEnd = () => {
      if (sx == null) return; const dx = lx - sx, dy = ly - sy, dt = Date.now() - st0; sx = null;
      const fast = dt < 320 && Math.abs(dx) > 24;
      if ((Math.abs(dx) > 40 || fast) && Math.abs(dx) > Math.abs(dy) * 1.1) { if (Date.now() - (E._swiped || 0) < 250) return; E._swiped = Date.now(); go(dx < 0 ? 1 : -1) }
    };
    /* escucha en el documento: si el lienzo se reconstruye a mitad del gesto, el gesto no se pierde */
    const okT = t => isOpen() && E.inter && !E.panel && t && t.closest && !t.closest('button,a,.pside,.pnav .pbar,.pend.on,.ptop');
    document.addEventListener('pointerdown', ev => { if (ev.pointerType !== 'touch' && ev.button === 0 && okT(ev.target)) gStart(ev.clientX, ev.clientY) }, true);
    document.addEventListener('pointermove', ev => { if (ev.pointerType !== 'touch') gMove(ev.clientX, ev.clientY) }, true);
    document.addEventListener('pointerup', ev => { if (ev.pointerType !== 'touch') { gMove(ev.clientX, ev.clientY); gEnd() } }, true);
    document.addEventListener('pointercancel', ev => { if (ev.pointerType !== 'touch') gEnd() }, true);
    document.addEventListener('touchstart', ev => { const t = ev.touches[0]; if (t && ev.touches.length === 1 && okT(ev.target)) gStart(t.clientX, t.clientY) }, { passive: true, capture: true });
    document.addEventListener('touchmove', ev => { const t = ev.touches[0]; if (t) gMove(t.clientX, t.clientY); if (sx != null && Math.abs(lx - sx) > 10 && ev.cancelable) ev.preventDefault() }, { passive: false, capture: true });
    document.addEventListener('touchend', ev => { const t = ev.changedTouches && ev.changedTouches[0]; if (t) gMove(t.clientX, t.clientY); gEnd() }, true);
    document.addEventListener('touchcancel', () => gEnd(), true);
    cv.addEventListener('dragstart', ev => { if (E.inter) ev.preventDefault() });
    cv.addEventListener('wheel', ev => { if (!E.inter || E.panel) return; const d = Math.abs(ev.deltaX) >= Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY; if (Math.abs(d) < 30) return; ev.preventDefault(); const now = Date.now(); if (now - wl < 800) return; wl = now; go(d > 0 ? 1 : -1) }, { passive: false });
    $('cNx').onclick = () => goNext();
    $('cCmp').onclick = () => cmpToggle();
    const R = [.75, 1, 1.25, 1.5];
    $('cSpd').onclick = () => { E.rate = R[(R.indexOf(E.rate) + 1) % R.length]; $('cSpd').textContent = String(E.rate).replace('.', ',') + '×'; toastP('Velocidad ' + String(E.rate).replace('.', ',') + '×') };
    $('cSub').onclick = () => { const off = el.classList.toggle('nosub'); $('cSub').classList.toggle('on', !off); $('cSub').setAttribute('aria-pressed', !off) }; $('cSub').classList.add('on');
    $('cFs').onclick = () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => { }); else (el.requestFullscreen ? el.requestFullscreen() : Promise.reject()).catch(() => toastP('Tu navegador no permite pantalla completa aquí')) };
    document.addEventListener('fullscreenchange', () => { $('cFs').innerHTML = ic(document.fullscreenElement ? 'fsx' : 'fs') });
    $('cChB').onclick = () => E.panel === 'ch' ? closePanel() : openPanel('ch');
    $('cSrcB').onclick = () => E.panel === 'src' ? closePanel() : openPanel('src');
    $('cTxtB').onclick = () => E.panel === 'txt' ? closePanel() : openPanel('txt');
    $('cSideX').onclick = closePanel;
    $('cSide').addEventListener('click', ev => { const t = ev.target.closest('[data-tab]'); if (t) { openPanel(t.dataset.tab); return } const s = ev.target.closest('[data-seek]'); if (s) { seek(+s.dataset.seek + .01); if (!E.playing) play() } });
    /* toque/clic en el lienzo: escritorio = pausa; móvil = mostrar controles; doble toque lateral = ±10 s */
    let lastTap = 0;
    cv.addEventListener('click', ev => {
      if (E.panel) { closePanel(); return }
      if (E.inter) { /* computadora: clic en la escena = avanzar (tercio izquierdo = retroceder) */
        if (matchMedia('(hover:none)').matches || ev.target.closest('button,a') || Date.now() - (E._swiped || 0) < 400) return;
        go(ev.clientX / innerWidth < .3 ? -1 : 1); return }
      const now = Date.now(), x = ev.clientX / innerWidth, touch = matchMedia('(hover:none)').matches;
      if (now - lastTap < 300 && (x < .33 || x > .67)) { seek(E.t + (x < .5 ? -10 : 10), x < .5 ? -1 : 1); lastTap = 0; return }
      lastTap = now;
      if (touch) { if (el.classList.contains('hideui')) showUI(); else toggle() } else toggle();
    });
    el.addEventListener('mousemove', () => showUI());
    el.addEventListener('touchstart', () => { if (el.classList.contains('hideui')) showUI() }, { passive: true });
    /* barra de tiempo */
    const sc = $('cScrub');
    const tAt = x => { const b = sc.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - b.left) / b.width)) * E.ep.total };
    const tip = x => { const t = tAt(x), c = chAt(t), b = sc.getBoundingClientRect(); $('cTip').textContent = `${fmt(t)} · ${c.k}${c.k !== c.t ? ': ' + c.t : ''}`; $('cTip').style.left = Math.max(60, Math.min(b.width - 60, x - b.left)) + 'px' };
    sc.addEventListener('pointerdown', ev => { E.drag = true; E._wasP = E.playing; pause(true); sc.classList.add('drag'); sc.setPointerCapture(ev.pointerId); seek(tAt(ev.clientX)); tip(ev.clientX); showUI(true) });
    sc.addEventListener('pointermove', ev => { tip(ev.clientX); if (E.drag) seek(tAt(ev.clientX)) });
    const up = () => { if (!E.drag) return; E.drag = false; sc.classList.remove('drag'); if (E._wasP) play(); else showUI(true) };
    sc.addEventListener('pointerup', up); sc.addEventListener('pointercancel', up);
    sc.addEventListener('keydown', ev => { if (ev.key === 'ArrowRight') { seek(E.t + 5, 1); ev.preventDefault(); ev.stopPropagation() } else if (ev.key === 'ArrowLeft') { seek(E.t - 5, -1); ev.preventDefault(); ev.stopPropagation() } });
    document.addEventListener('keydown', ev => {
      if (!isOpen()) return; if (/INPUT|TEXTAREA/.test(ev.target.tagName)) return;
      const k = ev.key;
      if (E.inter && !E.panel) {
        if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && !(ev.target.closest && ev.target.closest('button,a')))) { go(1); ev.preventDefault(); return }
        if (k === 'ArrowLeft' || k === 'PageUp') { go(-1); ev.preventDefault(); return }
      }
      if (k === ' ' || k === 'k') { if (ev.target.closest && ev.target.closest('button,a') && k === ' ') return; toggle(); ev.preventDefault() }
      else if (k === 'ArrowRight' || k === 'l') { seek(E.t + 10, 1); ev.preventDefault() }
      else if (k === 'ArrowLeft' || k === 'j') { seek(E.t - 10, -1); ev.preventDefault() }
      else if (k === 'f') $('cFs').click();
      else if (k === 'c') $('cSub').click();
      else if (k === 'Escape') { if (E.panel) closePanel(); else if (!document.fullscreenElement) close() }
      showUI();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden && E.playing) pause() });
  }

  window.CINE = { needOf, open, close, isOpen, build, parseKara, seek, pause, play, _E: E, onCmp: () => isOpen() && syncCmpBtn() };
})();
