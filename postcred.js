/* =====================================================================
   ESCENA POSCRÉDITOS + APOYO DE LA COMUNIDAD (v19)
   - Se abre sola UNA vez (la primera temporada completa en este dispositivo).
   - Después, solo a pedido: enlace en el fin de temporada y «Apoya TINTAFLIX»
     en el menú. Nunca interrumpe episodios ni bloquea contenido.
   - Donaciones: interfaz lista; pagos y datos bancarios pendientes
     (donar-config.js). No se inventan datos financieros ni enlaces.
   ===================================================================== */
(function () {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KEY = 'tfx2_pcSeen';
  const seen = () => { try { return !!localStorage.getItem(KEY) } catch (_) { return true } };
  const mark = () => { try { localStorage.setItem(KEY, String(Date.now())) } catch (_) { } };
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const P = [
    ['big', 'Detrás de esta serie no está Netflix. Estamos nosotros. ❤️'],
    ['p', 'Todo empezó con mensajes como este:'],
    ['chat', ['Hola ☺️ estaba esperando que suban info sobre las propuestas de los alcaldes para saber por quién votar 😭😭😭', 'Pero no lo han hecho 😭😭😭😭']],
    ['p', 'Nuestra comunidad nos estaba pidiendo algo muy concreto: entender quién quiere gobernar su ciudad y qué propone. Así que decidimos retomar la serie que ya hacíamos, pero esta vez apoyándonos más en la tecnología, para que sea más pedagógica y se adapte a diferentes generaciones.'],
    ['p', 'Creemos que entender la política no debería ser complicado y que tomar una decisión informada no debería ser un privilegio.'],
    ['p', 'No conseguimos fondos de cooperación para desarrollar este proyecto. Aun así, decidimos hacerlo porque creemos en la educación, en la democracia y en el poder de una ciudadanía informada.'],
    ['p', 'Si esta experiencia te ayudó a entender un poquito mejor estas elecciones y está dentro de tus posibilidades, puedes apoyarnos con una donación.'],
    ['p', 'Tu aporte nos ayuda a seguir creando proyectos como este, gratuitos y accesibles para todos.'],
    ['thx', 'Gracias por llegar hasta aquí.'],
    ['sig', 'Con cariño,<br>el equipo de Tinta Digital.']
  ];
  const TEAM = (window.TINTA_EQUIPO || []).filter(f => f && f.src);   /* fotos reales del equipo, cuando existan */
  let el = null, timers = [], lastFocus = null;

  function words(t) { return t.split(' ').map((w, i) => `<span class="pw" style="--i:${i}">${w}</span>`).join(' ') }
  function build(from) {
    const team = TEAM.length ? `<div class="pc-team">${TEAM.slice(0, 5).map((f, i) => `<figure style="--i:${i};--r:${(i % 2 ? 1 : -1) * (1.5 + i * .6)}deg"><img src="${esc(f.src)}" alt="${esc(f.alt || 'Equipo de Tinta Digital')}"></figure>`).join('')}</div>` : '';
    return `<div class="pc-cam">
        <div class="pc-depth d1" aria-hidden="true">TINTAFLIX</div>
        <div class="pc-depth d2" aria-hidden="true"></div>
        <div class="pc-scroll" tabindex="-1">
          <div class="pc-in">
            <p class="pc-kick">${from === 'season' ? 'Escena poscréditos' : 'Apoya TINTAFLIX'}</p>
            ${team}
            ${P.map(([c, t], i) => c === 'big' ? `<h2 class="pc-b pc-big" data-b="${i}">${words(t)}</h2>` : c === 'chat' ? `<figure class="pc-b pc-chat" data-b="${i}"><div class="pc-msgs">${t.map((m, j) => `<p class="pc-msg" style="--j:${j}">${esc(m)}</p>`).join('')}</div><figcaption>Mensaje de nuestra comunidad · compartido sin nombre ni foto</figcaption></figure>` : `<p class="pc-b pc-${c}" data-b="${i}">${t}</p>`).join('')}
            <img class="pc-b pc-logo" data-b="${P.length}" src="img/tinta-digital-blanco.png" alt="Tinta Digital">
            <div class="pc-b pc-acts" data-b="${P.length + 1}">
              <button class="pc-btn pri" data-pc="donar">Quiero apoyar este proyecto ❤️</button>
              <button class="pc-btn" data-pc="seguir">Seguir explorando TINTAFLIX</button>
            </div>
          </div>
        </div>
      </div>
      <button class="pc-skip" data-pc="skip">Mostrar todo</button>
      <button class="pc-x" data-pc="seguir" aria-label="Cerrar">✕</button>
      <div class="pc-don" hidden role="dialog" aria-modal="true" aria-labelledby="pcDonT"></div>`;
  }
  /* revelado progresivo: cada bloque entra a su tiempo; la cámara sigue al último */
  function play() {
    const B = [...el.querySelectorAll('.pc-b')], sc = el.querySelector('.pc-scroll');
    if (RM.matches) { B.forEach(b => b.classList.add('on')); el.querySelector('.pc-skip').hidden = true; return }
    let t = 700;
    B.forEach((b, i) => {
      timers.push(setTimeout(() => {
        b.classList.add('on');
        const r = b.getBoundingClientRect(), H = sc.clientHeight;
        if (r.bottom > H * .82) sc.scrollTo({ top: sc.scrollTop + r.bottom - H * .62, behavior: 'smooth' });
        if (i === B.length - 1) el.querySelector('.pc-skip').hidden = true;
      }, t));
      const n = (b.textContent || '').split(/\s+/).length;
      t += b.classList.contains('pc-big') ? 3400 : b.classList.contains('pc-p') ? Math.max(2200, n * 210) : 1500;
    });
  }
  function showAll() { timers.forEach(clearTimeout); timers = []; el.querySelectorAll('.pc-b').forEach(b => b.classList.add('on')); el.querySelector('.pc-skip').hidden = true }

  /* ---------------- donaciones ---------------- */
  const AMS = () => ((window.TINTA_DONAR || {}).pagos || []).map(x => x.monto);
  const urlFor = a => (((window.TINTA_DONAR || {}).pagos || []).find(x => x.monto === a) || {}).url || '';
  function donHTML(st, solo) {
    const C = window.TINTA_DONAR || {}, Bk = C.banco || {};
    const rows = [['Titular', Bk.titular], ['Banco', Bk.banco], ['Tipo de cuenta', Bk.tipo], ['Número de cuenta', Bk.numero], ['RUC', Bk.identificacion], ['Correo para el comprobante', Bk.correo]];
    const amt = st.amt;
    const ready = rows.slice(1, 4).every(r => r[1]);
    return `<div class="pd-card">
      <button class="pd-x" data-pd="close" aria-label="Volver">✕</button>
      <p class="pd-kick">Apoya a Tinta · Fundación Tinta Lab</p>
      <h3 id="pcDonT">Elige cuánto quieres aportar</h3>
      <div class="pd-amts" role="group" aria-label="Montos sugeridos">${AMS().map(a => `<button class="pd-amt${amt === a && !st.custom ? ' on' : ''}" data-amt="${a}" aria-pressed="${amt === a && !st.custom}">$${a}</button>`).join('')}
        <label class="pd-cus${st.custom ? ' on' : ''}"><span>Otro monto</span><span class="pd-in">$<input type="number" inputmode="decimal" min="1" step="1" placeholder="0" value="${st.custom ? esc(st.amt || '') : ''}" aria-label="Monto personalizado en dólares"></span></label></div>
      <div class="pd-tabs" role="tablist">
        <button role="tab" class="pd-tab${st.mode === 'online' ? ' on' : ''}" aria-selected="${st.mode === 'online'}" data-mode="online">Donación en línea</button>
        <button role="tab" class="pd-tab${st.mode === 'bank' ? ' on' : ''}" aria-selected="${st.mode === 'bank'}" data-mode="bank">Transferencia bancaria</button>
      </div>
      ${st.mode === 'online' ? `<div class="pd-pane">
        <p>Paga con tarjeta desde una plataforma segura${C.pagoNombre ? ` (${esc(C.pagoNombre)})` : ''}.</p>
        ${!st.custom && urlFor(amt) ? `<a class="pc-btn pri pd-go" href="${esc(urlFor(amt))}" target="_blank" rel="noopener">Continuar al pago · $${esc(amt)}</a><p class="pd-pend">Se abre el pago seguro de Payphone en una pestaña nueva.</p>`
          : st.custom ? `<p class="pd-pend">En línea puedes aportar $${AMS().join(', $').replace(/, \$(\d+)$/, ' o $$$1')}. Para otro monto, usa la transferencia bancaria.</p><button class="pc-btn pri" data-mode="bank">Ir a transferencia bancaria</button>`
          : `<button class="pc-btn pri pd-go" disabled>Continuar al pago</button><p class="pd-pend">Estamos terminando de configurar los pagos en línea. Muy pronto podrás donar desde aquí.</p>`}
      </div>` : `<div class="pd-pane">
        <p>Transfiere ${amt ? `<b>$${esc(amt)}</b> ` : ''}a la cuenta de la <b>Fundación Tinta Lab</b>.</p>
        <dl class="pd-bank">${rows.map(([l, v]) => `<div><dt>${l}</dt><dd>${v ? esc(v) : '<span class="pd-p">Pendiente</span>'}</dd>${v ? `<button class="pd-copy" data-copy="${esc(v)}" aria-label="Copiar ${l}">Copiar</button>` : ''}</div>`).join('')}</dl>
        <button class="pc-btn pd-all" data-pd="copyall" ${ready ? '' : 'disabled'}>Copiar todos los datos</button>
        ${ready ? '' : '<p class="pd-pend">Publicaremos aquí los datos bancarios oficiales muy pronto.</p>'}
      </div>`}
      <p class="pd-note">Donar es voluntario. Todo TINTAFLIX seguirá gratis y abierto para todos.</p>${solo ? '<button class="pd-story" data-pd="story">Conoce la historia detrás de TINTAFLIX ▸</button>' : ''}
    </div>`;
  }
  function openDon(d, solo) {
    d = d || el.querySelector('.pc-don'); const st = { amt: AMS()[0] || null, custom: false, mode: 'online' };
    const draw = () => { d.innerHTML = donHTML(st, solo); };
    draw(); d.hidden = false; requestAnimationFrame(() => d.classList.add('on'));
    setTimeout(() => { const f = d.querySelector('.pd-amt.on'); if (f) f.focus() }, 50);
    d.onclick = ev => {
      const b = ev.target.closest('button'); if (!b) { if (ev.target === d) closeDon(d); return }
      if (b.dataset.amt) { st.amt = +b.dataset.amt; st.custom = false; draw(); d.querySelector(`[data-amt="${st.amt}"]`).focus() }
      else if (b.dataset.mode) { st.mode = b.dataset.mode; draw(); d.querySelector('.pd-tab.on').focus() }
      else if (b.dataset.copy) copy(b.dataset.copy, b)
      else if (b.dataset.pd === 'copyall') { const Bk = (window.TINTA_DONAR || {}).banco || {}; copy(['Titular: ' + Bk.titular, 'Banco: ' + Bk.banco, 'Tipo de cuenta: ' + Bk.tipo, 'Número: ' + Bk.numero, Bk.identificacion ? 'RUC: ' + Bk.identificacion : '', Bk.correo ? 'Comprobante a: ' + Bk.correo : ''].filter(Boolean).join('\n'), b) }
      else if (b.dataset.pd === 'close') closeDon(d);
      else if (b.dataset.pd === 'story') { closeDon(d); setTimeout(() => open({ from: 'menu' }), 320) }
    };
    d.oninput = ev => { if (ev.target.matches('.pd-cus input')) { const v = Math.max(0, Math.round(+ev.target.value || 0)); st.amt = v || null; st.custom = true; d.querySelectorAll('.pd-amt').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false') }); d.querySelector('.pd-cus').classList.add('on'); if (st.mode === 'online') { const p = ev.target.selectionStart; draw(); const i = d.querySelector('.pd-cus input'); if (i) { i.focus(); try { i.setSelectionRange(p, p) } catch (_) { } } } } };
  }
  function closeDon(d) {
    d = d || (el && el.querySelector('.pc-don')); if (!d) return; d.classList.remove('on');
    const solo = d.closest('.pdsolo');
    if (solo) { const lf = solo._last; setTimeout(() => { solo.remove(); if (!el) document.body.classList.remove('pc-lock') }, 300); if (lf && lf.focus) try { lf.focus({ preventScroll: true }) } catch (_) { } return }
    setTimeout(() => { d.hidden = true; d.innerHTML = '' }, 300); const b = el && el.querySelector('[data-pc="donar"]'); if (b) b.focus()
  }
  /* opciones de donación directas (pie de página, menú, paréntesis): sin pasar por la carta */
  function donate() {
    if (el) { showAll(); openDon(); return }
    if (document.querySelector('.pdsolo')) return;
    const w = document.createElement('div'); w.className = 'pdsolo'; w._last = document.activeElement;
    w.innerHTML = '<div class="pc-don" role="dialog" aria-modal="true" aria-labelledby="pcDonT"></div>';
    document.body.appendChild(w); document.body.classList.add('pc-lock');
    const d = w.firstChild; openDon(d, true);
    w.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') { ev.stopPropagation(); closeDon(d) }
      if (ev.key === 'Tab') { const f = [...w.querySelectorAll('button:not([disabled]),a[href],input')]; if (!f.length) return; const i = f.indexOf(document.activeElement); if (ev.shiftKey && i <= 0) { f[f.length - 1].focus(); ev.preventDefault() } else if (!ev.shiftKey && i === f.length - 1) { f[0].focus(); ev.preventDefault() } }
    });
  }
  function copy(t, b) {
    const ok = () => { const o = b.textContent; b.textContent = 'Copiado ✓'; b.classList.add('ok'); setTimeout(() => { b.textContent = o; b.classList.remove('ok') }, 1600) };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, () => fallback(t, ok)); else fallback(t, ok);
  }
  function fallback(t, ok) { const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); ok() } catch (_) { } a.remove() }

  /* ---------------- abrir / cerrar ---------------- */
  function open(opt) {
    opt = opt || {}; if (el) return;
    mark(); lastFocus = document.activeElement;
    el = document.createElement('div'); el.id = 'pcred'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Detrás de TINTAFLIX');
    el.className = 'pc' + (RM.matches ? ' rm' : '');
    el.innerHTML = build(opt.from); document.body.appendChild(el); document.body.classList.add('pc-lock');
    requestAnimationFrame(() => el.classList.add('on'));
    el.addEventListener('click', ev => {
      const b = ev.target.closest('[data-pc]'); if (!b) return;
      const a = b.dataset.pc;
      if (a === 'donar') { showAll(); openDon() }
      else if (a === 'seguir') close(opt.onClose);
      else if (a === 'skip') showAll();
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') { ev.stopPropagation(); const d = el.querySelector('.pc-don'); if (d && !d.hidden) closeDon(); else close(opt.onClose) }
      if (ev.key === 'Tab') { const f = [...el.querySelectorAll('button:not([disabled]),a[href],input')].filter(x => x.offsetParent !== null && !x.closest('[hidden]')); if (!f.length) return; const i = f.indexOf(document.activeElement); if (ev.shiftKey && i <= 0) { f[f.length - 1].focus(); ev.preventDefault() } else if (!ev.shiftKey && i === f.length - 1) { f[0].focus(); ev.preventDefault() } }
    });
    setTimeout(() => el && el.querySelector('.pc-skip').focus({ preventScroll: true }), 300);
    play();
  }
  function close(cb) {
    if (!el) return; timers.forEach(clearTimeout); timers = [];
    const e = el; el = null; e.classList.remove('on'); document.body.classList.remove('pc-lock');
    setTimeout(() => e.remove(), 500);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }) } catch (_) { }
    if (typeof cb === 'function') cb();
  }

  /* ---------------- pie de página de apoyo (componente reutilizable) ---------------- */
  function apoyoHTML() {
    return `<section class="apoyo" aria-label="Una producción independiente">
      <div class="ap-in">
        <img class="ap-logo" src="img/tinta-digital-blanco.png" alt="Tinta Digital" width="120" height="120" loading="lazy">
        <div class="ap-tx">
          <h2 class="ap-h">Una producción independiente</h2>
          <p class="ap-lead">Aquí no necesitas pagar una suscripción. <span class="ap-hz" aria-hidden="true">❤️</span></p>
          <p class="ap-p">TINTAFLIX nació de nuestra comunidad. Lo hicimos desde Tinta Digital, sin fondos de cooperación, porque creemos que educarnos no debería ser un privilegio.</p>
          <p class="ap-p">Si te gusta lo que hacemos, ayúdanos a seguir haciéndolo.</p>
          <div class="ap-acts"><button class="ap-btn" type="button" data-donar>Apoyar a Tinta</button><button class="ap-link" type="button" data-apoya>Conoce la historia detrás de TINTAFLIX</button></div>
        </div>
      </div>
    </section>`;
  }
  /* revelado sutil al entrar en pantalla */
  const IO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); IO.unobserve(e.target) } }), { threshold: .25 }) : null;
  function watch() { document.querySelectorAll('.apoyo:not(.io)').forEach(x => { x.classList.add('io'); if (IO && !RM.matches) IO.observe(x); else x.classList.add('in') }) }
  new MutationObserver(watch).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------------- paréntesis breve tras completar tres capítulos ---------------- */
  const CK = 'tfx2_chDone', ZK = 'tfx2_pzSeen';
  function chapterDone(key) {
    let a = []; try { a = JSON.parse(localStorage.getItem(CK)) || [] } catch (_) { }
    if (key && a.indexOf(key) < 0) { a.push(key); try { localStorage.setItem(CK, JSON.stringify(a.slice(-50))) } catch (_) { } }
    let z = true; try { z = !!localStorage.getItem(ZK) } catch (_) { }
    return a.length >= 3 && !z;
  }
  function pausa(host, o) {
    o = o || {}; try { localStorage.setItem(ZK, String(Date.now())) } catch (_) { }
    const c = document.createElement('div'); c.className = 'pz'; c.setAttribute('role', 'dialog'); c.setAttribute('aria-label', 'Un pequeño paréntesis');
    c.innerHTML = `<button class="pz-x" data-pz="x" aria-label="Cerrar">✕</button>
      <p class="pz-h">Un pequeño paréntesis… <span aria-hidden="true">❤️</span></p>
      <p class="pz-p">Si TINTAFLIX te está ayudando a entender mejor estas elecciones, imagina cuántas historias más podríamos contar con tu apoyo.</p>
      <div class="pz-acts"><button class="pz-b pri" data-pz="don">Quiero apoyar</button><button class="pz-b" data-pz="next">${o.next ? 'Siguiente capítulo' : 'Seguir explorando'}</button></div>`;
    const bye = () => { c.classList.remove('on'); setTimeout(() => c.remove(), 350) };
    c.addEventListener('click', ev => {
      ev.stopPropagation(); const b = ev.target.closest('[data-pz]'); if (!b) return;
      if (b.dataset.pz === 'don') donate();
      else if (b.dataset.pz === 'next') { bye(); if (o.next) o.next() }
      else bye();
    });
    host.appendChild(c); requestAnimationFrame(() => c.classList.add('on'));
    setTimeout(() => { const f = c.querySelector('.pz-b.pri'); if (f) f.focus({ preventScroll: true }) }, 400);
    return c;
  }

  window.POSTCRED = { open, close, seen, donate, chapterDone, pausa, isOpen: () => !!el || !!document.querySelector('.pdsolo') };
  window.apoyoHTML = apoyoHTML;
  /* accesos: data-apoya abre la carta completa; data-donar abre directo las opciones de donación */
  document.addEventListener('click', ev => {
    const d = ev.target.closest('[data-donar]'); if (d) { ev.preventDefault(); donate(); return }
    const a = ev.target.closest('[data-apoya]'); if (a) { ev.preventDefault(); open({ from: 'menu' }) }
  });
})();
