/* =====================================================================
   TINTAFLIX · ENTRADA v2 — instalación de siete televisores CRT
   Placa fotográfica (render físico con luz y sombras reales) y, encima,
   cada pantalla como capa independiente: encendido, interferencias,
   ciudades, collages, mapas, el logo y la travesía del cristal.
   Movimiento reducido: la instalación aparece ya encendida y sin cámara.
   ===================================================================== */
(function () {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  /* esquinas de cada pantalla en la placa (0–1), calculadas desde la cámara del render */
  const SCR = window.INTRO_SCREENS || {};
  const HERO = 't4';
  const CITY = ['quito', 'guayaquil', 'cuenca', 'loja', 'machala', 'riobamba', 'ibarra'].map(c => `fotos/${c}-ciudad-1-color.webp`);
  const CLG = ['agua-volcan', 'mov-bus', 'seg-camara', 'amb-colibri', 'amb-teleferico', 'agua-grifo', 'seg-plaza', 'amb-ciclista', 'mov-semaforo', 'amb-guayacan', 'seg-radio', 'agua-represa'];
  const MAPS = ['clg/seg-mapaaereo.webp', 'clg/mov-mapa.webp'];
  const TXT = ['Capítulo 1<br><b>¿Quién es?</b>', 'Capítulo 2<br><b>¿Qué ha hecho?</b>', 'Capítulo 3<br><b>¿Cómo llega?</b>', 'Seccionales<br><b>2026</b>'];
  let I, stage, cam, layout, boxes = {}, timers = [], raf = 0, noiseC = null, noisy = new Set(), alive = false, onGo = null;
  const T = (fn, ms) => timers.push(setTimeout(fn, ms));
  const pick = a => a[Math.random() * a.length | 0];

  function bbox(q) { const xs = q.map(p => p[0]), ys = q.map(p => p[1]); const x = Math.min(...xs), y = Math.min(...ys); return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y } }
  function mode() { return innerWidth / innerHeight < .85 ? 'port' : 'land' }

  function build() {
    I = document.getElementById('intro'); I.classList.add('v2');
    layout = mode(); const L = SCR[layout]; if (!L) return false;
    I.innerHTML = `<div class="ix-stage"><div class="ix-cam">
        <img class="ix-plate" src="img/intro/plate-${layout}.webp" alt="" decoding="async">
        ${Object.keys(L.s).map(k => `<div class="ix-glow" data-g="${k}"></div>`).join('')}
        ${Object.keys(L.s).map(k => `<div class="ix-scr" data-s="${k}"><div class="ix-box"></div></div>`).join('')}
        <img class="ix-refl" src="img/intro/refl-${layout}.webp" alt="" decoding="async">
        <div class="ix-edge"></div></div></div>
      <div class="ix-grain" aria-hidden="true"></div><div class="ix-vig"></div><div class="ix-wash"></div>
      <button class="skip" id="skipBtn" type="button">Saltar intro</button>
      <div class="ix-cta" role="group" aria-label="Entrada">
        <button class="btn" id="enterBtn" type="button"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg><span>Entra a TINTAFLIX</span></button>
        <small class="tap">Toca la pantalla · Las candidaturas a la alcaldía, contadas como series</small></div>
      <p class="introfoot">Una producción de Tinta Digital · Seccionales 2026</p>`;
    I.setAttribute('role', 'dialog'); I.setAttribute('aria-label', 'Entrada a TINTAFLIX: una instalación de televisores antiguos se enciende con fragmentos de las ciudades');
    stage = I.querySelector('.ix-stage'); cam = I.querySelector('.ix-cam');
    Object.entries(L.s).forEach(([k, q]) => {
      const b = bbox(q), el = I.querySelector(`[data-s="${k}"]`), bx = el.querySelector('.ix-box');
      el.style.clipPath = `polygon(${q.map(p => `${(p[0] * 100).toFixed(3)}% ${(p[1] * 100).toFixed(3)}%`).join(',')})`;
      Object.assign(bx.style, { left: b.x * 100 + '%', top: b.y * 100 + '%', width: b.w * 100 + '%', height: b.h * 100 + '%', borderRadius: '9%/12%' });
      bx.insertAdjacentHTML('afterend', '');
      const g = I.querySelector(`[data-g="${k}"]`);
      Object.assign(g.style, { left: (b.x - b.w * .45) * 100 + '%', top: (b.y - b.h * .5) * 100 + '%', width: b.w * 190 + '%', height: b.h * 200 + '%' });
      boxes[k] = { el, bx, g, b };
    });
    fit(); grain();
    return true;
  }
  function fit() {
    const L = SCR[layout]; const W = L.w, H = L.h;
    /* encuadre: la instalación completa (con sus carcasas) ocupa el cuadro; nunca menos que cubrir la pantalla */
    const all = Object.values(L.s).flat(); const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
    const bx0 = Math.min(...xs), bx1 = Math.max(...xs), by0 = Math.min(...ys), by1 = Math.max(...ys);
    const bw = (bx1 - bx0) * 1.22 * W, bh = (by1 - by0) * 1.30 * H;
    const cover = Math.max(innerWidth / W, innerHeight / H);
    const s = Math.max(cover, Math.min(innerWidth * (layout === 'port' ? .9 : .9) / bw, innerHeight * .78 / bh));
    const cx = (bx0 + bx1) / 2 * W, cy = (by0 + by1) / 2 * H;
    let tx = innerWidth / 2 - cx * s, ty = innerHeight * (layout === 'port' ? .41 : .45) - cy * s;
    tx = Math.min(0, Math.max(innerWidth - W * s, tx)); ty = Math.min(0, Math.max(innerHeight - H * s, ty));
    Object.assign(stage.style, { width: W + 'px', height: H + 'px', transform: `translate(${tx}px,${ty}px) scale(${s})` });
    stage._s = s;
  }
  function grain() {
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    x.putImageData(d, 0, 0); I.querySelector('.ix-grain').style.backgroundImage = `url(${c.toDataURL()})`;
  }

  /* ---------- contenidos de pantalla ---------- */
  const crt = '<div class="ix-crt"></div><div class="ix-roll"></div><div class="ix-flk"></div>';
  function show(k, html, keepNoise) {
    const B = boxes[k]; if (!B) return; B.bx.innerHTML = html + crt; B.el.classList.add('on'); B.g.classList.add('on');
    if (!keepNoise) noisy.delete(k);
  }
  function off(k) { const B = boxes[k]; B.el.classList.remove('on'); B.g.classList.remove('on'); noisy.delete(k) }
  function noise(k) { show(k, '<canvas class="nz" width="96" height="72"></canvas>', true); noisy.add(k); loop() }
  function photo(k, src, pos) { show(k, `<img class="ph" src="${src}" alt="" style="object-position:${pos || '50% 50%'}">`) }
  function clg(k) {
    const n = [pick(CLG), pick(CLG), pick(CLG)];
    show(k, `<div class="clg">${n.map((c, i) => `<img src="clg/${c}.webp" alt="" style="width:${[62, 44, 38][i]}%;left:${[4, 50, 18][i] + Math.random() * 8}%;top:${[10, 34, 48][i] + Math.random() * 6}%;transform:rotate(${(Math.random() * 10 - 5).toFixed(1)}deg)">`).join('')}</div>`);
  }
  function map(k) { show(k, `<div class="clg" style="background:#0e1012"><img src="${pick(MAPS)}" alt="" style="width:120%;left:-10%;top:-12%;opacity:.9;filter:grayscale(1) contrast(1.3)"></div>`) }
  function txt(k, t) { show(k, `<div class="txt"><p>${t || pick(TXT)}</p></div>`) }
  function bars(k) { show(k, '<div class="bars"></div>') }
  function logo(k) { show(k, '<div class="lg"><img src="img/tintaflix-logo.png" alt=""><small>Alcaldías 2026</small></div>') }
  function powerOn(k, then) { show(k, '<div class="pon"><i></i></div>', true); T(() => { noise(k); T(then, 380) }, 300) }
  /* una misma imagen repartida entre varias pantallas */
  function span(keys, src) {
    const bs = keys.map(k => boxes[k].b); const x = Math.min(...bs.map(b => b.x)), y = Math.min(...bs.map(b => b.y));
    const w = Math.max(...bs.map(b => b.x + b.w)) - x, h = Math.max(...bs.map(b => b.y + b.h)) - y;
    keys.forEach(k => { const b = boxes[k].b;
      show(k, `<div style="overflow:hidden"><img class="ph" src="${src}" alt="" style="position:absolute;inset:auto;left:${-(b.x - x) / b.w * 100}%;top:${-(b.y - y) / b.h * 100}%;width:${w / b.w * 100}%;height:${h / b.h * 100}%;object-fit:cover"></div>`) });
  }
  function loop() {
    if (raf || !alive) return;
    const step = () => {
      raf = 0; if (!alive || !noisy.size) return;
      if (!noiseC) { noiseC = document.createElement('canvas'); noiseC.width = 96; noiseC.height = 72 }
      const x = noiseC.getContext('2d'), d = x.createImageData(96, 72);
      for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 230 | 0; d.data[i] = v; d.data[i + 1] = v; d.data[i + 2] = v * 1.05; d.data[i + 3] = 255 }
      x.putImageData(d, 0, 0);
      noisy.forEach(k => { const c = boxes[k] && boxes[k].bx.querySelector('canvas.nz'); if (c) c.getContext('2d').drawImage(noiseC, 0, 0) });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  function room(v) { I.querySelector('.ix-plate').style.setProperty('--room', v) }

  /* ---------- cámara ---------- */
  function heroOrigin() { const b = boxes[HERO].b; return `${(b.x + b.w / 2) * 100}% ${(b.y + b.h / 2) * 100}%` }
  function push(scale, ms, ease) { cam.style.transformOrigin = heroOrigin(); cam.style.transition = `transform ${ms}ms ${ease || 'cubic-bezier(.25,.1,.25,1)'}`; cam.style.transform = `scale(${scale})` }
  function through(done) {
    const r = boxes[HERO].bx.getBoundingClientRect(); const cur = cam._k || 1;
    const k = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.35;
    const hx = r.left + r.width / 2, hy = r.top + r.height / 2;
    const dx = (innerWidth / 2 - hx) / stage._s, dy = (innerHeight / 2 - hy) / stage._s;
    cam.style.transition = 'transform 1.2s cubic-bezier(.65,0,.3,1)';
    cam.style.transform = `translate(${dx}px,${dy}px) scale(${(cur * k).toFixed(3)})`;
    noise(HERO); T(() => logo(HERO), 160);
    I.classList.add('thru'); T(done, 1180);
  }

  /* ---------- secuencia ---------- */
  const ORDER = ['t6', 't2', 't5', 't1', 't7', 't3'];
  const FIRST = { t6: k => photo(k, CITY[0]), t2: k => clg(k), t5: k => txt(k, TXT[0]), t1: k => map(k), t7: k => bars(k), t3: k => photo(k, CITY[1]) };
  function play() {
    room(.07); push(1, 0);
    T(() => { cam._k = 1.06; push(1.06, 9000, 'cubic-bezier(.3,0,.2,1)') }, 500);
    ORDER.forEach((k, i) => T(() => { room((.12 + i * .1).toFixed(2)); powerOn(k, () => FIRST[k](k)) }, 700 + i * 360));
    T(() => powerOn(HERO, () => noise(HERO)), 3000);
    T(() => { room(1); span(['t1', 't3', 't5'], CITY[2]); txt('t6', TXT[1]) }, 3900);
    T(() => { span(['t2', 't4'], CITY[3]); map('t7') }, 5000);
    T(() => { noise('t1'); photo('t6', CITY[4]); clg('t3') }, 5800);
    T(() => { noise(HERO); T(() => logo(HERO), 260); bars('t1'); off('t7'); txt('t5', TXT[2]) }, 6400);
    T(() => { I.classList.add('cta'); idle() }, 7000);
  }
  function idle() {
    const ks = ['t1', 't2', 't3', 't5', 't6', 't7'], F = [k => photo(k, pick(CITY)), clg, map, k => txt(k), bars, noise, off, k => photo(k, pick(CITY))];
    const tick = () => { if (!alive) return; const k = pick(ks); if (Math.random() < .18) { const a = pick([['t1', 't3', 't5'], ['t2', 't6']]); span(a, pick(CITY)) } else { noise(k); T(() => pick(F)(k), 240) } T(tick, 1500 + Math.random() * 1100) };
    T(tick, 1300);
  }
  function still() {
    room(1); span(['t1', 't3', 't5'], CITY[2]); photo('t6', CITY[0]); clg('t2'); txt('t7', TXT[3]); logo(HERO);
    I.classList.add('cta');
  }

  /* ---------- API usada por app.js ---------- */
  function start(go) {
    stop(); onGo = go; if (!build()) return false; alive = true;
    const plate = I.querySelector('.ix-plate'); const begin = () => { if (!alive) return; RM.matches ? still() : play() };
    if (plate.complete) begin(); else { plate.onload = begin; plate.onerror = begin }
    const enter = ev => { if (ev && ev.target.closest('#skipBtn')) return; if (!I.classList.contains('cta') && !RM.matches) { timers.forEach(clearTimeout); timers = []; still() } leave(false) };
    I.onclick = enter;
    I.querySelector('#skipBtn').onclick = ev => { ev.stopPropagation(); leave(true) };
    I.onkeydown = ev => { if (ev.key === 'Escape') leave(true) };
    addEventListener('resize', onResize);
    setTimeout(() => { const b = I.querySelector('#enterBtn'); if (b) b.focus({ preventScroll: true }) }, RM.matches ? 50 : 7100);
    return true;
  }
  let leaving = false;
  function leave(skip) {
    if (leaving) return; leaving = true;
    const go = () => { leaving = false; onGo && onGo() };
    if (skip || RM.matches) { go(); return }
    timers.forEach(clearTimeout); timers = []; through(go);
  }
  function onResize() { if (!alive) return; if (mode() !== layout) { const g = onGo; start(g); return } fit() }
  function stop() { alive = false; leaving = false; timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); raf = 0; noisy.clear(); removeEventListener('resize', onResize) }
  window.INTRO2 = { start, stop };
})();
