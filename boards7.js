/* Tableros documentales v2 · candidaturas de Riobamba.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   Procesos judiciales: se nombra la etapa exacta y la respuesta de la persona.
   Cada candidatura cierra con lo que Ecuador Chequea verificó de su debate. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/riobamba-ciudad-', n: 4 };
  const Dc = s => 'docu/rio-' + s + '-';
  const dt = (v, fs, y) => ({ t: 'dt', fx: 'y', v, x: 0, y: y || 0, fs: fs || 240 });
  const wd = (v, fs, r) => ({ t: 'wd', v, x: 40, y: 140, fs: fs || 130, r: r || -2 });
  const lay = EV => EV.map((e, i) => ({ x: i * 1050, y: i % 2 ? 190 : -40, ...e }));
  const K1 = 'Capítulo 1 · ¿Quién es antes de la política?', K2 = 'Capítulo 2 · ¿Qué ha hecho?', K3 = 'Capítulo 3 · ¿Cómo llega a esta candidatura?';
  const CH1 = [{ id: 'a', t: 'Antes de la papeleta', k: 'Apertura' }], CH2 = [{ id: 'a', t: 'Lo que hizo', k: 'Apertura' }], CH3 = [{ id: 'a', t: 'El camino a la papeleta', k: 'Apertura' }];
  let NOM = '';
  const foto = (src, x, y, w, r) => ({ t: 'ph', fx: 'sm', src, x, y, w, r, alt: 'Foto ilustrativa de ' + NOM, cap: 'Foto: candidatura (ilustrativa)' });
  const reg = (fu, tit, cargo) => ({ ch: 'a', fu, ty: 470,
    m: [{ t: 'doc', fx: 'rec', h: 'Título registrado', stamp: tit, x: 20, y: 40, w: 300, r: -2 },
      { t: 'doc', fx: 'rec', h: 'Último cargo público', stamp: cargo, x: 340, y: 70, w: 300, r: 1.5 }],
    tx: { kk: 'Registros públicos', h: 'Lo que consta' },
    n: 'Registros públicos. Título registrado: ' + tit + '. Último cargo público: ' + cargo + '.' });
  /* lo que Ecuador Chequea verificó en el debate del 13 de noviembre */
  const chq = (veredicto, b) => ({ ch: 'a', fu: ['ecq'], m: [card('Verificación del debate · 13 de noviembre', veredicto, 0, 40, 540, -1.5, { fx: 'hv' })],
    tx: { h: 'Bajo la lupa', b } });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    tce: ['Tribunal Contencioso Electoral · sentencias y resoluciones publicadas', 'https://www.tce.gob.ec/'],
    satje: ['Consejo de la Judicatura · consulta de procesos judiciales (e-SATJE)', 'https://procesosjudiciales.funcionjudicial.gob.ec/'],
    lpc: ['La Prensa (Riobamba) · «Estos serían los candidatos a alcalde de Riobamba en 2027» (21 de octubre de 2026; listado de calificación de la Delegación Electoral de Chimborazo)', 'https://laprensa.com.ec/candidatos-a-alcalde-de-riobamba-en-2027/'],
    lpd: ['La Prensa (Riobamba) · cobertura del debate por la Alcaldía de Riobamba (13 de noviembre de 2026)', 'https://laprensa.com.ec/debate-de-candidatos-a-alcaldes-de-riobamba/'],
    ecq: ['Ecuador Chequea · «Debate por la Alcaldía de Riobamba: verificamos 14 afirmaciones de los nueve candidatos» (16 de noviembre de 2026)', 'https://ecuadorchequea.com/debate-alcaldia-riobamba-afirmaciones-verificadas/'],
    kch: ['KCH Comunicación · «Candidatos a la Alcaldía de Riobamba y a las prefecturas de Napo, Orellana y Sucumbíos debatieron» (14 de noviembre de 2026)', 'https://kchcomunicacion.com/2026/11/14/candidatos-a-la-alcaldia-de-riobamba-y-a-las-prefecturas-de-napo-orellana-y-sucumbios-debatieron-la-noche-de-este-viernes/'],
    dla: ['Diario Los Andes · «Candidatos a la Alcaldía de Riobamba irán al debate del CNE» (noviembre de 2026)', 'https://diariolosandes.com.ec/candidatos-a-la-alcaldia-de-riobamba-iran-al-debate-del-cne/'],
    /* Abarca */
    lpab: ['La Prensa (Riobamba) · «Director de Movilidad Riobamba renunció…» (5 de julio de 2024)', 'https://www.laprensa.com.ec/director-de-movilidad-riobamba-renuncio-por-presunta-corrupcion/'],
    dlpk: ['Diario Los Andes · «Santiago Abarca designado precandidato a la Alcaldía de Riobamba por Pachakutik» (mayo de 2026)', 'https://diariolosandes.com.ec/santiago-abarca-designado-precandidato-a-la-alcaldia-de-riobamba-por-pachakutik/'],
    /* Falconí y Sinaluisa */
    gres: ['GAD Municipal de Riobamba · Resolución de Concejo 0134-R-2025 (firma de concejales del periodo 2023–2027)', 'https://www.gadmriobamba.gob.ec/index.php/transparencia/transparencia-activa/01-estructura-organica-funcional/01-3-regulaciones-procedimientos/01-3-2-resoluciones-de-concejo/2025-3/7235-resolucion-0134-r-2025/file'],
    gac: ['GAD Municipal de Riobamba · Gaceta Municipal 2022, administración 2019–2023 (integrantes del Concejo)', 'https://gadmriobamba.gob.ec/images/Gaceta%20Municipal/Gaceta%202022.pdf'],
    /* Vinueza */
    vis: ['Vistazo · «Caso Altares: Fiscalía vincula al alcalde de Riobamba, John Vinueza…» (20 de abril de 2025)', 'https://www.vistazo.com/actualidad/nacional/2025-04-20-fiscalia-vincula-alcalde-riobamba-instruccion-fiscal-presunta-asociacion-ilicita-AK9185662'],
    exj: ['Expreso · «Alcalde de Riobamba, concejales y exfuncionario irán a juicio por presunta asociación ilícita» (abril de 2026)', 'https://www.expreso.ec/ecuador/alcalde-riobamba-concejales-exfuncionario-iran-juicio-presunta-asociacion-ilicita-280373.html'],
    tel: ['El Telégrafo · «Alcalde de Riobamba fue declarado inocente» (27 de octubre de 2026)', 'https://www.eltelegrafo.com.ec/noticias/nacionales/210/caso-antares-alcalde-riobamba-declarado-inocente'],
    dlai: ['Diario Los Andes · «Jueces ratifican la inocencia del alcalde de Riobamba en el caso Altares» (26 de octubre de 2026)', 'https://diariolosandes.com.ec/jueces-ratifican-la-inocencia-del-alcalde-de-riobamba-en-el-caso-altares/']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== SANTIAGO ABARCA · riobamba|0 ===================== */
  {
    const s = 'abarca'; NOM = 'Santiago Abarca';
    B('riobamba|0|origen', 'r01', CH1, ['hv', 'lpc'], [
      { ch: 'a', fu: ['hv', 'lpc'], m: [foto(Dc(s) + 'prensa.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Fernando Santiago *Abarca Vintimilla*. Doctor en Jurisprudencia y magíster en Administración Pública.' } },
      { ch: 'a', fu: ['hv'], m: [card('Otros títulos registrados', 'Ciencias Políticas · Ciencias de la Educación · Programación de sistemas', 0, 40, 540, 1.5)],
        tx: { h: 'Varias carreras', b: 'Su hoja de vida suma títulos en política, *educación* y sistemas.' } }
    ]);
    B('riobamba|0|tray', 'r02', CH2, ['hv', 'lpab'], [
      { ch: 'a', fu: ['hv'], m: [card('Agencia Nacional de Tránsito', 'Director provincial de Chimborazo', 0, 40, 480, -2)],
        tx: { kk: K2, h: 'Tránsito', b: 'Dirigió la oficina de la *ANT* en la provincia.' } },
      { ch: 'a', fu: ['lpab', 'hv'], ty: 380, m: [dt('3 meses', 170)],
        tx: { h: 'Director de Movilidad', b: 'En la alcaldía de John Vinueza, de abril a julio de 2024. Renunció en *desacuerdo* con la entrega de cupos de transporte sin respaldo técnico, según dijo.' },
        n: 'Tres meses como director de Movilidad de Riobamba, de abril a julio de 2024. Renunció en desacuerdo con la entrega de cupos de transporte sin respaldo técnico, según dijo.' },
      { ch: 'a', fu: ['lpab'], m: [foto(Dc(s) + 'atril.webp', 60, 0, 540, 1.5)],
        tx: { h: 'La otra versión', b: 'En el Concejo, el alcalde dijo que «quizás» se *equivocó* al nombrarlo.' } }
    ]);
    B('riobamba|0|exp', 'r03', CH3, ['dlpk', 'lpc', 'ecq', 'lpd', 'hv'], [
      { ch: 'a', fu: ['dlpk', 'lpc'], m: [foto(Dc(s) + 'posesion.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 18-69', b: 'Pachakutik lo eligió en asamblea cantonal; llega con la alianza *Unidos Somos Más*.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('40', 300)],
        tx: { h: 'nodos', b: 'En el debate propuso intervenir puntos críticos con luz y *cámaras* enlazadas al ECU 911.' }, n: 'Cuarenta nodos: propone intervenir puntos críticos con luz y cámaras enlazadas al ECU 911.' },
      chq('2 falsas · 1 cierta', 'Atribuyó al artículo 46 del COOTAD algo que no dice y subestimó el número de comerciantes *informales*.'),
      reg(['hv'], 'Doctor en Jurisprudencia · magíster', 'Director de Movilidad de Riobamba (2024)')
    ]);
  }

  /* ===================== STALIN ALDÁS · riobamba|1 ===================== */
  {
    const s = 'aldas'; NOM = 'Stalin Aldás';
    B('riobamba|1|origen', 'r11', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'oficina.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Edwin Stalin *Aldás Cárdenas*. Doctor en Jurisprudencia, magíster en Derecho Constitucional y en Derecho Penal.' } },
      { ch: 'a', fu: ['hv'], m: [card('Especialización', 'Derecho Penal y Justicia Indígena', 0, 40, 460, 1.5)],
        tx: { h: 'Justicia indígena', b: 'También registra una especialidad en *justicia indígena*.' } }
    ]);
    B('riobamba|1|tray', 'r12', CH2, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [card('Universidad Nacional de Chimborazo', 'Docente · servicios profesionales', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'En la universidad', b: 'Su experiencia registrada está en la *Unach*.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan su ejercicio como *abogado* ni cargos de elección.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan su ejercicio como abogado ni cargos de elección.' }
    ]);
    B('riobamba|1|exp', 'r13', CH3, ['lpc', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc'], m: [foto(Dc(s) + 'caminata.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por el partido *Avanza*.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('3.000', 260)],
        tx: { h: 'empleos', b: 'Promete un parque industrial y un centro de acopio para productores *indígenas*.' }, n: 'Tres mil empleos: promete un parque industrial y un centro de acopio para productores indígenas.' },
      chq('Engañosa', 'Comparó el presupuesto total con el gasto corriente como si tuvieran la *misma base*.'),
      reg(['hv'], 'Doctor en Jurisprudencia · magíster', 'No registra')
    ]);
  }

  /* ===================== CÉSAR DAQUI · riobamba|2 ===================== */
  {
    const s = 'daqui'; NOM = 'César Daqui';
    B('riobamba|2|origen', 'r21', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'prensa.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'César Eduardo *Daqui Aguagallo*. Ingeniero en Comercio Exterior, magíster en Gerencia Empresarial.' } },
      { ch: 'a', fu: ['hv'], m: [card('Escuela Superior Politécnica de Chimborazo', 'Proyectos y transferencia de tecnología', 0, 40, 520, 1.5)],
        tx: { h: 'En la Espoch', b: 'Trabajó en proyectos de *investigación* de la politécnica.' } }
    ]);
    B('riobamba|2|tray', 'r22', CH2, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [card('Ministerio de Inclusión Económica y Social', 'Coordinador zonal 3', 0, 30, 460, -2), card('Conagopare Chimborazo', 'Coordinador técnico provincial', 280, 220, 340, 2)],
        tx: { kk: K2, h: 'Lo social y lo rural', b: 'Coordinó el *MIES* en la zona centro y el gremio de juntas parroquiales.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no precisan las *fechas* de esos cargos.' }, n: 'Lo que no consta. Las fuentes consultadas no precisan las fechas de esos cargos.' }
    ]);
    B('riobamba|2|exp', 'r23', CH3, ['lpc', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc'], m: [foto(Dc(s) + 'mitin.webp', 180, -60, 280, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 100', b: 'Llega por *MINGA*, el Movimiento Intercultural de Gente Activa.' } },
      { ch: 'a', fu: ['lpd'], m: [foto(Dc(s) + 'evento.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Evaluar al personal municipal, contratar funcionarios que hablen *kichwa* y compensar a las familias junto al botadero.' } },
      chq('Cierta', 'Dijo que la ciudad genera unas 240 toneladas de *basura* al día; está en el rango oficial.'),
      reg(['hv'], 'Ingeniero en Comercio Exterior · magíster', 'Coordinador zonal del MIES')
    ]);
  }

  /* ===================== HÉCTOR DI DONATO · riobamba|3 ===================== */
  {
    const s = 'didonato'; NOM = 'Héctor Di Donato';
    B('riobamba|3|origen', 'r31', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El tecnólogo', b: 'Héctor Enrique *Di Donato Yerovi*. Tecnólogo superior en servicios y operaciones *turísticas*.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan su *trayectoria* laboral.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan su trayectoria laboral.' }
    ]);
    B('riobamba|3|tray', 'r32', CH2, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el *Estado*.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'palanketa.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Primera vez', b: 'Las fuentes no registran candidaturas *anteriores*.' } }
    ]);
    B('riobamba|3|exp', 'r33', CH3, ['lpc', 'dla', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc', 'dla'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 4-66', b: 'Llega con la alianza *Pueblo Amauta*: PID y Amauta Yuyay.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('100', 300)],
        tx: { h: 'motos', b: 'Para la *Policía* en los primeros cien días: 60 para la ciudad y 40 para lo rural.' }, n: 'Cien motos para la Policía en los primeros cien días: 60 para la ciudad y 40 para lo rural.' },
      chq('2 inverificables', 'Sus cifras de agua las 24 horas y de *alcantarillado* rural no tienen un dato público que las confirme.'),
      reg(['hv'], 'Tecnólogo en turismo', 'No registra')
    ]);
  }

  /* ===================== GALO FALCONÍ · riobamba|4 ===================== */
  {
    const s = 'falconi'; NOM = 'Galo Falconí';
    B('riobamba|4|origen', 'r41', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'palanketa.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero', b: 'Galo Esteban *Falconí Márquez*. Ingeniero industrial, magíster en Administración Pública.' } },
      { ch: 'a', fu: ['hv'], m: [card('Primer título', 'Tecnólogo en Mecánica Aeronáutica · motores', 0, 40, 480, 1.5)],
        tx: { h: 'Mecánica', b: 'Antes, se formó en mecánica *aeronáutica*.' } }
    ]);
    B('riobamba|4|tray', 'r42', CH2, ['gres', 'hv', 'ecq', 'kch'], [
      { ch: 'a', fu: ['gres', 'hv'], m: [card('Concejo Municipal de Riobamba', 'Concejal · periodo 2023–2027', 0, 40, 460, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'Integra el Concejo del periodo 2023–2027, el de la *alcaldía* que hoy busca.' } },
      { ch: 'a', fu: ['ecq', 'kch'], ty: 380, m: [wd('El tren', 150, -2)],
        tx: { b: 'Votó contra el convenio para reactivar el tren, que pasó 5 a 4 y quedó en *pausa*. Dice que no se opuso al tren, sino al convenio.' }, n: 'El tren. Votó contra el convenio para reactivar el tren, que pasó 5 a 4 y quedó en pausa. Dice que no se opuso al tren, sino al convenio.' }
    ]);
    B('riobamba|4|exp', 'r43', CH3, ['lpc', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc'], m: [foto(Dc(s) + 'equipo.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 62', b: 'Llega por *Cambio*, un movimiento provincial.' } },
      { ch: 'a', fu: ['lpd'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su prioridad', b: 'Una *auditoría* técnica interna, ventanilla digital de permisos y un portal público de contratos.' } },
      chq('Engañosa', 'Su explicación del voto: el criterio jurídico municipal decía que el Concejo *sí podía* autorizar el convenio.'),
      reg(['hv'], 'Ingeniero industrial · magíster', 'Concejal de Riobamba (en funciones)')
    ]);
  }

  /* ===================== DORYAN JARA · riobamba|5 ===================== */
  {
    const s = 'jara'; NOM = 'Doryan Jara';
    B('riobamba|5|origen', 'r51', CH1, ['hv', 'lpd'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'calle.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ecoturismo', b: 'Doryan Patricio *Jara Mejía*. Ingeniero en Ecoturismo, magíster en Turismo Sostenible.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('25', 300)],
        tx: { h: 'años', b: 'En el sector *petrolero*, según dijo en el debate.' }, n: 'Veinticinco años en el sector petrolero, según dijo en el debate.' }
    ]);
    B('riobamba|5|tray', 'r52', CH2, ['hv', 'ecq'], [
      { ch: 'a', fu: ['hv'], m: [card('Petroamazonas EP · Petroecuador', 'Supervisor de relaciones comunitarias', 0, 40, 520, -2)],
        tx: { kk: K2, h: 'Con las comunidades', b: 'Su hoja de vida registra trabajo de *responsabilidad social* en las petroleras públicas.' } },
      { ch: 'a', fu: ['hv', 'ecq'], m: [card('Municipio de Riobamba', 'Director de Servicios Municipales', 0, 40, 460, 1.5, { stamp: '2019' })],
        tx: { h: 'En el Municipio', b: 'Desde mayo de 2019 dirigió los servicios municipales, entre ellos los *mercados*.' } }
    ]);
    B('riobamba|5|exp', 'r53', CH3, ['lpc', 'dla', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc', 'dla'], m: [foto(Dc(s) + 'campana.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 20-17', b: 'Llega con la alianza *VIDA*: Futuro y el Partido Socialista.' } },
      { ch: 'a', fu: ['lpd'], m: [foto(Dc(s) + 'atril.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su prioridad', b: 'Inversión rural por la falta de *agua* en Flores, Punín y San Juan, y menos gasto en consultorías.' } },
      chq('1 cierta · 1 inverificable', 'Las vacantes en mercados sí crecieron; el costo de las plataformas *digitales* no se puede confirmar.'),
      reg(['hv'], 'Ingeniero en Ecoturismo · magíster', 'Supervisor en Petroecuador')
    ]);
  }

  /* ===================== MAXIMILIANO NÚÑEZ · riobamba|6 ===================== */
  {
    const s = 'nunez'; NOM = 'Maximiliano Núñez';
    B('riobamba|6|origen', 'r61', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'Negocios', b: 'Alexis Maximiliano *Núñez Tomaselli*. Ingeniero en Negocios Internacionales.' } },
      { ch: 'a', fu: ['hv'], m: [card('Municipio de Portoviejo', 'Director de Innovación y Competitividad', 0, 40, 480, 1.5)],
        tx: { h: 'Fuera de casa', b: 'También trabajó en un municipio de *Manabí*.' } }
    ]);
    B('riobamba|6|tray', 'r62', CH2, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [card('Ministerio de Educación', 'Coordinador zonal 4', 0, 40, 440, -2)],
        tx: { kk: K2, h: 'Educación', b: 'Coordinó la zona *4* del Ministerio de Educación.' } },
      { ch: 'a', fu: ['hv'], m: [card('Ministerio de Desarrollo Humano', 'Director distrital Chambo–Riobamba', 0, 40, 500, 1.5)],
        tx: { h: 'En Chimborazo', b: 'Y dirigió el distrito de *Desarrollo Humano* que cubre Riobamba.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no precisan las *fechas* de esos cargos.' }, n: 'Lo que no consta. Las fuentes consultadas no precisan las fechas de esos cargos.' }
    ]);
    B('riobamba|6|exp', 'r63', CH3, ['lpc', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc'], m: [foto(Dc(s) + 'microfono.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('70/30', 240)],
        tx: { h: 'inversión y gasto', b: 'Propone acercar el presupuesto a esa regla y subir la obra pública a USD 70 *millones*.' }, n: 'Setenta, treinta: propone acercar el presupuesto a esa regla entre inversión y gasto corriente, y subir la obra pública a 70 millones de dólares.' },
      chq('Inverificable', 'Su cifra de ejecución del presupuesto no coincide con los datos oficiales y no dijo de qué *fecha* era.'),
      reg(['hv'], 'Ingeniero en Negocios Internacionales', 'Director distrital del MDH')
    ]);
  }

  /* ===================== MARCO SINALUISA · riobamba|7 ===================== */
  {
    const s = 'sinaluisa'; NOM = 'Marco Sinaluisa';
    B('riobamba|7|origen', 'r71', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'oficina.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero', b: 'Marco Vinicio *Sinaluisa Lozano*. Ingeniero industrial, magíster en Gestión Industrial.' } },
      { ch: 'a', fu: ['hv'], m: [card('Junta parroquial de San Juan', 'Vocal', 0, 40, 400, 1.5)],
        tx: { h: 'Desde lo rural', b: 'También fue vocal de una junta *parroquial*.' } }
    ]);
    B('riobamba|7|tray', 'r72', CH2, ['gac', 'hv', 'lpd'], [
      { ch: 'a', fu: ['gac', 'hv'], m: [card('Concejo Municipal de Riobamba', 'Concejal · administración 2019–2023', 0, 40, 480, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'Integró el Concejo en la administración *anterior*.' } },
      { ch: 'a', fu: ['lpd'], m: [foto(Dc(s) + 'tv.webp', 60, 0, 540, 1.5)],
        tx: { h: 'En sus palabras', b: 'Dice que nunca fue administrador y cita las *ordenanzas* que impulsó como concejal.' } }
    ]);
    B('riobamba|7|exp', 'r73', CH3, ['lpc', 'dla', 'lpd', 'ecq', 'hv', 'gac'], [
      { ch: 'a', fu: ['lpc', 'dla'], m: [foto(Dc(s) + 'grupo.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 3-2', b: 'Llega con la *Alianza por el Desarrollo*: Sociedad Patriótica y Unidad Popular.' } },
      { ch: 'a', fu: ['lpd'], ty: 380, m: [dt('USD 33 M', 190)],
        tx: { h: 'para tratar aguas', b: 'Dice que ese dinero ya existe para plantas de tratamiento; propone terminar el interceptor del *Chibunga*.' }, n: 'Treinta y tres millones de dólares para tratar aguas: dice que ese dinero ya existe para plantas de tratamiento y propone terminar el interceptor del Chibunga.' },
      chq('Engañosa', 'Habló de incendios constantes en el centro; la mayoría de los registrados en el cantón son *forestales*.'),
      reg(['hv', 'gac'], 'Ingeniero industrial · magíster', 'Concejal de Riobamba (2019–2023)')
    ]);
  }

  /* ===================== JOHN VINUEZA · riobamba|8 ===================== */
  {
    const s = 'vinueza'; NOM = 'John Vinueza';
    B('riobamba|8|origen', 'r81', CH1, ['hv', 'vis'], [
      { ch: 'a', fu: ['hv', 'vis'], m: [foto(Dc(s) + 'palanketa.webp', 160, -50, 300, -2)], ty: 500,
        tx: { kk: K1, h: 'El arquitecto', b: 'John Henry *Vinueza Salinas*. Arquitecto por la Universidad Central y magíster en Estudios Urbanos por Flacso.' } },
      { ch: 'a', fu: ['hv', 'vis'], m: [card('Italia', 'Máster en recalificación de asentamientos para la cooperación', 0, 40, 520, 1.5)],
        tx: { h: 'La ciudad como oficio', b: 'Sumó un máster en Italia y fue *docente* universitario.' } }
    ]);
    B('riobamba|8|tray', 'r82', CH2, ['hv', 'vis', 'tce', 'exj', 'tel', 'dlai', 'satje'], [
      { ch: 'a', fu: ['hv'], ty: 380, m: [dt('2021–2023', 150)],
        tx: { kk: K2, h: 'Asambleísta', b: 'Luego ganó la *Alcaldía* de Riobamba, que ejerce desde 2023.' }, n: 'Capítulo 2. De 2021 a 2023, asambleísta. Luego ganó la Alcaldía de Riobamba, que ejerce desde 2023.' },
      { ch: 'a', fu: ['tce'], m: [foto(Dc(s) + 'concejo.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Un Concejo dividido', b: 'Parte del Concejo aprobó su remoción por la donación de un terreno; el TCE *anuló* el proceso.' } },
      { ch: 'a', fu: ['vis', 'exj', 'satje'], m: [card('Caso Altares', '2025: vinculado · 2026: llamado a juicio por presunta asociación ilícita', 0, 40, 560, -1.5, { fx: 'hv' })],
        tx: { h: 'Un proceso penal', b: 'La Fiscalía investigó cupos de taxis rurales y trámites municipales. Él rechazó las acusaciones y dijo que seguiría su *defensa*.' } },
      { ch: 'a', fu: ['tel', 'dlai', 'satje'], ty: 380, m: [wd('Inocente', 150, -2)],
        tx: { b: 'El 26 de octubre de 2026, un tribunal ratificó su inocencia en *primera instancia*: la Fiscalía no probó la acusación.' }, n: 'Inocente. El 26 de octubre de 2026, un tribunal ratificó su inocencia en primera instancia: la Fiscalía no probó la acusación.' }
    ]);
    B('riobamba|8|exp', 'r83', CH3, ['lpc', 'dla', 'lpd', 'ecq', 'hv'], [
      { ch: 'a', fu: ['lpc', 'dla'], m: [foto(Dc(s) + 'obra.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 1-21', b: 'Busca la reelección con la alianza *Cuidamos de la Gente*: Centro Democrático y CREO.' } },
      { ch: 'a', fu: ['lpd'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su defensa', b: 'Dijo que el trasvase *Maguazo-Alao* ya entrega agua y que no hay obras paralizadas.' } },
      chq('1 imprecisa · 1 engañosa', 'Los datos registran 7 wawatecas, no 10, y el trasvase Maguazo-Alao *aún no* está concluido.'),
      reg(['hv'], 'Arquitecto · magíster', 'Alcalde de Riobamba (en funciones)')
    ]);
  }
})();
