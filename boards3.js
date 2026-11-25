/* Tableros documentales v2 · candidaturas de Guayaquil.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados); tarjetas tipográficas con nombres
   oficiales tal como aparecen en las fuentes. Sin Diario Extra.
   Procesos judiciales: se nombra la etapa exacta y la respuesta de la persona. */
(function () {
  const { make, card, foto } = window.BK;
  const OPT = { q: 'fotos/guayaquil-ciudad-', n: 6 };
  const F = s => 'fotos/guayaquil-' + s + '-', Dc = s => 'docu/gye-' + s + '-';
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
    prg: ['Primicias · «Candidatos a la Alcaldía de Guayaquil: quiénes son y qué partidos los auspician» (noviembre de 2026; datos de CNE, SRI, Senescyt y Contraloría)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/candidatos-alcaldia-guayaquil-trayectoria-perfiles-titulos-136381/'],
    ecg: ['El Comercio · «¿Quiénes son los ocho candidatos a la Alcaldía de Guayaquil?» (noviembre de 2026)', 'https://www.elcomercio.com/elecciones/candidatos-alcaldia-guayaquil-elecciones-2026/'],
    tag: ['Teleamazonas · «Guayaquil: estos son los ocho candidatos y sus planes de trabajo» (12 de noviembre de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/ocho-candidatos-alcaldia-guayaquil-elecciones-seccionales-132903/'],
    vgy: ['Vistazo · «Candidatos a la Alcaldía de Guayaquil, juicios y las sorpresas de una campaña atípica» (14 de noviembre de 2026)', 'https://www.vistazo.com/politica/2026-11-14-elecciones-guayaquil-2026-candidatos-juicios-sorpresas-campana-alcaldias-KC11319517'],
    /* García */
    pag: ['Primicias · «¿Quién es Antonio García Reyes…?», perfil al ser elegido por SUMA (17 de noviembre de 2024)', 'https://www.primicias.ec/elecciones/ecuador2025/presidenciales/antonio-garcia-reyes-paso-correismo-romances-farandula-candidatura-presidencial-83495/'],
    epg: ['Expreso · «PSP inscribe a Antonio García Reyes como candidato a la Alcaldía de Guayaquil» (agosto de 2026)', 'https://expreso.ec/politica/psp-inscribe-antonio-garcia-reyes-candidato-alcaldia-guayaquil-292672.html'],
    /* Icaza */
    tic: ['Teleamazonas · «Fiorella Icaza reemplaza a Mónica Luzarraga como precandidata del PSE» (13 de agosto de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/fiorella-icaza-precandidata-pse-alcaldia-guayaquil-125279/'],
    ppi: ['Primicias · «Fiorella Ycaza se preinscribe como candidata… y dice confiar “en la ley y en la democracia”» (13 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/fiorella-icaza-aquiles-alvarez-candidata-alcaldia-guayaquil-partido-socialista-130203/'],
    pis: ['Primicias · inscripción de candidaturas en Guayas (16 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/vivo-inscripcion-candidaturas-alcaldia-guayaquil-prefectura-guayas-130334/'],
    ecc: ['El Comercio · «Candidatura de Fiorella Ycaza… fue calificada» (agosto de 2026)', 'https://www.elcomercio.com/actualidad/politica/candidatura-fiorella-ycaza-esposa-aquiles-alvarez-alcaldia-guayaquil-calificada/'],
    pgo: ['Primicias · «Caso Goleada: juez suspende proceso contra Fiorella Icaza y tres candidatos más» (18 de noviembre de 2026)', 'https://www.primicias.ec/politica/caso-goleada-fiorella-icaza-candidata-alcaldia-guayaquil-suspension-elecciones-137433/'],
    vgo: ['Vistazo · «Caso Goleada: juez suspende juicio contra Fiorella Ycaza por su candidatura» (18 de noviembre de 2026)', 'https://www.vistazo.com/politica/2026-11-18-caso-goleada-juez-suspende-juicio-fiorella-ycaza-candidatura-alcaldia-guayaquil-DB11326603'],
    vg9: ['Vistazo · «Caso Goleada: se instala audiencia… por lavado de activos» (8 de septiembre de 2026)', 'https://www.vistazo.com/politica/2026-09-08-caso-goleada-audiencia-aquiles-alvarez-esposa-lavado-activos-LD11212292'],
    /* Luzárraga */
    pcl: ['Primicias · «Rafael Correa le dice “no” a Mónica Luzárraga como candidata… y ella le responde» (2026)', 'https://www.primicias.ec/politica/rafael-correa-monica-luzarraga-candidatura-alcaldia-guayaquil-aquiles-alvarez-121824/'],
    eld: ['Expreso · «Mónica Luzárraga consolida candidatura por la alianza “Despierta”» (julio de 2026)', 'https://www.expreso.ec/guayaquil/monica-luzarraga-consolida-candidatura-alianza-despierta-fricciones-correismo-289253.html'],
    els: ['Expreso · «¿Qué pasó con la alianza del correísmo para disputar la Alcaldía de Guayaquil?» (14 de julio de 2026)', 'https://www.expreso.ec/guayaquil/paso-alianza-correismo-disputar-alcaldia-guayaquil-289276.html'],
    prl: ['Primicias · «Mónica Luzárraga reclama al Partido Socialista por cambio de candidatura» (13 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/monica-luzarraga-partido-socialista-cambio-candidata-guayaquil-esposa-aquiles-alvarez-130237/'],
    /* Roche */
    prr: ['Primicias · «Así llegó el PSC a escoger a Andrés Roche y Juan Carlos González» (julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/psc-precandidatos-andres-roche-juan-carlos-gonzalez-alcaldia-guayaquil-prefectura-guayas-jaime-nebot-126963/'],
    erp: ['Expreso · «Andrés Roche: quién es y cuáles son las polémicas que rodean al precandidato del PSC» (julio de 2026)', 'https://www.expreso.ec/guayaquil/andres-roche-busca-alcaldia-guayaquil-polemicas-trayectoria-287888.html'],
    era: ['Expreso · «Andrés Roche: “La ATM que dejé no tiene ni el 1 % de lo que fue”» (julio de 2026)', 'https://www.expreso.ec/guayaquil/andres-roche-atm-deje-no-1-289522.html'],
    tri: ['Teleamazonas · «Andrés Roche inscribió su candidatura a la Alcaldía de Guayaquil junto a Jaime Nebot» (15 de agosto de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/andres-roche-inscribio-candidatura-alcaldia-guayaquil-jaime-nebot-125441/'],
    rpl: ['Plan de trabajo de Andrés Roche 2027–2031 (copia publicada por Teleamazonas)', 'https://www.teleamazonas.com/uploads/files/2026/11/12/ANDRES-ROCHE-PESANTES.pdf'],
    /* Santistevan */
    psa: ['Primicias · precandidaturas a la Alcaldía de Guayaquil: PSC, correísmo, ADN y CREO (julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/psc-correismo-adn-alcaldia-guayaquil-prefectura-guayas-126977/'],
    /* Viteri */
    pvh: ['Primicias · candidatos presidenciales que después buscaron Quito o Guayaquil (historia electoral)', 'https://www.primicias.ec/politica/candidatos-presidente-alcalde-quito-guayaquil-ecuador-elecciones-historia-102130/'],
    et19: ['El Telégrafo · «Cynthia Viteri, alcaldesa electa de Guayaquil» (marzo de 2019)', 'https://www.eltelegrafo.com.ec/noticias/politica/210/cynthiaviteri-alcalde-guayaquil'],
    ecv: ['El Comercio · «Cynthia Viteri irá por la Alcaldía de Guayaquil con ADN» (julio de 2026)', 'https://www.elcomercio.com/actualidad/guayaquil/cynthia-viteri-ira-alcaldia-guayaquil-adn/'],
    vvi: ['Vistazo · «Cynthia Viteri será la candidata de ADN… tras conversaciones con Daniel Noboa» (15 de julio de 2026)', 'https://www.vistazo.com/politica/2026-07-15-cynthia-viteri-candidata-adn-alcaldia-guayaquil-daniel-noboa-EA11114145'],
    pva: ['Primicias · «Cynthia Viteri formaliza su candidatura a la Alcaldía de Guayaquil por ADN» (12 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/inscripcion-candidatos-adn-alcaldia-guayaquil-cynthia-viteri-prefectura-guayas-andres-guschmer-130109/'],
    efv: ['Expreso · «Cynthia Viteri denuncia la filtración de información reservada con fines políticos desde la Fiscalía» (10 de julio de 2026)', 'https://www.expreso.ec/justicia/cynthia-viteri-denuncia-filtracion-informacion-reservada-fines-politicos-fiscalia-288811.html'],
    e23: ['El Comercio · «Aquiles Álvarez alcanzó 559 665 votos (39,87 %) a la Alcaldía de Guayaquil» (14 de febrero de 2023)', 'https://www.elcomercio.com/actualidad/politica/aquiles-alvarez-votos-alcaldia-guayaquil.html'],
    msp8: ['Ministerio de Salud Pública · Coordinación Zonal 8: Guayaquil, Samborondón y Durán (octubre de 2025)', 'https://www.salud.gob.ec/?p=105651'],
    kcg: ['KCH Comunicación · «¿Quién es Antonio García Reyes, reemplazo de Jan Topic…?» (noviembre de 2024)', 'https://kchcomunicacion.com/?p=143534'],
    elc: ['Expreso · «Mónica Luzárraga a Rafael Correa: “¿Tanto miedo les causa el diálogo y la unidad?”» (14 de julio de 2026)', 'https://www.expreso.ec/politica/monica-luzarraga-rafael-correa-tanto-miedo-les-causa-dialogo-unidad-289213.html'],
    edv: ['El Diario · Cynthia Viteri, primera mujer alcaldesa de Guayaquil (2 de julio de 2026)', 'https://eldiario.ec/guayaquil/cynthia-viteri-alcaldia-guayaquil-centro-democratico-02072026/'],
    kfv: ['KCH Comunicación (con información de El Universo) · «Cynthia Viteri denuncia a portales por difundir su citación a la Fiscalía» (10 de julio de 2026)', 'https://kchcomunicacion.com/?p=476826']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== HÉCTOR BALDEÓN · guayaquil|0 ===================== */
  {
    const s = 'baldeon';
    B('guayaquil|0|origen', 'g01', CH1, ['hv', 'ecg', 'tag', 'vgy'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g2.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El maestro', b: 'Héctor Luis *Baldeón Morales*. Licenciado en Ciencias de la Educación, con especialidad en físico-matemáticas.' } },
      { ch: 'a', fu: ['ecg', 'tag'], m: [card('Docencia universitaria', 'Exdocente', 0, 40, 420, -1.5)],
        tx: { h: 'Del aula', b: 'Fue *docente universitario*. Los perfiles publicados no precisan en qué universidad ni en qué años.' } },
      { ch: 'a', fu: ['ecg', 'tag', 'vgy'], m: [foto(Dc(s) + 'g4.webp', 160, -40, 300, 2)], ty: 500,
        tx: { h: 'Pastor evangélico', b: 'Su trayectoria combina la enseñanza con la *actividad religiosa*. Vistazo lo describe también como exdirigente sindical.' } }
    ]);
    B('guayaquil|0|tray', 'g02', CH2, ['hv', 'ecg', 'prg', 'msp8'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'tv.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Servicio público', b: 'Su hoja de vida registra *un cargo público*.' } },
      { ch: 'a', fu: ['hv', 'ecg', 'prg', 'msp8'], m: [card('Ministerio de Salud Pública', 'Inspector sanitario · Coordinación Zonal 8', 0, 40, 520, -2, { stamp: '2017' })],
        tx: { h: 'Inspector sanitario', b: 'Ese es su *último cargo estatal*, en la coordinación de salud que cubre Guayaquil, Durán y Samborondón.' } },
      { ch: 'a', fu: ['ecg'], ty: 380, m: [wd('Lo que no consta', 110, -2)],
        tx: { b: 'Las fuentes consultadas no detallan proyectos comunitarios, resultados ni obras a su nombre. *TINTAFLIX no completa ese vacío.*' }, n: 'Lo que no consta. Las fuentes consultadas no detallan proyectos comunitarios, resultados ni obras a su nombre. TINTAFLIX no completa ese vacío.' }
    ]);
    B('guayaquil|0|exp', 'g03', CH3, ['ecg', 'vgy', 'prg', 'hv'], [
      { ch: 'a', fu: ['vgy'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por *Avanza*, el partido que fundó Ramiro González.' } },
      { ch: 'a', fu: ['ecg'], ty: 380, m: [dt('2023', 280)],
        tx: { h: 'Primer intento', b: 'Buscó una *concejalía* de Guayaquil con Avanza. No obtuvo la curul.' }, n: 'Dos mil veintitrés. Primer intento: buscó una concejalía de Guayaquil con Avanza. No obtuvo la curul.' },
      { ch: 'a', fu: ['ecg'], m: [plan(s)],
        tx: { kk: '2026', h: 'Ahora, la Alcaldía', b: 'Vuelve con el mismo partido, esta vez por el *sillón municipal*.' } },
      reg(['prg', 'hv'], 'Licenciatura en Educación', 'Inspector sanitario (2017)')
    ]);
  }

  /* ===================== ANTONIO GARCÍA · guayaquil|1 ===================== */
  {
    const s = 'garcia';
    B('guayaquil|1|origen', 'g11', CH1, ['hv', 'kcg', 'ecg', 'tag'], [
      { ch: 'a', fu: ['hv', 'kcg'], m: [foto(Dc(s) + 'charla.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Antonio José *García Reyes*. Abogado con mención en Derecho Civil, guayaquileño.' } },
      { ch: 'a', fu: ['kcg', 'ecg'], m: [card('Universidad Católica de Santiago de Guayaquil', 'Derecho', 0, 40, 520, 1.5)],
        tx: { h: 'Formado en la Católica', b: 'Se graduó en esa universidad y hoy se presenta como *consultor político*.' } },
      { ch: 'a', fu: ['tag'], ty: 380, m: [dt('15', 300)],
        tx: { h: 'años', b: 'de trayectoria en la *función pública*, según su propio relato.' }, n: 'Quince años de trayectoria en la función pública, según su propio relato.' }
    ]);
    B('guayaquil|1|tray', 'g12', CH2, ['ecg', 'vgy', 'hv', 'prg'], [
      { ch: 'a', fu: ['ecg'], m: [foto(Dc(s) + 'g4.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'En el Estado', b: 'Buena parte de su carrera pública ocurrió durante el gobierno de *Rafael Correa*.' } },
      { ch: 'a', fu: ['ecg', 'vgy'], m: [card('Conartel', 'Consejo Nacional de Radiodifusión y Televisión', 0, 30, 520, -2, { stamp: '2009' })],
        tx: { h: 'Radio y televisión', b: 'Fue delegado presidencial ante el Conartel; Vistazo lo presenta como su *expresidente*. Entre 2010 y 2011 integró el directorio del Conatel.' } },
      { ch: 'a', fu: ['ecg'], m: [card('Secretaría Nacional de la Administración Pública', 'Subsecretario zonal · Guayaquil', 0, 40, 540, 1.5, { stamp: '2013–2015' })],
        tx: { h: 'Gestión pública', b: 'También fue asesor legal de la Secretaría de Comunicación y coordinador regional de *Transparencia de Gestión*.' } },
      { ch: 'a', fu: ['hv', 'prg'], m: [card('Municipio de Durán', 'Director general de Desarrollo de la Comunidad', 0, 40, 520, -1.5, { stamp: '2023' })],
        tx: { h: 'Último cargo', b: 'Su paso más reciente por lo público fue en el *Municipio de Durán*.' } }
    ]);
    B('guayaquil|1|exp', 'g13', CH3, ['pag', 'vgy', 'epg', 'prg', 'hv'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'rueda.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 3', b: 'Llega por *Sociedad Patriótica*, el partido de Lucio Gutiérrez.' } },
      { ch: 'a', fu: ['pag'], ty: 380, m: [dt('2020', 280)],
        tx: { h: 'Primera papeleta', b: 'Buscó una curul en la Asamblea con *Democracia Sí*.' }, n: 'Dos mil veinte. Primera papeleta: buscó una curul en la Asamblea con Democracia Sí.' },
      { ch: 'a', fu: ['pag'], m: [card('SUMA', 'Candidatura presidencial · elecciones de 2025', 0, 40, 460, 2)],
        tx: { kk: 'Noviembre de 2024', h: 'Reemplazo de Jan Topic', b: 'SUMA lo eligió como su carta presidencial cuando *Topic* quedó fuera.' } },
      { ch: 'a', fu: ['vgy', 'epg'], m: [plan(s)],
        tx: { kk: '16 de agosto de 2026', h: 'De último minuto', b: 'Reemplazó al motivador *Kléber Bravo*, que desistió, y el PSP lo inscribió.' } },
      reg(['prg', 'hv'], 'Abogado', 'Municipio de Durán (2023)')
    ]);
  }

  /* ===================== FIORELLA ICAZA · guayaquil|2 ===================== */
  {
    const s = 'icaza';
    B('guayaquil|2|origen', 'g21', CH1, ['hv', 'ecg', 'prg'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g2.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La comunicadora', b: 'Fiorella María *Icaza Samán*. Tecnóloga en Comunicación para Televisión, con mención en Relaciones Públicas.' } },
      { ch: 'a', fu: ['ecg'], m: [card('ITV · Instituto Tecnológico Superior de Estudios de Televisión', 'Estudios 2011–2014', 0, 40, 560, 1.5)],
        tx: { h: 'Formación', b: 'Estudió en el *ITV* de Guayaquil.' } },
      { ch: 'a', fu: ['ecg'], m: [card('Edumarxa S.A.S.', 'Gerenta general y accionista', 0, 40, 460, -2, { stamp: 'Desde 2025' })],
        tx: { h: 'Empresa', b: 'Desde abril de 2025 dirige una empresa de la que también es *accionista*.' } }
    ]);
    B('guayaquil|2|tray', 'g22', CH2, ['hv', 'prg', 'tic', 'vgy'], [
      { ch: 'a', fu: ['vgy'], m: [foto(Dc(s) + 'g1.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'Su hoja de vida *no registra* funciones en el Estado.' } },
      { ch: 'a', fu: ['tic'], ty: 380, m: [wd('Primera vez', 140, -2)],
        tx: { b: 'Es su primera candidatura: no tiene una *trayectoria política* previa registrada.' }, n: 'Primera vez. Es su primera candidatura: no tiene una trayectoria política previa registrada.' },
      { ch: 'a', fu: ['vgy'], m: [card('Movilizaciones', 'Guayaquil · 2026', 0, 40, 400, -1.5)],
        tx: { kk: '2026', h: 'En la calle', b: 'Encabezó marchas para exigir *justicia* para su esposo, el alcalde Aquiles Alvarez, detenido desde febrero.' } }
    ]);
    B('guayaquil|2|exp', 'g23', CH3, ['tic', 'ppi', 'pis', 'ecc', 'vg9', 'pgo', 'vgo'], [
      { ch: 'a', fu: ['pis'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 17', b: 'Llega por el *Partido Socialista Ecuatoriano*, que acogió a las candidaturas del correísmo.' } },
      { ch: 'a', fu: ['tic', 'ppi'], ty: 380, m: [dt('13.08.2026', 165)],
        tx: { h: 'El reemplazo', b: 'El PSE aceptó la salida de Mónica Luzárraga y aprobó su nombre. Ese día se *preinscribió*.' }, n: 'Trece de agosto de 2026. El reemplazo: el PSE aceptó la salida de Mónica Luzárraga y aprobó su nombre. Ese día se preinscribió.' },
      { ch: 'a', fu: ['pis', 'ecc'], m: [card('Consejo Nacional Electoral', 'Candidatura calificada · Alcaldía de Guayaquil', 0, 40, 520, 2)],
        tx: { kk: '16 de agosto de 2026', h: 'Inscrita', b: 'Inscribió la candidatura con *Sofía Espín*, que va por la Prefectura. El CNE la calificó.' } },
      { ch: 'a', fu: ['vg9', 'pgo', 'vgo'], m: [card('Caso Goleada', 'Procesada · presunto lavado de activos · sin sentencia', 0, 40, 540, -1.5, { fx: 'hv' })],
        tx: { h: 'Un proceso abierto', b: 'Es una de las procesadas. El 18 de noviembre, el juez *suspendió* para ella la audiencia preparatoria de juicio por su candidatura; se retomará después de los comicios.' } },
      { ch: 'a', fu: ['ppi'], ty: 380, m: [wd('Su respuesta', 130, 2)],
        tx: { b: 'Al anunciar su postulación dijo que confía «en la ley y en la *democracia*».' }, n: 'Su respuesta. Al anunciar su postulación dijo que confía en la ley y en la democracia.' }
    ]);
  }

  /* ===================== MÓNICA LUZÁRRAGA · guayaquil|3 ===================== */
  {
    const s = 'luzarraga';
    B('guayaquil|3|origen', 'g31', CH1, ['hv', 'ecg', 'pcl'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La abogada', b: 'Mónica Gabriela *Luzárraga Salazar*. Abogada, magíster en Derecho Procesal y en Criminalística y Ciencias Forenses.' } },
      { ch: 'a', fu: ['ecg'], m: [card('Docencia universitaria', 'Derecho', 0, 40, 420, 1.5)],
        tx: { h: 'También en el aula', b: 'Ha sido *docente universitaria*.' } },
      { ch: 'a', fu: ['ecg', 'pcl'], m: [card('Función Judicial', 'Jueza · Samborondón y Salitre', 0, 40, 460, -2)],
        tx: { h: 'Jueza', b: 'Fue jueza de primer nivel en *Samborondón y Salitre*, en la provincia del Guayas.' } }
    ]);
    B('guayaquil|3|tray', 'g32', CH2, ['hv', 'ecg', 'prg', 'eld'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'asamblea.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Del juzgado a la defensa', b: 'Su carrera recorre la *justicia*, la defensa pública y la asesoría jurídica del Estado.' } },
      { ch: 'a', fu: ['hv', 'ecg'], m: [card('Defensoría Pública', 'Coordinadora provincial de Defensa Judicial y Tránsito · Guayas', 0, 30, 540, -2), card('Defensoría del Pueblo', 'Transparencia activa', 260, 220, 340, 1.5)],
        tx: { h: 'Defensa pública', b: 'Coordinó la defensa judicial en el Guayas. También trabajó en la Autoridad Portuaria y en la *Senae*.' } },
      { ch: 'a', fu: ['eld'], m: [card('Avenida Cacique Tomalá', 'Moradores frente a la expropiación por el Quinto Puente', 0, 40, 540, 1.5)],
        tx: { h: 'Con los vecinos', b: 'Como abogada, defendió a moradores que el *Ministerio de Infraestructura* quiere expropiar para el Quinto Puente.' } },
      { ch: 'a', fu: ['hv', 'prg'], m: [card('Vicepresidencia de la República', 'Directora de Asesoría Jurídica', 0, 40, 500, -1.5, { stamp: '2025' })],
        tx: { h: 'Último cargo', b: 'Su paso más reciente por lo público fue en la *Vicepresidencia*.' } }
    ]);
    B('guayaquil|3|exp', 'g33', CH3, ['pcl', 'elc', 'ppi', 'els', 'eld', 'prl', 'prg', 'hv'], [
      { ch: 'a', fu: ['eld'], m: [foto(Dc(s) + 'marcha.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 2 y 18', b: 'Llega por la alianza *Despierta*: Unidad Popular y Pachakutik.' } },
      { ch: 'a', fu: ['pcl', 'elc'], ty: 380, m: [wd('El «no» de Correa', 110, -2)],
        tx: { kk: 'Mayo de 2026', b: 'Rafael Correa dijo que ella *no* era candidata de la Revolución Ciudadana. Ella respondió que seguiría.' }, n: 'El no de Correa. En mayo de 2026, Rafael Correa dijo que ella no era candidata de la Revolución Ciudadana. Ella respondió que seguiría.' },
      { ch: 'a', fu: ['ppi', 'els'], ty: 380, m: [dt('14.07.2026', 165)],
        tx: { h: 'Fuera del PSE', b: 'Un mes después de firmar una *mesa de unidad* con el PSE, UP y Pachakutik, dejó al Partido Socialista por diferencias sobre el acuerdo.' }, n: 'Catorce de julio de 2026. Fuera del PSE: un mes después de firmar una mesa de unidad con el PSE, Unidad Popular y Pachakutik, dejó al Partido Socialista por diferencias sobre el acuerdo.' },
      { ch: 'a', fu: ['prl'], m: [foto(Dc(s) + 'g2.webp', 60, 0, 540, 1.5)],
        tx: { kk: '13 de agosto de 2026', h: '«Yo sostengo mi palabra»', b: 'Cuestionó al PSE cuando formalizó a otra candidata en su lugar y mantuvo su postulación con *Despierta*.' } },
      reg(['prg', 'hv'], 'Abogada · dos maestrías', 'Vicepresidencia (2025)')
    ]);
  }

  /* ===================== PEDRO MEDINA · guayaquil|4 ===================== */
  {
    const s = 'medina';
    B('guayaquil|4|origen', 'g41', CH1, ['hv', 'ecg', 'tag'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g2.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El médico', b: 'Pedro Arturo *Medina Urresta*. Doctor en Medicina y Cirugía.' } },
      { ch: 'a', fu: ['ecg', 'tag'], ty: 380, m: [dt('+30', 280)],
        tx: { h: 'años', b: 'de trabajo *social y comunitario*, según su perfil: activista, conferencista y educador.' }, n: 'Más de treinta años de trabajo social y comunitario, según su perfil: activista, conferencista y educador.' }
    ]);
    B('guayaquil|4|tray', 'g42', CH2, ['ecg', 'hv', 'prg'], [
      { ch: 'a', fu: ['ecg'], m: [foto(Dc(s) + 'g4.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Médicos del Barrio', b: 'Ha liderado brigadas que llevan *atención médica* a la comunidad.' } },
      { ch: 'a', fu: ['hv', 'prg'], m: [card('EP Petroecuador', 'Médico especialista', 0, 40, 440, -2, { stamp: '2016' })],
        tx: { h: 'Último cargo público', b: 'Trabajó como médico en la *empresa pública* de hidrocarburos.' } },
      { ch: 'a', fu: ['ecg'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes no detallan cuántas brigadas, dónde ni cuántas personas atendieron. *Queda como vacío.*' }, n: 'Lo que no consta. Las fuentes no detallan cuántas brigadas, dónde ni cuántas personas atendieron. Queda como vacío.' }
    ]);
    B('guayaquil|4|exp', 'g43', CH3, ['ecg', 'vgy', 'prg', 'hv'], [
      { ch: 'a', fu: ['vgy'], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 4, 12 y 20', b: 'Llega por *Mano Firme*, la única alianza de tres partidos en Guayaquil.' } },
      { ch: 'a', fu: ['ecg', 'vgy'], m: [card('Mano Firme', 'PID · Izquierda Democrática · Futuro', 0, 40, 500, 1.5)],
        tx: { h: 'Tres organizaciones', b: 'La integran el PID, la *Izquierda Democrática* y Futuro, antes Democracia Sí.' } },
      { ch: 'a', fu: ['ecg'], ty: 380, m: [wd('No es la primera', 110, -2)],
        tx: { b: 'Antes buscó una curul en la *Asamblea Nacional*. El perfil no indica el año.' }, n: 'No es la primera. Antes buscó una curul en la Asamblea Nacional. El perfil no indica el año.' },
      { ch: 'a', fu: ['ecg'], m: [plan(s)],
        tx: { h: 'Su plan', b: 'Es el documento que inscribió ante el *CNE* para el periodo 2027–2031.' } },
      reg(['prg', 'hv'], 'Doctor en Medicina', 'Petroecuador (2016)')
    ]);
  }

  /* ===================== ANDRÉS ROCHE · guayaquil|5 ===================== */
  {
    const s = 'roche';
    B('guayaquil|5|origen', 'g51', CH1, ['hv', 'ecg', 'tag'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g4.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Andrés Fernando *Roche Pesantes*. Abogado y licenciado en Ciencias Sociales y Políticas.' } },
      { ch: 'a', fu: ['hv', 'ecg'], m: [card('Magíster en Derecho Administrativo', 'Especialista en Legislación Tributaria', 0, 40, 520, 1.5)],
        tx: { h: 'Posgrados', b: 'Se especializó en *derecho administrativo* y legislación tributaria.' } },
      { ch: 'a', fu: ['tag', 'ecg'], m: [card('Municipio de Guayaquil', 'Cargos en las administraciones de Nebot y Viteri', 0, 40, 520, -2)],
        tx: { h: 'Casa socialcristiana', b: 'Su carrera se hizo en el Municipio, durante las alcaldías de *Jaime Nebot* y Cynthia Viteri.' } }
    ]);
    B('guayaquil|5|tray', 'g52', CH2, ['tag', 'era', 'erp', 'hv', 'prg'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'entrevista.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'El tránsito de la ciudad', b: 'Fue gerente general de la *Autoridad de Tránsito Municipal*, la ATM.' } },
      { ch: 'a', fu: ['era'], ty: 380, m: [wd('«La creé desde cero»', 96, -2)],
        tx: { kk: 'Julio de 2026', b: 'Así describe su paso por la ATM. Atribuye su *deterioro* a las administraciones posteriores.' }, n: 'La creé desde cero. Así describe Roche su paso por la ATM, en julio de 2026. Atribuye su deterioro a las administraciones posteriores.' },
      { ch: 'a', fu: ['erp', 'hv', 'prg'], m: [card('Asamblea Nacional', 'Asambleísta alterno', 0, 40, 440, -1.5)],
        tx: { h: 'En la Asamblea', b: 'Fue *asambleísta alterno*. Es su último cargo público registrado.' } },
      { ch: 'a', fu: ['erp'], m: [card('Palacio Municipal', 'Video de una discusión con un funcionario · noviembre de 2025', 0, 40, 540, 2)],
        tx: { h: 'Un video', b: 'Circuló un altercado suyo con el director de Compras Públicas. No se reporta proceso legal. Pidió *disculpas* y dijo que el sitio y la forma no fueron los adecuados.' } }
    ]);
    B('guayaquil|5|exp', 'g53', CH3, ['prr', 'vgy', 'tri', 'rpl', 'prg', 'hv'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 6 y 75', b: 'Llega por el *Partido Social Cristiano* y su aliado local, Madera de Guerrero.' } },
      { ch: 'a', fu: ['prr', 'vgy'], ty: 380, m: [dt('2.07.2026', 165)],
        tx: { h: 'Primarias del PSC', b: 'El partido evaluó otros nombres antes de elegirlo. Roche dijo que *no buscó* la candidatura: lo convocaron.' }, n: 'Dos de julio de 2026. Primarias del PSC: el partido evaluó otros nombres antes de elegirlo. Roche dijo que no buscó la candidatura: lo convocaron.' },
      { ch: 'a', fu: ['tri'], m: [foto(Dc(s) + 'g1.webp', 60, 0, 540, 1.5)],
        tx: { kk: '15 de agosto de 2026', h: 'Con Nebot', b: 'Inscribió la candidatura acompañado por el líder del PSC, *Jaime Nebot*.' } },
      { ch: 'a', fu: ['rpl'], m: [card('«Guayaquil vuelve a ser Guayaquil»', 'Plan de trabajo 2027–2031 · 70 páginas', 0, 40, 520, -2)],
        tx: { h: 'Su plan', b: 'Promete *recuperar* la ciudad con mejores índices de seguridad.' } },
      reg(['prg', 'hv'], 'Abogado · magíster', 'Asambleísta alterno')
    ]);
  }

  /* ===================== SUSANA SANTISTEVAN · guayaquil|6 ===================== */
  {
    const s = 'santistevan';
    B('guayaquil|6|origen', 'g61', CH1, ['hv', 'ecg'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g1.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La abogada', b: 'Susana Rita *Santistevan Marzo*. Abogada.' } },
      { ch: 'a', fu: ['hv', 'ecg'], m: [card('Magíster en Derecho', 'Notarial y Registral · Constitucional', 0, 40, 480, 1.5)],
        tx: { h: 'Dos maestrías', b: 'Una en derecho *notarial y registral*; otra en derecho constitucional.' } }
    ]);
    B('guayaquil|6|tray', 'g62', CH2, ['hv', 'ecg', 'vgy', 'prg'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'comercio.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { kk: K2, h: 'En lo público', b: 'Su hoja de vida registra funciones en el *sector público* entre 2019 y 2021.' } },
      { ch: 'a', fu: ['hv'], m: [card('Asamblea Nacional', 'Asesora', 0, 40, 380, -2)],
        tx: { h: 'Asesora legislativa', b: 'Trabajó como *asesora* en la Asamblea Nacional.' } },
      { ch: 'a', fu: ['ecg', 'vgy', 'prg'], m: [card('Ministerio de Inclusión Económica y Social', 'Viceministra de Inclusión Social', 0, 40, 540, 1.5, { stamp: '2021' })],
        tx: { h: 'Viceministra', b: 'Ocupó el cargo unos *cinco meses*, en el gobierno de Guillermo Lasso.' } }
    ]);
    B('guayaquil|6|exp', 'g63', CH3, ['psa', 'vgy', 'prg', 'hv'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'calle.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 21', b: 'Llega por *Creo*, el movimiento que fundó Guillermo Lasso.' } },
      { ch: 'a', fu: ['psa'], m: [card('Creo · Guayaquil', 'Directora cantonal', 0, 40, 420, 2)],
        tx: { h: 'Desde el inicio', b: 'Dirige Creo en Guayaquil y ha estado ligada al movimiento *desde sus inicios*.' } },
      { ch: 'a', fu: ['psa'], ty: 380, m: [dt('Julio 2026', 170)],
        tx: { h: 'Se suma', b: 'Entró a la carrera cuando ya sonaban los nombres de *ADN, PSC y el correísmo*.' }, n: 'Julio de 2026. Se suma: entró a la carrera cuando ya sonaban los nombres de ADN, el PSC y el correísmo.' },
      reg(['prg', 'hv'], 'Abogada · magíster', 'Viceministra (2021)')
    ]);
  }

  /* ===================== CYNTHIA VITERI · guayaquil|7 ===================== */
  {
    const s = 'viteri';
    B('guayaquil|7|origen', 'g71', CH1, ['hv', 'et19', 'pvh'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'g3.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La abogada', b: 'Cynthia Fernanda *Viteri Jiménez*. Doctora en Jurisprudencia y licenciada en Ciencias Sociales y Políticas.' } },
      { ch: 'a', fu: ['et19'], m: [card('Partido Social Cristiano', 'Jefa de la campaña presidencial de Jaime Nebot', 0, 40, 540, 1.5)],
        tx: { h: 'Los inicios', b: 'Empezó su carrera en el *PSC*, donde dirigió una campaña presidencial de Nebot.' } },
      { ch: 'a', fu: ['et19'], ty: 380, m: [dt('1998', 280)],
        tx: { h: 'Al Congreso', b: 'Ese año llegó por primera vez al *Legislativo*. Permaneció hasta 2006.' }, n: 'Mil novecientos noventa y ocho. Al Congreso: ese año llegó por primera vez al Legislativo. Permaneció hasta 2006.' }
    ]);
    B('guayaquil|7|tray', 'g72', CH2, ['pvh', 'et19', 'e23', 'edv'], [
      { ch: 'a', fu: ['et19'], ty: 380, m: [dt('16', 300)],
        tx: { kk: K2, h: 'años como legisladora', b: 'Entre el Congreso y la *Asamblea Nacional*.' }, n: 'Capítulo 2. Dieciséis años como legisladora, entre el Congreso y la Asamblea Nacional.' },
      { ch: 'a', fu: ['pvh'], m: [card('Elecciones presidenciales', '2006 · 9,63 % — 2017 · 16,32 %', 0, 40, 500, -1.5)],
        tx: { h: 'Dos veces candidata presidencial', b: 'En 2006 fue la primera mujer candidata presidencial del PSC; quedó quinta. En 2017 quedó *tercera*.' } },
      { ch: 'a', fu: ['edv', 'e23'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2019–2023', h: 'Alcaldesa', b: 'Primera mujer al frente del Municipio, con el PSC. En 2023 buscó la *reelección*: ganó Aquiles Alvarez.' } }
    ]);
    B('guayaquil|7|exp', 'g73', CH3, ['ecv', 'vvi', 'vgy', 'pva', 'efv', 'kfv', 'prg', 'hv'], [
      { ch: 'a', fu: ['pva'], m: [foto(Dc(s) + 'tarima.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['ecv', 'vvi'], ty: 380, m: [dt('9–15', 260)],
        tx: { h: 'Julio de 2026', b: 'El día 9 aceptó la precandidatura de *Centro Democrático*. El 15 anunció que iría con ADN, tras conversar con Noboa.' }, n: 'Del 9 al 15 de julio de 2026. El día 9 aceptó la precandidatura de Centro Democrático. El 15 anunció que iría con ADN, tras conversar con Noboa.' },
      { ch: 'a', fu: ['efv', 'kfv'], m: [card('Fiscalía · investigaciones previas', 'Citada a rendir versión · sin cargos formulados', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Dos investigaciones previas', b: 'El día en que aceptó su precandidatura, la Fiscalía la citó a rendir versión. Viteri denunció la *filtración* y lo atribuyó a denuncias de actores políticos.' } },
      { ch: 'a', fu: ['pva'], m: [foto(Dc(s) + 'caravana.webp', 60, 0, 540, -1.5)],
        tx: { kk: '12 de agosto de 2026', h: 'Formalizada', b: 'Prometió una gestión *coordinada* con el Gobierno central.' } },
      reg(['prg', 'hv'], 'Doctora en Jurisprudencia', 'Alcaldesa (2023)')
    ]);
  }
})();
