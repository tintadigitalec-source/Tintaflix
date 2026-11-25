/* Tableros documentales v2 · candidaturas de Loja.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados); tarjetas tipográficas con nombres
   oficiales tal como aparecen en las fuentes. Sin Diario Extra.
   Procesos judiciales: se nombra la etapa exacta y la respuesta de la persona. */
(function () {
  const { make, card, foto } = window.BK;
  const OPT = { q: 'fotos/loja-ciudad-', n: 5 };
  const Dc = s => 'docu/loj-' + s + '-';
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
    cne: ['CNE · candidaturas calificadas para las seccionales 2026', 'https://www.cne.gob.ec/'],
    tce: ['Tribunal Contencioso Electoral · sentencias y resoluciones publicadas', 'https://www.tce.gob.ec/'],
    cr930: ['Diario Crónica · «Loja define sus cartas: 504 listas van a las urnas y cuatro quedan fuera» (30 de septiembre de 2026)', 'https://cronica.com.ec/2026/09/30/loja-define-sus-cartas-504-listas-van-a-las-urnas-y-cuatro-quedan-fuera/'],
    cr1104: ['Diario Crónica · «Cara a cara por Loja: candidatos a la Prefectura y Alcaldía medirán sus propuestas» (4 de noviembre de 2026)', 'https://cronica.com.ec/2026/11/04/cara-a-cara-por-loja-candidatos-a-la-prefectura-y-alcaldia-mediran-sus-propuestas-en-los-debates-obligatorios-del-cne/'],
    cr1104b: ['Diario Crónica · «Loja exige soluciones, no promesas: ocho candidatos bajo la presión ciudadana» (4 de noviembre de 2026)', 'https://cronica.com.ec/2026/11/04/loja-exige-soluciones-no-promesas-ocho-candidatos-bajo-la-presion-ciudadana/'],
    cr1012: ['Diario Crónica · «Entre recorridos y propuestas, candidatos buscan el respaldo ciudadano en Loja» (12 de octubre de 2026)', 'https://cronica.com.ec/2026/10/12/entre-recorridos-y-propuestas-candidatos-buscan-el-respaldo-ciudadano-en-loja/'],
    cr819: ['Diario Crónica · «La batalla electoral por la Prefectura de Loja ya tiene cuatro nombres» (19 de agosto de 2026)', 'https://cronica.com.ec/2026/08/19/la-batalla-electoral-por-la-prefectura-de-loja-ya-tiene-cuatro-nombres/'],
    cr25: ['Diario Crónica · «Siete posibles candidatos a la alcaldía de Loja, cifra incrementará en 2026» (27 de noviembre de 2025)', 'https://cronica.com.ec/2025/11/27/siete-posibles-candidatos-a-la-alcaldia-de-loja-cifra-incrementara-en-2026/'],
    /* Castillo */
    pdc: ['Primicias · diario de campaña: Bolívar Castillo en Loja (18 de noviembre de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/diario-campana-candidatos-bolivar-castillo-loja-raul-teran-latacunga-loly-sevilla-lago-agrio-137456/'],
    etg: ['El Telégrafo · «El camisetazo, síntoma de pérdida de credibilidad política» (2014)', 'https://www.eltelegrafo.com.ec/noticias/politica/210/camisetazosintoma-perdida-credibilidad-politica'],
    asm: ['Asamblea Nacional · «José Bolívar Castillo entrega su curul a Verónica Arias» (18 de noviembre de 2013)', 'https://www.asambleanacional.gob.ec/es/contenido/jose_bolivar_castillo_entrega_su_curul_veronica_arias'],
    exr: ['Expreso · historia de las revocatorias de alcaldes en Ecuador (2025)', 'https://www.expreso.ec/actualidad/historia-revocatorias-alcaldes-ecuador-lecciones-pasado-246590.html'],
    eor: ['El Oriente · «El “Chato” Castillo, revocado de la Alcaldía de Loja con 70 % de los votos» (2018, con datos del CNE)', 'https://www.eloriente.com/articulo/el-ldquochatordquo-castillo-revocado-de-la-alcaldiacutea-de-loja-con-70-de-los-votos/9790'],
    etr: ['El Telégrafo · «El “Chato” Castillo apelará su revocatoria de mandato en Loja» (abril de 2018)', 'https://www.eltelegrafo.com.ec/noticias/regional/1/loja-alcalde-chatocastillo-revocatoria-cne-ecuador'],
    /* Quezada */
    crq: ['Diario Crónica · «Franco Quezada va por la “revancha” y presenta 10 ejes» (31 de agosto de 2026)', 'https://cronica.com.ec/2026/08/31/franco-quezada-va-por-la-revancha-y-presenta-10-ejes-para-volver-a-la-alcaldia-de-loja/'],
    tqz: ['Teleamazonas · «Concejo Municipal de Loja aprueba la remoción del alcalde Franco Quezada» (26 de junio de 2025)', 'https://www.teleamazonas.com/actualidad/noticias/politica/alcalde-franco-quezada-removido-loja-concejo-municipal-97810/'],
    prq: ['Primicias · «Esto se sabe de la remoción del cargo del alcalde de Loja, Franco Quezada» (26 de junio de 2025)', 'https://www.primicias.ec/politica/alcalde-loja-franco-quezada-remocion-cargo-concejo-cantonal-99424/'],
    /* Picoita */
    lhp: ['La Hora · «Conozca quién es Patricia Picoita, nueva alcaldesa de Loja» (marzo de 2022)', 'https://www.lahora.com.ec/loja/cuatro-mujeres-asumieron-alcaldia/'],
    ecv: ['Ecuavisa · «Elecciones seccionales: estos son los candidatos a las alcaldías de las principales ciudades de la Sierra» (18 de noviembre de 2026)', 'https://www.ecuavisa.com/la-noticia-a-fondo/elecciones-seccionales-estos-son-los-candidatos-a-las-alcaldias-de-las-principales-ciudades-de-la-sierra-20261118-0002.html'],
    crp: ['Diario Crónica · «Patricia Picoita asumió las funciones de alcaldesa de Loja» (2 de marzo de 2022)', 'https://cronica.com.ec/2022/03/02/patricia-picoita-asumio-las-funciones-de-alcaldesa-de-loja/'],
    crp22: ['Diario Crónica · «Gobierno Autónomo Descentralizado del cantón Loja» (15 de septiembre de 2022)', 'https://cronica.com.ec/2022/09/15/gobierno-autonomo-descentralizado-del-canton-loja/'],
    mlv: ['Municipio de Loja · «Patricia Picoita se desempeñará como vicealcaldesa durante dos años» (junio de 2021)', 'https://loja.gob.ec/noticia/2021-06/patricia-picoita-se-desempenara-como-vicealcaldesa-durante-dos-anos'],
    eup: ['El Universo · «Tres días de luto institucional por el fallecimiento de alcalde de Loja; Patricia Picoita asume Municipio» (marzo de 2022)', 'https://www.eluniverso.com/noticias/ecuador/tres-dias-de-luto-institucional-por-el-fallecimiento-de-alcalde-de-loja-patricia-picoita-asume-municipio-nota/'],
    /* Reyes, Valdivieso, Cárdenas */
    crr: ['Diario Crónica · «Jorge Reyes: “No podemos normalizar que esta Loja se vaya barranco abajo”» (22 de abril de 2026)', 'https://cronica.com.ec/2026/04/22/jorge-reyes-no-podemos-normalizar-que-esta-loja-se-vaya-barranco-abajo/'],
    crv: ['Diario Crónica · «Patricio Valdivieso, aspirante a la alcaldía: “A Loja hay que verla renacer”» (23 de abril de 2026)', 'https://cronica.com.ec/2026/04/23/patricio-valdivieso-aspirante-a-la-alcaldia-a-loja-hay-que-verla-renacer/'],
    caje: ['Fundación CAJE · informe «Elecciones sin agresiones con enfoque de género» (2023)', 'https://ecuadorverifica.org/wp-content/uploads/2023/02/Informes-Elecciones-sin-Agresiones-con-Enfoque-de-G%C3%A9nero_-Fundaci%C3%B3n-CAJE.pdf'],
    crc: ['Diario Crónica · «Santiago Guachizaca y Jesús Cárdenas, rostros nuevos con miras a la alcaldía de Loja» (1 de abril de 2026)', 'https://cronica.com.ec/2026/04/01/santiago-guachizaca-y-jesus-cardenas-rostros-nuevos-con-miras-a-la-alcaldia-de-loja/'],
    crt: ['Diario Crónica · «Plan Triple A: Jesús Cárdenas priorizará agua potable, alcantarillado y asfaltado» (23 de octubre de 2026)', 'https://cronica.com.ec/2026/10/23/plan-triple-a-jesus-cardenas-priorizara-agua-potable-alcantarillado-y-asfaltado/']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== DANIEL AGUIRRE · loja|0 ===================== */
  {
    const s = 'aguirre';
    B('loja|0|origen', 'j01', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Daniel Fernando *Aguirre Reyes*. Ingeniero en Electrónica y Telecomunicaciones.' } },
      { ch: 'a', fu: ['hv'], m: [card('Universidad de Buenos Aires', 'Magíster en Física Médica', 0, 30, 440, 1.5), card('Doctorado', 'Ciencias de la Ingeniería', 260, 220, 340, -2)],
        tx: { h: 'Física médica', b: 'Su hoja de vida registra una maestría en *Física Médica* y un doctorado en Ciencias de la Ingeniería.' } }
    ]);
    B('loja|0|tray', 'j02', CH2, ['hv', 'cr25'], [
      { ch: 'a', fu: ['hv'], m: [card('Universidad Nacional de Loja', 'Docente · maestría de Telecomunicaciones', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'En el aula', b: 'Ha sido *docente* de la Universidad Nacional de Loja, también en su maestría de Telecomunicaciones.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Sin cargos públicos', 100, 2)],
        tx: { b: 'Fuera de la universidad, su hoja de vida *no registra* funciones en el Estado.' }, n: 'Sin cargos públicos. Fuera de la universidad, su hoja de vida no registra funciones en el Estado.' },
      { ch: 'a', fu: ['cr25'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Primera vez', b: 'No figuraba entre los aspirantes de 2023 ni entre los nombres que sonaban a fines de 2025.' } }
    ]);
    B('loja|0|exp', 'j03', CH3, ['cr1104', 'cr1104b', 'cr1012', 'hv'], [
      { ch: 'a', fu: ['cr1104', 'cr1104b'], m: [foto(Dc(s) + 'atril.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Valor para Cambiar', b: 'Su alianza une al *Partido Socialista*, APLA y la Izquierda Democrática.' } },
      { ch: 'a', fu: ['cr1012'], ty: 380, m: [dt('10', 300)],
        tx: { h: 'ejes', b: 'Su plan se alinea con el *PDOT y el PUGS* del cantón e incluye propuestas para jóvenes.' }, n: 'Diez ejes. Su plan se alinea con el PDOT y el PUGS del cantón e incluye propuestas para jóvenes.' },
      { ch: 'a', fu: ['cr1104'], m: [foto(Dc(s) + 'foto2.webp', 160, -40, 300, 2)], ty: 500,
        tx: { h: 'El debate', b: 'Fue uno de los ocho del debate obligatorio del CNE, el *15 de noviembre*.' } },
      reg(['hv'], 'Ingeniero · doctor', 'Docente UNL')
    ]);
  }

  /* ===================== JESÚS CÁRDENAS · loja|1 ===================== */
  {
    const s = 'cardenas';
    B('loja|1|origen', 'j11', CH1, ['hv', 'crt', 'crc'], [
      { ch: 'a', fu: ['hv', 'crt'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Jesús *Cárdenas López*. Abogado por la Universidad San Francisco de Quito.' } },
      { ch: 'a', fu: ['crt'], m: [foto(Dc(s) + 'oficina.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Derecho empresarial', b: 'Ejerce en derecho privado y asesoría a empresas de *turismo, construcción* y publicidad.' } }
    ]);
    B('loja|1|tray', 'j12', CH2, ['hv', 'crc'], [
      { ch: 'a', fu: ['hv'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'Su hoja de vida *no registra* funciones en el Estado.' } },
      { ch: 'a', fu: ['crc'], m: [card('Movimiento CREO', 'Presidente provincial · Loja', 0, 40, 440, 2)],
        tx: { h: 'Dirigente', b: 'Preside CREO en la provincia. La prensa local lo presentó como un *rostro nuevo*.' } },
      { ch: 'a', fu: ['crc'], m: [foto(Dc(s) + 'mapa.webp', 60, 0, 540, -1.5)],
        tx: { h: 'Su diagnóstico', b: 'Criticó la gestión local, el *deterioro vial* y pidió modernizar el Municipio.' } }
    ]);
    B('loja|1|exp', 'j13', CH3, ['cr930', 'crt', 'cr1012', 'crc', 'hv'], [
      { ch: 'a', fu: ['cr930'], m: [foto(Dc(s) + 'mitin.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Movimiento CREO', b: 'Llega por *CREO*, el movimiento fundado por Guillermo Lasso.' } },
      { ch: 'a', fu: ['crt'], ty: 380, m: [dt('121', 300)],
        tx: { h: 'calles', b: 'Su «Plan *Triple A*»: agua potable, alcantarillado y asfaltado.' }, n: 'Ciento veintiún calles. Su Plan Triple A: agua potable, alcantarillado y asfaltado.' },
      { ch: 'a', fu: ['cr1012', 'crc'], m: [foto(Dc(s) + 'desfile.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: '«Jesús resuelve»', b: 'Así se llama su campaña, la *primera* de su carrera.' } },
      reg(['hv'], 'Abogado', 'No registra')
    ]);
  }

  /* ===================== HENRY CARRIÓN · loja|2 ===================== */
  {
    const s = 'carrion';
    B('loja|2|origen', 'j21', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El arquitecto', b: 'Henry Vinicio *Carrión Jumbo*. Arquitecto.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan su *formación* adicional ni su trayectoria privada.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan su formación adicional ni su trayectoria privada.' }
    ]);
    B('loja|2|tray', 'j22', CH2, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [card('Municipio de El Empalme', 'Director de Planificación y Ordenamiento Territorial', 0, 40, 560, -2)],
        tx: { kk: K2, h: 'Planificación', b: 'Su hoja de vida registra un cargo público: dirigió la planificación de *El Empalme*, en Guayas.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'foro.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Sin fechas', b: 'El registro *no precisa* en qué años ocupó ese cargo.' } }
    ]);
    B('loja|2|exp', 'j23', CH3, ['cr1104b', 'cr1012', 'cr25', 'hv'], [
      { ch: 'a', fu: ['cr1104b'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Movimiento PID', b: 'Llega por el movimiento *Pueblo, Igualdad y Democracia*.' } },
      { ch: 'a', fu: ['cr1012'], ty: 380, m: [wd('Cercana', 150, -2)],
        tx: { b: 'Ofrece una administración *transparente*, con empleo, emprendimiento e innovación.' }, n: 'Cercana. Ofrece una administración transparente, con empleo, emprendimiento e innovación.' },
      { ch: 'a', fu: ['cr25'], m: [foto(Dc(s) + 'afiche.webp', 160, -40, 300, 2)], ty: 500,
        tx: { h: 'Debut', b: 'No figuraba entre los aspirantes a la Alcaldía de *2023*.' } },
      reg(['hv'], 'Arquitecto', 'Director de Planificación, El Empalme')
    ]);
  }

  /* ===================== JOSÉ BOLÍVAR CASTILLO · loja|3 ===================== */
  {
    const s = 'castillo';
    B('loja|3|origen', 'j31', CH1, ['hv', 'exr', 'pdc'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'José Bolívar *Castillo Vivanco*. Doctor en Jurisprudencia.' } },
      { ch: 'a', fu: ['pdc'], ty: 380, m: [dt('81', 300)],
        tx: { h: 'años', b: 'En Loja lo conocen como el «*Chato*» Castillo.' }, n: 'Ochenta y un años. En Loja lo conocen como el Chato Castillo.' }
    ]);
    B('loja|3|tray', 'j32', CH2, ['etg', 'exr', 'asm', 'eor', 'etr'], [
      { ch: 'a', fu: ['etg'], m: [card('Congreso Nacional', 'Diputado por Loja · Democracia Popular', 0, 40, 500, -2, { stamp: '1984' })],
        tx: { kk: K2, h: 'Legislador', b: 'Fue diputado y asambleísta en *tres* ocasiones.' } },
      { ch: 'a', fu: ['etg', 'exr'], ty: 380, m: [dt('×4', 300)],
        tx: { h: 'Alcalde de Loja', b: 'Ganó en 1988, 1996, 2000 y *2014*, con partidos distintos.' }, n: 'Cuatro veces alcalde de Loja: ganó en 1988, 1996, 2000 y 2014, con partidos distintos.' },
      { ch: 'a', fu: ['asm'], m: [foto(Dc(s) + 'evento.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { kk: '2013', h: 'Deja la curul', b: 'Renunció a la Asamblea, con el movimiento *ARE*, para volver a la Alcaldía.' } },
      { ch: 'a', fu: ['eor', 'etr'], m: [card('CNE · revocatoria del mandato', 'Loja, 24 de junio de 2018 · Sí: 70,40 %', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { h: 'Revocado', b: 'Los votantes le retiraron el mandato. Él sostuvo que era un «libreto *preestablecido*».' } }
    ]);
    B('loja|3|exp', 'j33', CH3, ['cr819', 'cr25', 'ecv', 'hv', 'cne'], [
      { ch: 'a', fu: ['cr819', 'cne'], m: [foto(Dc(s) + 'sonrisa.webp', 140, -50, 400, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Listas 1 y 61', b: 'Llega por *Orgullosamente Lojanos*: ARE y Centro Democrático.' } },
      { ch: 'a', fu: ['cr25'], ty: 380, m: [wd('Varios intentos', 120, -2)],
        tx: { b: 'La prensa local registra que ha perdido *varios procesos* consecutivos para alcalde y asambleísta.' }, n: 'Varios intentos. La prensa local registra que ha perdido varios procesos consecutivos para alcalde y asambleísta.' },
      { ch: 'a', fu: ['ecv'], m: [foto(Dc(s) + 'plan.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { kk: '2027–2031', h: '«Quinta etapa»', b: 'Así titula su plan: aspira a un *quinto* periodo como alcalde.' } },
      reg(['hv'], 'Doctor en Jurisprudencia', 'Alcalde de Loja (2018)')
    ]);
  }

  /* ===================== PATRICIA PICOITA · loja|4 ===================== */
  {
    const s = 'picoita';
    B('loja|4|origen', 'j41', CH1, ['hv', 'lhp'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'La docente', b: 'Patricia Catalina *Picoita Astudillo*. Licenciada en Ciencias de la Educación, especialidad Inglés.' } },
      { ch: 'a', fu: ['hv', 'lhp'], m: [card('Docencia', 'Profesora de segunda enseñanza · Inglés', 0, 40, 480, 1.5)],
        tx: { h: 'Del aula al Cabildo', b: 'Llegó a la política desde la *docencia*.' } }
    ]);
    B('loja|4|tray', 'j42', CH2, ['crp22', 'mlv', 'eup', 'crp'], [
      { ch: 'a', fu: ['crp22'], ty: 380, m: [dt('2019', 280)],
        tx: { kk: K2, h: 'Concejala', b: 'Fue electa al Concejo de Loja con *Democracia Sí*.' }, n: 'Capítulo 2. Dos mil diecinueve: fue electa concejala de Loja con Democracia Sí.' },
      { ch: 'a', fu: ['mlv'], m: [foto(Dc(s) + 'atril.webp', 60, 0, 540, 1.5)],
        tx: { kk: 'Junio de 2021', h: 'Vicealcaldesa', b: 'El Concejo la eligió con *siete* votos.' } },
      { ch: 'a', fu: ['eup', 'crp'], ty: 380, m: [dt('2.03.2022', 165)],
        tx: { h: 'Alcaldesa', b: 'Tras la muerte de Jorge Bailón, completó el periodo hasta el *14 de mayo de 2023*.' }, n: 'Dos de marzo de 2022. Alcaldesa: tras la muerte de Jorge Bailón, completó el periodo hasta el 14 de mayo de 2023.' },
      { ch: 'a', fu: ['crp'], m: [foto(Dc(s) + 'festival.webp', 60, 0, 540, -1.5)],
        tx: { h: 'Lo que no consta', b: 'Las fuentes consultadas no detallan *resultados* medibles de esos 14 meses.' } }
    ]);
    B('loja|4|exp', 'j43', CH3, ['cr1104', 'cr1012', 'hv'], [
      { ch: 'a', fu: ['cr1104'], m: [foto(Dc(s) + 'plaza.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Sociedad Patriótica', b: 'Llega por el *PSP*, el partido de Lucio Gutiérrez.' } },
      { ch: 'a', fu: ['cr1012'], ty: 380, m: [wd('La Loja que queremos', 92, -2)],
        tx: { b: 'Así llama a su propuesta: saneamiento, vialidad, *obras emblemáticas* y turismo.' }, n: 'La Loja que queremos. Así llama a su propuesta: saneamiento, vialidad, obras emblemáticas y turismo.' },
      reg(['hv'], 'Licenciada en Educación', 'Alcaldesa de Loja (2023)')
    ]);
  }

  /* ===================== FRANCO QUEZADA · loja|5 ===================== */
  {
    const s = 'quezada';
    B('loja|5|origen', 'j51', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El profesor', b: 'Franco Antonio *Quezada Montesinos*. Licenciado en Ciencias de la Educación, especialidad Educación Física.' } },
      { ch: 'a', fu: ['hv'], m: [card('Municipio de Loja', 'Profesor municipal · docente', 0, 40, 460, 1.5)],
        tx: { h: 'Antes de la Alcaldía', b: 'Trabajó como *profesor* en el propio Municipio de Loja.' } }
    ]);
    B('loja|5|tray', 'j52', CH2, ['tqz', 'prq', 'tce'], [
      { ch: 'a', fu: ['tqz'], ty: 380, m: [dt('2023', 280)],
        tx: { kk: K2, h: 'Alcalde', b: 'Asumió la Alcaldía de Loja en *mayo*.' }, n: 'Capítulo 2. Dos mil veintitrés: asumió la Alcaldía de Loja en mayo.' },
      { ch: 'a', fu: ['prq'], m: [card('Concejo Municipal de Loja', 'Remoción · 26 de junio de 2025 · 9 votos de 11', 0, 40, 540, -1.5, { fx: 'hv' })],
        tx: { h: 'Removido', b: 'Según la comisión, incumplió una resolución de *transparencia* presupuestaria y una transferencia para una celda de residuos vulneró el Cootad.' } },
      { ch: 'a', fu: ['prq'], m: [foto(Dc(s) + 'g2.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su respuesta', b: '«Yo no respondo ante un *show político*», dijo, y apeló.' } },
      { ch: 'a', fu: ['tce'], ty: 380, m: [dt('18.07.2025', 165)],
        tx: { h: 'Ratificado', b: 'El Tribunal Contencioso Electoral confirmó la remoción: el Concejo respetó el *debido proceso*.' }, n: 'Dieciocho de julio de 2025. Ratificado: el Tribunal Contencioso Electoral confirmó la remoción.' }
    ]);
    B('loja|5|exp', 'j53', CH3, ['crq', 'hv'], [
      { ch: 'a', fu: ['crq'], m: [foto(Dc(s) + 'calle.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 63', b: 'Llega por el movimiento *SER*: Solidez, Esperanza y Respeto.' } },
      { ch: 'a', fu: ['crq'], ty: 380, m: [wd('La revancha', 140, -2)],
        tx: { b: 'Así llama a su regreso. Dice que no va dirigida contra *nadie*.' }, n: 'La revancha. Así llama a su regreso. Dice que no va dirigida contra nadie.' },
      { ch: 'a', fu: ['crq'], m: [foto(Dc(s) + 'grupo.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Las volquetas', b: 'Defiende la compra de *seis* volquetas criticada en su remoción: eran para una celda de residuos.' } },
      reg(['hv'], 'Licenciado en Educación', 'Alcalde de Loja (2025)')
    ]);
  }

  /* ===================== JORGE REYES · loja|6 ===================== */
  {
    const s = 'reyes';
    B('loja|6|origen', 'j61', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El médico', b: 'Jorge Vicente Fernando *Reyes Jaramillo*. Doctor en Medicina y Cirugía, magíster en Salud Pública.' } },
      { ch: 'a', fu: ['hv'], m: [card('Universidad Nacional de Loja', 'Profesor principal titular · decano de Salud Humana', 0, 40, 560, 1.5)],
        tx: { h: 'Catedrático', b: 'Fue *decano* de la Facultad de la Salud Humana y evaluador del sistema de educación superior.' } }
    ]);
    B('loja|6|tray', 'j62', CH2, ['crr', 'cr25', 'cr1012'], [
      { ch: 'a', fu: ['crr', 'cr25'], ty: 380, m: [dt('1992–1996', 150)],
        tx: { kk: K2, h: 'Alcalde de Loja', b: 'Gobernó la ciudad en ese periodo.' }, n: 'Capítulo 2. De 1992 a 1996, alcalde de Loja.' },
      { ch: 'a', fu: ['cr1012'], m: [foto(Dc(s) + 'cronica.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su gestión', b: 'En campaña destaca las *obras* de esa administración.' } },
      { ch: 'a', fu: ['crr'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan *qué obras* ni con qué resultados.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan qué obras ni con qué resultados.' }
    ]);
    B('loja|6|exp', 'j63', CH3, ['cr1104b', 'crr', 'cr25', 'hv'], [
      { ch: 'a', fu: ['cr1104b'], m: [foto(Dc(s) + 'marcha.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Juntos Renacemos', b: 'Su alianza une a *Unidad Popular*, Pachakutik y el Movimiento Acción Social y Solidaria.' } },
      { ch: 'a', fu: ['crr'], m: [foto(Dc(s) + 'megafono.webp', 60, 0, 540, 1.5)],
        tx: { h: '«Barranco abajo»', b: '«No podemos *normalizar* que esta Loja se vaya barranco abajo», dijo al lanzarse.' } },
      { ch: 'a', fu: ['cr25'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { h: 'Otra vez', b: 'También fue aspirante a la Alcaldía en *2023*.' } },
      reg(['hv'], 'Médico · magíster', 'Docente titular UNL')
    ]);
  }

  /* ===================== PATRICIO VALDIVIESO · loja|7 ===================== */
  {
    const s = 'valdivieso';
    B('loja|7|origen', 'j71', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'cronica.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Patricio Alberto *Valdivieso Espinosa*. Doctor en Jurisprudencia y en Derecho y Ciencias Políticas.' } },
      { ch: 'a', fu: ['hv'], m: [card('Especialización', 'Derecho Procesal · magíster en Derecho e Investigación Jurídica', 0, 40, 560, 1.5)],
        tx: { h: 'Formación', b: 'Su hoja de vida registra *seis* títulos, todos en derecho y ciencias sociales.' } }
    ]);
    B('loja|7|tray', 'j72', CH2, ['hv', 'caje', 'cr25'], [
      { ch: 'a', fu: ['hv'], m: [card('Universidad Nacional de Loja', 'Docente contratado · profesor 20 horas', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'Docente', b: 'Su único cargo público registrado es la *cátedra* universitaria.' } },
      { ch: 'a', fu: ['caje'], m: [foto(Dc(s) + 'calle.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { kk: '2023', h: 'Candidato', b: 'Buscó la Alcaldía con *Renovación Democrática*, lista 111.' } },
      { ch: 'a', fu: ['cr25'], ty: 380, m: [dt('3.º', 300)],
        tx: { h: 'intento', b: 'Esta es su tercera postulación a la *Alcaldía*.' }, n: 'Tercer intento. Esta es su tercera postulación a la Alcaldía.' }
    ]);
    B('loja|7|exp', 'j73', CH3, ['cr1104b', 'crv', 'hv'], [
      { ch: 'a', fu: ['cr1104b'], m: [foto(Dc(s) + 'grupo.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Compromiso de Todos', b: 'Su alianza une al *Partido Social Cristiano*, SUMA y Renovación Democrática.' } },
      { ch: 'a', fu: ['crv'], m: [foto(Dc(s) + 'megafono.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su prioridad', b: '«Lo más grave que está pasando Loja es el *alcantarillado*», dijo.' } },
      { ch: 'a', fu: ['crv'], ty: 380, m: [wd('Hay que ordenar', 115, -2)],
        tx: { b: 'Sobre el comercio informal: «No va a haber *persecución* ni decomisos».' }, n: 'Hay que ordenar. Sobre el comercio informal: no va a haber persecución ni decomisos.' },
      reg(['hv'], 'Doctor en Jurisprudencia', 'Docente UNL')
    ]);
  }
})();
