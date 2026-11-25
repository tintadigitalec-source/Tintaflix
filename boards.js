/* Tableros documentales v2 · Wilson Merino (quito|6).
   La tipografía integrada en el tablero es el narrador: sin subtítulo
   inferior. Cada dato aparece una sola vez. La narración `n` de cada plano
   se usa para el texto completo (accesibilidad) y para medir el tiempo de
   lectura; se arma con las mismas palabras que se ven en pantalla.
   Fotos: carpeta de Drive de la candidatura; ilustran, no documentan los
   hechos narrados. Tarjetas tipográficas: nombres oficiales tal como
   aparecen en las fuentes; no son facsímiles. Fuentes: lista `src`. */
window.BOARDS = window.BOARDS || {};
(function () {
  const D = 'docu/merino-', Q = 'fotos/quito-ciudad-';
  const plain = s => String(s || '').replace(/\*/g, '');
  /* arma un tablero a partir de «eventos»: cada evento es una composición nueva
     (medios arriba, tipografía abajo) en otra zona del mundo; la cámara viaja
     hasta ella y lo anterior queda atenuado en escena, conectado por líneas */
  function make(id, bg, chs, src, EV, opt) {
    const QQ = (opt && opt.q) || Q, NB = (opt && opt.n) || 3;
    const nodes = [], lines = [], cam = [], shots = [];
    const maxX = Math.max(...EV.map(e => e.x)) + 1400; let bx = -700, bi = bg;
    while (bx < maxX) { nodes.push({ k: 0, l: 'b', t: 'ph', fx: 'bgph', src: QQ + (bi % NB + 1) + '-color.webp', x: bx, y: -380, w: 3300, at: 0 }); bx += 3300; bi++ }
    let prev = null;
    EV.forEach((e, k) => {
      const ox = e.x, oy = e.y, ty = e.ty ?? 470, TW = e.tw || 620;
      (e.m || []).forEach((m, j) => nodes.push({ k, ...m, x: ox + (m.x || 0), y: oy + (m.y || 0), at: m.at ?? (.25 + j * .35) }));
      if (e.tx) nodes.push({ k, t: 'tx', ...e.tx, x: ox + (e.tx.x ?? 30), y: oy + ty, w: TW, at: e.tx.at ?? .7 });
      if (prev) { const a = [prev.x + 340, prev.y + 330], b = [ox + 340, oy + 20]; lines.push({ k, p: [a, [a[0], (a[1] + b[1]) / 2], [b[0], (a[1] + b[1]) / 2], b], at: .05 }) }
      cam.push({ k, x: ox + 340 + (e.cx || 0), y: oy + (e.cy ?? 430), w: e.cw || 760, at: 0, mv: k ? 1.5 : .1 });
      const n = e.n || [e.tx && e.tx.kk, e.tx && e.tx.h, e.tx && e.tx.b].filter(Boolean).map(plain).join('. ').replace(/\.\./g, '.') + '.';
      const nn = n.replace(/\.\.$/, '.'), wc = nn.split(/\s+/).length;
      shots.push({ ch: e.ch, n: nn, fu: e.fu || [], d: Math.max(7, Math.round((wc / 2.75 + 3.2) * 10) / 10) });
      prev = { x: ox, y: oy };
    });
    return { v: 2, id, nodes, lines, cam, shots, chs, src };
  }
  const card = (h, sub, x, y, w, r, extra) => ({ t: 'doc', h, sub, x: x + 30, y, w: Math.min(w, 598 - x), r, ...(extra || {}) });
  const foto = (src, x, y, w, r, alt) => ({ t: 'ph', fx: 'sm', src, x, y, w, r, alt: alt || 'Foto de la candidatura', cap: 'Foto: candidatura (ilustrativa)' });

  /* ------------------------- fuentes ------------------------- */
  const S = {
    cv: ['Hoja de vida resumida · Radiografía Política (con datos de Senescyt, Contraloría y Superintendencia de Compañías)', 'https://radiografiapolitica.org/docs/curriculum/1682537448_Wilson_EduardoMerino_Rivadeneira.pdf'],
    eu18: ['El Universo · entrevista a Wilson Merino sobre la iniciativa y SOLCA (3 de enero de 2018)', 'https://www.eluniverso.com/noticias/2018/01/03/nota/6548083/apelamos-solca-que-se-nuestra-iniciativa'],
    eu18b: ['El Universo · réplica de Merino a Sixto Cuesta, de SOLCA (10 de febrero de 2018)', 'https://www.eluniverso.com/noticias/2018/02/10/nota/6617722/recursos-solca-estan-garantizados-codigo'],
    exf: ['Expreso · «Cecilia Rivadeneira: una fundación que transforma vidas de familias oncológicas» (2024)', 'https://www.expreso.ec/buenavida/cecilia-rivadeneira-fundacion-transforma-vidas-familias-oncologicas-237217.html'],
    edi: ['El Diario · niños de la Fundación Cecilia Rivadeneira en Manta (31 de julio de 2024)', 'https://www.eldiario.ec/ecuador/ninos-con-cancer-cumplen-el-sueno-de-volar-en-avion-y-de-conocer-el-mar-31072024/'],
    msp: ['Ministerio de Salud Pública · convenio con la Fundación Cecilia Rivadeneira (1 de junio de 2020)', 'https://www.salud.gob.ec/?p=51024'],
    tgc: ['El Telégrafo · etiqueta Fundación Cecilia Rivadeneira (ayuda humanitaria, 12 de mayo de 2020)', 'https://www.eltelegrafo.com.ec/contenido/etiqueta/220/Fundación%20Cecilia%20Rivadeneira'],
    an: ['Asamblea Nacional · boletines sobre la iniciativa popular normativa contra el cáncer (25 de abril de 2018 y 1 de febrero de 2019)', ''],
    vet: ['El Comercio · «Código de Salud va al congelador por un año; el Ejecutivo vetó los 405 artículos» (25 de septiembre de 2020)', 'https://www.elcomercio.com/actualidad/ecuador-codigo-salud-veto-ley/'],
    msv: ['Ministerio de Salud Pública · «Por vacíos técnicos y científicos, Ejecutivo veta Código de Salud» (25 de septiembre de 2020)', 'https://www.salud.gob.ec/por-vacios-tecnicos-y-cientificos-ejecutivo-veta-codigo-de-salud/'],
    tgcos: ['El Telégrafo · aprobación del Código Orgánico de Salud y declaraciones de Merino (agosto de 2020)', ''],
    cq: ['Expreso · «El exdirector de Conquito denuncia repartición de puestos con fines políticos»', 'https://www.expreso.ec/quito/exdirector-denuncia-reparticion-puestos-fines-politicos-113257.html'],
    tgw: ['El Telégrafo · etiqueta Wilson Merino (tasa de basura, transportistas, presupuesto 2026)', 'https://www.eltelegrafo.com.ec/contenido/etiqueta/220/Wilson%20Merino'],
    mdq: ['Municipio de Quito · oficio de conformación de comisiones (enero de 2024)', ''],
    exs: ['Expreso · «Pleno de la Asamblea definirá propuesta de ley de Wilson Merino sobre seguridad» (10 de mayo de 2026)', 'https://www.expreso.ec/politica/pleno-asamblea-definira-propuesta-ley-wilson-merino-sobre-seguridad-avanza-cne-281634.html'],
    tel: ['Teleamazonas · «Wilson Merino es el precandidato a la Alcaldía de Quito por Imparables» (29 de junio de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/wilson-merino-precandidato-alcaldia-quito-121399/'],
    eof: ['Expreso · «Seguridad, empleo y Metro: las propuestas de Wilson Merino para llegar a la Alcaldía de Quito» (julio de 2026)', 'https://www.expreso.ec/quito/seguridad-empleo-metro-propuestas-wilson-merino-llegar-alcaldia-quito-288131.html'],
    eal: ['Expreso · «Concejo Metropolitano de Quito: alianzas, rupturas y reelecciones rumbo a noviembre de 2026»', 'https://www.expreso.ec/quito/concejo-metropolitano-quito-alianzas-rupturas-reelecciones-rumbo-a-noviembre-2026-288450.html'],
    prc: ['Primicias · polémica por las fiestas de Quito: Correa defiende a Muñoz y cuestiona a Merino', 'https://www.primicias.ec/quito/contratos-fiestas-quito-municipio-sercop-pabel-munoz-rafael-correa-wilson-merino-110189/'],
    pgu: ['Primicias · entrevista a María Fernanda Guillén, concejala que se principalizó tras la renuncia de Merino', 'https://www.primicias.ec/quito/maria-fernanda-guillen-reemplazo-pabel-munoz-municipio-fiestas-trabajo-136604/'],
    ere: ['Expreso · «Así queda el Concejo de Quito: diez ediles buscan la reelección»', 'https://www.expreso.ec/quito/asi-queda-concejo-quito-diez-ediles-buscan-reeleccion-alcaldia-292986.html'],
    cnem: ['CNE · registro de organizaciones políticas (Imparables, movimiento provincial reconocido en 2025)', 'https://www.cne.gob.ec/'],
    eui: ['El Universo · «Diez precandidatos inscritos para la Alcaldía de Quito» (agosto de 2026)', 'https://www.eluniverso.com/noticias/politica/diez-precandidatos-inscritos-para-alcaldia-quito-nota/'],
    plan: ['Plan de trabajo «Ciudad Imparable», inscrito en el CNE (portada)', ''],
    cons: ['Consulta a registros públicos: antecedentes penales, obligaciones tributarias en firme (SRI) y pensiones alimenticias. Corte: 24 de noviembre de 2026', '']
  };
  const SRC = ids => ids.map(i => [i, ...S[i]]);
  window.BK = { make, card, foto, D: 'docu/' };

  /* ===================== CAPÍTULO 1 ===================== */
  window.BOARDS['quito|6|origen'] = make('mo',
    2,
    [{ id: 'a', t: 'Antes de la curul', k: 'Apertura' }, { id: 'b', t: 'La causa', k: 'Una madre, una fundación' }, { id: 'c', t: 'Barcelona y la Cancillería', k: 'Formación' }],
    SRC(['cv', 'eu18', 'exf', 'edi']),
    [
      { ch: 'a', x: 0, y: 0, fu: ['cv'],
        m: [foto(D + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: 'Capítulo 1 · ¿Quién es antes de la política?', h: 'Antes de la curul', b: 'Wilson Eduardo *Merino Rivadeneira*. Antes del Concejo hubo una empresa, una causa y una maestría en el exterior.' } },
      { ch: 'a', x: 1050, y: 160, fu: ['cv'],
        m: [card('Get & Go Publicidad Cía. Ltda.', 'Gerente general · Superintendencia de Compañías', 0, 40, 420, -2), card('Universidad de las Américas', 'Ingeniería Comercial · mención Administración de Empresas', 300, 230, 400, 2)],
        tx: { h: 'Ingeniero comercial', b: 'Se graduó en la Universidad de las Américas y figura como *gerente general* de una agencia de publicidad.' } },
      { ch: 'b', x: 2150, y: -80, fu: ['eu18'], ty: 380, cy: 360,
        m: [{ t: 'dt', fx: 'y', v: '19', x: 0, y: 0, fs: 360 }],
        tx: { h: 'Años tenía', b: 'cuando su madre, *Cecilia Rivadeneira*, murió de cáncer. Esa pérdida lo empujó a la causa que marcaría su vida pública.' }, n: 'Diecinueve años tenía cuando su madre, Cecilia Rivadeneira, murió de cáncer. Esa pérdida lo empujó a la causa que marcaría su vida pública.' },
      { ch: 'b', x: 3150, y: 200, fu: ['exf', 'edi', 'cv'],
        m: [card('Fundación Cecilia Rivadeneira', 'Niños y adolescentes con cáncer y sus familias', 0, 30, 470, -1.5)],
        tx: { h: 'Una fundación con su nombre', b: 'La fundó para acompañar a *niños y adolescentes con cáncer* y a sus familias. Fue su director ejecutivo hasta 2020.' } },
      { ch: 'b', x: 4200, y: -60, fu: ['eu18'],
        m: [card('Red Nacional de Organizaciones de Pacientes Oncológicos', 'Acuerdo contra el Cáncer', 0, 40, 560, 1.5)],
        tx: { kk: 'Desde 2016', h: 'Coordinador de una red', b: 'La integraban *18 organizaciones* de pacientes. Su propuesta de ley salió de 39 reuniones en 10 provincias.' } },
      { ch: 'c', x: 5250, y: 180, fu: ['cv'],
        m: [card('Universitat Autònoma de Barcelona', 'Máster en Dirección Estratégica y Gestión de la Innovación', 0, 0, 430, -2), card('Cancillería · 2012–2015', 'Agregado comercial', 260, 210, 360, 2)],
        tx: { h: 'Gestión y comercio', b: 'Estudió una maestría en *gestión de la innovación* en Barcelona y fue agregado comercial del Ministerio de Relaciones Exteriores.' } }
    ]);

  /* ===================== CAPÍTULO 2 ===================== */
  window.BOARDS['quito|6|tray'] = make('mt',
    0,
    [{ id: 'a', t: 'Lo que impulsó y lo que pasó', k: 'Apertura' }, { id: 'b', t: 'La fundación', k: 'Resultados' }, { id: 'c', t: 'La ley del cáncer', k: '2017–2020' }, { id: 'd', t: 'CONQUITO', k: '2020–2021' }, { id: 'e', t: 'El Concejo', k: '2023–2026' }],
    SRC(['edi', 'msp', 'eu18', 'eu18b', 'an', 'tgcos', 'vet', 'msv', 'cq', 'cv', 'mdq', 'tgw', 'tel', 'exs']),
    [
      { ch: 'a', x: 0, y: 0, fu: [],
        m: [foto(D + 'sesion.webp', 60, 20, 560, 1.5)],
        tx: { kk: 'Capítulo 2 · ¿Qué ha hecho?', h: 'Lo que impulsó y lo que pasó', b: 'Una fundación, una ley ciudadana, una agencia municipal y tres años de Concejo.' } },
      { ch: 'b', x: 1050, y: 200, fu: ['edi', 'msp'], ty: 360, cy: 340,
        m: [{ t: 'dt', fx: 'y', v: '1.300', x: 0, y: 0, fs: 260 }],
        tx: { h: 'niños con cáncer', b: 'atendía, aproximadamente, su fundación en 2024, según El Diario. En 2020 firmó un convenio con el *Ministerio de Salud* para que no interrumpan sus tratamientos.' }, n: 'Mil trescientos niños con cáncer atendía, aproximadamente, su fundación en 2024, según El Diario. En 2020 firmó un convenio con el Ministerio de Salud para que no interrumpan sus tratamientos.' },
      { ch: 'c', x: 2100, y: -60, fu: ['eu18', 'an'],
        m: [card('Propuesta de Ley Orgánica de Lucha contra el Cáncer', 'Iniciativa popular normativa · Asamblea Nacional', 0, 40, 600, -1.5)],
        tx: { kk: '18 de diciembre de 2017', h: 'Una ley desde la calle', b: 'La red la entregó a la Asamblea. Sus promotores: *Manuel Robalino* y Wilson Merino.' } },
      { ch: 'c', x: 3150, y: 180, fu: ['an', 'tel'], ty: 330, cy: 340,
        m: [{ t: 'dt', v: '159.000', x: 0, y: 0, fs: 230 }],
        tx: { h: 'firmas recogidas', b: 'El CNE validó cerca de *111.000*. En 2019 la Asamblea la reconoció como la primera iniciativa popular normativa sobre el cáncer.' }, n: 'Ciento cincuenta y nueve mil firmas recogidas. El CNE validó cerca de 111.000. En 2019 la Asamblea la reconoció como la primera iniciativa popular normativa sobre el cáncer.' },
      { ch: 'c', x: 4200, y: -40, fu: ['eu18', 'eu18b'],
        m: [card('SOLCA', 'Sociedad de Lucha contra el Cáncer', 0, 60, 380, 2)],
        tx: { kk: 'Enero y febrero de 2018', h: 'El choque con SOLCA', b: 'La institución cuestionó la propuesta. Merino respondió en público que los recursos de SOLCA quedaban *garantizados*.' } },
      { ch: 'c', x: 5250, y: 200, fu: ['an', 'tgcos'],
        m: [card('Código Orgánico de Salud', 'Sección sobre cáncer · artículos 216 a 222', 0, 30, 520, -1.5, { stamp: '79 votos' })],
        tx: { kk: '25 de agosto de 2020', h: 'Aprobada, dentro de un código', b: 'La Asamblea no la tramitó sola: la sumó al Código. Merino atribuyó el logro a los *colectivos de pacientes*.' } },
      { ch: 'c', x: 6300, y: -40, fu: ['vet', 'msv'],
        m: [card('Objeción total', 'Presidencia de la República', 0, 40, 400, 2, { fx: 'hv' })],
        tx: { kk: '25 de septiembre de 2020', h: 'Veto total', b: 'Lenín Moreno objetó los *405 artículos* del Código. La sección sobre cáncer no entró en vigencia.' } },
      { ch: 'd', x: 7350, y: 200, fu: ['cq', 'cv'],
        m: [card('CONQUITO', 'Agencia Metropolitana de Promoción Económica', 0, 30, 480, -2)],
        tx: { kk: '2020–2021 · alcaldía de Jorge Yunda', h: 'Director de CONQUITO', b: 'Renunció de forma irrevocable y denunció una *repartición de puestos* por compromisos políticos, sin dar nombres.' } },
      { ch: 'e', x: 8400, y: -60, fu: ['mdq'],
        m: [foto(D + 'sesion.webp', 60, 0, 520, -1.5)],
        tx: { kk: 'Concejal · 2023–2026', h: 'Comisión de Desarrollo Económico', b: 'La presidió y fue miembro de la de Salud. En 2025 propuso un *registro de pacientes oncológicos*.' } },
      { ch: 'e', x: 9450, y: 200, fu: ['tgw'],
        m: [card('Corte Constitucional', 'Demanda de inconstitucionalidad · tasa de residuos', 0, 30, 470, 1.5), card('60 trolebuses', 'Objeción al proceso de compra', 280, 210, 340, -2)],
        tx: { kk: 'Fiscalización', h: 'Contra la tasa de basura', b: 'La demandó con vecinos en febrero de 2026. También pidió transparencia sobre *USD 20 millones* ofrecidos a transportistas.' } },
      { ch: 'e', x: 10500, y: -40, fu: ['exs'],
        m: [card('Fortalecimiento de la Seguridad Ciudadana y Convivencia Social Pacífica', 'Iniciativa ciudadana normativa', 0, 40, 600, -1.5)],
        tx: { kk: '3 de marzo de 2026', h: 'Otra ley desde la calle', b: 'En mayo, una comisión de la Asamblea recomendó admitirla. Requiere *33.706 firmas* que el CNE debe verificar.' } }
    ]);

  /* ===================== CAPÍTULO 3 ===================== */
  window.BOARDS['quito|6|exp'] = make('me',
    1,
    [{ id: 'a', t: 'Camino a la lista 79', k: 'Apertura' }, { id: 'b', t: 'El quiebre', k: '2023–2026' }, { id: 'c', t: 'Imparables', k: '2025–2026' }, { id: 'd', t: 'Registros públicos', k: 'Consulta' }],
    SRC(['cv', 'prc', 'eal', 'tgw', 'cnem', 'tel', 'eof', 'pgu', 'ere', 'eui', 'plan', 'cons']),
    [
      { ch: 'a', x: 0, y: 0, fu: [],
        m: [foto(D + 'debate.webp', 60, -20, 540, -1.5)],
        tx: { kk: 'Capítulo 3 · ¿Cómo llega a esta candidatura?', h: 'Camino a la lista 79', b: 'Entró al Concejo de la mano de un movimiento. Llega a la papeleta con uno *propio*.' } },
      { ch: 'b', x: 1050, y: 200, fu: ['cv', 'prc', 'eal'],
        m: [foto(D + 'sesion.webp', 60, 0, 520, 2)],
        tx: { kk: 'Elecciones de 2023', h: 'Concejal por el centro', b: 'Llegó al Concejo auspiciado por la *Revolución Ciudadana*, el movimiento del alcalde electo, Pabel Muñoz.' } },
      { ch: 'b', x: 2100, y: -60, fu: ['prc', 'eal', 'tgw'],
        m: [{ t: 'wd', v: 'Independiente', x: 40, y: 150, fs: 118, r: -3 }],
        ty: 360,
        tx: { h: 'El quiebre', b: 'Se separó del bloque y se volvió uno de los críticos más visibles de Muñoz. El debate del presupuesto 2026 terminó en *gritos* entre ambos.' } },
      { ch: 'c', x: 3150, y: 180, fu: ['cnem', 'eui'],
        m: [card('Movimiento Imparables', 'Movimiento político provincial · lista 79', 0, 40, 520, -1.5)],
        tx: { kk: '2025', h: 'Un movimiento propio', b: 'El CNE reconoció a Imparables, del que Merino es *promotor*. Es uno de cuatro movimientos provinciales vigentes en Pichincha.' } },
      { ch: 'c', x: 4200, y: -40, fu: ['tel', 'eof', 'eal'],
        m: [foto(D + 'caminata.webp', 80, -30, 520, 1.5)],
        tx: { kk: '29 de junio de 2026', h: 'Precandidato', b: 'Imparables lo designó. El 5 de julio oficializó la precandidatura junto al concejal *Andrés Campaña*, que busca la reelección con el movimiento.' } },
      { ch: 'c', x: 5250, y: 200, fu: ['pgu', 'ere', 'plan'],
        m: [{ t: 'doc', src: D + 'plan-portada.webp', alt: 'Portada del plan de trabajo', x: 120, y: -40, w: 280, r: -3 }, { t: 'dt', fx: 'y', v: '79', x: 430, y: 60, fs: 240 }],
        tx: { kk: '2026', h: 'Deja la curul', b: 'Renunció al Concejo Metropolitano para competir con su plan «Ciudad Imparable». Su suplente, *María Fernanda Guillén*, ocupó el puesto.' } },
      { ch: 'd', x: 6300, y: -40, fu: ['cons'], ty: 470,
        m: [
          { t: 'doc', fx: 'rec', h: 'Antecedentes penales', stamp: 'No registra', x: 20, y: 40, w: 205, r: -2 },
          { t: 'doc', fx: 'rec', h: 'Deudas en firme con el SRI', stamp: 'No registra', x: 238, y: 70, w: 205, r: 1.5 },
          { t: 'doc', fx: 'rec', h: 'Pensiones alimenticias', stamp: 'No registra', x: 456, y: 40, w: 205, r: -1 }],
        tx: { kk: 'Consulta a registros públicos', h: 'Corte: 24 de noviembre de 2026' },
        n: 'Consulta a registros públicos, con corte al 24 de noviembre de 2026: no registra antecedentes penales, ni deudas en firme con el SRI, ni pensiones alimenticias pendientes.' }
    ]);
})();
