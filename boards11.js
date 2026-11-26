/* Tableros documentales v2 · candidaturas de Zamora (Zamora Chinchipe).
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   Zamora tiene menos de 100.000 electores: el CNE no organizó debate
   obligatorio y no hay verificación de debate que citar.
   Registros (títulos, cargos, listas, resultados) → plataformas oficiales;
   prensa local donde hubo trabajo periodístico; webs de campaña solo para lo
   que la propia candidatura dice de sí misma, y así se indica.
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/zamora-ciudad-', n: 5 };
  const Dc = s => 'docu/zam-' + s + '-';
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

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pl: ['Plan de trabajo inscrito en el CNE (lectura de Tinta Digital)', ''],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    cne: ['CNE · candidaturas calificadas para las seccionales 2026', 'https://www.cne.gob.ec/'],
    cner: ['CNE · resultados oficiales de las seccionales 2023', 'https://www.cne.gob.ec/'],
    h32: ['Hora 32 · «Manuel González seguirá cuatro años más como alcalde del cantón Zamora» (7 de febrero de 2023)', 'https://hora32.com.ec/manuel-gonzalez-seguira-cuatro-anos-mas-como-alcalde-del-canton-zamora/'],
    ama: ['El Amazónico · «Candidatos a la alcaldía de Zamora, debatieron propuestas y estrategias» (enero de 2023)', 'https://www.elamazonico.com/portal/candidatos-a-la-alcaldia-de-zamora-debatieron-propuestas-y-estrategias/'],
    izr: ['InfoZamora · «Califican candidatura de Wilman Rodríguez para la Alcaldía de Zamora» (20 de agosto de 2026)', 'https://infozamoraec.com/index.php/2026/08/21/califican-candidatura-de-wilman-rodriguez-para-la-alcaldia-de-zamora/'],
    izj: ['InfoZamora · «Alianza "Juntos Podemos" presenta su estructura política en Zamora» (15 de septiembre de 2026)', 'https://infozamoraec.com/index.php/2026/09/15/alianza-por-un-futuro-prospero-y-de-oportunidades-presenta-su-estructura-politica-en-zamora/'],
    wrw: ['Web de campaña de Wilman Rodríguez (lo que la candidatura dice de sí misma)', 'https://www.wilmanrodriguez.com/'],
    izc: ['InfoZamora · «Santiago Cabrera confirma calificación de su candidatura y lista de concejales en Zamora» (26 de agosto de 2026)', 'https://infozamoraec.com/index.php/2026/08/26/santiago-cabrera-confirma-calificacion-de-su-candidatura-y-lista-de-concejales-en-zamora/'],
    pan: ['Panorama Informativo · «Santiago Cabrera concejal rural del municipio de Zamora»', 'https://www.panoramainformativoec.com/santiago-cabrera-concejal-rural-del-municipio-de-zamora/'],
    muz: ['GAD Municipal de Zamora · concejales 2023–2027', 'https://zamora.gob.ec/autoridades/concejales-2/'],
    cpc: ['CPCCS · listado de autoridades de los GAD que no presentaron el informe de rendición de cuentas 2023 (fila 1639)', 'https://www.cpccs.gob.ec/wp-content/uploads/2025/02/autoridades_no_cumplidas_gad_proceso_rc_2023-2.pdf'],
    lbw: ['Web de campaña de Luis Balladares (lo que la candidatura dice de sí misma)', 'https://luchoballadares.com/']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== LUIS BALLADARES · zamora|0 ===================== */
  {
    const s = 'balladares'; NOM = 'Luis Balladares';
    B('zamora|0|origen', 'z01', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Luis Fernando *Balladares Villavicencio*. Doctor en Jurisprudencia, abogado y licenciado en Ciencias Sociales, Políticas y Económicas.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'feria.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida inscrita no detalla las *fechas* de sus cargos.' } }
    ]);
    B('zamora|0|tray', 'z02', CH2, ['hv', 'ctr', 'lbw'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Prefectura de Zamora Chinchipe', 'Secretario general · prosecretario', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'En la Prefectura', b: 'Su carrera pública pasa por la secretaría del *Gobierno Provincial*.' } },
      { ch: 'a', fu: ['hv'], m: [card('Municipio de Yacuambi', 'Procurador síndico', 0, 40, 420, 1.5)],
        tx: { h: 'El abogado del Municipio', b: 'También fue el asesor legal de un *municipio* vecino.' } },
      { ch: 'a', fu: ['lbw'], ty: 380, m: [wd('Municipio', 130, -2)],
        tx: { b: 'Su web de campaña suma la secretaría general del Municipio de Zamora entre 2020 y *2023*.' }, n: 'Municipio. Su web de campaña suma la secretaría general del Municipio de Zamora entre 2020 y 2023.' }
    ]);
    B('zamora|0|exp', 'z03', CH3, ['cne', 'lbw', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'lbw'], m: [foto(Dc(s) + 'tarima.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Fuerza Democrática', b: 'Llega con una alianza que en campaña se presenta como *listas 2-4-12-21*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Línea base', 130, -2)],
        tx: { b: 'Su plan fija las metas de agua y saneamiento con EMAPAZ solo después de un diagnóstico y un *plan maestro*.' }, n: 'Línea base. Su plan fija las metas de agua y saneamiento con EMAPAZ solo después de un diagnóstico y un plan maestro.' },
      reg(['hv', 'sen'], 'Doctor en Jurisprudencia', 'Secretario general (Prefectura)')
    ]);
  }

  /* ===================== SANTIAGO CABRERA · zamora|1 ===================== */
  {
    const s = 'cabrera'; NOM = 'Santiago Cabrera';
    B('zamora|1|origen', 'z11', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 360, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Santiago Fernando *Cabrera Delgado*. Ingeniero en Administración y Producción Agropecuaria.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'camisa.webp', 120, -40, 380, 1.5)], ty: 480,
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida inscrita solo registra un cargo público: el que ocupa en el *Concejo*.' } }
    ]);
    B('zamora|1|tray', 'z12', CH2, ['hv', 'muz', 'pan', 'cpc'], [
      { ch: 'a', fu: ['hv', 'muz', 'pan'], m: [card('Concejo Municipal de Zamora', 'Concejal rural · electo en 2023', 0, 40, 460, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'Llegó al Concejo por el voto de las *parroquias*.' } },
      { ch: 'a', fu: ['cpc'], m: [card('CPCCS · 2025', 'No presentó el informe de rendición de cuentas 2023', 0, 40, 520, 1.5, { fx: 'hv' })],
        tx: { h: 'Una cuenta pendiente', b: 'Es un listado del CPCCS; otro concejal de Zamora figura en él. No encontramos una respuesta pública *suya*.' } }
    ]);
    B('zamora|1|exp', 'z13', CH3, ['cne', 'izc', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'izc'], m: [foto(Dc(s) + 'bandera.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 1-6-23', b: 'Llega con *Somos Confianza*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Alerta temprana', 100, -2)],
        tx: { b: 'Propone videovigilancia y alerta temprana en zonas de *deslizamientos* y desborde de ríos; el plan no compromete obras ni montos.' }, n: 'Alerta temprana. Propone videovigilancia y alerta temprana en zonas de deslizamientos y desborde de ríos; el plan no compromete obras ni montos.' },
      reg(['hv', 'sen'], 'Ingeniero agropecuario', 'Concejal de Zamora')
    ]);
  }

  /* ===================== WILMAN RODRÍGUEZ · zamora|2 ===================== */
  {
    const s = 'rodriguez'; NOM = 'Wilman Rodríguez';
    B('zamora|2|origen', 'z21', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Wilman Rodrigo *Rodríguez Berrú*. Doctor en Jurisprudencia, abogado y licenciado en Ciencias Sociales, Políticas y Económicas.' } },
      { ch: 'a', fu: ['hv'], m: [card('Distrito 19D01 · Educación', 'Analista distrital contable', 0, 40, 460, 1.5)],
        tx: { h: 'Las cuentas', b: 'Uno de sus cargos fue *contable*, en la educación pública.' } }
    ]);
    B('zamora|2|tray', 'z22', CH2, ['hv', 'ctr', 'wrw', 'cner', 'h32', 'ama'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipios de Zamora y Yantzaza', 'Jefe de Talento Humano · procurador síndico', 0, 40, 520, -2)],
        tx: { kk: K2, h: 'En los municipios', b: 'Su carrera pública está en la gestión y el área legal de los *municipios*.' } },
      { ch: 'a', fu: ['wrw'], ty: 380, m: [wd('Registro', 130, -2)],
        tx: { b: 'Su web de campaña añade que fue registrador de la *propiedad*.' }, n: 'Registro. Su web de campaña añade que fue registrador de la propiedad.' },
      { ch: 'a', fu: ['cner', 'h32', 'ama'], ty: 380, m: [dt('28,6%', 220)],
        tx: { h: 'en 2023', b: 'Quedó segundo para la Alcaldía con el 90 % de actas contadas, detrás de *Manuel González*.' }, n: 'Veintiocho coma seis por ciento en 2023: quedó segundo para la Alcaldía con el noventa por ciento de actas contadas, detrás de Manuel González.' }
    ]);
    B('zamora|2|exp', 'z23', CH3, ['cne', 'izr', 'izj', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'izr', 'izj'], m: [foto(Dc(s) + 'mitin.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 8-18-101', b: 'Avanza, Pachakutik y Primero Mi Zamora; se presentó junto a *Cléver Jiménez*, que busca la Prefectura.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('5,9', 280)],
        tx: { h: 'millones de dólares', b: 'Para vías: es lo que su plan estima para el sistema vial Víctor Reyes Cárdenas en *2027–2028*.' }, n: 'Cinco coma nueve millones de dólares para vías: es lo que su plan estima para el sistema vial Víctor Reyes Cárdenas en 2027 y 2028.' },
      reg(['hv', 'sen'], 'Doctor en Jurisprudencia', 'Jefe de Talento Humano (Municipio)')
    ]);
  }

  /* ===================== PATRICIA SIMBAÑA · zamora|3 ===================== */
  {
    const s = 'simbana'; NOM = 'Patricia Simbaña';
    B('zamora|3|origen', 'z31', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 360, -2)], ty: 500,
        tx: { kk: K1, h: 'La administradora', b: 'Jenni Patricia *Simbaña Morales*. Magíster e ingeniera en Administración de Empresas, licenciada en Secretariado Ejecutivo Bilingüe.' } },
      { ch: 'a', fu: ['hv'], m: [card('Universidad Nacional de Loja', 'Secretaria', 0, 40, 420, 1.5)],
        tx: { h: 'Antes', b: 'Uno de sus primeros cargos fue en la *universidad*.' } }
    ]);
    B('zamora|3|tray', 'z32', CH2, ['hv', 'ctr'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Prefectura de Zamora Chinchipe', 'Analista del componente de género · analista coordinadora', 0, 40, 540, -2)],
        tx: { kk: K2, h: 'En la Prefectura', b: 'Trabajó en el área de *género* del Gobierno Provincial.' } },
      { ch: 'a', fu: ['hv'], m: [card('Distrito 19D01 · Agricultura', 'Servidora pública de apoyo', 0, 40, 460, 1.5)],
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida no detalla fechas, y no encontramos cobertura de prensa sobre su *trayectoria*.' } }
    ]);
    B('zamora|3|exp', 'z33', CH3, ['cne', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'micro.webp', 140, -40, 380, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 7', b: 'Es la única mujer en la papeleta y llega por *ADN*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Saneamiento', 120, -2)],
        tx: { b: 'Su plan, de seis páginas y sin cifras, propone ampliar agua potable y alcantarillado en zonas urbanas y *rurales*.' }, n: 'Saneamiento. Su plan, de seis páginas y sin cifras, propone ampliar agua potable y alcantarillado en zonas urbanas y rurales.' },
      reg(['hv', 'sen'], 'Magíster en Administración', 'Servidora pública (Agricultura)')
    ]);
  }
})();
