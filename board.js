/* Imagen normal o recorte de hoja (window.SPR: [hoja, y, alto, altoHoja]).
   El recorte se hace una vez en un canvas y se muestra como imagen pequeña:
   en iPhone las hojas muy altas dentro de capas animadas dejaban la página
   en blanco o la cerraban. */
const SPR_PX = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
function IM(src, alt) {
  const s = (window.SPR || {})[src], e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!s) return `<img src="${e(src)}" alt="${e(alt)}">`;
  const u = SPRX.ready(src);
  return `<span class="spr" style="aspect-ratio:900/${s[2]}"><img ${u ? `src="${u}"` : `src="${SPR_PX}" data-spr="${e(src)}"`} alt="${e(alt)}"></span>`;
}
window.SPRX = (function () {
  const sheets = {}, urls = {}, done = {};
  const sheet = f => {
    const o = sheets[f] || (sheets[f] = { p: new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = f; }) });
    clearTimeout(o.t); o.t = setTimeout(() => { delete sheets[f]; }, 15000);
    return o.p;
  };
  const get = src => urls[src] || (urls[src] = sheet(SPR[src][0]).then(im => new Promise(res => {
    const [, y, h] = SPR[src], w = im.naturalWidth, c = document.createElement('canvas');
    c.width = w; c.height = h; c.getContext('2d').drawImage(im, 0, y, w, h, 0, 0, w, h);
    const fin = u => { done[src] = u; res(u); };
    if (c.toBlob) c.toBlob(b => fin(b ? URL.createObjectURL(b) : c.toDataURL('image/jpeg', 0.88)), 'image/jpeg', 0.88);
    else fin(c.toDataURL('image/jpeg', 0.88));
    c.width = c.height = 0;
  })).catch(() => { delete urls[src]; return SPR_PX; }));
  const fill = root => {
    if (!root || root.nodeType !== 1) return;
    const list = root.matches && root.matches('img[data-spr]') ? [root] : [];
    root.querySelectorAll && list.push(...root.querySelectorAll('img[data-spr]'));
    list.forEach(img => { const k = img.getAttribute('data-spr'); img.removeAttribute('data-spr'); get(k).then(u => { img.src = u; }); });
  };
  const start = () => { fill(document.body); new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(fill))).observe(document.body, { childList: true, subtree: true }); };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  return { ready: src => done[src], fill };
})();
/* =====================================================================
   TABLERO DOCUMENTAL · capítulos 1–3 (v15)
   Un «universo» de 1600×1000 con fotos, documentos, fechas y líneas que
   la cámara recorre. Tres capas (fondo, medio, frente) se mueven con la
   misma cámara a distinta escala, para generar profundidad.
   Cada plano del episodio conserva su narración; el mundo persiste entre
   planos: lo revelado antes queda en escena y la cámara sigue desde donde
   estaba. Tiempos anclados a palabras de la narración.
   Datos por candidatura: window.BOARDS[key|ep] (prueba: Wilson Merino).
   ===================================================================== */
