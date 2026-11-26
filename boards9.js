/* Tableros documentales v2 · candidaturas de Ambato.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   Los datos de registro (títulos, cargos, listas, resultados) se citan a la
   plataforma oficial; la prensa, donde hubo trabajo periodístico; Ecuador
   Chequea, donde verificó frases del debate del 15 de noviembre.
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/ambato-ciudad-', n: 3 };
  const Dc = s => 'docu/amb-' + s + '-';
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
  const chq = (veredicto, b) => ({ ch: 'a', fu: ['ecq'], m: [card('Verificación del debate · 15 de noviembre', veredicto, 0, 40, 540, -1.5, { fx: 'hv' })],
    tx: { h: 'Bajo la lupa', b } });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pl: ['Plan de trabajo inscrito en el CNE (lectura de Tinta Digital)', ''],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    cne: ['CNE · candidaturas calificadas para las seccionales 2026', 'https://www.cne.gob.ec/'],
    cner: ['CNE · resultados oficiales de las seccionales 2023', 'https://www.cne.gob.ec/'],
    eu: ['El Universo · «Exalcaldes y nuevos rostros políticos se inscriben para la Alcaldía de Ambato en los comicios de noviembre» (septiembre de 2026)', 'https://www.eluniverso.com/noticias/ecuador/esperan-aprobacion-nota/'],
    ehf: ['El Heraldo · «Propuestas para el futuro de Ambato» (Foro del Colegio de Arquitectos, 25 de octubre de 2026)', 'https://www.elheraldo.com.ec/propuestas-para-el-futuro-de-ambato/'],
    amn: ['AmbatoNews · «Fotorradares y PUGS en el debate de alcaldía» (17 de noviembre de 2026)', 'https://www.ambatonews.com/2026/11/17/fotorradares-y-pugs-en-el-debate-de-alcaldia'],
    ecq: ['Ecuador Chequea · «Debate en Ambato: de los fotorradares al presupuesto municipal» (18 de noviembre de 2026)', 'https://ecuadorchequea.com/debate-en-ambato-de-los-fotorradares-al-presupuesto-municipal/'],
    kch: ['KCH FM · «Caravanas y concentraciones mueven la campaña en la Sierra Centro» (17 de noviembre de 2026)', 'https://kchcomunicacion.com/2026/11/17/caravanas-y-concentraciones-mueven-la-campana-en-la-sierra-centro-daniel-noboa-recorrio-riobamba-y-ambato/'],
    exc: ['Expreso · «¿Por qué se archivó la denuncia electoral contra la alcaldesa de Ambato, Diana Caiza?» (6 de mayo de 2025)', 'https://www.expreso.ec/actualidad/archivo-denuncia-electoral-alcaldesa-ambato-diana-caiza-241484.html'],
    exf: ['Expreso · «Más irregularidades en los fotorradares de Ambato» (examen especial de la Contraloría)', 'https://www.expreso.ec/actualidad/irregularidades-fotorradares-ambato-118944.html'],
    lnw: ['Sitio de campaña de Lisette Naranjo (trayectoria declarada)', 'https://elpresenteeshoyec.com/'],
    anw: ['AmbatoNews · «Nuevos rostros a la alcaldía» (1 de julio de 2026)', 'https://www.ambatonews.com/2026/07/01/nuevos-rostros-a-la-alcaldia']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== JAVIER ALTAMIRANO · ambato|0 ===================== */
  {
    const s = 'altamirano'; NOM = 'Javier Altamirano';
    B('ambato|0|origen', 't01', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Javier Francisco *Altamirano Sánchez*. Abogado y magíster en Derecho Procesal.' } },
      { ch: 'a', fu: ['eu'], m: [card('Universidad Tecnológica Indoamérica', 'Decano de Jurisprudencia · docente en la UTA y otras universidades', 0, 40, 540, 1.5)],
        tx: { h: 'En las aulas', b: 'Antes de la política fue asesor del Registro de la Propiedad y *profesor* universitario.' } }
    ]);
    B('ambato|0|tray', 't02', CH2, ['hv', 'ctr', 'eu', 'amn', 'ecq'], [
      { ch: 'a', fu: ['eu'], ty: 380, m: [dt('2004', 300)],
        tx: { h: 'Concejal', b: 'Su primer cargo de *elección* en Ambato.' }, n: 'Dos mil cuatro: su primer cargo de elección, concejal de Ambato.' },
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipio de Ambato', 'Alcalde', 0, 40, 420, -2, { stamp: '2019–2023' })],
        tx: { kk: K2, h: 'Alcalde', b: 'Gobernó la ciudad cuatro años y perdió la *reelección* en 2023.' } },
      { ch: 'a', fu: ['amn'], ty: 380, m: [wd('PUGS', 160, -2)],
        tx: { b: 'Su administración aprobó el plan de uso del suelo. La actual alcaldía dice que traía errores y lo *actualizó*.' }, n: 'PUGS. Su administración aprobó el plan de uso del suelo. La actual alcaldía dice que traía errores y lo actualizó.' },
      chq('Imprecisa', 'Dijo que dejó el primer plan cantonal de seguridad del país. El plan existe, pero no hay un registro que confirme que fue el *primero*.')
    ]);
    B('ambato|0|exp', 't03', CH3, ['cne', 'ehf', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'desfile.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 1-6-63', b: 'Vuelve con la alianza *Fuerza Democrática Solidaria*.' } },
      { ch: 'a', fu: ['ehf'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Planificación sostenida y un plan maestro de *agua* potable y alcantarillado.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Recapeo', 150, -2)],
        tx: { b: 'Su plan arranca con un plan emergente de *vías* y una solución para el Redondel de la Policía.' }, n: 'Recapeo. Su plan arranca con un plan emergente de vías y una solución para el Redondel de la Policía.' },
      reg(['hv', 'sen'], 'Magíster en Derecho Procesal', 'Alcalde (2023)')
    ]);
  }

  /* ===================== LUIS AMOROSO · ambato|1 ===================== */
  {
    const s = 'amoroso'; NOM = 'Luis Amoroso';
    B('ambato|1|origen', 't11', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Luis Alcibiades *Amoroso Mora*. Ingeniero civil, magíster en Vías Terrestres.' } },
      { ch: 'a', fu: ['eu'], m: [card('Universidad Técnica de Ambato', 'Decano de Ingeniería Civil · rector', 0, 40, 460, 1.5)],
        tx: { h: 'Obras y aulas', b: 'Dirigió obras públicas en Carchi, Cañar, Ambato y Baños, y llegó a *rector* de la UTA.' } }
    ]);
    B('ambato|1|tray', 't12', CH2, ['hv', 'ctr', 'amn', 'ecq', 'exf'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipio de Ambato', 'Alcalde', 0, 40, 420, -2, { stamp: '2014–2019' })],
        tx: { kk: K2, h: 'Alcalde', b: 'Gobernó la ciudad cinco *años*.' } },
      { ch: 'a', fu: ['ecq'], ty: 380, m: [wd('Fotorradares', 120, -2)],
        tx: { b: 'El contrato lo firmó la alcaldía anterior; los equipos empezaron a operar en 2015, en su gestión. La Contraloría revisó ese contrato y señaló *irregularidades*.' }, n: 'Fotorradares. El contrato lo firmó la alcaldía anterior; los equipos empezaron a operar en 2015, en su gestión. La Contraloría revisó ese contrato y señaló irregularidades.' },
      { ch: 'a', fu: ['amn', 'exf'], m: [card('Su respuesta · debate', 'No firmó el contrato y debía cumplirlo para evitar multas al Municipio', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Lo que dice', b: 'Afirma que el informe de Contraloría no tuvo consecuencias para él. En esta revisión no consta que le determinara *responsabilidades*.' } },
      chq('Cierta', 'Dijo que en su gestión Ambato fue la ciudad más segura del país: en 2016 fue tercera de América Latina por tasa de *homicidios*.')
    ]);
    B('ambato|1|exp', 't13', CH3, ['cne', 'cner', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cner'], ty: 380, m: [dt('29,98%', 200)],
        tx: { h: 'en 2023', b: 'Quedó segundo, a 2,6 puntos de la ganadora, Diana *Caiza*.' }, n: 'Veintinueve coma noventa y ocho por ciento en 2023: quedó segundo, a dos coma seis puntos de la ganadora, Diana Caiza.' },
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 62', b: 'Llega por el *Movimiento Cívico* por Ambato y Tungurahua.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('40%', 300)],
        tx: { h: 'menos vertidos', b: 'Su plan promete reducirlos en el río Ambato con plantas de aguas residuales *modernizadas*.' }, n: 'Cuarenta por ciento menos vertidos: su plan promete reducirlos en el río Ambato con plantas de aguas residuales modernizadas.' },
      reg(['hv', 'sen'], 'Ingeniero civil · magíster', 'Alcalde (2019)')
    ]);
  }

  /* ===================== DIANA CAIZA · ambato|2 ===================== */
  {
    const s = 'caiza'; NOM = 'Diana Caiza';
    B('ambato|2|origen', 't21', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'La ingeniera', b: 'Diana Guadalupe *Caiza Telenchana*. Ingeniera comercial, magíster en Administración de Organizaciones de la Economía Social y Solidaria.' } },
      { ch: 'a', fu: ['eu'], ty: 380, m: [wd('Chibuleo', 150, -2)],
        tx: { b: 'Es parte del pueblo *Chibuleo*, en el suroeste de Tungurahua.' }, n: 'Chibuleo. Es parte del pueblo Chibuleo, en el suroeste de Tungurahua.' }
    ]);
    B('ambato|2|tray', 't22', CH2, ['hv', 'ctr', 'eu', 'cner', 'exc', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr', 'eu'], m: [card('Concejo Municipal de Ambato', 'Concejala rural y vicealcaldesa', 0, 40, 460, -2, { stamp: '2019' })],
        tx: { kk: K2, h: 'Vicealcaldesa', b: 'Llegó al Concejo en la administración de Altamirano y fue elegida *vicealcaldesa*.' } },
      { ch: 'a', fu: ['cner'], ty: 380, m: [dt('32,58%', 200)],
        tx: { h: 'en 2023', b: 'Ganó la Alcaldía: primera mujer *indígena* en el cargo.' }, n: 'Treinta y dos coma cincuenta y ocho por ciento en 2023: ganó la Alcaldía, primera mujer indígena en el cargo.' },
      { ch: 'a', fu: ['exc'], m: [card('Tribunal Contencioso Electoral · 2025', 'Denuncia por violencia política de género: inadmitida y archivada', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Una denuncia', b: 'El juez se declaró sin competencia porque los hechos no eran *electorales*. No consta una respuesta suya.' } },
      chq('Engañosa', 'Dijo que Amoroso puso los fotorradares y ella los retiró. Se retiraron en 2024, en su gestión, pero el contrato se firmó antes de *Amoroso*.')
    ]);
    B('ambato|2|exp', 't23', CH3, ['cne', 'kch', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'marcha.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 18', b: 'Busca la *reelección* con Pachakutik.' } },
      { ch: 'a', fu: ['kch'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Redes de agua como el proyecto de los *ríos orientales*, alcantarillado y vialidad.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('20%', 300)],
        tx: { h: 'más cobertura', b: 'Su plan fija esa meta para servicios y vías; reconoce que en la zona rural falta *agua potable*.' }, n: 'Veinte por ciento más cobertura: su plan fija esa meta para servicios y vías; reconoce que en la zona rural falta agua potable.' },
      reg(['hv', 'sen'], 'Ingeniera comercial · magíster', 'Alcaldesa (en funciones)')
    ]);
  }

  /* ===================== JUAN CARLOS LÓPEZ · ambato|3 ===================== */
  {
    const s = 'lopez'; NOM = 'Juan Carlos López';
    B('ambato|3|origen', 't31', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El empresario', b: 'Juan Carlos *López Naranjo*. Ingeniero en Gestión Ambiental, magíster en Gestión Empresarial.' } },
      { ch: 'a', fu: ['eu'], m: [card('Nutrimax · Procreavic · Verix', 'Fundador y socio · importación de granos y materia prima', 0, 40, 540, 1.5)],
        tx: { h: 'Desde lo privado', b: 'Fundó empresas y hoy dirige una importadora de *granos* y cereales.' } }
    ]);
    B('ambato|3|tray', 't32', CH2, ['hv', 'ctr', 'eu', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('CNT EP', 'Operador de contact center', 0, 40, 420, -2, { stamp: '2014' })],
        tx: { kk: K2, h: 'Un cargo público', b: 'Es el último que registra, hace más de una *década*.' } },
      { ch: 'a', fu: ['eu'], ty: 380, m: [dt('0', 300)],
        tx: { h: 'cargos de elección', b: 'Es su primera *candidatura*.' }, n: 'Cero cargos de elección: es su primera candidatura.' },
      chq('Cierta', 'Dijo que el Municipio había ejecutado menos de la mitad del *presupuesto* de 2026: a mediados de octubre iba en 41 %.')
    ]);
    B('ambato|3|exp', 't33', CH3, ['cne', 'ehf', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'campana.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 21', b: 'Llega por el movimiento *Creo*.' } },
      { ch: 'a', fu: ['ehf'], ty: 380, m: [wd('Agroindustria', 110, -2)],
        tx: { b: 'Quiere a Ambato como capital *agroindustrial*, logística y comercial.' }, n: 'Agroindustria. Quiere a Ambato como capital agroindustrial, logística y comercial.' },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('70%', 300)],
        tx: { h: 'del presupuesto', b: 'Su plan lo destinaría cada año a infraestructura crítica: agua y *alcantarillado*.' }, n: 'Setenta por ciento del presupuesto: su plan lo destinaría cada año a infraestructura crítica, agua y alcantarillado.' },
      reg(['hv', 'sen'], 'Ingeniero · magíster', 'CNT (2014)')
    ]);
  }

  /* ===================== LISETTE NARANJO · ambato|4 ===================== */
  {
    const s = 'naranjo'; NOM = 'Lisette Naranjo';
    B('ambato|4|origen', 't41', CH1, ['hv', 'sen', 'eu', 'lnw'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'La gerente', b: 'María Lisette *Naranjo Herdoiza*. Técnica superior en Industrialización de Productos Agrícolas.' } },
      { ch: 'a', fu: ['eu', 'lnw'], m: [card('Prodicesa · Credimas', 'Gerente · jefa administrativa de la cooperativa', 0, 40, 520, 1.5)],
        tx: { h: 'Desde lo privado', b: 'Hizo carrera en la empresa privada y en una *cooperativa* de ahorro y crédito.' } }
    ]);
    B('ambato|4|tray', 't42', CH2, ['hv', 'ctr', 'eu', 'ecq'], [
      { ch: 'a', fu: ['eu'], ty: 380, m: [dt('1993', 300)],
        tx: { h: 'Reina de Ambato', b: 'Después presidió varios años la Fundación Reina de *Ambato*.' }, n: 'Mil novecientos noventa y tres: Reina de Ambato. Después presidió varios años la Fundación Reina de Ambato.' },
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Comité Permanente de la Fiesta de la Fruta y de las Flores', 'Directora ejecutiva', 0, 40, 540, -2, { stamp: '2016–2019' })],
        tx: { kk: K2, h: 'La fiesta', b: 'Dirigió la organización de tres *ediciones*.' } },
      chq('Inverificable', 'Atribuyó a un informe de Contraloría que Amoroso tardó más de 1.000 días en instalar una cámara. No se encontró ese *informe*.')
    ]);
    B('ambato|4|exp', 't43', CH3, ['cne', 'lnw', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'evento.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['lnw'], ty: 380, m: [dt('4', 300)],
        tx: { h: 'ejes', b: 'Seguridad, obras, empleo y *honestidad*; su campaña no detalla metas para ninguno.' }, n: 'Cuatro ejes: seguridad, obras, empleo y honestidad; su campaña no detalla metas para ninguno.' },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('El Socavón', 130, -2)],
        tx: { b: 'Su plan propone ahí una solución vial —paso deprimido o puente— sujeta a *estudios*.' }, n: 'El Socavón. Su plan propone ahí una solución vial, paso deprimido o puente, sujeta a estudios.' },
      reg(['hv', 'sen'], 'Técnica superior', 'Directora ejecutiva (2019)')
    ]);
  }

  /* ===================== MARIO ROBAYO · ambato|5 ===================== */
  {
    const s = 'robayo'; NOM = 'Mario Robayo';
    B('ambato|5|origen', 't51', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Mario San Juan *Robayo Cárdenas*. Abogado; no registra título de *cuarto nivel*.' } },
      { ch: 'a', fu: ['eu'], m: [card('Banca · Pastoral Social de Ambato', 'Ejecutivo de crédito y cobranzas · abogado', 0, 40, 520, 1.5)],
        tx: { h: 'Primeros pasos', b: 'Trabajó en crédito y cobranzas, y como abogado de la Pastoral *Social*.' } }
    ]);
    B('ambato|5|tray', 't52', CH2, ['hv', 'ctr', 'eu', 'ecq'], [
      { ch: 'a', fu: ['eu'], ty: 380, m: [dt('2009–2014', 150)],
        tx: { h: 'Concejal rural', b: 'De Ambato. Años antes asesoró al *Tribunal* Provincial Electoral.' }, n: 'De 2009 a 2014, concejal rural de Ambato. Años antes asesoró al Tribunal Provincial Electoral.' },
      { ch: 'a', fu: ['hv', 'ctr', 'eu'], m: [card('Gobernación de Tungurahua', 'Teniente político de Huachi Grande', 0, 40, 460, -2, { stamp: '2019' })],
        tx: { kk: K2, h: 'En el Gobierno', b: 'También dirigió en la provincia el partido Adelante Ecuatoriano *Adelante* (2018–2020).' } },
      chq('Inverificable', 'Habló de una baja ejecución del presupuesto desde 2014. No hay datos públicos anuales de 2014 a 2022 para *confirmarlo*.')
    ]);
    B('ambato|5|exp', 't53', CH3, ['cne', 'ehf', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'lanzamiento.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 61', b: 'Llega por el movimiento *Tiempo de Cambio*.' } },
      { ch: 'a', fu: ['ehf'], ty: 380, m: [wd('Conectado', 140, -2)],
        tx: { b: 'Su visión: mercados digitalizados, un centro histórico *peatonal* y corredores verdes.' }, n: 'Corazón conectado de los Andes. Su visión: mercados digitalizados, un centro histórico peatonal y corredores verdes.' },
      { ch: 'a', fu: ['pl'], m: [foto(Dc(s) + 'caravana.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su plan', b: 'Carril exclusivo para buses y una empresa municipal de transporte sobre la línea *férrea*.' } },
      reg(['hv', 'sen'], 'Abogado', 'Teniente político (2019)')
    ]);
  }

  /* ===================== EVELYN SALAZAR · ambato|6 ===================== */
  {
    const s = 'salazar'; NOM = 'Evelyn Salazar';
    B('ambato|6|origen', 't61', CH1, ['hv', 'eu'], [
      { ch: 'a', fu: ['hv', 'eu'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'La docente', b: 'Evelyn Valeria *Salazar Rodríguez*. Estudia terapia de lenguaje y lengua de *señas*.' } },
      { ch: 'a', fu: ['eu'], m: [card('Educación · comercio · escenarios', 'Docente parvularia · promotora de marcas · presentadora', 0, 40, 540, 1.5)],
        tx: { h: 'Su trayectoria', b: 'Trabajó en educación inicial privada, en *comercio* local y en el sector artístico.' } }
    ]);
    B('ambato|6|tray', 't62', CH2, ['hv', 'ctr', 'sen', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr', 'sen'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'Es su primera *candidatura*. El registro público no muestra títulos universitarios.' } },
      chq('1 cierta · 1 engañosa', 'Acertó con Estonia y su Estado en línea. Pero en Ambato no hay parroquias sin agua: hay *déficit*, sobre todo en las zonas altas.')
    ]);
    B('ambato|6|exp', 't63', CH3, ['cne', 'ehf', 'pl', 'hv'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 4', b: 'Llega por *Pueblo, Igualdad y Democracia*.' } },
      { ch: 'a', fu: ['ehf'], ty: 380, m: [wd('Limpia', 150, -2)],
        tx: { b: 'Propone una ciudad limpia y planificada que impulse agricultura, industria y *turismo*.' }, n: 'Limpia. Propone una ciudad limpia y planificada que impulse agricultura, industria y turismo.' },
      { ch: 'a', fu: ['pl'], m: [foto(Dc(s) + 'evento.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su plan', b: 'Un plan de movilidad 2031 y «Ambato con agua segura»; las metas se fijarían cada año en el *POA*.' } },
      reg(['hv'], 'No registra', 'No registra')
    ]);
  }

  /* ===================== CRISTIAN ZÚÑIGA · ambato|7 ===================== */
  {
    const s = 'zuniga'; NOM = 'Cristian Zúñiga';
    B('ambato|7|origen', 't71', CH1, ['hv', 'sen', 'eu'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Cristian Leandro *Zúñiga Quesada*. Ingeniero en Electrónica, magíster en Auditoría de Sistemas Tecnológicos.' } },
      { ch: 'a', fu: ['eu'], m: [card('Grupo Tecnovatel S.A.', 'Gerente general · asesor de cooperativas', 0, 40, 460, 1.5)],
        tx: { h: 'La tecnología', b: 'Su perfil es *técnico*: sistemas, auditoría y finanzas digitales.' } }
    ]);
    B('ambato|7|tray', 't72', CH2, ['hv', 'ctr', 'eu', 'ecq'], [
      { ch: 'a', fu: ['eu'], m: [card('Municipio de Ambato', 'Secretario de Gestión Estratégica', 0, 40, 460, -2)],
        tx: { kk: K2, h: 'En el Estado', b: 'También pasó por la Judicatura, la Cementera del Ecuador y el Ministerio del *Ambiente*.' } },
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Petroecuador EP', 'Asesor de subgerencia', 0, 40, 420, 1.5, { stamp: '2024' })],
        tx: { h: 'Último cargo', b: 'Su paso más reciente por lo *público*.' } },
      { ch: 'a', fu: ['ecq'], ty: 380, m: [wd('Sin datos', 140, -2)],
        tx: { b: 'En el debate no dio cifras verificables, así que no tuvo frases *chequeadas*.' }, n: 'Sin datos. En el debate no dio cifras verificables, así que no tuvo frases chequeadas.' }
    ]);
    B('ambato|7|exp', 't73', CH3, ['cne', 'anw', 'ehf', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'anw'], m: [foto(Dc(s) + 'plaza.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por *Avanza*, tras ganar sus primarias.' } },
      { ch: 'a', fu: ['ehf'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Una ciudad moderna y segura con participación *ciudadana*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('100', 300)],
        tx: { h: 'espacios públicos', b: 'Su plan los recuperaría hasta 2031, sujeto a estudios y *presupuesto*.' }, n: 'Cien espacios públicos: su plan los recuperaría hasta 2031, sujeto a estudios y presupuesto.' },
      reg(['hv', 'sen'], 'Ingeniero · magíster', 'Petroecuador (2024)')
    ]);
  }
})();
