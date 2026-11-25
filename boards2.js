/* Tableros documentales v2 · candidaturas de Quito (salvo Merino, en boards.js).
   Misma metodología: la tipografía integrada narra; cada dato una sola vez;
   fotos de la carpeta de Drive de cada candidatura (ilustrativas, no
   documentan los hechos narrados); tarjetas tipográficas con nombres
   oficiales tal como aparecen en las fuentes; portada real del plan inscrito. */
(function () {
  const { make, card, foto } = window.BK;
  const F = s => 'fotos/quito-' + s + '-', Dc = s => 'docu/' + s + '-';
  const dt = (v, fs, y, yel) => ({ t: 'dt', fx: yel === false ? '' : 'y', v, x: 0, y: y || 0, fs: fs || 240 });
  const wd = (v, fs, r) => ({ t: 'wd', v, x: 40, y: 140, fs: fs || 130, r: r || -2 });
  const plan = (s, alt) => ({ t: 'doc', src: Dc(s) + 'plan.webp', alt: alt || 'Portada del plan de trabajo inscrito en el CNE', x: 150, y: -40, w: 300, r: -2.5 });
  const lay = EV => EV.map((e, i) => ({ x: i * 1050, y: i % 2 ? 190 : -40, ...e }));
  const cons = (ch) => ({ ch, fu: ['cons'], ty: 470,
    m: [{ t: 'doc', fx: 'rec', h: 'Antecedentes penales', stamp: 'No registra', x: 20, y: 40, w: 205, r: -2 },
      { t: 'doc', fx: 'rec', h: 'Deudas en firme con el SRI', stamp: 'No registra', x: 238, y: 70, w: 205, r: 1.5 },
      { t: 'doc', fx: 'rec', h: 'Pensiones alimenticias', stamp: 'No registra', x: 456, y: 40, w: 205, r: -1 }],
    tx: { kk: 'Consulta a registros públicos', h: 'Corte: 24 de noviembre de 2026' },
    n: 'Consulta a registros públicos, con corte al 24 de noviembre de 2026: no registra antecedentes penales, ni deudas en firme con el SRI, ni pensiones alimenticias pendientes.' });
  const K1 = 'Capítulo 1 · ¿Quién es antes de la política?', K2 = 'Capítulo 2 · ¿Qué ha hecho?', K3 = 'Capítulo 3 · ¿Cómo llega a esta candidatura?';
  const CH1 = [{ id: 'a', t: 'Antes de la papeleta', k: 'Apertura' }], CH2 = [{ id: 'a', t: 'Lo que hizo', k: 'Apertura' }], CH3 = [{ id: 'a', t: 'El camino a la papeleta', k: 'Apertura' }];

  /* ------------------------- fuentes ------------------------- */
  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas, corte 24 de noviembre de 2026)', ''],
    plan: ['Plan de trabajo inscrito en el CNE (portada)', ''],
    cons: ['Consulta a registros públicos: antecedentes penales, obligaciones tributarias en firme (SRI) y pensiones alimenticias. Corte: 24 de noviembre de 2026', ''],
    eu: ['El Universo · «Diez precandidatos inscritos para la Alcaldía de Quito» (19 de agosto de 2026)', 'https://www.eluniverso.com/noticias/politica/diez-precandidatos-inscritos-para-alcaldia-quito-nota/'],
    tam: ['Teleamazonas · perfiles de los diez candidatos a la Alcaldía de Quito (12 de noviembre de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/diez-candidatos-alcaldia-quito-perfiles-elecciones-132875/'],
    pri: ['Primicias · «Candidatos a la Alcaldía de Quito: quiénes son y qué trayectoria tienen» (noviembre de 2026; datos de CNE, SRI, Contraloría y Ministerio de Educación)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/candidatos-alcaldia-quito-trayectoria-perfiles-titulos-135722/'],
    prc: ['Primicias · «Quito tiene ahora 12 precandidatos a la Alcaldía» (julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/precandidatos-alcaldia-quito-cne-adn-correismo-pachakutik-127065/'],
    ecd: ['El Comercio · «Los candidatos a la Alcaldía de Quito debatieron sus propuestas antes de las elecciones» (22 de noviembre de 2026)', 'https://www.elcomercio.com/elecciones/candidatos-alcaldia-quito-debates-propuestas/'],
    pdd: ['Primicias · «Debate por la Alcaldía de Quito: sobraron acusaciones, faltaron propuestas sobre el futuro» (22 de noviembre de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/debate-candidatos-alcaldia-quito-debate-cne-elecciones-seccionales-137694/'],
    vsd: ['Vistazo · «Así fue el debate para la Alcaldía de Quito: las claves que dejó el encuentro» (22 de noviembre de 2026)', 'https://www.vistazo.com/politica/2026-11-22-envivo-debate-electoral-alcaldia-quito-seccionales-cne-DA11331323'],
    /* Almeida */
    prj: ['Primicias · «Jimmy Jairala abandona el partido que fundó, Centro Democrático» (2025)', 'https://primicias.ec/politica/jimmy-jairala-deja-centro-democratico-movimientos-politicos-ecuador-91911'],
    tgp: ['Plan de gobierno de Galo Almeida 2027–2031 (copia publicada por Teleamazonas)', 'https://www.teleamazonas.com/uploads/files/2026/11/12/GALO-ALMEIDA.pdf'],
    /* Burbano */
    pbu: ['Primicias · «¿Quién es el nuevo Ministro del Trabajo de Ecuador, Harold Burbano?» (18 de noviembre de 2025)', 'https://www.primicias.ec/politica/ministro-trabajo-ecuador-harold-burbano-109731/'],
    pmi: ['Primicias · «Harold Burbano es el nuevo ministro encargado del MIES» (13 de febrero de 2025)', 'https://primicias.ec/politica/ministro-encargado-mies-harold-burbano-gobierno-daniel-noboa-ecuador-89674'],
    vbu: ['Vistazo · «Harold Burbano, designado ministro encargado de Inclusión Económica: fue asesor de la CONAIE» (13 de febrero de 2025)', 'https://www.vistazo.com/politica/nacional/2025-02-13-harold-burbano-designado-daniel-noboa-ministro-inclusion-economica-JF8799209'],
    pjl: ['Primicias · «Jornada laboral podrá ser de 10 horas al día, sin superar 40 a la semana» (10 de marzo de 2026)', 'https://www.primicias.ec/economia/jornada-laboral-acuerdo-trabajo-empleo-flexibilidad-vigente-registro-oficial-117722/'],
    psm: ['Primicias · «Sindicatos marcharán el 13 de marzo en Quito en contra de la nueva jornada de 10 horas» (marzo de 2026)', 'https://www.primicias.ec/economia/sindicatos-marcha-quito-acuerdo-jornada-laboral-ecuador-empleo-trabajadores-117774/'],
    mdt: ['Ministerio del Trabajo · Acuerdo Ministerial MDT-2026-059 (texto oficial)', 'https://www.trabajo.gob.ec/wp-content/uploads/2026/03/2.7-ACUERDO-MINISTERIAL-MDT-2026-059.pdf'],
    pv1: ['Primicias · jueza da 24 horas al Ministerio del Trabajo para corregir el impedimento de Alexandra Villacís (marzo de 2026)', 'https://www.primicias.ec/politica/ministerio-trabajo-alexandra-villacis-consejo-judicatura-registro-inhabilidad-118849/'],
    pv2: ['Primicias · el Ministerio de Trabajo pide aclarar el fallo; respuesta de Burbano (marzo de 2026)', 'https://www.primicias.ec/politica/ministro-trabajo-alexandra-villacis-consejo-judicatura-sentencia-aclaracion-119083/'],
    pv3: ['Primicias · «Ministerio de Trabajo retira impedimento a Alexandra Villacís tras seis días de su renuncia» (abril de 2026)', 'https://www.primicias.ec/politica/ministerio-trabajo-levanta-impedimento-alexandra-villacis-renuncia-judicatura-120424/'],
    ev1: ['Expreso · «Ministro Harold Burbano afirma que el fallo a favor de Villacís es “inejecutable”» (marzo de 2026)', 'https://www.expreso.ec/actualidad/ministro-harold-burbano-afirma-que-el-fallo-favor-de-villacis-es-inejecutable-279597.html'],
    exn: ['Expreso · «Harold Burbano asume Ministerio de Trabajo tras salida de Ivonne Núñez» (18 de noviembre de 2025)', 'https://www.expreso.ec/actualidad/politica/harold-burbano-asume-ministerio-de-trabajo-tras-salida-de-ivonne-nunez-264912'],
    prm: ['Primicias · comparecencia del ministro Burbano en la Comisión de Fiscalización por el caso Álvaro Rosero (21 de noviembre de 2025)', 'https://www.primicias.ec/politica/ministro-trabajo-harold-burbano-alvaro-rosero-comision-fiscalizacion-asamblea-gobierno-110002/'],
    exg: ['Expreso · «Cynthia Gellibert asume el Ministerio del Trabajo» (2026)', 'https://www.expreso.ec/politica/cambios-gabinete-cynthia-gellibert-asume-ministerio-trabajo-ecuador-284593.html'],
    kch: ['KCH Comunicación · «ADN inscribe a Harold Burbano para la Alcaldía de Quito y a Giovanna Ubidia para la Prefectura»', 'https://kchcomunicacion.com/?p=500253'],
    ecb: ['El Comercio · «ADN inscribió la candidatura de Harold Burbano para la Alcaldía de Quito» (agosto de 2026)', 'https://www.elcomercio.com/actualidad/politica/adn-inscribio-candidatura-harold-burbano-alcaldia-quito/'],
    /* Desamblanc */
    ecp: ['El Comercio · «La Asamblea posesionó a los parlamentarios andinos» (19 de mayo de 2021)', 'https://www.elcomercio.com/actualidad/politica/asamblea-nacional-posesion-parlamentarios-andinos/'],
    cg1: ['Congreso del Perú · Parlamento Andino conforma equipo de expertos en derecho comunitario (diciembre de 2021)', 'https://comunicaciones.congreso.gob.pe/?p=151540'],
    cg2: ['Congreso del Perú · «Vicepresidente del Parlamento Andino expondrá sobre la protección de la naturaleza en COP26» (5 de noviembre de 2021)', 'https://comunicaciones.congreso.gob.pe/?p=145603'],
    cg3: ['Parlamento Andino · informe de la Oficina de Representación del Perú (oficio 022-2022-2023)', 'https://leyes.congreso.gob.pe/Documentos/2021_2026/Oficios/Parlamento_Andino/OFICIO-022-2022-2023-JCRL-PARLANDINO.pdf'],
    kcr: ['KCH Comunicación · «Militante de la Izquierda Democrática impugnó la candidatura presidencial de Carlos Rabascall» (2024)', 'https://kchcomunicacion.com/?p=128285'],
    /* Díaz */
    exc: ['Expreso · «César Díaz, el héroe del Cenepa que ahora busca llegar a la Alcaldía de Quito» (6 de octubre de 2026)', 'https://www.expreso.ec/quito/cesar-diaz-heroe-cenepa-busca-llegar-alcaldia-quito-298389.html'],
    ac1: ['Concejo Metropolitano de Quito · acta de la Comisión de Seguridad, 1 de abril de 2020', 'https://www7.quito.gob.ec/mdmq_ordenanzas/Administraci%C3%B3n%202019-2023/Comisiones%20del%20Concejo%20Metropolitano/Seguridad,%20Convivencia%20Ciudadana%20y%20Gesti%C3%B3n%20de%20Riesgos/ACTAS/2020/Acta021%20(01-04-2020).pdf'],
    ac2: ['Concejo Metropolitano de Quito · acta de la Comisión de Seguridad, 6 de mayo de 2020', 'https://www7.quito.gob.ec/mdmq_ordenanzas/Administraci%C3%B3n%202019-2023/Comisiones%20del%20Concejo%20Metropolitano/Seguridad,%20Convivencia%20Ciudadana%20y%20Gesti%C3%B3n%20de%20Riesgos/ACTAS/2020/Acta023%20(06-05-2020).pdf'],
    ecc: ['El Comercio · COE de Quito pide al COE Nacional postergar el retorno presencial (12 de junio de 2020)', 'https://www.elcomercio.com/actualidad/quito-coe-aplazamiento-sector-publico/'],
    pme: ['Municipio de Quito · Plan Metropolitano de Seguridad Ciudadana y Convivencia Social Pacífica (2020)', 'https://www7.quito.gob.ec/mdmq_ordenanzas/Administraci%C3%B3n%202019-2023/Sesiones%20de%20Concejo/2021/Sesi%C3%B3n%20178%20Ordinaria%202021-10-12/V.%20Plan%20Seguridad%20y%20Convivencia/4.%20DOCUMENTOS%20ADICIONALES/Concejala%20Gissela%20Chal%C3%A1/Plan%20Met.%20Act.%2010-2020.pdf'],
    ecr: ['El Comercio · «El Secretario Metropolitano de Seguridad dejó su cargo por pedido de Jorge Yunda» (8 de julio de 2021)', 'https://www.elcomercio.com/actualidad/quito/secretario-metropolitano-seguridad-cargo-pedido-jorge-yunda/'],
    prr: ['Primicias · Yunda rearma su equipo con rostros conocidos (5 de agosto de 2021)', 'https://www.primicias.ec/noticias/sociedad/yunda-rearma-equipo-rostros-conocidos-cuestionados/'],
    ex13: ['Expreso · «¿Quién es César Díaz, el décimo tercer precandidato que busca la Alcaldía de Quito?» (11 de julio de 2026)', 'https://www.expreso.ec/quito/cesar-diaz-decimo-tercer-precandidato-busca-alcaldia-quito-288893.html'],
    /* Jijón */
    fla: ['Fundación Lucha Anticorrupción y otras organizaciones · informe para el Examen Periódico Universal de Ecuador, ONU (2022)', 'https://fundamedios.org.ec/staging/wp-content/uploads/2022/04/5-EXAMEN-PERI%C3%93DICO-UNIVERSAL-Informe-FLA.docx.pdf'],
    ppk: ['Primicias · precandidato presentado por Lucio Gutiérrez encabeza la lista de Pachakutik (2 de julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/pachakutik-precandidatos-alcaldia-quito-prefectura-pichincha-sociedad-patriotica-126937/'],
    pin: ['Primicias · estado de las inscripciones para la Alcaldía de Quito (11 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/candidatos-alcaldia-quito-cne-inscripcion-adn-correismo-130030/'],
    /* Larrea */
    t25: ['Teleamazonas · candidatos a la Vicepresidencia, elecciones 2025', 'https://www.teleamazonas.com/elecciones-2025-candidatos-vicepresidencia-ecuador/'],
    p25: ['Primicias · candidatas a la Vicepresidencia 2025 (perfiles)', 'https://primicias.ec/politica/candidatos-binomio-vicepresidente-elecciones2025-ecuador-76796'],
    pcu: ['Primicias · «Construye proclama a Henry Cucalón y Carla Larrea como su binomio presidencial» (15 de agosto de 2024)', 'https://primicias.ec/politica/presentadora-television-companera-precandidato-construye-henry-cucalon-76450'],
    pdb: ['Primicias · debate de candidatos a la Vicepresidencia (2025)', 'https://primicias.ec/elecciones/ecuador2025/presidenciales/candidatos-vicepresidencia-ecuador-debate-propuestas-87308'],
    pcr: ['Primicias · «La ID y el movimiento CREO definen precandidatos para la Alcaldía de Quito» (julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/id-creo-precandidatos-alcaldia-quito-prefectura-pichincha-126870/'],
    /* Muñoz */
    cid: ['CIDOB · biografía de Pabel Muñoz López (actualizada en marzo de 2023)', 'https://www.cidob.org/en/lider-politico/pabel-munoz-lopez'],
    pmt: ['Primicias · «Así fue el primer día de operación comercial del Metro de Quito» (1 de diciembre de 2023)', 'https://primicias.ec/noticias/quito/metro-inauguracion-tickets-estaciones-recorrido'],
    p5a: ['Primicias · «El Metro de Quito necesitó de cinco alcaldes y 129 meses para empezar a rodar»', 'https://primicias.ec/noticias/quito/metro-inauguracion-mapa-cronologia-estaciones'],
    prt: ['Primicias · retos de Pabel Muñoz si la revocatoria no avanza (2025)', 'https://www.primicias.ec/quito/pabel-munoz-revocatoria-mandato-metro-inseguridad-comercio-97064/'],
    e24: ['Expreso · «Pabel Muñoz le rinde cuentas a Quito: el balance de su segundo año de gestión» (2025)', 'https://www.expreso.ec/quito/pabel-munoz-le-rinde-cuentas-quito-balance-segundo-ano-gestion-249559.html'],
    prv: ['Primicias · «Estas son las promesas que el alcalde Pabel Muñoz aún debe cumplir, sin el peso de la revocatoria» (12 de octubre de 2025)', 'https://www.primicias.ec/quito/pabel-munoz-metro-transporte-trafico-tercera-placa-106793/'],
    e26: ['Expreso · «Movilidad y ambiente: los retos que Pabel Muñoz mantiene abiertos en Quito en 2026»', 'https://www.expreso.ec/quito/movilidad-y-ambiente-los-retos-que-pabel-munoz-mantiene-abiertos-en-quito-en-2026-269909.html'],
    vis: ['Vistazo · «Pabel Muñoz inscribe su candidatura a la reelección por una alianza ante suspensión de la Revolución Ciudadana» (6 de agosto de 2026)', 'https://www.vistazo.com/politica/2026-08-06-pabel-munoz-candidatura-reeleccion-alianza-suspension-revolucion-ciudadana-EE11150675'],
    tag: ['Teleamazonas · «No me siento cómodo en el Movimiento Amigo, ni en ningún otro» (2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/movimiento-amigo-pabel-munoz-precandidatura-121801/'],
    pam: ['Primicias · «Correísmo correrá por Amigo: Pabel Muñoz a la reelección» (27 de junio de 2026)', 'https://www.primicias.ec/politica/pabel-munoz-reeleccion-alcaldia-quito-alexandro-tonello-prefectura-pichincha-amigo-126543/'],
    tsu: ['Teleamazonas · «Pabel Muñoz irá por la reelección» (5 de agosto de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/pabel-munoz-confirma-reeleccion-alcaldia-quito-124637/'],
    pnc: ['Primicias · «Metro: Pabel Muñoz se distanció de la algarabía correísta e hizo un guiño a Noboa» (diciembre de 2023)', 'https://primicias.ec/noticias/quito/metro-quito-pabel-munoz-correismo-noboa'],
    ecr2: ['Expreso · «Correa responde a Pabel Muñoz: “Cualquiera puede declararse precandidato”» (2025)', 'https://www.expreso.ec/actualidad/politica/correa-responde-pabel-munoz-cualquiera-puede-declararse-precandidato-265834.html'],
    pno: ['Primicias · correísmo confirma a Pabel Muñoz y David Norero como sus candidatos (4 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/correismo-pabel-munoz-david-norero-candidatos-alcaldias-quito-guayaquil-129515/'],
    /* Romero */
    p23: ['Primicias · perfiles de candidatos a la Vicepresidencia 2023', 'https://primicias.ec/noticias/elecciones-presidenciales-2023/perfiles-candidatos-vicepresidencia-binomios'],
    ecs: ['El Comercio · «Partido Social Cristiano anuncia precandidatos para Quito» (2026)', 'https://www.elcomercio.com/actualidad/politica/partido-social-cristiano-anuncia-precandidatos-quito/'],
    t23: ['Teleamazonas · «Bolívar Armijos y Linda Romero es el segundo binomio que acepta su precandidatura» (8 de junio de 2023)', 'https://www.teleamazonas.com/bolivar-armijos-linda-romero-precandidatura/'],
    pan: ['Panamericana · Linda Romero tras el asesinato de Fernando Villavicencio (10 de agosto de 2023)', 'https://panamericana.pe/2023-en-24-horas/internacionales/387902-linda-romero-asesinato-fernando-villavicencio-debemos-urnas-mantener-democracia'],
    e4m: ['Expreso · «Quiénes son las cuatro mujeres que buscan convertirse en alcaldesa de Quito» (julio de 2026)', 'https://www.expreso.ec/quito/quienes-son-cuatro-mujeres-buscan-convertirse-alcaldesa-quito-287806.html'],
    /* Yunda */
    vy: ['Vistazo · «¿Quién es Jorge Yunda?»', 'https://www.vistazo.com/actualidad/quien-es-jorge-yunda-DEVI131046'],
    lhi: ['La Historia · perfil de Jorge Yunda (10 de abril de 2019)', 'https://www.lahistoria.ec/2019/04/10/yunda-de-guano-con-humor'],
    eco: ['El Universo · columna «El gato Yunda y la deliberación pública» (trayectoria: Conartel, Asamblea, 2019)', 'https://www.eluniverso.com/opinion/columnistas/el-gato-yunda-y-la-deliberacion-publica-nota/'],
    e1k: ['Expreso · audiencia de apelación del caso pruebas PCR (2026)', 'https://www.expreso.ec/actualidad/fiscalia-no-acudio-la-audiencia-de-jorge-yunda-por-las-pruebas-covid-276136.html'],
    erm: ['El Comercio · «Concejo de Quito vota a favor de la remoción de Jorge Yunda» (3 de junio de 2021)', 'https://www.elcomercio.com/actualidad/quito/concejo-metropolitano-vota-remocion-jorge-yunda/'],
    pgu: ['Primicias · Santiago Guarderas asume la Alcaldía tras el fallo de la Corte Constitucional (30 de septiembre de 2021)', 'https://primicias.ec/noticias/politica/santiago-guarderas-posesion-alcaldia-segunda-vez'],
    ed25: ['El Diario · «Corte Provincial ratifica inocencia de Jorge Yunda en caso de pruebas PCR» (22 de septiembre de 2025)', 'https://www.eldiario.ec/ecuador/corte-provincial-ratifica-inocencia-de-jorge-yunda-en-caso-de-pruebas-pcr-22092025/'],
    eap: ['El Comercio · «Fiscalía pide revocar inocencia de Jorge Yunda» (11 de agosto de 2026)', 'https://www.elcomercio.com/actualidad/seguridad/fiscalia-pide-revocar-inocencia-jorge-yunda-exalcalde-quito-caso-pruebas-pcr/'],
    e12: ['Expreso · los 12 precandidatos a la Alcaldía de Quito (2026)', 'https://www.expreso.ec/quito/quito-12-precandidatos-alcaldia-numero-ultimas-elecciones-288211.html']
  };
  const SRC = (...ids) => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(...src), lay(EV)) };

  /* ===================== GALO ALMEIDA · quito|0 ===================== */
  {
    const s = 'almeida';
    B('quito|0|origen', 'a1', CH1, ['hv', 'pri', 'eu', 'tam'], [
      { ch: 'a', fu: ['hv', 'pri'], m: [foto(F(s) + 'foto.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El estratega', b: 'Galo Vicente *Almeida Garzón*. Economista, con una especialización en cumplimiento y anticorrupción.' } },
      { ch: 'a', fu: ['eu', 'tam'], m: [foto(Dc(s) + 'sala.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Detrás de las campañas', b: 'Su oficio fue diseñar las campañas de otros: asesor político, comunicacional y *estratega electoral*.' } },
      { ch: 'a', fu: ['hv'], m: [card('Ministerio de Inclusión Económica y Social', 'Director de Articulación Territorial', 0, 20, 470, -1.5), card('Secretaría Técnica de Juventudes', 'Especialista de Planificación y Gestión Estratégica', 200, 200, 400, 2)],
        tx: { h: 'Cargos técnicos', b: 'Su hoja de vida registra puestos en el *MIES*, en la Secretaría de Juventudes y en el servicio público de pago de accidentes de tránsito.' } },
      { ch: 'a', fu: ['hv', 'pri'], ty: 380, m: [dt('2023', 260)],
        tx: { h: 'Último cargo registrado', b: 'Técnico operativo en el *Municipio de Guayaquil*. Es el único de sus cargos con año en los registros.' } }
    ]);
    B('quito|0|tray', 'a2', CH2, ['hv', 'pri', 'eu', 'prj'], [
      { ch: 'a', fu: ['pri', 'hv'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K2, h: 'Sin cargos de elección', b: 'Su hoja de vida no registra cargos de elección popular. Su trabajo visible está en la *organización política*.' } },
      { ch: 'a', fu: ['eu'], m: [card('Centro Democrático', 'Presidente nacional del movimiento', 0, 40, 470, -2)],
        tx: { h: 'Al frente del partido', b: 'Preside *Centro Democrático* a nivel nacional, el movimiento que fundó el exprefecto del Guayas Jimmy Jairala.' } },
      { ch: 'a', fu: ['prj'], ty: 380, m: [wd('Sin su fundador', 120, -3)],
        tx: { kk: '2025', b: 'Tras las presidenciales, *Jimmy Jairala* anunció que dejaba Centro Democrático. Almeida conduce el partido después de esa salida.' }, n: 'Sin su fundador. En 2025, tras las presidenciales, Jimmy Jairala anunció que dejaba Centro Democrático. Almeida conduce el partido después de esa salida.' }
    ]);
    B('quito|0|exp', 'a3', CH3, ['prc', 'tgp', 'ecd', 'cons'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'mural.webp', 60, 0, 540, 1.5)],
        tx: { kk: K3, h: 'Lista 1', b: 'Llega por *Centro Democrático*, el movimiento que él mismo dirige.' } },
      { ch: 'a', fu: ['prc'], ty: 380, m: [wd('Primero, Yunda', 120, 2)],
        tx: { kk: 'Julio de 2026', b: 'Antes de anunciarlo, Centro Democrático conversó con *Jorge Yunda*. Al final, la carta fue Almeida.' }, n: 'Primero, Yunda. En julio de 2026, antes de anunciarlo, Centro Democrático conversó con Jorge Yunda. Al final, la carta fue Almeida.' },
      { ch: 'a', fu: ['tgp'], m: [plan(s)],
        tx: { h: '«Una forma diferente de hacer política»', b: 'Es la promesa con la que abre su *plan de gobierno* 2027–2031.' } },
      { ch: 'a', fu: ['ecd'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: '22 de noviembre de 2026 · debate del CNE', h: 'En el debate', b: 'Propuso un complejo ambiental para procesar hasta *3.000 toneladas* de basura y más coordinación con la Policía.' } },
      cons('a')
    ]);
  }

  /* ===================== HAROLD BURBANO · quito|1 ===================== */
  {
    const s = 'burbano';
    B('quito|1|origen', 'b1', CH1, ['pbu', 'pmi', 'vbu', 'tam', 'hv'], [
      { ch: 'a', fu: ['pbu', 'hv'], m: [foto(F(s) + 'foto.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El abogado de los derechos', b: 'Harold Andrés *Burbano Villarreal*. Abogado y licenciado en Ciencias Jurídicas por la Universidad Católica.' } },
      { ch: 'a', fu: ['pbu', 'pmi'], m: [card('Universidad Nacional de San Martín · Argentina', 'Maestría en Derechos Humanos y Democratización', 0, 30, 560, -1.5), card('Inredh', 'Coordinador legal', 300, 220, 300, 2)],
        tx: { h: 'Derechos humanos', b: 'Se especializó en derechos humanos y fue coordinador legal de *Inredh*, una organización jurídica de derechos humanos.' } },
      { ch: 'a', fu: ['tam', 'vbu'], m: [card('Conaie', 'Confederación de Nacionalidades Indígenas del Ecuador', 0, 40, 470, 2)],
        tx: { h: 'Asesor jurídico', b: 'Fue asesor jurídico de la principal organización del *movimiento indígena*.' } },
      { ch: 'a', fu: ['pbu', 'pmi'], m: [card('Defensoría del Pueblo', 'Coordinador general de Protección de Derechos', 0, 20, 460, -2), card('Viceministerios', 'Inclusión Social · Inclusión Económica', 220, 210, 360, 1.5)],
        tx: { h: 'De la Defensoría al Ejecutivo', b: 'Coordinó la protección de derechos en la *Defensoría del Pueblo* y fue viceministro de Inclusión Social y luego de Inclusión Económica.' } }
    ]);
    B('quito|1|tray', 'b2', CH2, ['eu', 'exn', 'mdt', 'pjl', 'psm', 'prm', 'pv1', 'ev1', 'pv2', 'pv3'], [
      { ch: 'a', fu: ['eu'], m: [foto(Dc(s) + 'mesa.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Dos ministerios en 16 meses', b: 'Ocupó dos carteras del Gobierno de *Daniel Noboa* entre febrero de 2025 y junio de 2026.' } },
      { ch: 'a', fu: ['eu'], m: [card('Ministerio de Inclusión Económica y Social', 'Hoy Ministerio de Desarrollo Humano', 0, 40, 520, -2)],
        tx: { kk: 'Febrero–noviembre de 2025', h: 'Ministro de Inclusión', b: 'Dirigió el *MIES*, que en ese tiempo pasó a llamarse Ministerio de Desarrollo Humano.' } },
      { ch: 'a', fu: ['exn'], ty: 380, m: [dt('18.11.2025', 165)],
        tx: { h: 'Ministro del Trabajo', b: 'Asumió tras la salida de Ivonne Núñez, en los cambios de Gabinete posteriores a la *consulta popular*.' }, n: 'Dieciocho de noviembre de 2025. Ministro del Trabajo: asumió tras la salida de Ivonne Núñez, en los cambios de Gabinete posteriores a la consulta popular.' },
      { ch: 'a', fu: ['mdt', 'pjl', 'psm'], m: [card('Acuerdo Ministerial MDT-2026-059', 'Jornadas y horarios especiales', 0, 40, 520, 1.5)],
        tx: { h: 'La jornada de 10 horas', b: 'Desde marzo de 2026, el acuerdo permite repartir las 40 horas semanales en jornadas de hasta *10 horas*, en cinco días. Los sindicatos marcharon en contra; Burbano sostuvo que no elimina derechos.' } },
      { ch: 'a', fu: ['prm'], ty: 380, m: [wd('La denuncia', 130, -2)],
        tx: { kk: 'Noviembre de 2025', b: 'Un exdirector regional del Ministerio lo acusó ante la Asamblea de presionarlo para levantar el impedimento de *Álvaro Rosero*. Burbano compareció y explicó el proceso.' }, n: 'La denuncia. En noviembre de 2025, un exdirector regional del Ministerio lo acusó ante la Asamblea de presionarlo para levantar el impedimento de Álvaro Rosero. Burbano compareció y explicó el proceso.' },
      { ch: 'a', fu: ['pv1', 'ev1', 'pv2', 'pv3'], m: [card('Impedimento para ejercer cargo público', 'Caso Alexandra Villacís · Consejo de la Judicatura', 0, 40, 540, -1.5)],
        tx: { h: 'El caso Villacís', b: 'Una jueza ordenó corregir en 24 horas el impedimento de la vocal suplente. Burbano llamó al fallo *inejecutable*: el Ministerio, dijo, solo es un repositorio. Se levantó seis días después de su renuncia.' } }
    ]);
    B('quito|1|exp', 'b3', CH3, ['eu', 'exg', 'kch', 'ecb', 'cons'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'campana.webp', 60, 0, 540, 1.5)],
        tx: { kk: K3, h: 'La carta de ADN', b: 'Llega por *Acción Democrática Nacional*, el movimiento del presidente Daniel Noboa, con la lista 7.' } },
      { ch: 'a', fu: ['eu', 'exg'], ty: 380, m: [dt('Junio 2026', 170)],
        tx: { h: 'Renuncia al Ministerio', b: 'Dejó el Ministerio del Trabajo para postularse. Lo reemplazó *Cynthia Gellibert*.' }, n: 'Junio de 2026. Renuncia al Ministerio: dejó el Ministerio del Trabajo para postularse. Lo reemplazó Cynthia Gellibert.' },
      { ch: 'a', fu: ['kch', 'ecb'], m: [card('Alcaldía de Quito', 'Primero: Giovanna Ubidia', 0, 20, 400, -2), card('Prefectura de Pichincha', 'Primero: Harold Burbano', 200, 200, 400, 2)],
        tx: { h: 'Cambio de casillas', b: 'ADN había presentado a *Giovanna Ubidia* para Quito y a Burbano para la Prefectura. Luego los intercambió.' } },
      { ch: 'a', fu: ['ecb'], ty: 380, m: [dt('2.08.2026', 165)],
        tx: { h: 'Inscrito', b: 'ADN inscribió su candidatura ante el CNE; Ubidia va por la *Prefectura de Pichincha*.' }, n: 'Dos de agosto de 2026. Inscrito: ADN inscribió su candidatura ante el CNE; Ubidia va por la Prefectura de Pichincha.' },
      cons('a')
    ]);
  }

  /* ===================== PAÚL DESAMBLANC · quito|2 ===================== */
  {
    const s = 'desamblanc';
    B('quito|2|origen', 'd1', CH1, ['hv', 'pri', 'tam'], [
      { ch: 'a', fu: ['hv', 'pri'], m: [foto(F(s) + 'foto.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El procesalista', b: 'Paúl *Desamblanc Cañadas*. Abogado de los tribunales y magíster en Derecho Procesal.' } },
      { ch: 'a', fu: ['tam'], m: [foto(Dc(s) + 'balon.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Abogado y empresario', b: 'Así lo presenta Teleamazonas. Antes de 2021, su hoja de vida no registra *cargos públicos*.' } },
      { ch: 'a', fu: ['hv'], m: [card('Hoja de vida inscrita en el CNE', 'Formación: abogado · magíster en Derecho Procesal', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { h: 'Lo que no dice', b: 'Los registros no indican universidades ni años de sus títulos.' } }
    ]);
    B('quito|2|tray', 'd2', CH2, ['ecp', 'cg1', 'cg2', 'cg3'], [
      { ch: 'a', fu: ['ecp'], m: [foto(Dc(s) + 'puno.webp', 60, 0, 520, -1.5)],
        tx: { kk: K2, h: 'Un solo cargo', b: 'Su experiencia pública es una curul en el *Parlamento Andino*, de 2021 a 2025.' } },
      { ch: 'a', fu: ['ecp'], ty: 380, m: [dt('19.05.2021', 165)],
        tx: { h: 'Posesionado', b: 'La Asamblea posesionó a los cinco representantes de Ecuador ante el Parlamento Andino. Él era el de la *Izquierda Democrática*.' }, n: 'Diecinueve de mayo de 2021. Posesionado: la Asamblea posesionó a los cinco representantes de Ecuador ante el Parlamento Andino. Él era el de la Izquierda Democrática.' },
      { ch: 'a', fu: ['cg1'], m: [card('Parlamento Andino', 'Vicepresidente por Ecuador', 0, 40, 440, 2)],
        tx: { h: 'Vicepresidente', b: 'En 2021 ejerció la *vicepresidencia* del Parlamento Andino en representación del país.' } },
      { ch: 'a', fu: ['cg2'], ty: 380, m: [wd('COP26', 170, -2)],
        tx: { kk: 'Noviembre de 2021', b: 'En la cumbre climática expuso sobre un *Pacto Andino* para proteger la naturaleza.' }, n: 'COP26. En noviembre de 2021, en la cumbre climática, expuso sobre un Pacto Andino para proteger la naturaleza.' },
      { ch: 'a', fu: ['cg3'], m: [card('Comisión Especial de Fiscalización y Control Político', 'Órganos del Sistema Andino de Integración', 0, 40, 560, -1.5)],
        tx: { h: 'Fiscalizar la integración', b: 'Presidió esta comisión e informó al pleno sobre el control a los *organismos andinos*.' } }
    ]);
    B('quito|2|exp', 'd3', CH3, ['kcr', 'prc', 'ecd', 'pdd', 'cons'], [
      { ch: 'a', fu: ['prc'], m: [foto(Dc(s) + 'puno.webp', 60, 0, 520, 1.5)],
        tx: { kk: K3, h: 'Lista 20', b: 'Llega por *Futuro*, el movimiento que antes se llamaba Democracia Sí.' } },
      { ch: 'a', fu: ['kcr', 'prc'], ty: 380, m: [wd('Contra su partido', 96, -3)],
        tx: { kk: '2024', b: 'Siendo parlamentario de la Izquierda Democrática, objetó ante el TCE la candidatura presidencial de *Carlos Rabascall*, inscrita por su propio partido.' }, n: 'Contra su partido. En 2024, siendo parlamentario de la Izquierda Democrática, objetó ante el TCE la candidatura presidencial de Carlos Rabascall, inscrita por su propio partido.' },
      { ch: 'a', fu: ['prc'], ty: 380, m: [dt('3.07.2026', 165)],
        tx: { h: 'Primarias de Futuro', b: 'El movimiento confirmó que en sus primarias resolvió competir por Quito con él. Hasta poco antes había militado en la *ID*.' }, n: 'Tres de julio de 2026. Primarias de Futuro: el movimiento confirmó que en sus primarias resolvió competir por Quito con él. Hasta poco antes había militado en la ID.' },
      { ch: 'a', fu: ['ecd', 'pdd'], m: [foto(Dc(s) + 'balon.webp', 60, 0, 540, -1.5)],
        tx: { kk: '22 de noviembre de 2026 · debate del CNE', h: 'En el debate', b: 'Ofreció construir un *Aerómetro*, sin precisar su recorrido, y auditar las finanzas y el personal municipal para prevenir el nepotismo.' } },
      cons('a')
    ]);
  }

  /* ===================== CÉSAR DÍAZ · quito|3 ===================== */
  {
    const s = 'diaz';
    B('quito|3|origen', 'c1', CH1, ['exc', 'hv'], [
      { ch: 'a', fu: ['exc'], m: [foto(Dc(s) + 'retrato.webp', 170, -60, 340, -2.5)], ty: 510,
        tx: { kk: K1, h: 'El veterano del Cenepa', b: 'César Rodrigo *Díaz Álvarez*. Combatió en la guerra del Cenepa, en 1995, y perdió una pierna en el combate.' } },
      { ch: 'a', fu: ['exc'], m: [card('Cruz al Mérito de Guerra', 'Reconocimiento como veterano del Cenepa', 0, 40, 480, 2)],
        tx: { h: 'Condecorado', b: 'Recibió la *Cruz al Mérito de Guerra* por su servicio en ese conflicto.' } },
      { ch: 'a', fu: ['exc', 'hv'], m: [card('Escuela Politécnica del Ejército', 'Ingeniería Comercial', 0, 20, 440, -2), card('Universidad de Buenos Aires', 'Magíster en Conducción y Administración', 200, 200, 400, 1.5)],
        tx: { h: 'Ingeniero comercial', b: 'Estudió en la Politécnica del Ejército y obtuvo su maestría en la *Universidad de Buenos Aires*.' } },
      { ch: 'a', fu: ['exc'], m: [card('IESS', 'Instituto Ecuatoriano de Seguridad Social', 0, 20, 400, 1.5), card('Consejo Nacional de Electricidad', '', 200, 200, 400, -2)],
        tx: { h: 'Antes del Municipio', b: 'Trabajó en el *IESS* y en el Consejo Nacional de Electricidad. Las fuentes no precisan cargos ni años.' } }
    ]);
    B('quito|3|tray', 'c2', CH2, ['ac1', 'ac2', 'ecc', 'pme', 'ecr', 'prr', 'hv'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K2, h: 'La casa por dentro', b: 'Toda su gestión pública documentada está en el *Municipio de Quito*.' } },
      { ch: 'a', fu: ['ac1'], m: [card('Secretaría General de Seguridad y Gobernabilidad', 'Municipio del Distrito Metropolitano de Quito', 0, 40, 560, -1.5)],
        tx: { kk: '2020 · alcaldía de Jorge Yunda', h: 'Secretario de Seguridad', b: 'En abril de 2020 ya informaba al Concejo sobre las acciones municipales ante la *pandemia*.' } },
      { ch: 'a', fu: ['ecc'], m: [card('COE Metropolitano', 'Presidente', 0, 40, 400, 2)],
        tx: { h: 'Al frente del COE', b: 'Presidió el Comité de Operaciones de Emergencia de Quito: aforos, operativos y pedidos al *COE Nacional*.' } },
      { ch: 'a', fu: ['ac2'], ty: 380, m: [dt('702', 300)],
        tx: { h: 'operativos', b: 'había realizado la Secretaría hasta el 4 de mayo de 2020, según informó a la *Comisión de Seguridad*.' }, n: 'Setecientos dos operativos había realizado la Secretaría hasta el 4 de mayo de 2020, según informó a la Comisión de Seguridad.' },
      { ch: 'a', fu: ['pme'], m: [card('Plan Metropolitano de Seguridad Ciudadana y Convivencia Social Pacífica', 'Secretaría General de Seguridad y Gobernabilidad · 2020', 0, 40, 560, -1)],
        tx: { h: 'Un plan con su firma', b: 'La Secretaría desarrolló el plan metropolitano de seguridad; su nombre figura en la portada junto al de *Yunda*.' } },
      { ch: 'a', fu: ['ecr', 'prr'], ty: 380, m: [dt('8.07.2021', 165)],
        tx: { h: 'Salida y regreso', b: 'Yunda le pidió la renuncia «sin explicación ni razón alguna», dijo Díaz. El *4 de agosto* lo volvió a nombrar.' }, n: 'Ocho de julio de 2021. Salida y regreso: Yunda le pidió la renuncia «sin explicación ni razón alguna», dijo Díaz. El 4 de agosto lo volvió a nombrar.' },
      { ch: 'a', fu: ['hv'], m: [card('Agencia de Coordinación Distrital del Comercio', 'Coordinador', 0, 20, 470, 1.5), card('Funcionario directivo 2', 'Municipio de Quito · 2022', 220, 200, 380, -2)],
        tx: { h: 'Último cargo: 2022', b: 'Su hoja de vida suma la coordinación de la *Agencia del Comercio* y un cargo directivo municipal.' } }
    ]);
    B('quito|3|exp', 'c3', CH3, ['exc', 'ex13', 'ecd', 'cons'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'caminata.webp', 60, -20, 540, 1.5)],
        tx: { kk: K3, h: 'Lista 4', b: 'Llega por *Pueblo, Igualdad y Democracia*, con un plan que empieza por la seguridad.' } },
      { ch: 'a', fu: ['exc'], ty: 380, m: [dt('2007', 280)],
        tx: { h: 'Primera papeleta', b: 'Fue candidato a la Asamblea Constituyente por el Movimiento Independiente *Justo y Solidario*.' } },
      { ch: 'a', fu: ['ex13'], ty: 380, m: [dt('N.º 13', 240)],
        tx: { kk: '11 de julio de 2026', b: 'Aceptó su precandidatura ante el CNE cuando ya había *12 aspirantes* anunciados.' }, n: 'Número 13. El 11 de julio de 2026 aceptó su precandidatura ante el CNE, cuando ya había 12 aspirantes anunciados.' },
      { ch: 'a', fu: ['ecd'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: '22 de noviembre de 2026 · debate del CNE', h: 'En el debate', b: 'Propuso *cinco estaciones de seguridad* en las entradas y salidas de Quito, financiadas con una tasa de seguridad.' } },
      cons('a')
    ]);
  }

  /* ===================== BERNARDO JIJÓN · quito|4 ===================== */
  {
    const s = 'jijon';
    B('quito|4|origen', 'j1', CH1, ['eu', 'hv', 'fla', 'tam'], [
      { ch: 'a', fu: ['eu', 'hv'], m: [foto(F(s) + 'foto.webp', 160, -50, 360, -2.5)], ty: 510,
        tx: { kk: K1, h: 'Abogado e influencer', b: 'Bernardo Felipe *Jijón Nankervis*. Abogado de los tribunales, especializado en asesoría empresarial.' } },
      { ch: 'a', fu: ['eu'], ty: 380, m: [dt('2021', 280)],
        tx: { h: 'Lucha Anticorrupción', b: 'Ese año creó la fundación *Lucha Anticorrupción*.' }, n: 'En 2021 creó la fundación Lucha Anticorrupción.' },
      { ch: 'a', fu: ['fla'], m: [card('Examen Periódico Universal · ONU', 'Desempeño del Ecuador en el combate contra la corrupción 2017–2021', 0, 40, 560, -1.5)],
        tx: { h: 'Un informe ante la ONU', b: 'Con *Juan Esteban Guarderas*, firmó por la fundación un informe sobre corrupción para el examen de Ecuador en Naciones Unidas.' } },
      { ch: 'a', fu: ['eu', 'tam'], m: [card('Libertad Ecuador', 'Colectivo', 0, 40, 420, 2)],
        tx: { h: 'Activismo en redes', b: 'En el colectivo Libertad Ecuador se desempeña como *influencer*.' } }
    ]);
    B('quito|4|tray', 'j2', CH2, ['hv', 'tam'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Del agua al control social', b: 'Su hoja de vida registra *dos cargos públicos*.' } },
      { ch: 'a', fu: ['hv'], m: [card('EPMAPS', 'Empresa Pública Metropolitana de Agua Potable y Saneamiento · Profesional', 0, 40, 520, -2)],
        tx: { h: 'En la empresa del agua', b: 'Trabajó como profesional en la empresa municipal de *agua potable*. Los registros no indican el año.' } },
      { ch: 'a', fu: ['tam', 'hv'], m: [card('Consejo de Participación Ciudadana y Control Social', 'Subcoordinador Nacional de Patrocinio', 0, 40, 540, 1.5, { stamp: '2025' })],
        tx: { h: 'En el CPCCS', b: 'Su último cargo fue en el organismo que designa autoridades de control y promueve la *participación ciudadana*.' } }
    ]);
    B('quito|4|exp', 'j3', CH3, ['ppk', 'pin', 'plan', 'eu', 'ecd', 'vsd', 'cons'], [
      { ch: 'a', fu: ['eu'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 3', b: 'Llega por *Sociedad Patriótica*, el partido del expresidente Lucio Gutiérrez.' } },
      { ch: 'a', fu: ['ppk'], ty: 380, m: [wd('El primer nombre', 100, 2)],
        tx: { kk: 'Abril–julio de 2026', b: 'Sociedad Patriótica había presentado primero a *Alejandro Guevara*, que en julio apareció como precandidato de Pachakutik.' }, n: 'El primer nombre. Entre abril y julio de 2026, Sociedad Patriótica había presentado primero a Alejandro Guevara, que en julio apareció como precandidato de Pachakutik.' },
      { ch: 'a', fu: ['pin', 'plan'], m: [plan(s)],
        tx: { kk: 'Agosto de 2026', h: 'La confirmación', b: '*Lucio Gutiérrez* anunció que su carta para Quito era Jijón. Su plan de trabajo está fechado el 5 de agosto.' } },
      { ch: 'a', fu: ['ecd', 'vsd'], m: [foto(Dc(s) + 'retrato.webp', 60, 0, 520, 1.5)],
        tx: { kk: '22 de noviembre de 2026 · debate del CNE', h: 'En el debate', b: 'Planteó reestructurar el Municipio, reducir su personal, *concesionar* servicios delegables y recortar el gasto en publicidad.' } },
      cons('a')
    ]);
  }

  /* ===================== CARLA LARREA · quito|5 ===================== */
  {
    const s = 'larrea';
    B('quito|5|origen', 'l1', CH1, ['t25', 'p25', 'eu', 'hv'], [
      { ch: 'a', fu: ['t25', 'p25'], m: [foto(F(s) + 'foto.webp', 170, -50, 340, -2.5)], ty: 510,
        tx: { kk: K1, h: 'Ingeniera comercial', b: 'Carla Fernanda *Larrea Falconí*. Quiteña, ingeniera comercial por la Universidad Internacional del Ecuador.' } },
      { ch: 'a', fu: ['eu', 'p25'], m: [card('Petróleo · flores · comunicación', 'Sectores de su experiencia profesional', 0, 40, 500, -1.5)],
        tx: { h: 'Tres industrias', b: 'Antes de la política trabajó en los sectores *petrolero, florícola* y de comunicación social e institucional.' } },
      { ch: 'a', fu: ['hv'], m: [card('RTVEcuador', 'Conductora de televisión', 0, 20, 400, 2), card('Superintendencia de Compañías', 'Asistente ejecutiva', 200, 200, 400, -2)],
        tx: { h: 'Dos instituciones públicas', b: 'Fue conductora en la televisión pública y asistente ejecutiva en la *Superintendencia de Compañías*.' } }
    ]);
    B('quito|5|tray', 'l2', CH2, ['hv', 'pri', 'pcu', 'pdb', 'eu'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K2, h: 'De asesora a candidata', b: 'Su paso por lo público combina la *Asamblea Nacional* y una candidatura presidencial.' } },
      { ch: 'a', fu: ['hv', 'pri'], ty: 380, m: [dt('2026', 280)],
        tx: { h: 'Asesora legislativa', b: 'Su último cargo registrado es de *asesora* en la Asamblea Nacional; antes tuvo otro de menor nivel.' }, n: 'Dos mil veintiséis. Asesora legislativa: su último cargo registrado es de asesora en la Asamblea Nacional; antes tuvo otro de menor nivel.' },
      { ch: 'a', fu: ['pcu'], m: [card('Construye', 'Binomio Henry Cucalón · Carla Larrea', 0, 40, 480, 1.5)],
        tx: { kk: '15 de agosto de 2024', h: 'Binomio presidencial', b: 'Construye la proclamó compañera de fórmula de *Henry Cucalón*, exministro de Gobierno.' } },
      { ch: 'a', fu: ['pdb'], ty: 380, m: [wd('Empleo', 170, -2)],
        tx: { kk: 'Elecciones de 2025', b: 'En el debate vicepresidencial dijo que su tarea sería *generar empleo* y atraer inversión extranjera.' }, n: 'Empleo. En el debate vicepresidencial de 2025 dijo que su tarea sería generar empleo y atraer inversión extranjera.' },
      { ch: 'a', fu: ['eu'], m: [card('Movimiento Construye', 'Extinto', 0, 40, 420, -2)],
        tx: { h: 'Un movimiento que ya no existe', b: 'Construye, el movimiento de aquella candidatura, hoy está *extinto*.' } }
    ]);
    B('quito|5|exp', 'l3', CH3, ['pcr', 'tam', 'plan', 'cons'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'creo.webp', 60, -20, 540, 1.5)],
        tx: { kk: K3, h: 'Lista 21', b: 'Llega por *Creo*, Creando Oportunidades.' } },
      { ch: 'a', fu: ['pcr'], ty: 380, m: [dt('Julio 2026', 170)],
        tx: { h: 'Precandidata', b: 'Creo la definió como su carta para la *Alcaldía de Quito*.' }, n: 'Julio de 2026. Precandidata: Creo la definió como su carta para la Alcaldía de Quito.' },
      { ch: 'a', fu: ['tam', 'plan'], m: [plan(s)],
        tx: { h: 'Nueve ejes, 41 proyectos', b: 'Así organiza su plan, todo dentro de las *competencias municipales*.' } },
      cons('a')
    ]);
  }

  /* ===================== PABEL MUÑOZ · quito|7 ===================== */
  {
    const s = 'munoz';
    B('quito|7|origen', 'm1', CH1, ['cid'], [
      { ch: 'a', fu: ['cid'], m: [foto(F(s) + 'foto.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El sociólogo', b: 'Christian Pabel *Muñoz López*. Quiteño, nacido en 1975, sociólogo y politólogo por la PUCE.' } },
      { ch: 'a', fu: ['cid'], m: [card('Universidad de Buenos Aires', 'Doctorado en Ciencias Sociales · en curso desde 2016', 0, 40, 520, -1.5)],
        tx: { h: 'Académico', b: 'Dio clases en la PUCE, *Flacso* y la Universidad Andina Simón Bolívar.' } },
      { ch: 'a', fu: ['cid'], m: [card('Senplades', 'Secretaría Nacional de Planificación y Desarrollo', 0, 40, 500, 2)],
        tx: { kk: '2007–2015', h: 'El planificador', b: 'Entró al Gobierno de Rafael Correa en 2007. En la Senplades ayudó a diseñar las *zonas de planificación* del país.' } },
      { ch: 'a', fu: ['cid'], ty: 380, m: [dt('2013', 280)],
        tx: { h: 'Secretario nacional', b: 'Después de pasar por la Planificación de Quito y el *MIES*, llegó a dirigir la Senplades, con rango de ministro.' }, n: 'Dos mil trece. Secretario nacional: después de pasar por la Planificación de Quito y el MIES, llegó a dirigir la Senplades, con rango de ministro.' }
    ]);
    B('quito|7|tray', 'm2', CH2, ['cid', 'pmt', 'p5a', 'prt', 'e24', 'prv', 'e26'], [
      { ch: 'a', fu: ['cid'], m: [foto(Dc(s) + 'tribuna.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Asambleísta', b: 'Elegido por el distrito 1 de Pichincha en 2017 y reelegido en 2021. Dejó la curul en 2022 para competir por *Quito*.' } },
      { ch: 'a', fu: ['cid'], ty: 380, m: [dt('25,2 %', 250)],
        tx: { h: 'Alcalde', b: 'Con ese porcentaje ganó la Alcaldía el 5 de febrero de 2023, por la *Revolución Ciudadana*.' }, n: 'Veinticinco coma dos por ciento. Con ese porcentaje ganó la Alcaldía el 5 de febrero de 2023, por la Revolución Ciudadana.' },
      { ch: 'a', fu: ['pmt', 'p5a', 'prt'], m: [card('Metro de Quito', 'Operación comercial desde el 1 de diciembre de 2023', 0, 40, 520, -1.5)],
        tx: { h: 'El Metro arranca', b: 'Fue obra de *cinco alcaldías*; en la suya empezó la operación comercial, que él considera lo más importante de su gestión.' } },
      { ch: 'a', fu: ['e24'], ty: 380, m: [dt('60', 300)],
        tx: { h: 'trolebuses eléctricos', b: 'compró su administración. Hubo objeciones al proceso; él respondió que algunos «le quisieron ver *todos los peros*».' }, n: 'Sesenta trolebuses eléctricos compró su administración. Hubo objeciones al proceso; él respondió que algunos «le quisieron ver todos los peros».' },
      { ch: 'a', fu: ['prv'], m: [card('Revocatoria del mandato', 'Proceso contra el alcalde · 2025', 0, 40, 460, 2, { stamp: 'No prosperó' })],
        tx: { h: 'La revocatoria', b: 'En 2025 enfrentó un pedido para *revocarle el mandato*.' } },
      { ch: 'a', fu: ['e26'], ty: 380, m: [wd('Pendientes', 150, -2)],
        tx: { b: 'La prensa le marca deudas en la *gestión de la basura*, la descontaminación del Machángara y el transporte.' }, n: 'Pendientes. La prensa le marca deudas en la gestión de la basura, la descontaminación del Machángara y el transporte.' }
    ]);
    B('quito|7|exp', 'm3', CH3, ['vis', 'tag', 'pam', 'tsu', 'pno', 'pnc', 'ecr2', 'cons'], [
      { ch: 'a', fu: ['vis'], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, 1.5)],
        tx: { kk: K3, h: 'Listas 2-17-70', b: 'Busca la reelección por la *Alianza Ciudadana*: Unidad Popular, Partido Socialista y el movimiento Todos.' } },
      { ch: 'a', fu: ['vis', 'tsu'], m: [card('Revolución Ciudadana', 'Suspendida · sin capacidad de inscribir candidatos', 0, 40, 520, -2)],
        tx: { h: 'El partido suspendido', b: 'La organización en la que militó casi dos décadas no puede inscribir candidatos; el movimiento *Amigo* también fue sancionado.' } },
      { ch: 'a', fu: ['pam', 'tag'], ty: 380, m: [dt('27.06.2026', 165)],
        tx: { h: 'Primero, Amigo', b: 'Fue designado precandidato por ese movimiento. «No me siento a gusto», dijo sobre la sigla.' }, n: 'Veintisiete de junio de 2026. Primero, Amigo: fue designado precandidato por ese movimiento. «No me siento a gusto», dijo sobre la sigla.' },
      { ch: 'a', fu: ['vis', 'pno'], ty: 380, m: [dt('6.08.2026', 165)],
        tx: { h: 'Inscrito', b: 'Inscribió su candidatura con la alianza; la *Revolución Ciudadana* lo presenta como su candidato en Quito.' }, n: 'Seis de agosto de 2026. Inscrito: inscribió su candidatura con la alianza; la Revolución Ciudadana lo presenta como su candidato en Quito.' },
      { ch: 'a', fu: ['pnc', 'ecr2'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 520, -1.5)],
        tx: { h: 'Con Correa, a distancia', b: 'En el arranque del Metro tomó distancia del discurso correísta. *Rafael Correa* le respondió en público: «Cualquiera puede declararse precandidato».' } },
      cons('a')
    ]);
  }

  /* ===================== LINDA ROMERO · quito|8 ===================== */
  {
    const s = 'romero';
    B('quito|8|origen', 'r1', CH1, ['p23', 'eu', 'ecs', 'tam', 'hv', 'pri'], [
      { ch: 'a', fu: ['p23', 'eu'], m: [foto(F(s) + 'foto.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La comunicadora', b: 'Linda Diana *Romero Espinoza*. Nació en Cuenca; es comunicadora social y consultora política.' } },
      { ch: 'a', fu: ['ecs', 'eu'], m: [card('Producción y dirección de televisión', 'Consultoría en comunicación política · conferencias', 0, 40, 520, 1.5)],
        tx: { h: 'Detrás de cámaras', b: 'Ha sido *productora y directora* de televisión, conferencista y consultora en comunicación política.' } },
      { ch: 'a', fu: ['tam', 'ecs'], m: [card('Mujeres Reales', 'Fundación', 0, 40, 420, -2)],
        tx: { h: 'Mujeres Reales', b: 'Preside esta *fundación* dedicada a mujeres.' } },
      { ch: 'a', fu: ['hv', 'pri'], m: [card('Hoja de vida inscrita en el CNE', 'Formación: no registra · Cargos públicos: no registra', 0, 40, 520, 1.5, { fx: 'hv' })],
        tx: { h: 'Lo que registra el CNE', b: 'Su hoja de vida inscrita no registra *títulos académicos* ni cargos públicos previos.' } }
    ]);
    B('quito|8|tray', 'r2', CH2, ['t23', 'p23', 'pan'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K2, h: 'Primera temporada', b: 'Su recorrido público está en las *campañas*, no en la administración.' } },
      { ch: 'a', fu: ['t23', 'p23'], ty: 380, m: [dt('8.06.2023', 165)],
        tx: { h: 'Binomio presidencial', b: 'Aceptó ser compañera de fórmula de *Bolívar Armijos*, del movimiento Amigo, en las elecciones anticipadas.' }, n: 'Ocho de junio de 2023. Binomio presidencial: aceptó ser compañera de fórmula de Bolívar Armijos, del movimiento Amigo, en las elecciones anticipadas.' },
      { ch: 'a', fu: ['pan'], ty: 380, m: [wd('Ir a las urnas', 130, -2)],
        tx: { kk: 'Agosto de 2023', b: 'Tras el asesinato del candidato *Fernando Villavicencio*, pidió votar para sostener la democracia.' }, n: 'Ir a las urnas. En agosto de 2023, tras el asesinato del candidato Fernando Villavicencio, pidió votar para sostener la democracia.' }
    ]);
    B('quito|8|exp', 'r3', CH3, ['eu', 'e4m', 'plan', 'cons'], [
      { ch: 'a', fu: ['eu'], m: [foto(Dc(s) + 'equipo.webp', 60, 0, 540, 1.5)],
        tx: { kk: K3, h: 'Lista 6', b: 'Llega por el *Partido Social Cristiano*. Su candidatura anterior fue por Amigo.' } },
      { ch: 'a', fu: ['e4m'], ty: 380, m: [dt('Julio 2026', 170)],
        tx: { h: 'Primarias del PSC', b: 'El partido la oficializó como precandidata en su *proceso interno*.' }, n: 'Julio de 2026. Primarias del PSC: el partido la oficializó como precandidata en su proceso interno.' },
      { ch: 'a', fu: ['plan'], m: [plan(s)],
        tx: { h: 'El plan', b: 'Su plan de trabajo, inscrito en el CNE, cubre el período *2027–2031*.' } },
      cons('a')
    ]);
  }

  /* ===================== JORGE YUNDA · quito|9 ===================== */
  {
    const s = 'yunda';
    B('quito|9|origen', 'y1', CH1, ['lhi', 'vy'], [
      { ch: 'a', fu: ['lhi', 'vy'], m: [foto(F(s) + 'g1.webp', 170, -60, 330, -2.5)], ty: 520,
        tx: { kk: K1, h: 'Médico, locutor y músico', b: 'Jorge Homero *Yunda Machado*. Nació en Guano, Chimborazo, y se graduó de médico cirujano en la Universidad Central.' } },
      { ch: 'a', fu: ['vy'], m: [foto(Dc(s) + 'medico.webp', 60, 0, 540, 1.5)],
        tx: { h: 'En los hospitales públicos', b: 'Ejerció la medicina en hospitales de Quito, entre ellos la maternidad *Isidro Ayora*.' } },
      { ch: 'a', fu: ['vy', 'lhi'], ty: 380, m: [wd('Loro Homero', 130, -2)],
        tx: { b: 'Con ese seudónimo se hizo conocido en la radio. Levantó la marca *Canela*, una de las más escuchadas del país.' }, n: 'Loro Homero. Con ese seudónimo se hizo conocido en la radio. Levantó la marca Canela, una de las más escuchadas del país.' }
    ]);
    B('quito|9|tray', 'y2', CH2, ['eco', 'vy', 'e1k', 'erm', 'pgu', 'ed25', 'eap'], [
      { ch: 'a', fu: ['eco', 'vy'], m: [card('Conartel', 'Consejo Nacional de Radio y Televisión · presidente', 0, 40, 520, -1.5, { stamp: '2007–2009' })],
        tx: { kk: K2, h: 'Controlar la radio', b: 'Presidió el organismo de control durante el Gobierno de Correa, mientras manejaba *emisoras propias*: eso le valió cuestionamientos.' } },
      { ch: 'a', fu: ['eco', 'vy'], ty: 380, m: [dt('2017', 280)],
        tx: { h: 'Asambleísta', b: 'Llegó a la Asamblea por *Alianza PAIS*. Tras la ruptura de ese movimiento pasó a Centro Democrático y dejó la curul para ir por Quito.' }, n: 'Dos mil diecisiete. Asambleísta: llegó a la Asamblea por Alianza PAIS. Tras la ruptura de ese movimiento pasó a Centro Democrático y dejó la curul para ir por Quito.' },
      { ch: 'a', fu: ['eco'], m: [foto(Dc(s) + 'rueda.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2019', h: 'Alcalde de Quito', b: 'Ganó la Alcaldía por *Unión Ecuatoriana*, en una elección con 18 candidatos.' } },
      { ch: 'a', fu: ['e1k'], ty: 380, m: [dt('100.000', 230)],
        tx: { h: 'pruebas de COVID-19', b: 'compró el Municipio en abril de 2020. La Fiscalía lo acusó de *peculado* por esa compra.' }, n: 'Cien mil pruebas de COVID-19 compró el Municipio en abril de 2020. La Fiscalía lo acusó de peculado por esa compra.' },
      { ch: 'a', fu: ['erm', 'pgu'], m: [card('Concejo Metropolitano de Quito', 'Remoción del alcalde · 14 votos a favor', 0, 40, 500, -1.5, { stamp: '3.06.2021' })],
        tx: { h: 'Removido', b: 'Tras una disputa judicial, la Corte Constitucional dejó en firme la remoción. *Santiago Guarderas* asumió el 30 de septiembre de 2021.' } },
      { ch: 'a', fu: ['ed25', 'eap'], ty: 380, m: [dt('22.09.2025', 165)],
        tx: { h: 'Declarado inocente', b: 'La Corte de Pichincha ratificó su inocencia en el caso PCR. La Fiscalía apeló; la audiencia se instaló el *11 de agosto de 2026*.' }, n: 'Veintidós de septiembre de 2025. Declarado inocente: la Corte de Pichincha ratificó su inocencia en el caso PCR. La Fiscalía apeló; la audiencia se instaló el 11 de agosto de 2026.' }
    ]);
    B('quito|9|exp', 'y3', CH3, ['e12', 'eu', 'cid', 'prc', 'plan', 'cons'], [
      { ch: 'a', fu: ['e12'], m: [foto(Dc(s) + 'campana.webp', 60, 0, 540, 1.5)],
        tx: { kk: K3, h: 'Tercera vez', b: 'Es la tercera vez que compite por la Alcaldía de Quito; ahora con *Avanza*, lista 8.' } },
      { ch: 'a', fu: ['eu', 'cid'], ty: 380, m: [dt('2023', 280)],
        tx: { h: 'La derrota', b: 'Volvió a postularse y no ganó. La Alcaldía fue para *Pabel Muñoz*.' }, n: 'Dos mil veintitrés. La derrota: volvió a postularse y no ganó. La Alcaldía fue para Pabel Muñoz.' },
      { ch: 'a', fu: ['prc'], ty: 380, m: [wd('Otra puerta', 150, 2)],
        tx: { kk: 'Julio de 2026', b: '*Centro Democrático* conversó con él para la candidatura. Terminó en Avanza.' }, n: 'Otra puerta. En julio de 2026, Centro Democrático conversó con él para la candidatura. Terminó en Avanza.' },
      { ch: 'a', fu: ['plan'], m: [plan(s)],
        tx: { h: 'El plan', b: 'Su plan de trabajo, inscrito en el CNE, cubre la administración *2027–2031*.' } },
      cons('a')
    ]);
  }
})();