(function () {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hl = v => esc(v).replace(/\*(.+?)\*/g, '<mark>$1</mark>');
  window.BOARD_RENDER = function (s, X) {
    const B = s.board, k = s.bk, W = (s.k && s.k.W) || [], D = s.d;
    const at = (v, dflt) => { if (typeof v === 'number') return v; if (v instanceof RegExp) { const i = W.findIndex(w => v.test(w.w)); return i < 0 ? dflt : W[i].t } return dflt };
    const st = n => n.k < k ? 'on' : n.k === k ? 'rv' : 'off';
    const node = n => {
      const s0 = st(n); if (s0 === 'off') return '';
      const d = s0 === 'rv' ? at(n.at, .3) : 0;
      const sty = `left:${n.x}px;top:${n.y}px;${n.w ? `width:${n.w}px;` : ''}--r:${n.r || 0}deg;--d:${d.toFixed(2)}s`;
      const cls = `bn ${n.t} ${s0} ${n.fx || ''}`;
      if (n.t === 'ph') return `<figure class="${cls}" style="${sty}">${IM(n.src, n.alt)}${n.cap ? `<figcaption>${esc(n.cap)}</figcaption>` : ''}</figure>`;
      if (n.t === 'cut') return (window.SPR || {})[n.src] ? `<span class="${cls}" style="${sty}">${IM(n.src, '')}</span>` : `<img class="${cls}" style="${sty}" src="${esc(n.src)}" alt="">`;
      if (n.t === 'doc') return `<div class="${cls}" style="${sty}">${n.src ? IM(n.src, n.alt) : ''}${n.h ? `<b>${esc(n.h)}</b>` : ''}${n.sub ? `<small>${esc(n.sub)}</small>` : ''}${n.stamp ? `<em class="stp">${esc(n.stamp)}</em>` : ''}${n.cap ? `<span class="dcap">${esc(n.cap)}</span>` : ''}</div>`;
      if (n.t === 'dt' || n.t === 'ttl' || n.t === 'lbl' || n.t === 'wd') return `<div class="${cls}" style="${sty}${n.fs ? `;font-size:${n.fs}px` : ''}">${esc(n.v)}</div>`;
      if (n.t === 'tx') return `<div class="${cls}" style="${sty}">${n.kk ? `<span class="kk">${esc(n.kk)}</span>` : ''}${n.h ? `<b style="${n.hs ? `font-size:${n.hs}px` : ''}">${hl(n.h)}</b>` : ''}${n.b ? `<p>${hl(n.b)}</p>` : ''}</div>`;
      if (n.t === 'logo') return `<div class="${cls}" style="${sty}"><img src="${esc(n.src)}" alt="${esc(n.alt || '')}"></div>`;
      return '';
    };
    const line = (l, i) => { const s0 = st(l); if (s0 === 'off') return ''; const d = s0 === 'rv' ? at(l.at, .5) : 0; const p = l.p.map((q, j) => (j ? 'L' : 'M') + q[0] + ' ' + q[1]).join(' ');
      return `<path d="${p}" pathLength="1" class="bl ${s0}" style="--d:${d.toFixed(2)}s"/>${l.p.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="6" class="bd ${s0}" style="--d:${(d + .2).toFixed(2)}s"/>`).join('')}` };
    /* cámara: parte de la última parada del plano anterior */
    const prev = B.cam.filter(c => c.k < k), mine = B.cam.filter(c => c.k === k);
    const start = prev.length ? prev[prev.length - 1] : (mine[0] || { x: 800, y: 500, w: 1600 });
    const P = (v) => `--cx:${v.x};--cy:${v.y};--cw:${v.w}`;
    const kf = [[0, start]]; let last = start, tPrev = 0;
    mine.map((c, i) => ({ c, t: at(c.at, i ? D * i / mine.length : 0) })).sort((a, b) => a.t - b.t).forEach(({ c, t }) => {
      t = Math.max(tPrev, Math.min(D - .6, t)); const t1 = Math.min(D - .1, t + (c.mv ?? 1.8));
      if (t > tPrev + .05) kf.push([t / D, { ...last, w: last.w * (1 - .03 * Math.min(1, (t - tPrev) / 6)) }]);
      kf.push([t1 / D, c]); last = c; tPrev = t1;
    });
    kf.push([1, { ...last, w: last.w * .965 }]);
    const name = 'bc' + (B.id || 'b') + k;
    const tf = v => `transform:scale(calc(var(--vw) / ${v.w} * (1 + var(--dz)))) translate(${-v.x}px,${-v.y}px)`;
    const css = `@keyframes ${name}{${kf.map(([o, v]) => `${(o * 100).toFixed(2)}%{${tf(v)};animation-timing-function:cubic-bezier(.55,0,.25,1)}`).join('')}}`;
    const lay = (z, cls, inner) => `<div class="bwl ${cls}" style="--dz:${z};animation:${name} ${D}s linear both">${inner}</div>`;
    const N = B.nodes;
    return `<div class="comp c-board${B.v === 2 ? ' v2' : ''}"><style>${css}</style>
      ${lay(-.28, 'lb', N.filter(n => n.l === 'b').map(node).join(''))}
      ${lay(0, 'lm', `<svg class="blines" width="1600" height="1000" viewBox="0 0 1600 1000">${(B.lines || []).map(line).join('')}</svg>` + N.filter(n => !n.l || n.l === 'm').map(node).join(''))}
      ${lay(.16, 'lf', N.filter(n => n.l === 'f').map(node).join(''))}
      <span class="bshade"></span></div>`;
  };
})();
