/* Tableros documentales v2 · candidaturas de Machala.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados); tarjetas tipográficas con nombres
   oficiales tal como aparecen en las fuentes. Sin Diario Extra.
   Procesos judiciales: se nombra la etapa exacta y la respuesta de la persona. */
(function () {
  const { make, card, foto } = window.BK;
  const OPT = { q: 'fotos/machala-ciudad-', n: 5 };
  const Dc = s => 'docu/mac-' + s + '-';
  const dt = (v, fs, y) => ({ t: 'dt', fx: 'y', v, x: 0, y: y || 0, fs: fs || 240 });
  const wd = (v, fs, r) => ({ t: 'wd', v, x: 40, y: 140, fs: fs || 130, r: r || -2 });
  const plan = s => ({ t: 'doc', src: Dc(s) + 'plan.webp', alt: 'Portada del plan de trabajo inscrito en el CNE', x: 150, y: -40, w: 300, r: -2.5 });
  const lay = EV => EV.map((e, i) => ({ x: i * 1050, y: i % 2 ? 190 : -40, ...e }));
  const K1 = 'Capítulo 1 · ¿Quién es antes de la política?', K2 = 'Capítulo 2 · ¿Qué ha hecho?', K3 = 'Capítulo 3 · ¿Cómo llega a esta candidatura?';
  const CH1 = [{ id: 'a', t: 'Antes de la papeleta', k: 'Apertura' }], CH2 = [{ id: 'a', t: 'Lo que hizo', k: 'Apertura' }], CH3 = [{ id: 'a', t: 'El camino a la papeleta', k: 'Apertura' }];
  /* cierre común: lo que consta en registros públicos, sin cifras tributarias */
  const reg = (fu, tit, cargo) => ({ ch: 'a', fu, ty: 470,
    m: [{ t: 'doc', fx: 'rec', h: 'Título registrado', stamp: tit, x: 20, y: 40, w: 300, r: -2 },
      { t: 'doc', fx: 'rec', h: 'Último cargo público', stamp: cargo, x: 340, y: 70, w: 300, r: 1.5 }],
    tx: { kk: 'Registros públicos', h: 'Lo que consta' },
    n: 'Registros públicos. Título registrado: ' + tit + '. Último cargo público: ' + cargo + '.' });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pmp: ['Primicias · «Machala: estos son los perfiles de los nueve candidatos que aspiran a la Alcaldía» (7 de noviembre de 2026; datos de CNE, SRI, Contraloría y Ministerio de Educación)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/candidatos-alcaldia-machala-perfiles-trayectoria-titulos-136502/'],
    eud: ['El Universo · debate de los nueve candidatos a la Alcaldía de Machala (15 de noviembre de 2026)', 'https://eluniverso.com/politica/elecciones/debate-electoral-de-candidato-a-alcaldia-de-machala-nota'],
    kch: ['KCH Comunicación · «Alcaldía de Machala 2027: de los diez precandidatos registrados, uno ya quedó fuera» (18 de septiembre de 2026)', 'https://kchcomunicacion.com/?p=542260'],
    ppo: ['Primicias · precandidatos a alcaldías y Prefectura de El Oro (2 de julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/precandidatos-alcalde-prefecto-oro-machala-santa-rosa-pasaje-partidos-126959/'],
    exm: ['Expreso · «Machala ya perfila su próxima Alcaldía: estos son los precandidatos para 2026» (julio de 2026)', 'https://www.expreso.ec/ecuador/machala-perfila-proxima-alcaldia-son-precandidatos-2026-287975.html'],
    /* Bravo */
    exb: ['Expreso · «Clemente Bravo, prefecto de El Oro, atribuye a un error su millonaria declaración patrimonial» (2026)', 'https://www.expreso.ec/politica/clemente-bravo-prefecto-oro-atribuye-error-millonaria-declaracion-patrimonial-290318.html'],
    pcg: ['Primicias · «Clemente Bravo y Roberta Zambrano toman el control del Congope» (3 de junio de 2025)', 'https://www.primicias.ec/politica/clemente-bravo-roberta-zambrano-congope-prefecturas-eleccion-97711/'],
    /* Pereira */
    anp: ['Asamblea Nacional · blog del asambleísta Darwin Pereira (Pachakutik, 2021–2023)', 'https://www.asambleanacional.gob.ec/es/blogs/darwin-pereira?page=3'],
    eup: ['El Universo · «Réplica de asambleísta Darwin Pereira» (2022)', 'https://www.eluniverso.com/opinion/cartas-al-director/replica-de-asambleista-darwin-pereira-nota/'],
    /* Rodríguez */
    anr: ['Asamblea Nacional · blog del asambleísta Carlos Rodríguez Riofrío (Claro que se puede, 2023–2025)', 'https://www.asambleanacional.gob.ec/es/node/106248']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== CLEMENTE BRAVO · machala|0 ===================== */
  {
    const s = 'bravo';
    B('machala|0|origen', 'm01', CH1, ['hv', 'pmp', 'exb'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [foto(Dc(s) + 'prensa.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero', b: 'Clemente Esteban *Bravo Riofrío*. Ingeniero civil, magíster en Vialidad y abogado.' } },
      { ch: 'a', fu: ['exb'], m: [card('En sus palabras', 'Comerciante · trabajaba de día y estudiaba de noche', 0, 40, 520, 1.5)],
        tx: { h: 'Su relato', b: 'Se presenta como *comerciante* de muchos años que se formó estudiando de noche.' } }
    ]);
    B('machala|0|tray', 'm02', CH2, ['ppo', 'kch', 'pcg', 'exb'], [
      { ch: 'a', fu: ['ppo', 'kch'], ty: 380, m: [dt('2000–2019', 150)],
        tx: { kk: K2, h: 'Alcalde de Santa Rosa', b: 'Cuatro periodos seguidos; el primero, con el *PRE*.' }, n: 'Capítulo 2. De 2000 a 2019, cuatro periodos como alcalde de Santa Rosa; el primero, con el PRE.' },
      { ch: 'a', fu: ['ppo'], m: [foto(Dc(s) + 'campana.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2019 y 2023', h: 'Prefecto de El Oro', b: 'Ganó con la alianza El Oro Primero y fue reelecto con su *movimiento regional*.' } },
      { ch: 'a', fu: ['pcg'], m: [card('Congope', 'Presidente del consorcio de prefecturas · 2025–2027', 0, 40, 520, -2)],
        tx: { h: 'Dirigente provincial', b: 'Los prefectos del país lo eligieron para presidir su *consorcio*.' } },
      { ch: 'a', fu: ['exb'], m: [card('Contraloría · declaraciones patrimoniales', '2019: USD 530.384 · 2023: USD 5,77 millones · 2025: USD 1,31 millones', 0, 40, 560, 1.5, { fx: 'hv' })],
        tx: { h: 'Una declaración cuestionada', b: 'Atribuyó la cifra de 2023 a «un *error*» ya rectificado. La nota no reporta acciones de Contraloría ni Fiscalía.' } }
    ]);
    B('machala|0|exp', 'm03', CH3, ['pmp', 'kch', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'atril.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['kch', 'pmp'], ty: 380, m: [wd('Impugnada', 140, -2)],
        tx: { b: 'El CNE anuló su primera calificación y el PID apeló ante el TCE. Al final, quedó en la *papeleta*.' }, n: 'Impugnada. El CNE anuló su primera calificación y el PID apeló ante el TCE. Al final, quedó en la papeleta.' },
      { ch: 'a', fu: ['eud'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'En el debate dijo que el *agua potable* es lo primero y que puede resolverlo.' } },
      reg(['pmp', 'hv'], 'Ingeniero civil · magíster', 'Prefecto de El Oro (2026)')
    ]);
  }

  /* ===================== EDUARDO GONZÁLEZ · machala|1 ===================== */
  {
    const s = 'gonzalez';
    B('machala|1|origen', 'm11', CH1, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El empresario', b: 'Eduardo Fabián *González Terreros*. Su hoja de vida declara ingeniería industrial.' } },
      { ch: 'a', fu: ['pmp'], m: [card('Consulta de títulos', 'Tercer y cuarto nivel: sin registro', 0, 40, 480, 1.5, { fx: 'hv' })],
        tx: { h: 'Un dato por cruzar', b: 'El registro de títulos que consultó Primicias *no muestra* ese título.' } },
      { ch: 'a', fu: ['kch'], m: [foto(Dc(s) + 'barrio.webp', 60, 0, 540, -1.5)],
        tx: { h: 'Empresa y ayuda social', b: 'La prensa local lo vincula a los *negocios* y a iniciativas de asistencia a sectores vulnerables.' } }
    ]);
    B('machala|1|tray', 'm12', CH2, ['hv', 'pmp'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el *Estado*.' } },
      { ch: 'a', fu: ['pmp'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan qué *empresas* ha dirigido ni desde cuándo.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan qué empresas ha dirigido ni desde cuándo.' }
    ]);
    B('machala|1|exp', 'm13', CH3, ['pmp', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'noche.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 1', b: 'Llega por *Centro Democrático*.' } },
      { ch: 'a', fu: ['eud'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Pidió *estudios técnicos* para entender por qué se inunda Machala antes de corregirlo.' } },
      reg(['pmp', 'hv'], 'Sin registro', 'No registra')
    ]);
  }

  /* ===================== VERÓNICA IZQUIERDO · machala|2 ===================== */
  {
    const s = 'izquierdo';
    B('machala|2|origen', 'm21', CH1, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [foto(Dc(s) + 'atril.webp', 160, -40, 300, -2)], ty: 500,
        tx: { kk: K1, h: 'La ingeniera', b: 'Verónica Rocío *Izquierdo Fernández*. Ingeniera en Gestión Empresarial.' } },
      { ch: 'a', fu: ['kch'], m: [card('Sector privado', 'Empresaria', 0, 40, 400, 1.5)],
        tx: { h: 'Empresaria', b: 'La prensa local la presenta como *empresaria*.' } }
    ]);
    B('machala|2|tray', 'm22', CH2, ['hv', 'pmp'], [
      { ch: 'a', fu: ['hv'], m: [card('Ministerio de Salud Pública', 'Analista de presupuesto', 0, 30, 460, -2), card('Hospital Teófilo Dávila', 'Responsable de tesorería', 280, 220, 340, 2)],
        tx: { kk: K2, h: 'Finanzas públicas', b: 'Su hoja de vida registra cargos de *presupuesto* y tesorería en salud.' } },
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Asamblea Nacional', 'Asesora · asistente de asambleísta', 0, 40, 480, 1.5, { stamp: '2025' })],
        tx: { h: 'En la Asamblea', b: 'Su último cargo fue en un despacho *legislativo*.' } }
    ]);
    B('machala|2|exp', 'm23', CH3, ['pmp', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'marcha.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 6', b: 'Llega por el *Partido Social Cristiano*.' } },
      { ch: 'a', fu: ['pmp'], ty: 380, m: [dt('1', 300)],
        tx: { h: 'mujer', b: 'Es la única candidata en una papeleta de *nueve*.' }, n: 'Una mujer: es la única candidata en una papeleta de nueve.' },
      { ch: 'a', fu: ['eud'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su prioridad', b: 'Servicios básicos, sobre todo *agua potable*, y ordenamiento urbano.' } },
      reg(['pmp', 'hv'], 'Ingeniera en Gestión Empresarial', 'Asistente de asambleísta (2025)')
    ]);
  }

  /* ===================== FRANCISCO MEDINA · machala|3 ===================== */
  {
    const s = 'medina';
    B('machala|3|origen', 'm31', CH1, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'prensa.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El constructor', b: 'Francisco Hernán *Medina Romero*.' } },
      { ch: 'a', fu: ['pmp', 'kch'], m: [card('Consulta de títulos', 'Tercer y cuarto nivel: sin registro', 0, 40, 480, 1.5, { fx: 'hv' })],
        tx: { h: 'Un dato por cruzar', b: 'La prensa local lo describe como ingeniero civil; su hoja de vida y el registro de títulos *no lo muestran*.' } }
    ]);
    B('machala|3|tray', 'm32', CH2, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el *Estado*.' } },
      { ch: 'a', fu: ['kch'], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Construcción', b: 'Su experiencia, según la prensa local, está en el sector de la *construcción*.' } }
    ]);
    B('machala|3|exp', 'm33', CH3, ['pmp', 'kch', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp', 'kch'], m: [foto(Dc(s) + 'atril.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 3', b: 'Llega por *Sociedad Patriótica*, tras sus primarias internas.' } },
      { ch: 'a', fu: ['eud'], ty: 380, m: [dt('200', 300)],
        tx: { h: 'camas', b: 'Propone un hospital *materno-infantil* municipal, con presupuesto local y cooperación internacional.' }, n: 'Doscientas camas: propone un hospital materno-infantil municipal, con presupuesto local y cooperación internacional.' },
      reg(['pmp', 'hv'], 'Sin registro', 'No registra')
    ]);
  }

  /* ===================== DARWIN PEREIRA · machala|4 ===================== */
  {
    const s = 'pereira';
    B('machala|4|origen', 'm41', CH1, ['hv', 'anp', 'eup'], [
      { ch: 'a', fu: ['anp'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero y abogado', b: 'Darwin Stalin *Pereira Chamba*. Nació en Las Lajas en 1973 y creció en Machala.' } },
      { ch: 'a', fu: ['hv', 'eup'], m: [card('Formación', 'Ingeniero en Sistemas · abogado · magíster en Derecho Constitucional', 0, 40, 560, 1.5)],
        tx: { h: 'Dos carreras', b: 'Se formó primero en *sistemas* y luego en derecho.' } }
    ]);
    B('machala|4|tray', 'm42', CH2, ['hv', 'anp', 'kch', 'pmp'], [
      { ch: 'a', fu: ['hv', 'kch'], m: [card('Aguas Machala EP', 'Especialista en responsabilidad social', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'En lo público', b: 'Trabajó en la empresa de *agua* de Machala y en la Superintendencia de Economía Popular.' } },
      { ch: 'a', fu: ['anp'], ty: 380, m: [dt('2021–2023', 150)],
        tx: { h: 'Asambleísta', b: 'Por El Oro con *Pachakutik*; fue segundo vicepresidente de la Asamblea.' }, n: 'De 2021 a 2023, asambleísta por El Oro con Pachakutik; fue segundo vicepresidente de la Asamblea.' },
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Consejo de la Judicatura', 'Jefe departamental nacional de Derechos Humanos', 0, 40, 540, 1.5, { stamp: '2025' })],
        tx: { h: 'Último cargo', b: 'Su paso más reciente por el Estado fue en la *Judicatura*.' } }
    ]);
    B('machala|4|exp', 'm43', CH3, ['pmp', 'kch', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp', 'kch'], m: [foto(Dc(s) + 'comite.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 2 y 23', b: 'Llega por la alianza *Es tu momento, somos unidad*: Unidad Popular y SUMA.' } },
      { ch: 'a', fu: ['eud'], ty: 380, m: [dt('5', 300)],
        tx: { h: 'plantas', b: 'de tratamiento de aguas servidas propone. Y no reconocer contratos firmados «a *última hora*».' }, n: 'Cinco plantas de tratamiento de aguas servidas propone. Y no reconocer contratos firmados a última hora.' },
      reg(['pmp', 'hv'], 'Ingeniero en Sistemas · magíster', 'Judicatura (2025)')
    ]);
  }

  /* ===================== CARLOS RODRÍGUEZ · machala|5 ===================== */
  {
    const s = 'rodriguez';
    B('machala|5|origen', 'm51', CH1, ['hv', 'pmp', 'anr'], [
      { ch: 'a', fu: ['hv', 'anr'], m: [foto(Dc(s) + 'calle.webp', 160, -40, 300, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero civil', b: 'Carlos Alberto *Rodríguez Riofrío*. Ingeniero civil, magíster en Administración Pública.' } },
      { ch: 'a', fu: ['anr'], m: [card('Claro que se puede', 'Organización social · movimiento político desde 2022', 0, 40, 520, 1.5)],
        tx: { h: 'Su propio movimiento', b: 'Dirigió una organización que en 2022 se convirtió en *movimiento* político.' } }
    ]);
    B('machala|5|tray', 'm52', CH2, ['anr', 'kch', 'ppo'], [
      { ch: 'a', fu: ['anr'], ty: 380, m: [dt('2.º', 300)],
        tx: { kk: K2, h: 'lugar', b: 'Fue candidato a la Alcaldía de Machala en *2023* y obtuvo la segunda votación.' }, n: 'Capítulo 2. Segundo lugar: fue candidato a la Alcaldía de Machala en 2023 y obtuvo la segunda votación.' },
      { ch: 'a', fu: ['anr', 'ppo'], m: [foto(Dc(s) + 'retrato.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2023–2025', h: 'Asambleísta', b: 'Representó a El Oro; presentó proyectos sobre *producción*, educación superior y el Cootad.' } }
    ]);
    B('machala|5|exp', 'm53', CH3, ['pmp', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'equipo.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 131', b: 'Llega por el movimiento *Amor, Fe y Esperanza*.' } },
      { ch: 'a', fu: ['eud'], ty: 380, m: [dt('2', 300)],
        tx: { h: 'hospitales', b: 'municipales ofrece, además de ampliar *agua* y alcantarillado.' }, n: 'Dos hospitales municipales ofrece, además de ampliar agua y alcantarillado.' },
      reg(['pmp', 'hv'], 'Ingeniero civil · magíster', 'Asambleísta (2025)')
    ]);
  }

  /* ===================== JOSÉ ROSADO · machala|6 ===================== */
  {
    const s = 'rosado';
    B('machala|6|origen', 'm61', CH1, ['hv', 'pmp'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'José Ramón Eulogio *Rosado Cevallos*. Abogado, magíster en Derechos Fundamentales.' } },
      { ch: 'a', fu: ['pmp'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan su *ejercicio* profesional.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan su ejercicio profesional.' }
    ]);
    B('machala|6|tray', 'm62', CH2, ['kch', 'pmp', 'hv'], [
      { ch: 'a', fu: ['kch'], m: [card('Concejo Municipal de Machala', 'Concejal', 0, 40, 460, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'Fue concejal de *Machala*. Las fuentes no precisan el periodo.' } },
      { ch: 'a', fu: ['pmp', 'hv'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, 1.5, { fx: 'hv' })],
        tx: { h: 'Sin registro reciente', b: 'Su hoja de vida no registra cargos en la *última década*.' } },
      { ch: 'a', fu: ['kch'], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, -1.5)],
        tx: { kk: '2023', h: 'Candidato', b: 'Buscó la Alcaldía con *otra* organización.' } }
    ]);
    B('machala|6|exp', 'm63', CH3, ['pmp', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'caravana.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 20', b: 'Llega por el movimiento *Futuro*.' } },
      { ch: 'a', fu: ['eud'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Alcantarillado para aguas lluvias: dice que hay dos proyectos *ya estudiados*.' } },
      reg(['pmp', 'hv'], 'Abogado · magíster', 'No registra')
    ]);
  }

  /* ===================== ANDRÉS VÁZQUEZ · machala|7 ===================== */
  {
    const s = 'vazquez';
    B('machala|7|origen', 'm71', CH1, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [foto(Dc(s) + 'retrato.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Andrés Esteban *Vázquez Jadán*. Abogado, magíster en Derecho Constitucional.' } },
      { ch: 'a', fu: ['kch'], m: [card('Puerto Bolívar', 'Defensa de vecinos · caso del agua con arsénico', 0, 40, 520, 1.5)],
        tx: { h: 'Un caso', b: 'Defendió a vecinos de Puerto Bolívar por el agua contaminada con *arsénico*.' } }
    ]);
    B('machala|7|tray', 'm72', CH2, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Municipio de Marcabelí', 'Procurador síndico', 0, 40, 440, -2, { stamp: '2019' })],
        tx: { kk: K2, h: 'Abogado municipal', b: 'Fue el *procurador síndico* de un municipio orense.' } },
      { ch: 'a', fu: ['hv', 'kch'], m: [card('Ministerio del Trabajo · Asamblea Nacional', 'Director regional en Loja · asesor legislativo', 0, 40, 540, 1.5)],
        tx: { h: 'Más cargos', b: 'También trabajó en el Ministerio del Trabajo y en la *Asamblea*.' } }
    ]);
    B('machala|7|exp', 'm73', CH3, ['pmp', 'kch', 'exm', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp', 'kch'], m: [foto(Dc(s) + 'mitin.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 17 y 18', b: 'Llega por *Alianza Ciudadana*: Partido Socialista y Pachakutik.' } },
      { ch: 'a', fu: ['exm', 'kch'], ty: 380, m: [wd('La apuesta correísta', 92, -2)],
        tx: { b: 'Su candidatura tiene el respaldo de la *Revolución Ciudadana*.' }, n: 'La apuesta correísta. Su candidatura tiene el respaldo de la Revolución Ciudadana.' },
      { ch: 'a', fu: ['eud'], m: [foto(Dc(s) + 'tv.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Contratar obras de agua desde el primer día y *auditar* la planta La Esperanza.' } },
      reg(['pmp', 'hv'], 'Abogado · magíster', 'Procurador síndico (2019)')
    ]);
  }

  /* ===================== LUIS ZAMBRANO · machala|8 ===================== */
  {
    const s = 'zambrano';
    B('machala|8|origen', 'm81', CH1, ['hv', 'pmp'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [foto(Dc(s) + 'retrato.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Luis Eduardo *Zambrano Barzallo*. Abogado.' } },
      { ch: 'a', fu: ['pmp'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan su *trayectoria* profesional.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan su trayectoria profesional.' }
    ]);
    B('machala|8|tray', 'm82', CH2, ['hv', 'pmp', 'kch'], [
      { ch: 'a', fu: ['hv', 'pmp'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el *Estado*.' } },
      { ch: 'a', fu: ['kch'], m: [foto(Dc(s) + 'prensa.webp', 60, 0, 540, 1.5)],
        tx: { h: 'El reemplazo', b: 'Ocupó el lugar de *Antonio Contreras*, que el PID había anunciado tras sus primarias.' } }
    ]);
    B('machala|8|exp', 'm83', CH3, ['pmp', 'eud', 'hv'], [
      { ch: 'a', fu: ['pmp'], m: [foto(Dc(s) + 'mercado.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 4', b: 'Llega por el movimiento *Pueblo, Igualdad y Democracia*.' } },
      { ch: 'a', fu: ['eud'], ty: 380, m: [dt('$55', 250)],
        tx: { h: 'millones', b: 'para el agua potable, y un programa *Impulso Joven* de capacitación en tecnología.' }, n: 'Cincuenta y cinco millones de dólares para el agua potable, y un programa Impulso Joven de capacitación en tecnología.' },
      reg(['pmp', 'hv'], 'Abogado', 'No registra')
    ]);
  }
})();
