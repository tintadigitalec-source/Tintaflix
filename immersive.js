/* =====================================================================
   TINTAFLIX · CAPA INMERSIVA DE LA PLATAFORMA (v14)
   - Estantería cinematográfica: las portadas giran en 3D según su
     distancia al centro de la fila; la elegida sale de la fila, avanza
     hacia la cámara y se convierte en la portada de la serie.
   - Billboard con profundidad: foto, título gigante integrado y objetos
     recortados que avanzan hacia la cámara al desplazarse.
   - Inclinación por puntero (escritorio) y por desplazamiento (móvil).
   - Misma lógica de salida para ciudades y miniaturas de episodios.
   Sin movimiento cuando el sistema pide movimiento reducido.
   ===================================================================== */
(function () {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const view = () => document.getElementById('view');
  const raf = fn => { let t = 0; return (...a) => { if (t) return; t = requestAnimationFrame(() => { t = 0; fn(...a) }) } };

  /* ---------- 1. estantería: rotación según posición en la fila ---------- */
  function shelf(sc) {
    if (sc._shelf) return; sc._shelf = true; sc.classList.add('shelf');
    const upd = raf(() => {
      const b = sc.getBoundingClientRect(), cx = b.left + b.width / 2;
      sc.querySelectorAll(':scope > .pcard, :scope > a, :scope > .tcov, :scope > *').forEach(c => {
        const r = c.getBoundingClientRect(); const d = Math.max(-1.4, Math.min(1.4, (r.left + r.width / 2 - cx) / (b.width / 2)));
        c.style.setProperty('--d', d.toFixed(3)); c.style.setProperty('--ad', Math.abs(d).toFixed(3));
      });
    });
    sc.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    /* inclinación fina con el puntero sobre cada portada */
    sc.addEventListener('pointermove', ev => {
      if (ev.pointerType !== 'mouse') return; const c = ev.target.closest('.pcard'); if (!c) return;
      const r = c.getBoundingClientRect(); c.style.setProperty('--px', ((ev.clientX - r.left) / r.width - .5).toFixed(3)); c.style.setProperty('--py', ((ev.clientY - r.top) / r.height - .5).toFixed(3));
    });
    sc.addEventListener('pointerleave', () => sc.querySelectorAll('.pcard').forEach(c => { c.style.setProperty('--px', 0); c.style.setProperty('--py', 0) }));
  }

  /* ---------- 2. la portada sale de la fila y avanza hacia la cámara ---------- */
  function pullOut(card, el, href, vt) {
    if (RM.matches) { location.hash = href; return }
    const r = el.getBoundingClientRect();
    const ghost = el.cloneNode(true); ghost.classList.add('ghost-fly');
    Object.assign(ghost.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    document.body.appendChild(ghost);
    card.classList.add('pulled');
    document.body.classList.add('flying');
    /* sale de la fila (eje Z), gira de frente y crece hasta ocupar el escenario */
    const W = innerWidth, H = innerHeight, s = Math.max(W / r.width, H / r.height) * 1.02;
    const tx = W / 2 - (r.left + r.width / 2), ty = H / 2 - (r.top + r.height / 2);
    const a = ghost.animate([
      { transform: 'perspective(1000px) translate3d(0,0,0) rotateY(0deg)', borderRadius: '6px', filter: 'brightness(1)' },
      { transform: 'perspective(1000px) translate3d(0,-8%,160px) rotateY(-8deg)', offset: .3 },
      { transform: `perspective(1000px) translate3d(${tx}px,${ty}px,0) scale(${s})`, borderRadius: '0px', filter: 'brightness(.85)' }
    ], { duration: 820, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'forwards' });
    a.onfinish = () => {
      if (vt) ghost.style.viewTransitionName = vt;
      const go = () => { history.pushState(null, '', href); dispatchEvent(new HashChangeEvent('hashchange')) };
      const done = () => { ghost.remove(); card.classList.remove('pulled'); document.body.classList.remove('flying'); scrollTo(0, 0) };
      if (document.startViewTransition && vt) { const t = document.startViewTransition(() => { ghost.style.viewTransitionName = 'none'; ghost.style.visibility = 'hidden'; go() }); t.finished.finally(done) }
      else { go(); ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' }).onfinish = done }
    };
  }
  document.addEventListener('click', ev => {
    const a = ev.target.closest('a'); if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
    const pc = a.closest('.pcard'), th = a.querySelector('.thumb'), city = a.closest('.city2');
    if (pc && a.querySelector('.poster')) { ev.preventDefault(); ev.stopImmediatePropagation(); pullOut(pc, a.querySelector('.poster'), a.getAttribute('href'), a.dataset.vt) }
    else if (th && /#ver\//.test(a.getAttribute('href'))) { ev.preventDefault(); ev.stopImmediatePropagation(); pullOut(a, th, a.getAttribute('href'), null) }
    else if (city && city.classList.contains('has')) { const id = city.dataset.city; try { localStorage.setItem('tfx2_city', JSON.stringify(id)) } catch (_) { } if (window.__T) window.__T.ST.city = id; ev.preventDefault(); ev.stopImmediatePropagation(); pullOut(city, city, '#inicio', null) }
  }, true);

  /* ---------- 3. billboard: título integrado y objetos hacia la cámara ---------- */
  const OBJ = ['mov-volcan', 'amb-colibri', 'mov-bus', 'amb-guayacan'];
  function hero(h) {
    if (h._imm) return; h._imm = true;
    const name = (h.querySelector('h1') || {}).textContent || '';
    const city = (document.getElementById('cityName') || {}).textContent || name.split(' ').pop();
    const big = document.createElement('div'); big.className = 'hbig'; big.setAttribute('aria-hidden', 'true'); big.textContent = city.toUpperCase();
    const img = h.querySelector('.hbg img'); if (img) big.style.backgroundImage = `url("${img.getAttribute('src')}")`;
    h.insertBefore(big, h.querySelector('.heroin'));
    const ob = document.createElement('div'); ob.className = 'hobj'; ob.setAttribute('aria-hidden', 'true');
    ob.innerHTML = OBJ.map((o, i) => `<img class="o o${i}" src="clg/${o}.webp" alt="">`).join('');
    h.appendChild(ob);
    const mv = ev => { const r = h.getBoundingClientRect(); h.style.setProperty('--mx', ((ev.clientX - r.left) / r.width - .5).toFixed(3)); h.style.setProperty('--my', ((ev.clientY - r.top) / r.height - .5).toFixed(3)) };
    h.addEventListener('pointermove', raf(mv));
  }

  /* ---------- 4. serie: la portada respira y los episodios salen del estante ---------- */
  function serie(s) {
    if (s._imm) return; s._imm = true;
    const cov = s.querySelector('.cover'); if (!cov) return;
    cov.addEventListener('pointermove', raf(ev => { const r = cov.getBoundingClientRect(); cov.style.setProperty('--mx', ((ev.clientX - r.left) / r.width - .5).toFixed(3)); cov.style.setProperty('--my', ((ev.clientY - r.top) / r.height - .5).toFixed(3)) }));
  }

  /* ---------- 5. ciudades: inclinación por puntero ---------- */
  function cities(c) {
    if (c._imm) return; c._imm = true;
    c.addEventListener('pointermove', raf(ev => { const t = ev.target.closest('.city2'); if (!t || ev.pointerType !== 'mouse') return; const r = t.getBoundingClientRect(); t.style.setProperty('--px', ((ev.clientX - r.left) / r.width - .5).toFixed(3)); t.style.setProperty('--py', ((ev.clientY - r.top) / r.height - .5).toFixed(3)) }));
  }

  function enhance() {
    const v = view(); if (!v) return;
    v.querySelectorAll('.scroller.posters,.scroller.tcovers,.scroller:not(.shelf)').forEach(shelf);
    v.querySelectorAll('.hero.photo').forEach(hero);
    v.querySelectorAll('.serie').forEach(serie);
    v.querySelectorAll('.cities').forEach(cities);
  }
  const start = () => { const v = view(); if (!v) return; new MutationObserver(raf(enhance)).observe(v, { childList: true, subtree: true }); enhance() };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  /* ambiente: profundidad por desplazamiento (objetos que avanzan hacia la cámara) */
  addEventListener('scroll', raf(() => document.documentElement.style.setProperty('--sp', Math.min(1, scrollY / 600).toFixed(3))), { passive: true });
})();
