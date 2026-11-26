/* Tableros documentales v2 · candidaturas de Latacunga.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Se excluyeron imágenes que parecen
   generadas con IA. Sin Diario Extra.
   Registros (títulos, cargos, listas, resultados) → plataformas oficiales;
   prensa donde hubo trabajo periodístico; Ecuador Chequea donde verificó
   frases del debate del 22 de noviembre.
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/latacunga-ciudad-', n: 3 };
  const Dc = s => 'docu/lat-' + s + '-';
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
  const chq = (veredicto, b) => ({ ch: 'a', fu: ['ecq'], m: [card('Verificación del debate · 22 de noviembre', veredicto, 0, 40, 540, -1.5, { fx: 'hv' })],
    tx: { h: 'Bajo la lupa', b } });
  const nada = (fu, b) => ({ ch: 'a', fu, m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
    tx: { kk: K2, h: 'Sin cargos públicos', b } });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pl: ['Plan de trabajo inscrito en el CNE (lectura de Tinta Digital)', ''],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    cne: ['CNE · candidaturas calificadas para las seccionales 2026', 'https://www.cne.gob.ec/'],
    cner: ['CNE · resultados oficiales de las seccionales 2023', 'https://www.cne.gob.ec/'],
    gac: ['La Gaceta · «CNE de Cotopaxi registra 322 formularios para las elecciones seccionales» (18 de agosto de 2026)', 'https://lagaceta.com.ec/cne-de-cotopaxi-registra-322-formularios-para-las-elecciones-seccionales/'],
    ecv: ['Ecuavisa · «Elecciones Seccionales: estos son los candidatos a las alcaldías de las principales ciudades de la Sierra» (18 de noviembre de 2026)', 'https://www.ecuavisa.com/la-noticia-a-fondo/elecciones-seccionales-estos-son-los-candidatos-a-las-alcaldias-de-las-principales-ciudades-de-la-sierra-20261118-0002.html'],
    ecq: ['Ecuador Chequea · «Debate por la Alcaldía de Latacunga: seis afirmaciones ciertas, tres imprecisas, una engañosa y una falsa» (25 de noviembre de 2026)', 'https://ecuadorchequea.com/debate-alcaldia-latacunga-ciertas-imprecisas-enganosa-falsa/'],
    ecs: ['El Comercio · «El alcalde de Latacunga Patricio Sánchez fue destituido por Contraloría» (abril de 2019)', 'https://www.elcomercio.com/actualidad/alcalde-latacunga-patricio-sanchez-destituido/'],
    euu: ['El Universo · «Contraloría destituyó al prefecto de Cotopaxi, César Umajinga» (16 de mayo de 2012)', 'https://www.eluniverso.com/2012/05/16/1/1447/contraloria-destituyo-prefecto-cotopaxi-cesar-umajinga.html'],
    rpu: ['Hoja de vida de César Umajinga como asambleísta (Radiografía Política)', 'https://radiografiapolitica.org/docs/curriculum/1701284540_CésarUmajinga_Guamán.pdf'],
    ett: ['El Telégrafo · «Prefecta minimiza su ausencia» (Rodrigo Espín como alcalde de Latacunga)', 'https://www.eltelegrafo.com.ec/noticias/regional-centro/220/prefecta-minimiza-su-ausencia'],
    etg: ['El Telégrafo · «Guamangate se precandidatiza» (Espín, alcalde y director provincial de Alianza PAIS)', 'https://www.eltelegrafo.com.ec/noticias/regional-centro/220/guamangate-se-precandidatiza'],
    eut: ['El Universo · entrevista a Fabricio Tinajero, alcalde de Latacunga (2023)', 'https://www.eluniverso.com/noticias/ecuador/entrevista-fabricio-tinajero-alcalde-latacunga-nota'],
    mun: ['Municipio de Latacunga · biografía del alcalde Fabricio Tinajero', 'https://latacunga.gob.ec/en/alcaldia.html?view=category&id=85'],
    exr: ['Expreso · «Concejo Municipal de Latacunga dio una nueva oportunidad a Tinajero»', 'https://www.expreso.ec/actualidad/concejo-municipal-latacunga-dio-nueva-oportunidad-tinajero-208609.html'],
    kchr: ['KCH FM · «Raúl Arias presentó un pedido de remoción para el alcalde de Latacunga»', 'https://kchcomunicacion.com/?p=89833'],
    kup: ['KCH FM · «Unidad Popular separa de sus filas al alcalde de Latacunga, Fabricio Tinajero»', 'https://kchcomunicacion.com/?p=356508']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== GEOVANNY CÓNDOR · latacunga|0 ===================== */
  {
    const s = 'condor'; NOM = 'Geovanny Cóndor';
    B('latacunga|0|origen', 'l01', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Leonel Geovanny *Cóndor Mallitasig*. Ingeniero agroindustrial, magíster en Administración Pública.' } },
      { ch: 'a', fu: ['hv'], m: [card('Prefectura de Cotopaxi', 'Gestor de riego y drenaje', 0, 40, 460, 1.5)],
        tx: { h: 'El agua de riego', b: 'Uno de sus cargos públicos fue en el riego de la *provincia*.' } }
    ]);
    B('latacunga|0|tray', 'l02', CH2, ['hv', 'ctr', 'ecv', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipio de Latacunga', 'Producción, operación y mantenimiento · inclusión social', 0, 40, 540, -2)],
        tx: { kk: K2, h: 'Técnico municipal', b: 'Su hoja de vida registra varios puestos *técnicos* en el Municipio.' } },
      { ch: 'a', fu: ['ecv'], ty: 380, m: [wd('Agua potable', 120, -2)],
        tx: { b: 'También fue director de Agua Potable del *Municipio*.' }, n: 'Agua potable. También fue director de Agua Potable del Municipio.' },
      chq('Cierta', 'Dijo que los 31 millones eran para el plan maestro de alcantarillado, no para agua potable: el crédito fue de 31,3 millones para *alcantarillado*.')
    ]);
    B('latacunga|0|exp', 'l03', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 3', b: 'Llega por *Sociedad Patriótica*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('58%', 300)],
        tx: { h: 'de agua entubada', b: 'Esa es la cobertura rural que reconoce su plan; propone un plan maestro de agua en *2027–2028*.' }, n: 'Cincuenta y ocho por ciento de agua entubada: esa es la cobertura rural que reconoce su plan; propone un plan maestro de agua en 2027 y 2028.' },
      reg(['hv', 'sen'], 'Ingeniero · magíster', 'Municipio de Latacunga')
    ]);
  }

  /* ===================== RODRIGO ESPÍN · latacunga|1 ===================== */
  {
    const s = 'espin'; NOM = 'Rodrigo Espín';
    B('latacunga|1|origen', 'l11', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El arquitecto', b: 'Rodrigo Cristóbal *Espín Villamarín*. Arquitecto, magíster en Gerencia de Resultados.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'entrevista.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida inscrita no detalla *cargos* públicos.' } }
    ]);
    B('latacunga|1|tray', 'l12', CH2, ['ecv', 'ett', 'etg', 'ecq'], [
      { ch: 'a', fu: ['ecv', 'ett'], m: [card('Municipio de Latacunga', 'Alcalde', 0, 40, 420, -2, { stamp: 'hasta 2014' })],
        tx: { kk: K2, h: 'Alcalde', b: 'Ya dirigió el *Municipio* de Latacunga.' } },
      { ch: 'a', fu: ['etg'], ty: 380, m: [wd('Alianza PAIS', 120, -2)],
        tx: { b: 'Siendo alcalde, también fue director provincial del *movimiento*.' }, n: 'Alianza PAIS. Siendo alcalde, también fue director provincial del movimiento.' },
      chq('Cierta', 'Dijo que las cárceles no son responsabilidad del Municipio: la Constitución las asigna al sistema nacional de *rehabilitación*.')
    ]);
    B('latacunga|1|exp', 'l13', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'caravana.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 18-62', b: 'Llega con la alianza *Campo y Ciudad*, Una Sola Fuerza.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('30%', 300)],
        tx: { h: 'en comités', b: 'Su plan quiere sumar a ese porcentaje de la población a comités de *seguridad*.' }, n: 'Treinta por ciento en comités: su plan quiere sumar a ese porcentaje de la población a comités de seguridad.' },
      reg(['hv', 'sen'], 'Arquitecto · magíster', 'Alcalde (hasta 2014)')
    ]);
  }

  /* ===================== VICENTE GUAMÁN · latacunga|2 ===================== */
  {
    const s = 'guaman'; NOM = 'Vicente Guamán';
    B('latacunga|2|origen', 'l21', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Manuel Vicente *Guamán Aguilar*. Doctor en Jurisprudencia y abogado.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'entrevista.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Lo que no consta', b: 'Las fuentes consultadas no detallan su trayectoria *profesional*.' } }
    ]);
    B('latacunga|2|tray', 'l22', CH2, ['hv', 'ctr', 'ecq'], [
      nada(['hv', 'ctr'], 'Su hoja de vida no registra cargos en el *Estado*.'),
      chq('Cierta', 'Dijo que el Municipio debe proteger los derechos de los grupos vulnerables: lo mandan la Constitución y el *COOTAD*.')
    ]);
    B('latacunga|2|exp', 'l23', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Cutuchi', 150, -2)],
        tx: { b: 'Su plan propone recuperar el río y sus riberas, y un sistema de *alerta temprana* ante el volcán.' }, n: 'Cutuchi. Su plan propone recuperar el río y sus riberas, y un sistema de alerta temprana ante el volcán.' },
      reg(['hv', 'sen'], 'Doctor en Jurisprudencia', 'No registra')
    ]);
  }

  /* ===================== JOSÉ ITURRALDE · latacunga|3 ===================== */
  {
    const s = 'iturralde'; NOM = 'José Iturralde';
    B('latacunga|3|origen', 'l31', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'calle.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El publicista', b: 'José Eduardo *Iturralde Maya*. Tecnólogo en Mercadotecnia y técnico superior en Gerencia de *Marketing*.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Lo que no consta', b: 'Las fuentes consultadas no detallan su trayectoria *profesional*.' } }
    ]);
    B('latacunga|3|tray', 'l32', CH2, ['hv', 'ctr', 'ecq'], [
      nada(['hv', 'ctr'], 'Su hoja de vida no registra cargos en el *Estado*.'),
      chq('Falsa', 'Dijo que los estadios solo se usan para conciertos y fiestas. La Cocha tuvo dos partidos de fútbol en *septiembre*.')
    ]);
    B('latacunga|3|exp', 'l33', CH3, ['cne', 'ecv', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'ecv'], m: [foto(Dc(s) + 'debate2.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 6', b: 'Llega por el Partido *Social Cristiano*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Agua para Todos', 110, -2)],
        tx: { b: 'Su plan propone nuevas captaciones y modernizar las plantas de Alcoceres, El Calzado e *Ishigua*.' }, n: 'Agua para Todos. Su plan propone nuevas captaciones y modernizar las plantas de Alcoceres, El Calzado e Ishigua.' },
      reg(['hv', 'sen'], 'Tecnólogo', 'No registra')
    ]);
  }

  /* ===================== SHERLIN PACHECO · latacunga|4 ===================== */
  {
    const s = 'pacheco'; NOM = 'Sherlin Pacheco';
    B('latacunga|4|origen', 'l41', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'calle.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'La abogada', b: 'Sherlin Coralia *Pacheco Viteri*. Abogada, máster en Propiedad Intelectual y Derecho de las Nuevas *Tecnologías*.' } },
      { ch: 'a', fu: ['hv'], m: [card('Universidad de las Fuerzas Armadas ESPE', 'Asistente ejecutiva · extensión Latacunga', 0, 40, 520, 1.5)],
        tx: { h: 'Primeros pasos', b: 'Empezó en la *universidad* pública de su ciudad.' } }
    ]);
    B('latacunga|4|tray', 'l42', CH2, ['hv', 'ctr', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Asamblea Nacional', 'Asambleísta alterna', 0, 40, 420, -2)],
        tx: { kk: K2, h: 'En lo público', b: 'También fue analista de contratación en la empresa de aseo de *Quito*.' } },
      chq('Imprecisa', 'Prometió bajar las pérdidas de agua del 45 al 25 %. El dato más reciente del BDE las ubica en 47,95 %, y no son solo *fugas*.')
    ]);
    B('latacunga|4|exp', 'l43', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 2-12-61', b: 'Llega con *Mashkas Primero*; es la única mujer en la papeleta.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Botones de pánico', 100, -2)],
        tx: { b: 'Su plan los pondría en el transporte público, con más cámaras y alarmas *comunitarias*.' }, n: 'Botones de pánico. Su plan los pondría en el transporte público, con más cámaras y alarmas comunitarias.' },
      reg(['hv', 'sen'], 'Abogada · máster', 'Analista (EMASEO)')
    ]);
  }

  /* ===================== PATRICIO SÁNCHEZ · latacunga|5 ===================== */
  {
    const s = 'sanchez'; NOM = 'Patricio Sánchez';
    B('latacunga|5|origen', 'l51', CH1, ['hv', 'sen', 'ecv'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 60, 0, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Patricio Bolívar *Sánchez Yánez*. Doctor en Jurisprudencia y abogado.' } },
      { ch: 'a', fu: ['ecv'], ty: 380, m: [wd('Aláquez', 150, -2)],
        tx: { b: 'Su campaña sale de esa parroquia *rural*.' }, n: 'Aláquez. Su campaña sale de esa parroquia rural.' }
    ]);
    B('latacunga|5|tray', 'l52', CH2, ['hv', 'ctr', 'ecs', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipio de Latacunga', 'Alcalde', 0, 40, 420, -2, { stamp: '2014–2019' })],
        tx: { kk: K2, h: 'Alcalde', b: 'Gobernó la ciudad cinco *años*.' } },
      { ch: 'a', fu: ['ecs'], m: [card('Contraloría · abril de 2019', 'Destitución y multa de USD 7.000 por el contrato del paso deprimido El Molinero', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Una sanción', b: 'Según la Contraloría, no cumplió las normas de *contratación* pública.' } },
      { ch: 'a', fu: ['ecs'], m: [card('Su respuesta · abril de 2019', 'Calificó la decisión de injusta y anunció que la impugnaría', 0, 40, 540, -1.5, { fx: 'hv' })],
        tx: { h: 'Lo que dijo', b: 'No consta en esta revisión cómo terminó la *impugnación*.' } },
      chq('Imprecisa', 'Dijo que al Consorcio Cotopaxi le dieron casi 5 millones sin saber dónde están. Fueron 4,07 millones y su destino está *documentado*.')
    ]);
    B('latacunga|5|exp', 'l53', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'reunion.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por *Avanza*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('25%', 300)],
        tx: { h: 'por año', b: 'Así avanzaría su plan en agua y vías; suma obras de mitigación ante el *Cotopaxi*.' }, n: 'Veinticinco por ciento por año: así avanzaría su plan en agua y vías; suma obras de mitigación ante el Cotopaxi.' },
      reg(['hv', 'sen'], 'Doctor en Jurisprudencia', 'Alcalde (2019)')
    ]);
  }

  /* ===================== RAÚL TERÁN · latacunga|6 ===================== */
  {
    const s = 'teran'; NOM = 'Raúl Terán';
    B('latacunga|6|origen', 'l61', CH1, ['hv', 'sen', 'ecv'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Raúl Alejandro *Terán Guerrero*. Ingeniero comercial, magíster en Administración de Empresas.' } },
      { ch: 'a', fu: ['ecv'], ty: 380, m: [wd('Finanzas', 150, -2)],
        tx: { b: 'Su experiencia es *empresarial* y financiera.' }, n: 'Finanzas. Su experiencia es empresarial y financiera.' }
    ]);
    B('latacunga|6|tray', 'l62', CH2, ['hv', 'ctr', 'ecq'], [
      nada(['hv', 'ctr'], 'Su hoja de vida no registra cargos en el *Estado*.'),
      chq('Engañosa', 'Atribuyó 445.000 dólares al Centro de Monitoreo. Era el presupuesto de todo el departamento de seguridad, y de *2024*.')
    ]);
    B('latacunga|6|exp', 'l63', CH3, ['cne', 'ecv', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'ecv'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 20-23', b: 'Llega con la alianza *Futuro Sí*, Pasado No: Futuro y SUMA.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Cero fugas', 140, -2)],
        tx: { b: 'Su plan propone sensores, un centro de detección de fugas y reparaciones en menos de *24 horas*.' }, n: 'Cero fugas. Su plan propone sensores, un centro de detección de fugas y reparaciones en menos de veinticuatro horas.' },
      reg(['hv', 'sen'], 'Ingeniero · magíster', 'No registra')
    ]);
  }

  /* ===================== FABRICIO TINAJERO · latacunga|7 ===================== */
  {
    const s = 'tinajero'; NOM = 'Fabricio Tinajero';
    B('latacunga|7|origen', 'l71', CH1, ['hv', 'sen', 'mun', 'eut'], [
      { ch: 'a', fu: ['hv', 'sen', 'mun'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -2)],
        tx: { kk: K1, h: 'El académico', b: 'Cristian Fabricio *Tinajero Jiménez*. Ingeniero de Empresas y doctor en Ciencias *Organizacionales*.' } },
      { ch: 'a', fu: ['eut', 'hv'], m: [card('Universidad Técnica de Cotopaxi', 'Rector', 0, 40, 420, 1.5, { stamp: 'desde 2015' })],
        tx: { h: 'Rector', b: 'Dirigió la universidad pública de la *provincia*.' } }
    ]);
    B('latacunga|7|tray', 'l72', CH2, ['cner', 'kup', 'kchr', 'exr', 'ecq'], [
      { ch: 'a', fu: ['cner'], ty: 380, m: [dt('26,20%', 200)],
        tx: { h: 'en 2023', b: 'Con eso ganó la *Alcaldía*.' }, n: 'Veintiséis coma veinte por ciento en 2023: con eso ganó la Alcaldía.' },
      { ch: 'a', fu: ['kup'], ty: 380, m: [wd('Sin partido', 140, -2)],
        tx: { b: 'Unidad Popular, que lo llevó al cargo, lo separó de sus *filas*.' }, n: 'Sin partido. Unidad Popular, que lo llevó al cargo, lo separó de sus filas.' },
      { ch: 'a', fu: ['kchr', 'exr'], m: [card('Concejo Municipal de Latacunga', 'Pedido de remoción por no convocar una comisión: no prosperó', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Un pedido de remoción', b: 'Él dijo que presentaría sus pruebas; el Concejo no lo *removió*.' } },
      chq('1 imprecisa · 2 ciertas', 'Habló de 175 comités de seguridad barrial; el registro más reciente da *172*.')
    ]);
    B('latacunga|7|exp', 'l73', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'izada.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 17', b: 'Busca la *reelección* con el Partido Socialista.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('40 km', 260)],
        tx: { h: 'de red vial', b: 'Su plan los ampliaría en cuatro años, con un nuevo Terminal *Terrestre*.' }, n: 'Cuarenta kilómetros de red vial: su plan los ampliaría en cuatro años, con un nuevo Terminal Terrestre.' },
      reg(['hv', 'sen'], 'Ingeniero · PhD', 'Alcalde (en funciones)')
    ]);
  }

  /* ===================== CÉSAR UMAJINGA · latacunga|8 ===================== */
  {
    const s = 'umajinga'; NOM = 'César Umajinga';
    B('latacunga|8|origen', 'l81', CH1, ['hv', 'sen', 'euu', 'rpu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'César *Umajinga Guamán*. Doctor en Jurisprudencia y licenciado en Ciencias Políticas y Sociales.' } },
      { ch: 'a', fu: ['euu', 'rpu'], ty: 380, m: [dt('12 años', 220)],
        tx: { h: 'prefecto', b: 'Dirigió la Prefectura de Cotopaxi hasta *2012*.' }, n: 'Doce años prefecto: dirigió la Prefectura de Cotopaxi hasta 2012.' }
    ]);
    B('latacunga|8|tray', 'l82', CH2, ['hv', 'ctr', 'euu', 'rpu', 'cner', 'ecq'], [
      { ch: 'a', fu: ['euu'], m: [card('Contraloría · 2012', 'Destitución por nepotismo y sanción de USD 5.280', 0, 40, 520, -2, { fx: 'hv' })],
        tx: { kk: K2, h: 'Una destitución', b: 'Él dijo que el caso era *político*, que no hubo mal uso de fondos y que apelaría.' } },
      { ch: 'a', fu: ['rpu', 'hv', 'ctr'], m: [card('Asamblea Nacional · Ministerio del Trabajo', 'Asambleísta por Cotopaxi (2013–2017) · director regional', 0, 40, 540, 1.5)],
        tx: { h: 'Después', b: 'Volvió a la política *nacional* y luego al Ejecutivo.' } },
      { ch: 'a', fu: ['cner'], ty: 380, m: [dt('18,4%', 220)],
        tx: { h: 'en 2023', b: 'Quedó segundo en la carrera por la *Prefectura*.' }, n: 'Dieciocho coma cuatro por ciento en 2023: quedó segundo en la carrera por la Prefectura.' },
      chq('Cierta', 'Dijo que la Constitución protege el trabajo de los *informales*: así lo reconocen sus artículos 325 y 329.')
    ]);
    B('latacunga|8|exp', 'l83', CH3, ['cne', 'gac', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'gac'], m: [foto(Dc(s) + 'tv.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 1-21', b: 'Llega con la alianza *Unión, Fuerza y Poder* por la Gente.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Convivencia', 130, -2)],
        tx: { b: 'Su plan propone un sistema municipal de prevención con barrios y comunidades; no trae cifras ni aborda el *agua potable*.' }, n: 'Convivencia. Su plan propone un sistema municipal de prevención con barrios y comunidades; no trae cifras ni aborda el agua potable.' },
      reg(['hv', 'sen'], 'Doctor en Jurisprudencia', 'Director regional (Trabajo)')
    ]);
  }
})();
