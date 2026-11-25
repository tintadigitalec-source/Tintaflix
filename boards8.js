/* Tableros documentales v2 · candidaturas de Ibarra.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   No se reproducen acusaciones cruzadas del debate que no tengan verificación.
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/ibarra-ciudad-', n: 4 };
  const Dc = s => 'docu/iba-' + s + '-';
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
    crn: ['Crónicas del Norte · «Cinco candidatos están en carrera por la Alcaldía de Ibarra» (26 de agosto de 2026)', 'https://cronicas-norte.com/candidatos-alcaldia-ibarra-elecciones-2026/'],
    hoyp: ['Hoy en Imbabura · «Hospital municipal, nuevos puentes y recuperación del Tahuando: las propuestas que plantean los candidatos para Ibarra» (7 de octubre de 2026)', 'https://hoyenimbabura.com/2026/10/07/hospital-municipal-nuevos-puentes-y-recuperacion-del-tahuando-las-propuestas-que-plantean-los-candidatos-para-ibarra/'],
    iel: ['Imbabura en Línea · «Cinco candidatos a la Alcaldía de Ibarra se enfrentarán este domingo en el debate electoral del CNE» (22 de noviembre de 2026)', 'https://imbaburaenlinea.com/2026/11/22/cinco-candidatos-a-la-alcaldia-de-ibarra-se-enfrentaran-este-domingo-en-el-debate-electoral-del-cne/'],
    hoyc: ['Hoy en Imbabura · perfil de Israel Cabezas (16 de noviembre de 2026)', 'https://hoyenimbabura.com/2026/11/16/israel-cabezas-el-candidato-del-gobierno-de-noboa-en-ibarra-con-un-paso-fugaz-por-la-gobernacion-y-raices-familiares-en-el-prian/'],
    lhe: ['La Hora (Imbabura) · «Empresa de Agua Potable de Ibarra mantiene una deuda de $6.4 millones por la planta de tratamiento» (2023)', 'https://www.lahora.com.ec/imbabura-carchi/empresa-agua-potable-debe-6-millones-municipio-ibarra/'],
    hoyi: ['Hoy en Imbabura · «CNT y EMAPA-I: las dos paradas clave de José Moncayo antes de pelear por la Alcaldía» (2026)', 'https://hoyenimbabura.com/'],
    mib: ['Municipio de Ibarra · «Comisión Especial ratificó en su informe que existió el doble pago por la expropiación de un terreno» (julio de 2019)', 'https://www.ibarra.gob.ec/site/category/comunicacion/noticias/page/80/'],
    hoyf: ['Hoy en Imbabura · «Fiscalía, Contraloría y la UAFE investigarán presuntos delitos ligados al doble pago por expropiaciones en Ibarra» (10 de julio de 2019)', 'https://hoyenimbabura.com/2019/07/10/fiscalia-contraloria-y-la-uafe-investigaran-presuntos-delitos-ligados-al-doble-pago-por-expropiaciones-en-ibarra/'],
    exd: ['Expectativa · «Comisión Especializada ratificó que existió el doble pago por la expropiación de un terreno» (11 de julio de 2019)', 'https://www.expectativa.ec/comision-especializada-ratifico-que-existio-el-doble-pago-por-la-expropiacion-de-un-terreno/'],
    est: ['El Estelar · «Álvaro Castillo Monge, el hijo del Alcalde de Ibarra…, que busca ser su sucesor» (mayo de 2026)', 'https://elestelar.net/alvaro-castillo-monge-el-hijo-del-alcalde-de-ibarra-alvaro-castillo-aguirre-que-busca-ser-su-sucesor/'],
    exdb: ['Expectativa · «Debate para alcalde de Ibarra tuvo sus momentos “polémicos y preguntas capciosas”» (24 de noviembre de 2026)', 'https://www.expectativa.ec/debate-para-alcalde-de-ibarra-tuvo-sus-momentos-polemicos-y-preguntas-capciosas/'],
    exa: ['Expectativa · precandidatos que inscribieron sus candidaturas en el CNE de Imbabura (14 de agosto de 2026)', 'https://www.expectativa.ec/tres-precandidatos-a-la-alcaldia-de-ibarra-inscribiran-sus-nombres-ante-el-cne-este-viernes-sabado-y-domingo-proximos/']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== JUAN ARIAS · ibarra|0 ===================== */
  {
    const s = 'arias'; NOM = 'Juan Arias';
    B('ibarra|0|origen', 'i01', CH1, ['hv', 'crn'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [foto(Dc(s) + 'caminata.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El comerciante', b: 'Juan Fernando *Arias Carvajal*. Ingeniero en Comercio Internacional, magíster en Gerencia de la Calidad e Innovación.' } },
      { ch: 'a', fu: ['crn'], m: [card('Fundación Transformar', 'Presidente', 0, 40, 420, 1.5)],
        tx: { h: 'Desde lo privado', b: 'Se presenta como presidente de una *fundación*.' } }
    ]);
    B('ibarra|0|tray', 'i02', CH2, ['hv', 'crn'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el Estado ni cargos de *elección*.' } },
      { ch: 'a', fu: ['crn'], ty: 380, m: [dt('23 %', 280)],
        tx: { h: 'en 2023', b: 'Disputó la Alcaldía y quedó *segundo*, según la prensa local.' }, n: 'Veintitrés por ciento en 2023: disputó la Alcaldía y quedó segundo, según la prensa local.' }
    ]);
    B('ibarra|0|exp', 'i03', CH3, ['crn', 'hoyp', 'pl', 'hv'], [
      { ch: 'a', fu: ['crn'], m: [foto(Dc(s) + 'marcha.webp', 180, -60, 280, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 70-17', b: 'Vuelve con la alianza *Juntos por la Transformación*: Juntos y el Partido Socialista.' } },
      { ch: 'a', fu: ['hoyp'], m: [foto(Dc(s) + 'mercado.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Su prioridad', b: 'Reconstruir el mercado *Amazonas* sin moverlo de su sitio y un puente hacia Yahuarcocha.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('24', 300)],
        tx: { h: 'rutas de buses', b: 'Su plan propone rediseñarlas hacia un sistema *inteligente* con apoyo del BID.' }, n: 'Veinticuatro rutas de buses: su plan propone rediseñarlas hacia un sistema inteligente con apoyo del BID.' },
      reg(['hv'], 'Ingeniero · magíster', 'No registra')
    ]);
  }

  /* ===================== ISRAEL CABEZAS · ibarra|1 ===================== */
  {
    const s = 'cabezas'; NOM = 'Israel Cabezas';
    B('ibarra|1|origen', 'i11', CH1, ['hv', 'hoyc'], [
      { ch: 'a', fu: ['hv', 'hoyc'], m: [foto(Dc(s) + 'perfil.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Leonardo Israel *Cabezas González*. Abogado por la PUCE de Ibarra; no registra título de *cuarto nivel*.' } },
      { ch: 'a', fu: ['hv', 'hoyc'], m: [card('Municipio de Ibarra', 'Secretario técnico del Consejo de Protección de Derechos', 0, 40, 540, 1.5)],
        tx: { h: 'Primeros pasos', b: 'Empezó en el Municipio, en la protección de *derechos* y la participación ciudadana.' } }
    ]);
    B('ibarra|1|tray', 'i12', CH2, ['hv', 'crn', 'hoyc'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [card('Gobernación de Imbabura', 'Jefe político del cantón Ibarra', 0, 40, 460, -2, { stamp: '2024' })],
        tx: { kk: K2, h: 'Jefe político', b: 'Representó al Gobierno *central* en el cantón.' } },
      { ch: 'a', fu: ['crn', 'hoyc'], ty: 380, m: [dt('3 meses', 170)],
        tx: { h: 'Gobernador', b: 'De junio a septiembre de 2025 dirigió la Gobernación de *Imbabura*.' }, n: 'Tres meses como gobernador: de junio a septiembre de 2025 dirigió la Gobernación de Imbabura.' },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'simpatizantes.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'De vuelta', b: 'Su hoja de vida registra que luego volvió a ser *jefe político*.' } }
    ]);
    B('ibarra|1|exp', 'i13', CH3, ['crn', 'hoyc', 'hoyp', 'pl', 'hv'], [
      { ch: 'a', fu: ['crn', 'hoyc'], m: [foto(Dc(s) + 'debate.webp', 180, -60, 260, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 7', b: 'Ganó las primarias de *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['hoyp'], ty: 380, m: [wd('Lo rural', 150, -2)],
        tx: { b: 'Propone impulsar las comunidades de la vía Ibarra–San Lorenzo y una alcaldía de «puertas *abiertas*».' }, n: 'Lo rural. Propone impulsar las comunidades de la vía Ibarra–San Lorenzo y una alcaldía de puertas abiertas.' },
      { ch: 'a', fu: ['pl'], m: [card('Plan de trabajo inscrito en el CNE', 'Políticas y líneas de acción · sin obras ni cifras', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Su plan', b: 'Plantea prevención y espacios públicos en términos *generales*.' } },
      reg(['hv', 'hoyc'], 'Abogado', 'Jefe político (2026)')
    ]);
  }

  /* ===================== ÁLVARO CASTILLO MONGE · ibarra|2 ===================== */
  {
    const s = 'castillo'; NOM = 'Álvaro Castillo Monge';
    B('ibarra|2|origen', 'i21', CH1, ['hv', 'crn'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [foto(Dc(s) + 'barrio.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero', b: 'Álvaro Daniel *Castillo Monge*. Ingeniero civil por la ESPE y magíster en Administración Pública.' } },
      { ch: 'a', fu: ['crn'], m: [card('Fundación Desafíos de Vida', 'Director ejecutivo', 0, 40, 440, 1.5)],
        tx: { h: 'Una fundación', b: 'Dirige una fundación de *ayuda social*.' } }
    ]);
    B('ibarra|2|tray', 'i22', CH2, ['hv', 'crn', 'est', 'exdb'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'No registra funciones en el *Estado*.' } },
      { ch: 'a', fu: ['crn'], m: [foto(Dc(s) + 'avanza.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Cerca de la Alcaldía', b: 'Asesoró a su padre, el alcalde Álvaro Castillo Aguirre, en sus *dos* administraciones.' } },
      { ch: 'a', fu: ['est', 'exdb'], m: [card('Fundación Desafíos de Vida', 'Cuestionamiento: presunto uso de recursos municipales · sin denuncia formal registrada', 0, 40, 560, -1.5, { fx: 'hv' })],
        tx: { h: 'Un cuestionamiento', b: 'Rivales y prensa local preguntan si su fundación usó recursos del *Municipio*. En el debate respondió que no recibe dinero de instituciones públicas.' } }
    ]);
    B('ibarra|2|exp', 'i23', CH3, ['crn', 'hoyp', 'pl', 'hv'], [
      { ch: 'a', fu: ['crn'], m: [foto(Dc(s) + 'tarima.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por *Avanza*, sin alianza.' } },
      { ch: 'a', fu: ['hoyp'], ty: 380, m: [wd('Un hospital', 140, -2)],
        tx: { b: 'Propone un hospital *municipal* para ampliar los servicios de salud.' }, n: 'Un hospital. Propone un hospital municipal para ampliar los servicios de salud.' },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('12', 300)],
        tx: { h: 'brigadas', b: 'Su plan las despliega por etapas en puntos críticos y aclara que no *sustituyen* a la Policía.' }, n: 'Doce brigadas: su plan las despliega por etapas en puntos críticos y aclara que no sustituyen a la Policía.' },
      reg(['hv'], 'Ingeniero civil · magíster', 'No registra')
    ]);
  }

  /* ===================== JOSÉ MONCAYO · ibarra|3 ===================== */
  {
    const s = 'moncayo'; NOM = 'José Moncayo';
    B('ibarra|3|origen', 'i31', CH1, ['hv', 'crn'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'caminata.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'José Francisco *Moncayo Espinoza*. Abogado.' } },
      { ch: 'a', fu: ['crn'], ty: 380, m: [dt('2009–2014', 150)],
        tx: { h: 'Concejal', b: 'Fue concejal y *vicealcalde* de Ibarra.' }, n: 'De 2009 a 2014, concejal y vicealcalde de Ibarra.' }
    ]);
    B('ibarra|3|tray', 'i32', CH2, ['hv', 'crn', 'lhe', 'hoyi'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [card('CNT EP · Ministerio de Minería · Asamblea', 'Gerente regional 1 · subsecretario zonal norte · asambleísta alterno (2017)', 0, 40, 560, -2)],
        tx: { kk: K2, h: 'En el Estado', b: 'Dirigió la *CNT* en la región y una subsecretaría de Minería, y fue asambleísta alterno.' } },
      { ch: 'a', fu: ['hv', 'crn'], m: [foto(Dc(s) + 'emapa.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2020–2023', h: 'El agua', b: 'Gerente de *EMAPA-I*, la empresa municipal de agua potable.' } },
      { ch: 'a', fu: ['lhe'], m: [card('EMAPA-I · 2023', 'Deuda señalada por la Alcaldía: USD 6,4 millones del crédito de la planta de tratamiento', 0, 40, 560, -1.5, { fx: 'hv' })],
        tx: { h: 'Una deuda señalada', b: 'El alcalde Castillo dijo que la empresa arrastraba esa deuda sin reflejarla en sus estados financieros. No consta una denuncia formal ni que la deuda naciera en su *gestión*.' } },
      { ch: 'a', fu: ['hoyi'], ty: 380, m: [dt('95%', 220)],
        tx: { h: 'Su respuesta', b: 'Renunció en septiembre de 2023 y afirma que dejó esa *ejecución* presupuestaria.' }, n: 'Noventa y cinco por ciento. Renunció en septiembre de 2023 y afirma que dejó esa ejecución presupuestaria.' }
    ]);
    B('ibarra|3|exp', 'i33', CH3, ['crn', 'exa', 'hoyp', 'pl', 'hv'], [
      { ch: 'a', fu: ['crn', 'exa'], m: [foto(Dc(s) + 'marcha.webp', 180, -60, 280, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 1-12-20-18', b: 'Llega con *Renovación Democrática*: Centro Democrático, Izquierda Democrática, Futuro y Pachakutik.' } },
      { ch: 'a', fu: ['hoyp'], ty: 380, m: [wd('Bienestar', 140, -2)],
        tx: { b: 'Propone un centro municipal de atención *psicológica* con tarifas solidarias.' }, n: 'Bienestar. Propone un centro municipal de atención psicológica con tarifas solidarias.' },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('400', 300)],
        tx: { h: 'cámaras', b: 'Su plan las enlaza al ECU 911 dentro de una inversión total de USD 164 *millones*.' }, n: 'Cuatrocientas cámaras: su plan las enlaza al ECU 911 dentro de una inversión total de 164 millones de dólares.' },
      reg(['hv'], 'Abogado', 'Gerente de EMAPA-I (2023)')
    ]);
  }

  /* ===================== LUCÍA POSSO · ibarra|4 ===================== */
  {
    const s = 'posso'; NOM = 'Lucía Posso';
    B('ibarra|4|origen', 'i41', CH1, ['hv'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 160, -50, 320, -2)], ty: 500,
        tx: { kk: K1, h: 'La abogada', b: 'Lucía Anabelle *Posso Naranjo*. Doctora en Jurisprudencia, magíster en Gestión y Desarrollo Social.' } },
      { ch: 'a', fu: ['hv'], m: [card('Notaría Tercera de Ibarra', 'Notaria suplente', 0, 40, 420, 1.5)],
        tx: { h: 'En el derecho', b: 'Su hoja de vida registra un cargo de notaria *suplente*.' } }
    ]);
    B('ibarra|4|tray', 'i42', CH2, ['hv', 'crn', 'mib', 'hoyf', 'exd'], [
      { ch: 'a', fu: ['hv', 'crn'], m: [card('Concejo Municipal de Ibarra', 'Concejala', 0, 40, 420, -2, { stamp: '2019–2022' })],
        tx: { kk: K2, h: 'Concejala', b: 'Su primer cargo de *elección* fue en el Concejo.' } },
      { ch: 'a', fu: ['hv', 'crn'], ty: 380, m: [dt('2023–2025', 150)],
        tx: { h: 'Asambleísta', b: 'Por Imbabura. En 2025 buscó la reelección con Avanza y no obtuvo el *escaño*.' }, n: 'De 2023 a 2025, asambleísta por Imbabura. En 2025 buscó la reelección con Avanza y no obtuvo el escaño.' },
      { ch: 'a', fu: ['mib', 'exd'], ty: 380, m: [wd('Doble pago', 140, -2)],
        tx: { b: 'En 2019, una comisión del Concejo concluyó que el Municipio pagó dos veces una expropiación de 2013. Ella era la *abogada* del beneficiario.' }, n: 'Doble pago. En 2019, una comisión del Concejo concluyó que el Municipio pagó dos veces una expropiación de 2013. Ella era la abogada del beneficiario.' },
      { ch: 'a', fu: ['hoyf', 'exd'], m: [card('Municipio de Ibarra · 2019', 'Pidió investigar a Fiscalía, Contraloría y UAFE', 0, 40, 520, 1.5, { fx: 'hv' })],
        tx: { h: 'Su respuesta', b: 'Atribuyó el pago indebido a la administración de 2013 y dijo que el beneficiario ya lo estaba devolviendo. No consta el *resultado* de esas investigaciones.' } }
    ]);
    B('ibarra|4|exp', 'i43', CH3, ['crn', 'exa', 'hoyp', 'hv'], [
      { ch: 'a', fu: ['crn', 'exa'], m: [foto(Dc(s) + 'inscripcion.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 62', b: 'Llega por *Somos Libres*, en una coalición provincial.' } },
      { ch: 'a', fu: ['crn'], ty: 380, m: [dt('1', 300)],
        tx: { h: 'mujer', b: 'Es la única candidata en una papeleta de *cinco*.' }, n: 'Una mujer: es la única candidata en una papeleta de cinco.' },
      { ch: 'a', fu: ['hoyp'], m: [foto(Dc(s) + 'debate.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Su prioridad', b: 'Un nuevo puente en Los Molinos y un parque lineal en las riberas del *Tahuando*.' } },
      reg(['hv'], 'Doctora en Jurisprudencia · magíster', 'Asambleísta (2025)')
    ]);
  }
})();
