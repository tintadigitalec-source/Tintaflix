/* =====================================================================
   TINTAFLIX · visualizaciones animadas de escenas
   Cada función devuelve un SVG que representa la idea de la escena.
   Animación por CSS (.dr = trazo, .fi = aparición, .po = pop) con --d = retardo.
   Los esquemas son ilustrativos: no dibujan trazados ni datos que el plan no da.
   ===================================================================== */
(function () {
  const W = 400, H = 260;
  const sv = (inner, cls = '') => `<svg class="viz ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">${inner}</svg>`;
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" class="${o.c || 'vt'}" text-anchor="${o.a || 'middle'}" style="--d:${o.d || 0}s"${o.fs ? ` font-size="${o.fs}"` : ''}>${s}</text>`;
  const note = s => `<text x="${W / 2}" y="${H - 6}" class="vnote" text-anchor="middle">${s}</text>`;
  const D = d => `style="--d:${d}s"`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Quito esquemático: franja norte–sur con valles al oriente */
  const quitoShape = `<path d="M150 22 C182 18 200 40 196 70 C192 102 206 132 200 168 C194 204 178 236 150 240 C122 236 112 206 116 170 C120 134 108 104 112 70 C116 40 124 26 150 22Z" class="vland"/>
    <path d="M240 110 C270 98 318 104 330 130 C342 160 312 184 282 180 C256 176 236 156 236 136 Z" class="vland vland2"/>`;

  const V = {};

  V['mapa-tiempo'] = (o = {}) => {
    const fv = o.focus === 'valles';
    return sv(`${quitoShape}
      ${t(150, 14, 'NORTE', { c: 'vcap' })}
      <circle cx="150" cy="122" r="9" class="vdot hot po" ${D(.1)}/>${t(150, 146, 'Hipercentro', { c: 'vt b', d: .2 })}
      <g class="${fv ? 'vmute' : ''}"><circle cx="150" cy="46" r="7" class="vdot po" ${D(.3)}/>${t(186, 40, 'Calderón', { a: 'start', d: .35 })}
      <path d="M150 54 C150 80 150 96 150 112" class="vtrip dr" ${D(.6)}/></g>
      <circle cx="292" cy="140" r="7" class="vdot po" ${D(.45)}/>${t(292, 166, 'Valles', { d: .5 })}
      <path d="M284 138 C250 130 200 124 160 122" class="vtrip dr ${fv ? 'hotline' : ''}" ${D(.8)}/>
      <g class="po" ${D(1.4)}><rect x="300" y="40" width="88" height="40" rx="8" class="vbadge"/>${t(344, 58, 'MÁS DE', { c: 'vcap dark' })}${t(344, 74, '2 HORAS', { c: 'vbig dark' })}</g>
      <circle cx="150" cy="122" r="9" class="vpulse"/>
      ${note('Esquema ilustrativo · Fuente: diagnóstico del plan, p. 3')}`);
  };

  const metroBase = (dim) => `${quitoShape}
      <path d="M150 210 L150 64" class="vmetro dr" ${D(.1)}/>
      ${[210, 176, 140, 104, 64].map((y, i) => `<circle cx="150" cy="${y}" r="${i === 0 || i === 4 ? 6 : 4}" class="vst po" ${D(.2 + i * .12)}/>`).join('')}
      ${t(166, 214, 'Quitumbe', { a: 'start', d: .3 })}${t(166, 68, 'El Labrador', { a: 'start', d: .8 })}
      ${dim ? '' : `<g class="fi" ${D(1)}><rect x="20" y="118" width="96" height="26" rx="13" class="vchip"/>${t(68, 136, 'LÍNEA ÚNICA', { c: 'vcap' })}</g>`}`;

  V['metro-linea'] = () => sv(`${metroBase(false)}
      <g class="fi" ${D(1.3)}><circle cx="292" cy="140" r="7" class="vdot off"/>${t(292, 166, 'Valles', { c: 'vt mute' })}
      <path d="M284 140 L170 140" class="vgap"/>${t(228, 132, '¿conexión?', { c: 'vt mute sm' })}</g>
      <g class="fi" ${D(1.5)}><circle cx="150" cy="236" r="6" class="vdot off"/>${t(176, 240, 'Sur', { a: 'start', c: 'vt mute' })}<path d="M150 216 L150 230" class="vgap"/></g>
      ${note('Esquema ilustrativo, no es un mapa · Fuente: plan, p. 3')}`);

  V['metro-ramales'] = () => sv(`${metroBase(true)}
      <path d="M150 64 C150 44 140 30 120 22" class="vbranch dr" ${D(1)}/>${t(104, 18, 'Norte', { c: 'vt b', d: 1.6 })}
      <path d="M150 210 C150 226 150 232 150 244" class="vbranch dr" ${D(1.2)}/>${t(176, 250, 'Sur', { a: 'start', c: 'vt b', d: 1.8 })}
      <path d="M150 140 C200 140 250 140 286 140" class="vbranch dr" ${D(1.4)}/>${t(300, 128, 'Valles', { a: 'start', c: 'vt b', d: 2 })}
      <g class="po" ${D(2.3)}><rect x="250" y="174" width="140" height="32" rx="6" class="vstamp"/>${t(320, 196, 'EN ESTUDIO', { c: 'vstampt' })}</g>
      ${note('Ramales dibujados como ilustración: el plan no define trazados')}`);

  V['estudio-obra'] = (o = {}) => {
    const st = o.on !== 'obra';
    return sv(`
      <g class="card ${st ? 'on' : 'off'} po" ${D(.1)}><rect x="34" y="28" width="150" height="180" rx="14" class="vcard"/>
        <rect x="74" y="58" width="70" height="88" rx="6" class="vdoc"/>${[72, 84, 96, 108, 120].map((y, i) => `<line x1="84" y1="${y}" x2="${134 - (i % 2) * 14}" y2="${y}" class="vline dr" ${D(.3 + i * .08)}/>`).join('')}
        <circle cx="136" cy="134" r="14" class="vlens"/><line x1="146" y1="144" x2="160" y2="158" class="vlens"/>
        ${t(109, 186, 'ESTUDIO', { c: 'vbig' })}</g>
      <g class="card ${st ? 'off' : 'on'} po" ${D(.3)}><rect x="216" y="28" width="150" height="180" rx="14" class="vcard"/>
        <path d="M250 150 L250 70 L330 70" class="vcrane dr" ${D(.5)}/><path d="M250 70 L270 54 L290 70" class="vcrane"/><line x1="316" y1="70" x2="316" y2="104" class="vline"/><rect x="304" y="104" width="24" height="16" class="vblock"/>
        <rect x="236" y="150" width="110" height="10" class="vblock"/>
        ${t(291, 186, 'OBRA', { c: 'vbig' })}</g>
      <g class="po" ${D(.9)}><circle cx="${st ? 170 : 352}" cy="40" r="16" class="vok"/><path d="M${st ? 162 : 344} 40 l6 6 l11 -12" class="vokc"/></g>
      ${note(st ? 'En este período: estudios, no construcción integral' : 'Aquí el plan habla de construcción')}`);
  };

  V['corredores'] = () => sv(`
      <path d="M90 200 C110 150 120 110 130 60" class="vbranch dr" ${D(.2)}/>
      <circle cx="90" cy="200" r="7" class="vdot po" ${D(.1)}/><circle cx="130" cy="60" r="7" class="vdot po" ${D(1)}/>
      ${t(90, 224, 'El Labrador', { d: .2 })}${t(130, 46, 'Zabala', { c: 'vt b', d: 1 })}
      <path d="M220 90 C250 120 280 160 320 200" class="vbranch dr" ${D(.6)}/>
      <circle cx="220" cy="90" r="7" class="vdot po" ${D(.5)}/><circle cx="320" cy="200" r="7" class="vdot po" ${D(1.4)}/>
      ${t(220, 76, 'La Marín', { d: .5 })}${t(320, 226, 'El Triángulo', { c: 'vt b', d: 1.4 })}
      <g class="po" ${D(1.8)}><rect x="246" y="22" width="140" height="48" rx="8" class="vbadge"/>${t(316, 42, 'ALREDEDOR DE', { c: 'vcap dark' })}${t(316, 62, 'USD 450 M', { c: 'vbig dark' })}</g>
      <g class="fi" ${D(2.2)}>${t(34, 128, 'Concesión', { a: 'start', c: 'vt b' })}${t(34, 146, 'internacional', { a: 'start' })}</g>
      ${note('Corredores nombrados en el plan · sin trazado definido · p. 7 y 9')}`);

  V['instituciones'] = (o = {}) => {
    const set = o.set === 'baches'
      ? { c: 'Arranque', n: [['EPMMOP', 'Obras'], ['EMASEO', 'Aseo'], ['Secretaría', 'de Movilidad']], f: ['USD 2–4 M', 'Día 100'] }
      : { c: 'Conducción', n: [['Secretaría', 'de Movilidad'], ['EPMTP', 'Transporte'], ['EPMMOP', 'Obras']], f: ['PMDOT', 'PUGS'] };
    const pos = [[200, 52], [92, 172], [308, 172]];
    return sv(`
      <rect x="10" y="10" width="380" height="226" rx="16" class="vframe fi" ${D(1.6)}/>
      ${t(26, 30, set.f[0], { a: 'start', c: 'vcap', d: 1.7 })}${t(374, 30, set.f[1], { a: 'end', c: 'vcap', d: 1.8 })}
      <circle cx="200" cy="128" r="42" class="vhub po" ${D(.1)}/>${t(200, 132, set.c, { c: 'vt b dark', fs: 11.5 })}
      ${pos.map(([x, y], i) => `<line x1="200" y1="128" x2="${x}" y2="${y}" class="vlink dr" ${D(.4 + i * .2)}/>
        <g class="po" ${D(.6 + i * .2)}><rect x="${x - 54}" y="${y - 22}" width="108" height="44" rx="10" class="vnode"/>${t(x, y - 3, set.n[i][0], { c: 'vt b' })}${t(x, y + 13, set.n[i][1], { c: 'vt sm' })}</g>`).join('')}
      ${note('Instituciones que menciona el plan')}`);
  };

  V['checklist'] = (o = {}) => {
    const it = o.items || [];
    const step = Math.min(46, 200 / it.length);
    return sv(`${it.map((s, i) => {
      const y = 36 + i * step;
      return `<g class="fi" ${D(.2 + i * .45)}><rect x="40" y="${y}" width="26" height="26" rx="6" class="vbox"/>
        <path d="M46 ${y + 13} l6 6 l11 -12" class="vtick dr" ${D(.45 + i * .45)}/>
        ${t(82, y + 18, esc(s), { a: 'start', c: i === it.length - 1 && /Recién/.test(s) ? 'vt b hot' : 'vt b' })}</g>
        ${i < it.length - 1 ? `<line x1="53" y1="${y + 28}" x2="53" y2="${y + step - 2}" class="vlink"/>` : ''}`;
    }).join('')}`);
  };

  V['timeline'] = (o = {}) => {
    const it = o.items || [];
    const yrs = ['2027', '2028', '2029', '2030', '2031'];
    const x = y => { const k = yrs.indexOf(String(y).slice(0, 4)); return 50 + (k < 0 ? 4 : k) * 75; };
    return sv(`<line x1="40" y1="70" x2="360" y2="70" class="vaxis dr" ${D(.1)}/>
      ${yrs.map((y, i) => `<circle cx="${50 + i * 75}" cy="70" r="5" class="vtick0 po" ${D(.2 + i * .1)}/>${t(50 + i * 75, 52, y, { c: 'vcap', d: .2 + i * .1 })}`).join('')}
      ${it.map(([y, s], i) => {
        const xx = x(y), yy = 100 + i * 52;
        return `<line x1="${xx}" y1="76" x2="${xx}" y2="${yy - 14}" class="vlink dr" ${D(.8 + i * .5)}/><circle cx="${xx}" cy="70" r="9" class="vdot hot po" ${D(.7 + i * .5)}/>
        <g class="fi" ${D(1 + i * .5)}><foreignObject x="${Math.min(Math.max(xx - 130, 6), 134)}" y="${yy - 14}" width="260" height="46"><div xmlns="http://www.w3.org/1999/xhtml" class="vtl">${esc(s)}</div></foreignObject></g>`;
      }).join('')}`);
  };

  V['presupuesto'] = (o = {}) => {
    const max = 450, sx = v => 30 + v / max * 340;
    return sv(`
      ${t(30, 40, 'Costo referencial del eje · 2027–2031', { a: 'start', c: 'vcap' })}
      <rect x="30" y="64" width="340" height="40" rx="8" class="vtrack"/>
      <rect x="${sx(o.lo)}" y="64" width="${sx(o.hi) - sx(o.lo)}" height="40" rx="8" class="vrange grow" ${D(.3)}/>
      ${t(sx(o.lo), 126, 'USD ' + o.lo + ' M', { c: 'vbig', d: .6 })}${t(sx(o.hi), 126, 'USD ' + o.hi + ' M', { c: 'vbig', d: .9 })}
      ${t(30, 126, '0', { a: 'start', c: 'vt mute', d: .2 })}
      ${o.gap ? `<g class="po" ${D(1.3)}><rect x="60" y="150" width="280" height="56" rx="10" class="vgapbox"/>${t(200, 174, 'Túnel: sin costo propio', { c: 'vt b' })}${t(200, 194, 'el plan no lo desglosa', { c: 'vt sm mute' })}</g>`
        : `<g class="fi" ${D(1.3)}><foreignObject x="30" y="150" width="340" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="vfo">${esc(o.note || '')}</div></foreignObject></g>`}`);
  };

  V['tunel'] = () => sv(`
      <path d="M0 210 C60 120 120 60 200 50 C280 60 340 120 400 210 Z" class="vhill"/>
      <rect x="0" y="210" width="400" height="50" class="vroad"/>
      <path d="M110 210 L110 180 A30 30 0 0 1 170 180 L170 210" class="vtun po" ${D(.2)}/>${t(140, 236, 'Túnel actual', { c: 'vt sm', d: .3 })}
      <path d="M230 210 L230 180 A30 30 0 0 1 290 180 L290 210" class="vtunnew dr" ${D(.8)}/>${t(260, 236, 'Segundo túnel', { c: 'vt b hot', d: 1.4 })}
      <g class="po" ${D(1.8)}><circle cx="300" cy="140" r="16" class="vq"/>${t(300, 146, '?', { c: 'vbig dark' })}</g>
      ${t(318, 116, 'ubicación', { a: 'start', c: 'vt sm mute', d: 2 })}${t(318, 130, 'no definida', { a: 'start', c: 'vt sm mute', d: 2 })}
      <rect x="-30" y="216" width="22" height="10" rx="3" class="vcar"/>
      ${note('Esquema ilustrativo')}`);

  V['avenida'] = (o = {}) => {
    const s = o.stage || 0;
    return sv(`
      <rect x="0" y="96" width="400" height="${s === 2 ? 0 : 0}" />
      <rect x="0" y="100" width="400" height="60" class="vroad"/>
      <line x1="0" y1="130" x2="400" y2="130" class="vlane"/>
      ${s >= 1 ? `<rect x="150" y="${s === 2 ? 76 : 96}" width="120" height="${s === 2 ? 108 : 68}" rx="6" class="vseg ${s === 2 ? 'grow2' : 'pulse'}" ${D(.3)}/>` : ''}
      ${s === 2 ? `<rect x="150" y="76" width="120" height="24" class="vroad po" ${D(.6)}/><rect x="150" y="160" width="120" height="24" class="vroad po" ${D(.7)}/>
        <line x1="150" y1="100" x2="270" y2="100" class="vlane"/><line x1="150" y1="160" x2="270" y2="160" class="vlane"/>
        <g class="po" ${D(1.2)}><rect x="140" y="200" width="140" height="28" rx="6" class="vstamp"/>${t(210, 219, 'TRAMO POR DEFINIR', { c: 'vstampt sm' })}</g>` : ''}
      ${[0, 1, 2].map(i => `<rect x="-40" y="${110 + (i % 2) * 28}" width="26" height="12" rx="3" class="vcar mv" style="--d:${i * 1.3}s"/>`).join('')}
      ${t(20, 80, 'Av. Simón Bolívar', { a: 'start', c: 'vt b' })}
      ${s === 0 ? note('Contexto Tinta') : note(s === 1 ? 'Ampliación parcial · p. 7' : 'El plan no dice qué tramos ni cuántos carriles')}`);
  };

  V['pasaje'] = (o = {}) => {
    const s = o.stage || 0;
    const veh = [['Bus', 60], ['Metro', 200], ['Alimentador', 340]];
    return sv(`
      <line x1="60" y1="130" x2="340" y2="130" class="${s === 2 ? 'vmetro' : 'vgap'} ${s === 2 ? 'dr' : ''}" ${D(.3)}/>
      ${veh.map(([n, x], i) => `<g class="po" ${D(.1 + i * .2)}><rect x="${x - 34}" y="106" width="68" height="48" rx="10" class="vnode"/>${t(x, 135, n, { c: 'vt b sm' })}</g>`).join('')}
      ${s === 0 ? veh.map(([, x], i) => `<g class="po" ${D(.8 + i * .3)}><circle cx="${x}" cy="62" r="18" class="vcoin"/>${t(x, 68, '$', { c: 'vbig dark' })}</g>`).join('') + note('Hoy: cada sistema por separado')
        : s === 1 ? `<g class="po" ${D(.8)}><rect x="145" y="34" width="110" height="58" rx="8" class="vcardp"/><rect x="157" y="46" width="22" height="16" rx="3" class="vchipc"/>${t(200, 84, 'PAGO ÚNICO', { c: 'vcap dark' })}</g>` + note('Pago unificado · p. 7')
        : `${[60, 200, 340].map((x, i) => `<circle cx="${x}" cy="190" r="6" class="vdot hot po" ${D(.9 + i * .2)}/>`).join('')}<path d="M60 190 L340 190" class="vtrip dr" ${D(1.4)}/>
          ${t(200, 220, 'Transbordo conectado', { c: 'vt b', d: 1.6 })}<g class="po" ${D(2)}><rect x="140" y="40" width="120" height="34" rx="8" class="vgapbox"/>${t(200, 62, 'Tarifa: no detallada', { c: 'vt sm' })}</g>` + note('Integración física y tarifaria')}`);
  };

  V['mesa'] = (o = {}) => {
    const seats = o.seats || [];
    const pos = [[200, 40], [70, 190], [330, 190]];
    return sv(`<ellipse cx="200" cy="140" rx="90" ry="50" class="vtable po" ${D(.1)}/>${t(200, 146, 'Mesa de movilidad', { c: 'vt b', d: .3 })}
      ${seats.map((s, i) => `<g class="po" ${D(.5 + i * .3)}><circle cx="${pos[i][0]}" cy="${pos[i][1] + (i ? 0 : 10)}" r="16" class="vperson ${o.hi === i ? 'hot' : ''}"/>${t(pos[i][0], pos[i][1] + (i ? 36 : -14), s, { c: 'vt b' + (o.hi === i ? ' hot' : '') })}</g>`).join('')}
      ${note('Mesas con usuarios, transportistas y ciclistas · p. 7')}`);
  };

  V['calle'] = (o = {}) => {
    const s = o.stage || 0, side = s ? 78 : 38;
    return sv(`<rect x="0" y="40" width="40" height="170" class="vbld"/><rect x="360" y="40" width="40" height="170" class="vbld"/>
      <rect x="40" y="150" width="${side}" height="60" class="vwalk grow" ${D(.2)}/><rect x="${360 - side}" y="150" width="${side}" height="60" class="vwalk grow" ${D(.2)}/>
      <rect x="${40 + side}" y="150" width="${320 - side * 2}" height="60" class="vroad"/>
      ${s ? `<rect x="${40 + side}" y="150" width="34" height="60" class="vbike po" ${D(.6)}/>${t(57 + side, 232, 'Ciclovía', { c: 'vt sm hot', d: .8 })}` : ''}
      ${t(40 + side / 2, 232, 'Acera', { c: 'vt sm', d: .3 })}
      ${s === 2 ? [0, 1].map(i => `<g class="walker" style="--d:${i * 2}s"><circle cx="${60 + i * 20}" cy="128" r="6" class="vperson"/><line x1="${60 + i * 20}" y1="134" x2="${60 + i * 20}" y2="148" class="vline"/></g>`).join('') + `<g class="rider"><circle cx="${52 + side}" cy="184" r="7" class="vwheel"/><circle cx="${72 + side}" cy="184" r="7" class="vwheel"/></g>` : ''}
      ${s === 0 ? `<g class="po" ${D(.8)}><rect x="130" y="60" width="140" height="34" rx="8" class="vgapbox"/>${t(200, 82, 'Poco espacio a pie', { c: 'vt sm' })}</g>` : ''}
      ${note(s === 0 ? 'Diagnóstico del plan · p. 3' : s === 1 ? 'Aceras seguras, ciclovías y peatonalización · p. 7' : 'Ilustración de Tinta')}`);
  };

  V['baches'] = (o = {}) => {
    const s = o.stage || 0, holes = [70, 150, 230, 310];
    return sv(`<rect x="0" y="110" width="400" height="70" class="vroad"/><line x1="0" y1="145" x2="400" y2="145" class="vlane"/>
      ${holes.map((x, i) => `<ellipse cx="${x}" cy="${130 + (i % 2) * 30}" rx="16" ry="7" class="vhole"/>${s >= 2 ? `<ellipse cx="${x}" cy="${130 + (i % 2) * 30}" rx="16" ry="7" class="vpatch po" style="--d:${.6 + i * .5}s"/>` : ''}`).join('')}
      ${s >= 1 ? `<g class="truck"><rect x="0" y="118" width="40" height="22" rx="3" class="vtruck"/><rect x="40" y="124" width="14" height="16" rx="2" class="vtruck"/></g>` : ''}
      ${s >= 2 ? `<line x1="40" y1="70" x2="360" y2="70" class="vaxis"/>${[['Día 1', 40], ['Día 100', 360]].map(([l, x], i) => `<circle cx="${x}" cy="70" r="7" class="vdot hot po" ${D(.2 + i * 2)}/>${t(x, 52, l, { c: 'vcap', d: .2 + i * 2 })}`).join('')}${t(200, 214, 'Cronograma público + primeras intervenciones', { c: 'vt b', d: 2.4 })}` : ''}
      ${note(s === 0 ? 'Diagnóstico del plan · p. 3' : s === 1 ? 'Barrial y rural · p. 7' : 'Plan emergente de los primeros 100 días · p. 17')}`);
  };

  V['reloj'] = () => sv(`<circle cx="130" cy="128" r="80" class="vclock po" ${D(.1)}/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<line x1="${130 + Math.sin(a) * 70}" y1="${128 - Math.cos(a) * 70}" x2="${130 + Math.sin(a) * 78}" y2="${128 - Math.cos(a) * 78}" class="vline"/>`; }).join('')}
      <path d="M130 128 L130 128" class="vhand"/><line x1="130" y1="128" x2="130" y2="66" class="vhand spin"/>
      <circle cx="130" cy="128" r="6" class="vdot hot"/>
      <g class="fi" ${D(.4)}>${t(250, 92, 'HOY', { a: 'start', c: 'vcap' })}${t(250, 116, 'Más de 2 h', { a: 'start', c: 'vbig' })}</g>
      <g class="fi" ${D(1.6)}>${t(250, 160, 'META 2031', { a: 'start', c: 'vcap hot' })}${t(250, 186, 'Máximo 60 min', { a: 'start', c: 'vbig hot' })}</g>
      ${note('Meta del plan, no resultado garantizado · p. 3 y 7')}`);

  V['lupa'] = (o = {}) => sv(`<rect x="120" y="30" width="160" height="200" rx="10" class="vdoc po" ${D(.1)}/>
      ${[60, 84, 108, 132, 156, 180].map((y, i) => `<line x1="142" y1="${y}" x2="${i % 3 === 1 ? 214 : 258}" y2="${y}" class="${i % 2 ? 'vgap' : 'vline'} dr" ${D(.2 + i * .1)}/>`).join('')}
      <g class="lens"><circle cx="230" cy="120" r="36" class="vlens2"/><line x1="256" y1="146" x2="290" y2="180" class="vlens2"/></g>
      ${t(230, 126, '?', { c: 'vbig hot', d: 1 })}`);

  V['indice'] = () => '';
  /* genéricos para episodios sin animación específica */
  V['icono'] = (o = {}) => `<div class="vico po">${window.ICON ? window.ICON(o.icon || 'documento') : ''}</div>`;

  window.VIZ = (id, o) => (V[id] || V.icono)(o || {});
  window.VIZ_HAS = id => !!V[id];
})();
