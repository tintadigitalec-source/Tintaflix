/* Tableros documentales v2 · candidaturas de Cuenca.
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados); tarjetas tipográficas con nombres
   oficiales tal como aparecen en las fuentes. Sin Diario Extra.
   Procesos judiciales: se nombra la etapa exacta y la respuesta de la persona. */
(function () {
  const { make, card, foto } = window.BK;
  const OPT = { q: 'fotos/cuenca-ciudad-', n: 6 };
  const Dc = s => 'docu/cue-' + s + '-';
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
    cner: ['CNE · resultados oficiales de procesos electorales anteriores', 'https://www.cne.gob.ec/'],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    pci: ['Primicias · «Cuenca tiene nueve candidatos inscritos para la Alcaldía» (17 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/candidatos-alcalde-cuenca-prefecto-azuay-inscripciones-cne-130045/'],
    tac: ['Teleamazonas · «¿Quiénes son los candidatos a la Alcaldía de Cuenca y cuáles son sus principales propuestas?» (12 de noviembre de 2026)', 'https://www.teleamazonas.com/actualidad/noticias/politica/quienes-son-candidatos-alcaldia-cuenca-son-principales-propuestas-132937/'],
    ecm: ['El Mercurio · «Los retos de los candidatos que buscan la alcaldía de Cuenca» (20 de agosto de 2026)', 'https://elmercurio.com.ec/principal/2026/08/20/retos-candidatos-alcaldia-cuenca/'],
    emt: ['El Mercurio · «Tres rostros debutan para la Alcaldía de Cuenca en las elecciones» (2 de septiembre de 2026)', 'https://elmercurio.com.ec/actualidad/2026/09/02/tres-rostros-debutan-para-la-alcaldia-de-cuenca-en-las-elecciones/'],
    /* Cabrera */
    pc13: ['Primicias · «Cuenca ya suma 13 precandidatos para la Alcaldía» (julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/precandidatos-alcaldia-cuenca-lloret-palacios-carrasco-cabrera-cne-126966/'],
    emca: ['El Mercurio · «Marcelo Cabrera será candidato a la Asamblea Nacional en las elecciones de 2025» (2024)', 'https://elmercurio.com.ec/?p=1098354'],
    emcn: ['El Mercurio · «Marcelo Cabrera: “Cuenca necesita recuperar el norte”» (septiembre de 2026)', 'https://elmercurio.com.ec/?p=1280654'],
    vcab: ['Vistazo · «Marcelo Cabrera, de alcaldías y prefecturas al Ministerio de Transporte y Obras Públicas» (2021)', 'https://www.vistazo.com/marcelo-cabrera-de-alcaldias-y-prefecturas-al-ministerio-de-transporte-y-obras-publicas-DG282731'],
    pl23: ['Primicias · «Quién es Juan Cristóbal Lloret, el prefecto electo de Azuay» (febrero de 2023)', 'https://primicias.ec/noticias/seccionales-2023/perfil-juancristoballloret-prefecto-azuay'],
    emx: ['El Mercurio · «Dos exministros quieren llegar a la Alcaldía de Cuenca en estas elecciones» (2026)', 'https://elmercurio.com.ec/?p=1277121'],
    /* Carrasco */
    emcar: ['El Mercurio · «Paúl Carrasco: “experiencia y energía para el cambio”» (30 de septiembre de 2026)', 'https://elmercurio.com.ec/elecciones-seccionales-2027/2026/09/30/paul-carrasco-experiencia-energia/'],
    empc: ['El Mercurio · «Yaku Pérez y Paúl Carrasco: de candidatos presidenciales a la Alcaldía de Cuenca» (2026)', 'https://elmercurio.com.ec/?p=1276629'],
    emgb: ['El Mercurio · «Dos exgobernadores de Azuay buscan la Alcaldía de Cuenca» (2026)', 'https://elmercurio.com.ec/?p=1276948'],
    epar: ['Expreso · «La carrera por Cuenca: los precandidatos a la Alcaldía» (julio de 2026)', 'https://www.expreso.ec/cuenca/carrera-cuenca-precandidatos-alcaldia-seccionales-2026-287949.html'],
    tpe: ['Teleamazonas · «Fiscalía procesó a exprefecto del Azuay por presunto peculado» (3 de diciembre de 2024)', 'https://www.teleamazonas.com/fiscalia-proceso-exprefecto-azuay-peculado/'],
    emav: ['El Mercurio · «Caso Paúl Carrasco: a dónde fueron las avionetas…» (4 de diciembre de 2024)', 'https://elmercurio.com.ec/cuenca/2024/12/04/paul-carrasco-avionetas-delito/'],
    eu23: ['El Universo · «Paúl Carrasco, nuevo gobernador de Azuay» (5 de mayo de 2023; con datos de la Función Judicial)', 'https://www.eluniverso.com/noticias/ecuador/paul-carrasco-nuevo-gobernador-de-azuay-nota/'],
    pgob: ['Primicias · «Paúl Carrasco plantea un “pacto de gobernabilidad” para Azuay» (8 de mayo de 2023)', 'https://www.primicias.ec/noticias/politica/paul-carrasco-pacto-gobernabilidad-azuay/'],
    /* Lloret */
    plr: ['Primicias · «Juan Cristóbal Lloret renuncia la Prefectura de Azuay para postularse a la Alcaldía de Cuenca» (agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/juan-cristobal-lloret-renuncia-prefectura-azuay-alcaldia-cuenca-130194/'],
    emlr: ['El Mercurio · «Juan Cristóbal Lloret presentó su renuncia a la Prefectura de Azuay» (12 de agosto de 2026)', 'https://elmercurio.com.ec/?p=1273996'],
    pla: ['Primicias · «Juan Cristóbal Lloret sella alianza con el movimiento de Cristian Zamora» (8 de julio de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/alianza-lloret-zamora-renovacion-partido-socialista-correismo-alcaldia-cuenca-127420/'],
    eme: ['El Mercurio · «Alcaldía de Cuenca: ¿experiencia o renovación para 2027?» (28 de agosto de 2026)', 'https://elmercurio.com.ec/principal/2026/08/28/alcaldia-cuenca-experiencia-renovacion/'],
    /* Mera */
    emd: ['El Mercurio · «Diana Mera completa los nueve candidatos a la Alcaldía de Cuenca» (septiembre de 2026)', 'https://elmercurio.com.ec/?p=1278947'],
    emmi: ['El Mercurio · «Blindaje ante minería dicen los candidatos a la Alcaldía de Cuenca» (2026)', 'https://elmercurio.com.ec/?p=1284989'],
    /* Morales */
    emm: ['El Mercurio · «Leonardo Morales, candidato a la Alcaldía de Cuenca, marca sus líneas rojas» (septiembre de 2026)', 'https://elmercurio.com.ec/?p=1280149'],
    ectce: ['El Comercio · «TCE archivó denuncias contra el alcalde de Cuenca, Cristian Zamora» (mayo de 2026)', 'https://www.elcomercio.com/actualidad/politica/tce-archivo-denuncias-alcalde-cuenca-cristian-zamora/'],
    emap: ['El Mercurio · «TCE niega apelación a Guarderas y Morales…» (junio de 2026)', 'https://elmercurio.com.ec/?p=1264714'],
    /* Palacios */
    emp: ['El Mercurio · «Pedro Palacios ofrece un plan de seguridad» (18 de septiembre de 2026)', 'https://elmercurio.com.ec/cuenca/2026/09/18/pedro-palacios-plan-seguridad/'],
    eu19: ['El Universo · «Pedro Palacios, virtual nuevo alcalde de Cuenca» (24 de marzo de 2019)', 'https://www.eluniverso.com/noticias/2019/03/24/nota/7250999/pedro-palacios-virtual-nuevo-alcalde-cuenca'],
    pmg: ['Primicias · agrupaciones políticas en Azuay: Nueva Generación e Igualdad (2022)', 'https://www.primicias.ec/noticias/politica/agrupaciones-politicas-numeros-azuay-yaku-incognita/'],
    ppm: ['Primicias · «Así está el mapa de precandidatos para las alcaldías de Quito, Guayaquil y Cuenca» (junio de 2026)', 'https://www.primicias.ec/politica/precandidatos-alcaldias-quito-guayaquil-cuenca-elecciones-seccionales-ecuador-2026-124386/'],
    epr: ['El Mercurio · primarias de Nueva Generación y Unidad Popular (27 de junio de 2026)', 'https://elmercurio.com.ec/cuenca/2026/06/27/elecciones-primarias-cuenca-2026/'],
    /* Pérez */
    emcm: ['El Mercurio · «Yaku Pérez propone construir el cable metro para Cuenca» (14 de septiembre de 2026)', 'https://elmercurio.com.ec/elecciones-seccionales-2027/2026/09/14/yaku-perez-cable-metro/'],
    kyp: ['KCH Comunicación · «Yaku Pérez va por la Alcaldía de Cuenca con alianza electoral» (julio de 2026)', 'https://kchcomunicacion.com/?p=490333'],
    eyq: ['Expreso · «¿Quiénes suenan para la Alcaldía de Cuenca y la Prefectura del Azuay?» (2026)', 'https://www.expreso.ec/cuenca/quienes-suenan-alcaldia-cuenca-prefectura-azuay-elecciones-2026-284614.html'],
    vyp: ['Vistazo · «Yaku Pérez buscará la Alcaldía de Cuenca con la alianza “Unidos por el Agua”» (21 de julio de 2026)', 'https://www.vistazo.com/politica/2026-07-21-yaku-perez-alcaldia-de-cuenca-alianza-unidos-por-el-agua-CD11123717'],
    /* Riquetti */
    emr: ['El Mercurio · «Riquetti ofrece regresar a la Doce de Abril como bidireccional» (15 de septiembre de 2026)', 'https://elmercurio.com.ec/elecciones-seccionales-2027/2026/09/15/riquetti-doce-abril-bidireccional/'],
    /* Vega */
    pva: ['Primicias · «Juan Carlos Vega regresa al Gobierno como nuevo ministro de Agricultura» (18 de noviembre de 2025)', 'https://www.primicias.ec/politica/juan-carlos-vega-ministerio-agricultura-cambios-gabinete-daniel-noboa-109693/'],
    emva: ['El Mercurio · «El cuencano Juan Carlos Vega asume el Ministerio de Agricultura y Ganadería» (18 de noviembre de 2025)', 'https://elmercurio.com.ec/?p=1225658'],
    ecvr: ['El Comercio · renuncia de Juan Carlos Vega al Ministerio de Agricultura (1 de agosto de 2026)', 'https://www.elcomercio.com/actualidad/mensaje-ministro-agricultura-renuncia/'],
    pvr: ['Primicias · «Juan Carlos Vega presenta su renuncia al Ministerio de Agricultura para buscar la Alcaldía de Cuenca» (1 de agosto de 2026)', 'https://www.primicias.ec/politica/elecciones/seccionales-adelantadas-2027/juan-carlos-vega-candidato-alcaldia-cuenca-ministerio-agricultura-129374/'],
    emvs: ['El Mercurio · «Juan Carlos Vega plantea seguridad como prioridad» (septiembre de 2026)', 'https://elmercurio.com.ec/?p=1279824']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== MARCELO CABRERA · cuenca|0 ===================== */
  {
    const s = 'cabrera';
    B('cuenca|0|origen', 'c01', CH1, ['hv', 'ecm', 'vcab'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero', b: 'Hugo Marcelo *Cabrera Palacios*. Ingeniero civil, con una maestría en Ciencias.' } },
      { ch: 'a', fu: ['ecm', 'vcab'], m: [card('Universidad de Cuenca', 'Facultad de Ingeniería · docente', 0, 40, 480, 1.5)],
        tx: { h: 'En el aula', b: 'Fue *catedrático* de la Facultad de Ingeniería de la Universidad de Cuenca.' } }
    ]);
    B('cuenca|0|tray', 'c02', CH2, ['ecm', 'pc13', 'vcab', 'emca', 'emcn'], [
      { ch: 'a', fu: ['ecm', 'emcn'], m: [foto(Dc(s) + 'mercurio.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { kk: K2, h: 'Prefecto y alcalde', b: 'Empezó en la *Prefectura del Azuay*, que dirigió dos periodos seguidos.' } },
      { ch: 'a', fu: ['pc13', 'vcab'], ty: 380, m: [dt('×2', 300)],
        tx: { h: 'Alcalde de Cuenca', b: 'Dos periodos; el segundo, de *2014 a 2019*, con la alianza Participa-Igualdad.' }, n: 'Dos veces alcalde de Cuenca. El segundo periodo, de 2014 a 2019, con la alianza Participa-Igualdad.' },
      { ch: 'a', fu: ['emca'], m: [card('Asamblea Nacional → MTOP', 'Asambleísta por Azuay · ministro de Transporte y Obras Públicas', 0, 40, 560, -1.5, { stamp: '2021' })],
        tx: { h: 'Diez días en la curul', b: 'Ganó un escaño en 2021 y lo dejó casi enseguida: Guillermo Lasso lo nombró *ministro de Transporte*.' } },
      { ch: 'a', fu: ['ecm'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes consultadas no detallan *resultados medibles* de sus gestiones. Queda como vacío, no como juicio.' }, n: 'Lo que no consta. Las fuentes consultadas no detallan resultados medibles de sus gestiones. Queda como vacío, no como juicio.' }
    ]);
    B('cuenca|0|exp', 'c03', CH3, ['pc13', 'emx', 'hv', 'sen', 'ctr', 'cner'], [
      { ch: 'a', fu: ['emx'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 82 y 21', b: 'Llega por la alianza *En Equidad*: su movimiento, Igualdad, y Creo.' } },
      { ch: 'a', fu: ['cner'], ty: 380, m: [dt('0,65', 280)],
        tx: { h: 'puntos', b: 'En 2023 perdió la *Prefectura* del Azuay por esa diferencia frente a Juan Cristóbal Lloret.' }, n: 'Cero coma sesenta y cinco puntos. En 2023 perdió la Prefectura del Azuay por esa diferencia frente a Juan Cristóbal Lloret.' },
      { ch: 'a', fu: ['pc13'], m: [plan(s)],
        tx: { kk: '2026', h: 'Quinta vez', b: 'Es su quinta postulación a la *Alcaldía de Cuenca*.' } },
      reg(['hv', 'sen', 'ctr'], 'Ingeniero civil · máster', 'Ministro de Transporte (2022)')
    ]);
  }

  /* ===================== PAÚL CARRASCO · cuenca|1 ===================== */
  {
    const s = 'carrasco';
    B('cuenca|1|origen', 'c11', CH1, ['hv', 'emcar', 'epar'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'oficina.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El agrónomo', b: 'Paúl Ernesto *Carrasco Carpio*. Ingeniero agropecuario.' } },
      { ch: 'a', fu: ['epar', 'emcar'], m: [card('Participa', 'Movimiento político · fundado en 2013', 0, 40, 440, 1.5)],
        tx: { h: 'Fundador', b: 'Creó *Participa*, uno de los dos movimientos que hoy lo respaldan.' } }
    ]);
    B('cuenca|1|tray', 'c12', CH2, ['emcar', 'eu23', 'pgob', 'tpe', 'emav', 'hv', 'ctr'], [
      { ch: 'a', fu: ['emcar'], ty: 380, m: [dt('×3', 300)],
        tx: { kk: K2, h: 'Prefecto del Azuay', b: 'Tres periodos *consecutivos* al frente de la Prefectura.' }, n: 'Capítulo 2. Tres veces prefecto del Azuay, en periodos consecutivos.' },
      { ch: 'a', fu: ['pgob', 'emcar'], m: [card('Gobernación del Azuay', 'Gobernador · designado por Guillermo Lasso', 0, 40, 500, -2, { stamp: '2023' })],
        tx: { h: 'Gobernador', b: 'Al asumir propuso un pacto político para la provincia centrado en *seguridad y vialidad*.' } },
      { ch: 'a', fu: ['eu23'], m: [card('Función Judicial · 2011', 'Peculado · suspensión condicional con trabajo comunitario', 0, 40, 560, 1.5, { fx: 'hv' })],
        tx: { h: 'Un caso de 2011', b: 'Siendo prefecto, aceptó por escrito haber usado maquinaria y personal de la Prefectura en *terrenos privados*. Acordó con la Fiscalía hacer trabajo comunitario en lugar de ir a juicio.' } },
      { ch: 'a', fu: ['tpe', 'emav'], m: [card('Fiscalía · diciembre de 2024', 'Procesado por presunto peculado · alquiler de avionetas 2014–2018 · sin sentencia', 0, 40, 560, -1.5, { fx: 'hv' })],
        tx: { h: 'Un proceso abierto', b: 'Le formularon cargos por *28 contrataciones* de vuelos privados que, según la Contraloría, perjudicaron a la Prefectura. No encontramos una respuesta pública suya.' } },
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Municipio de Lago Agrio', 'Asesor', 0, 40, 420, 2, { stamp: '2025' })],
        tx: { h: 'Último cargo', b: 'Su paso más reciente por lo público fue como *asesor* municipal en Sucumbíos.' } }
    ]);
    B('cuenca|1|exp', 'c13', CH3, ['empc', 'emgb', 'pci', 'epar', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: ['epar'], m: [foto(Dc(s) + 'mitin.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 62 y 107', b: 'Llega por *Cuencanos como Vos*: Participa y Renace.' } },
      { ch: 'a', fu: ['empc', 'emgb'], ty: 380, m: [dt('4.º', 300)],
        tx: { h: 'Dos veces', b: 'Buscó la Alcaldía en 2019 y en 2023; en ambas quedó en *cuarto* lugar.' }, n: 'Cuarto lugar. Buscó la Alcaldía en 2019 y en 2023; en ambas elecciones quedó cuarto.' },
      { ch: 'a', fu: ['empc'], m: [card('Elección presidencial 2021', 'Juntos Podemos · 0,21 %', 0, 40, 440, 1.5)],
        tx: { h: 'También la Presidencia', b: 'Fue candidato presidencial en *2021*.' } },
      { ch: 'a', fu: ['pci'], m: [foto(Dc(s) + 'gradas.webp', 160, -40, 300, 2)], ty: 500,
        tx: { kk: '2026', h: 'Tercer intento', b: 'Vuelve a la carrera por *tercera vez*.' } },
      reg(['hv', 'sen', 'ctr'], 'Ingeniero agropecuario', 'Asesor municipal (2025)')
    ]);
  }

  /* ===================== JUAN CRISTÓBAL LLORET · cuenca|2 ===================== */
  {
    const s = 'lloret';
    B('cuenca|2|origen', 'c21', CH1, ['hv', 'pl23'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'sofa.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero comercial', b: 'Juan Cristóbal *Lloret Valdivieso*. Ingeniero comercial.' } },
      { ch: 'a', fu: ['pl23'], ty: 380, m: [wd('Toda en lo público', 104, -2)],
        tx: { b: 'Según su perfil, toda su trayectoria se ha desarrollado en la *función pública*.' }, n: 'Toda en lo público. Según su perfil, toda su trayectoria se ha desarrollado en la función pública.' }
    ]);
    B('cuenca|2|tray', 'c22', CH2, ['pl23', 'emgb', 'eme', 'hv', 'cner'], [
      { ch: 'a', fu: ['pl23'], m: [card('Municipio de Cuenca', 'Secretario de Gobierno · asesor · coordinador de gestión', 0, 40, 540, -2)],
        tx: { kk: K2, h: 'Hombre de confianza', b: 'Ocupó cargos clave en la alcaldía de *Paúl Granda*.' } },
      { ch: 'a', fu: ['eme', 'hv'], m: [card('Secretaría del Agua', 'Subsecretario · Demarcación Hidrográfica de Santiago', 0, 40, 540, 1.5)],
        tx: { h: 'En el Gobierno central', b: 'Dirigió varias instituciones públicas durante la presidencia de *Rafael Correa*.' } },
      { ch: 'a', fu: ['emgb'], ty: 380, m: [dt('19.11.2015', 165)],
        tx: { h: 'Gobernador', b: 'Asumió la Gobernación del Azuay en reemplazo de *Leonardo Berrezueta*. Después fue asambleísta por la provincia.' }, n: 'Diecinueve de noviembre de 2015. Gobernador: asumió la Gobernación del Azuay en reemplazo de Leonardo Berrezueta. Después fue asambleísta por la provincia.' },
      { ch: 'a', fu: ['cner'], m: [foto(Dc(s) + 'atril.webp', 60, 0, 540, -1.5)],
        tx: { kk: '2023–2026', h: 'Prefecto', b: 'Ganó la Prefectura con la Revolución Ciudadana, con el *20,28 %* de los votos.' } }
    ]);
    B('cuenca|2|exp', 'c23', CH3, ['pci', 'pla', 'emlr', 'plr', 'hv', 'sen', 'ctr', 'cne'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'caminata.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 63, 17 y 1', b: 'Llega por *La Provincia en Marcha*: Renovación, el Partido Socialista y Centro Democrático.' } },
      { ch: 'a', fu: ['pci'], ty: 380, m: [wd('Una carta', 140, -2)],
        tx: { kk: 'Julio de 2025', b: 'Firmó una carta para llamar la atención a su líder, *Rafael Correa*.' }, n: 'Una carta. En julio de 2025 firmó una carta para llamar la atención a su líder, Rafael Correa.' },
      { ch: 'a', fu: ['pla'], m: [card('Renovación', 'Movimiento del alcalde suspendido Cristian Zamora', 0, 40, 500, 1.5)],
        tx: { kk: 'Julio de 2026', h: 'La alianza', b: 'Selló un acuerdo con el movimiento de *Cristian Zamora*.' } },
      { ch: 'a', fu: ['emlr', 'plr'], ty: 380, m: [dt('12.08.2026', 165)],
        tx: { h: 'Deja la Prefectura', b: 'Renunció para poder *inscribirse*.' }, n: 'Doce de agosto de 2026. Deja la Prefectura: renunció para poder inscribirse.' },
      reg(['hv', 'sen', 'ctr'], 'Ingeniero comercial', 'Prefecto (2026)')
    ]);
  }

  /* ===================== DIANA MERA · cuenca|3 ===================== */
  {
    const s = 'mera';
    B('cuenca|3|origen', 'c31', CH1, ['hv', 'emd'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'podcast.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'La veterinaria', b: 'Diana Mercedes *Mera Quito*. Médica veterinaria y zootecnista.' } },
      { ch: 'a', fu: ['emd'], m: [card('Universidad de Cuenca', 'Proyectos de investigación · nutrición y recursos agropecuarios', 0, 40, 560, 1.5)],
        tx: { h: 'Investigación', b: 'Se graduó en la Universidad de Cuenca, donde ha *participado* en proyectos de investigación científica.' } }
    ]);
    B('cuenca|3|tray', 'c32', CH2, ['hv', 'emt', 'emmi', 'ctr'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'Su hoja de vida *no registra* funciones en el Estado.' } },
      { ch: 'a', fu: ['emt'], ty: 380, m: [wd('Primera vez', 140, 2)],
        tx: { b: 'Es una de las tres candidaturas que nunca habían participado en una *elección popular*.' }, n: 'Primera vez. Es una de las tres candidaturas que nunca habían participado en una elección popular.' },
      { ch: 'a', fu: ['emmi'], m: [foto(Dc(s) + 'wiphala.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Contra la minería', b: 'Defiende las *fuentes de agua* frente a la minería, como pidió la mayoría en la consulta de Cuenca.' } }
    ]);
    B('cuenca|3|exp', 'c33', CH3, ['emd', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: ['emd'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 18', b: 'Llega por *Pachakutik*.' } },
      { ch: 'a', fu: ['emd'], ty: 380, m: [wd('El reemplazo', 130, -2)],
        tx: { b: 'Pachakutik había inscrito a *Jéssica Yambay*, que renunció. Mera ocupó su lugar.' }, n: 'El reemplazo. Pachakutik había inscrito a Jéssica Yambay, que renunció. Mera ocupó su lugar.' },
      { ch: 'a', fu: ['emd'], m: [plan(s)],
        tx: { kk: 'Septiembre de 2026', h: 'Calificada', b: 'La Junta Electoral del Azuay la calificó: con ella, la papeleta quedó en *nueve*.' } },
      reg(['hv', 'sen', 'ctr'], 'Médica veterinaria', 'No registra')
    ]);
  }

  /* ===================== LEONARDO MORALES · cuenca|4 ===================== */
  {
    const s = 'morales';
    B('cuenca|4|origen', 'c41', CH1, ['hv', 'emm'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'mercurio.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El abogado', b: 'Leonardo Agustín *Morales Ordóñez*. Abogado en libre ejercicio.' } },
      { ch: 'a', fu: ['emm'], ty: 380, m: [dt('+14', 300)],
        tx: { h: 'años', b: 'de ejercicio profesional, dos de ellos como funcionario de la *Corte de Justicia*.' }, n: 'Más de catorce años de ejercicio profesional, dos de ellos como funcionario de la Corte de Justicia.' }
    ]);
    B('cuenca|4|tray', 'c42', CH2, ['hv', 'pci', 'tac'], [
      { ch: 'a', fu: ['hv'], m: [card('Instituto Nacional de Patrimonio Cultural', 'Abogado regional', 0, 30, 520, 1.5), card('MTOP', 'Asesor', 300, 220, 280, -2)],
        tx: { kk: K2, h: 'En el Estado', b: 'Su hoja de vida registra cargos en *Patrimonio* y en el Ministerio de Transporte.' } },
      { ch: 'a', fu: ['pci', 'tac', 'hv'], m: [card('EMOV EP', 'Gerente de Control de Transporte y Tránsito', 0, 40, 500, -2)],
        tx: { h: 'Tránsito de Cuenca', b: 'Dirigió el control de tránsito de la empresa municipal de movilidad durante la alcaldía de *Pedro Palacios*.' } },
      { ch: 'a', fu: ['pci'], ty: 380, m: [wd('Opositor', 150, 2)],
        tx: { b: 'Después se volvió una figura de *oposición* a Palacios.' }, n: 'Opositor. Después se volvió una figura de oposición a Palacios.' }
    ]);
    B('cuenca|4|exp', 'c43', CH3, ['pci', 'ectce', 'emap', 'emm', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'parque.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 8', b: 'Llega por *Avanza*.' } },
      { ch: 'a', fu: ['pci'], ty: 380, m: [dt('2023', 280)],
        tx: { h: 'Primer intento', b: 'Fue candidato a *concejal* de Cuenca.' }, n: 'Dos mil veintitrés. Primer intento: fue candidato a concejal de Cuenca.' },
      { ch: 'a', fu: ['ectce', 'emap'], m: [card('Tribunal Contencioso Electoral', 'Denuncia contra Cristian Zamora · prescrita', 0, 40, 520, 1.5)],
        tx: { kk: 'Mayo de 2026', h: 'La denuncia', b: 'Denunció al alcalde Zamora por una presunta infracción electoral. El TCE no la resolvió en el fondo: había *prescrito*.' } },
      { ch: 'a', fu: ['emm'], m: [foto(Dc(s) + 'cne.webp', 60, 0, 540, -1.5)],
        tx: { h: 'Sus líneas rojas', b: 'No a la *minería* en fuentes de agua; sí a coordinar seguridad con el Gobierno y la Policía.' } },
      reg(['hv', 'sen', 'ctr'], 'Abogado', 'EMOV EP (2022)')
    ]);
  }

  /* ===================== PEDRO PALACIOS · cuenca|5 ===================== */
  {
    const s = 'palacios';
    B('cuenca|5|origen', 'c51', CH1, ['hv', 'ppm', 'emp'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'mercurio.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El ingeniero industrial', b: 'Pedro Renán *Palacios Ullauri*. Ingeniero industrial, con una maestría en Administración de Empresas.' } },
      { ch: 'a', fu: ['ppm', 'emp'], m: [card('Sector privado', 'Áreas administrativa y financiera de empresas', 0, 40, 500, 1.5)],
        tx: { h: 'Antes de la política', b: 'Era conocido en la gestión *administrativa y financiera* de empresas. También es catedrático.' } }
    ]);
    B('cuenca|5|tray', 'c52', CH2, ['eu19', 'emp', 'pmg', 'emt'], [
      { ch: 'a', fu: ['eu19'], ty: 380, m: [dt('2019', 280)],
        tx: { kk: K2, h: 'La sorpresa', b: 'En su debut electoral ganó la Alcaldía frente a *Marcelo Cabrera y Paúl Carrasco*.' }, n: 'Dos mil diecinueve. La sorpresa: en su debut electoral ganó la Alcaldía frente a Marcelo Cabrera y Paúl Carrasco.' },
      { ch: 'a', fu: ['emp', 'emt'], m: [foto(Dc(s) + 'g3.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2019–2023', h: 'Alcalde', b: 'Gobernó Cuenca durante la *pandemia*. Llegó desde el sector privado, sin trayectoria política previa.' } },
      { ch: 'a', fu: ['pmg'], m: [card('Democracia Sí → Nueva Generación', 'Del partido que lo auspició a un movimiento propio', 0, 40, 520, -2)],
        tx: { h: 'Su propio movimiento', b: 'Llegó con *Democracia Sí*, se distanció y fundó Nueva Generación.' } }
    ]);
    B('cuenca|5|exp', 'c53', CH3, ['emp', 'epr', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'calle.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 100', b: 'Llega por *Nueva Generación*.' } },
      { ch: 'a', fu: ['emp'], ty: 380, m: [dt('2023', 280)],
        tx: { h: 'Sin reelección', b: 'Buscó un segundo periodo y *no ganó*.' }, n: 'Dos mil veintitrés. Sin reelección: buscó un segundo periodo y no ganó.' },
      { ch: 'a', fu: ['epr'], m: [plan(s)],
        tx: { kk: '27 de junio de 2026', h: '«Cuenca Universal»', b: 'Su movimiento lo eligió en primarias. Es su *tercera* postulación.' } },
      reg(['hv', 'sen', 'ctr'], 'Ingeniero industrial · MBA', 'Alcalde (2023)')
    ]);
  }

  /* ===================== YAKU PÉREZ · cuenca|6 ===================== */
  {
    const s = 'perez';
    B('cuenca|6|origen', 'c61', CH1, ['hv', 'kyp', 'emcm', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Yaku Sacha *Pérez Guartambel*. Doctor en Jurisprudencia, magíster en Derecho Constitucional.' } },
      { ch: 'a', fu: ['kyp'], m: [card('Ecuarunari', 'Filial de la Sierra de la Conaie · dirigente', 0, 40, 500, 1.5)],
        tx: { h: 'Dirigente indígena', b: 'Dirigió la organización de los pueblos indígenas de la *Sierra*.' } },
      { ch: 'a', fu: ['emcm'], m: [card('Universidad de Cuenca', 'Docente · autor de varios libros', 0, 40, 440, -2, { stamp: '2025' })],
        tx: { h: 'Catedrático', b: 'Es *ambientalista* y docente universitario. Ha escrito varios libros.' } }
    ]);
    B('cuenca|6|tray', 'c62', CH2, ['emcm', 'empc', 'eyq', 'cner'], [
      { ch: 'a', fu: ['emcm'], m: [foto(Dc(s) + 'mesa.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Concejal y prefecto', b: 'Fue concejal de Cuenca y, desde 2019, *prefecto del Azuay* con Pachakutik.' } },
      { ch: 'a', fu: ['empc', 'cner'], ty: 380, m: [dt('19,39 %', 165)],
        tx: { h: '2021', b: 'Renunció a la Prefectura para ser candidato presidencial. Quedó *tercero*.' }, n: 'Diecinueve coma treinta y nueve por ciento. En 2021 renunció a la Prefectura para ser candidato presidencial. Quedó tercero.' },
      { ch: 'a', fu: ['eyq'], m: [card('Quimsacocha', 'Defensa del agua · marcha de Cuenca', 0, 40, 440, -1.5, { stamp: '2025' })],
        tx: { h: 'Por el agua', b: 'Fue una de las figuras visibles de la defensa del agua y participó en la organización de la *marcha* de Cuenca.' } }
    ]);
    B('cuenca|6|exp', 'c63', CH3, ['vyp', 'kyp', 'emcm', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: ['vyp'], m: [foto(Dc(s) + 'g2.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 2, 12 y 20', b: 'Llega por *Unidos por el Agua*: Unidad Popular, la ID y Futuro.' } },
      { ch: 'a', fu: ['kyp'], ty: 380, m: [wd('Somos Agua', 140, -2)],
        tx: { b: 'También lo respalda su agrupación, que aún *no tiene* personería jurídica.' }, n: 'Somos Agua. También lo respalda su agrupación, que aún no tiene personería jurídica.' },
      { ch: 'a', fu: ['emcm', 'vyp'], m: [foto(Dc(s) + 'debate.webp', 60, 0, 540, 1.5)],
        tx: { kk: '2023 y 2026', h: 'Otra vez en la papeleta', b: 'Volvió a ser candidato presidencial en 2023. Ahora va por primera vez por la *Alcaldía*.' } },
      reg(['hv', 'sen', 'ctr'], 'Doctor en Jurisprudencia', 'Docente U. de Cuenca (2025)')
    ]);
  }

  /* ===================== JUAN PABLO RIQUETTI · cuenca|7 ===================== */
  {
    const s = 'riquetti';
    B('cuenca|7|origen', 'c71', CH1, ['hv', 'emr', 'ecm'], [
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 400, -2.5)], ty: 500,
        tx: { kk: K1, h: 'El ingeniero civil', b: 'Juan Pablo *Riquetti Morales*. Ingeniero civil, magíster en Geología Aplicada y Geotecnia.' } },
      { ch: 'a', fu: ['emr', 'ecm'], m: [card('Universidad del Azuay', 'Docente', 0, 40, 420, 1.5)],
        tx: { h: 'Docente', b: 'Ha sido profesor *universitario*.' } }
    ]);
    B('cuenca|7|tray', 'c72', CH2, ['tac', 'pci', 'hv', 'ecm'], [
      { ch: 'a', fu: ['pci'], m: [foto(Dc(s) + 'mercurio.webp', 60, 0, 540, 1.5)],
        tx: { kk: K2, h: 'Círculo de confianza', b: 'Cuando *Cristian Zamora* ganó la Alcaldía, lo sumó a su equipo.' } },
      { ch: 'a', fu: ['tac', 'hv'], m: [card('Municipio de Cuenca', 'Coordinador general de Planificación y Gobernanza', 0, 40, 540, -2, { stamp: '2023–2024' })],
        tx: { h: 'Planificación', b: 'Es su único cargo público registrado.' } },
      { ch: 'a', fu: ['ecm'], ty: 380, m: [wd('Lo que no consta', 110, 2)],
        tx: { b: 'Las fuentes no detallan qué *resultados* dejó esa coordinación.' }, n: 'Lo que no consta. Las fuentes no detallan qué resultados dejó esa coordinación.' }
    ]);
    B('cuenca|7|exp', 'c73', CH3, ['emr', 'emt', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'g2.webp', 160, -40, 300, -1.5)], ty: 500,
        tx: { kk: K3, h: 'Lista 3', b: 'Llega por *Sociedad Patriótica*, el partido de Lucio Gutiérrez.' } },
      { ch: 'a', fu: ['emr'], ty: 380, m: [dt('2023', 280)],
        tx: { h: 'Precandidato', b: 'Buscó una *concejalía* de Cuenca.' }, n: 'Dos mil veintitrés. Precandidato: buscó una concejalía de Cuenca.' },
      { ch: 'a', fu: ['emt', 'emr'], m: [foto(Dc(s) + 'mercado.webp', 160, -40, 300, 1.5)], ty: 500,
        tx: { h: 'Debut en las urnas', b: 'Es su primera elección popular. Su plan parte de la *planificación*.' } },
      reg(['hv', 'sen', 'ctr'], 'Ingeniero civil · magíster', 'Coordinador municipal (2024)')
    ]);
  }

  /* ===================== JUAN CARLOS VEGA · cuenca|8 ===================== */
  {
    const s = 'vega';
    B('cuenca|8|origen', 'c81', CH1, ['hv', 'emva', 'pci', 'ecm', 'sen'], [
      { ch: 'a', fu: ['emva'], m: [foto(Dc(s) + 'mercurio.webp', 60, -20, 540, -2)],
        tx: { kk: K1, h: 'El agrónomo', b: 'Juan Carlos *Vega Malo*. Nació en Cuenca y se graduó de agrónomo en la Escuela Agrícola Panamericana *Zamorano*.' } },
      { ch: 'a', fu: ['hv', 'sen'], m: [card('Universidad de Arkansas · Universidad Cornell', 'Economía agrícola · máster en Economía Aplicada y Gestión', 0, 40, 560, 1.5)],
        tx: { h: 'Estudios en EE. UU.', b: 'Estudió economía con especialización en *agricultura* y una maestría en Cornell.' } },
      { ch: 'a', fu: ['pci', 'ecm'], m: [card('Tarpuq · ensambladoras de electrónica', 'Presidente', 0, 40, 480, -2), card('Cámara de Industrias de Cuenca', 'Exdirectivo', 260, 220, 360, 2)],
        tx: { h: 'Empresario', b: 'Ha presidido empresas *ensambladoras* de tarjetas electrónicas, televisores y radios.' } }
    ]);
    B('cuenca|8|tray', 'c82', CH2, ['pva', 'emva', 'ecvr', 'emvs'], [
      { ch: 'a', fu: ['pva', 'ecvr'], ty: 380, m: [dt('444', 300)],
        tx: { kk: K2, h: 'días', b: 'como *ministro de Economía* de Daniel Noboa, desde noviembre de 2023.' }, n: 'Capítulo 2. Cuatrocientos cuarenta y cuatro días como ministro de Economía de Daniel Noboa, desde noviembre de 2023.' },
      { ch: 'a', fu: ['emvs'], m: [foto(Dc(s) + 'g4.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Obras para Cuenca', b: 'Dice que desde ese cargo viabilizó el asfaltado de la vía *Medio Ejido-Sayausí*.' } },
      { ch: 'a', fu: ['emva', 'pva'], m: [card('Ministerio de Agricultura y Ganadería', 'Ministro', 0, 40, 500, -2, { stamp: '2025–2026' })],
        tx: { kk: '18 de noviembre de 2025', h: 'De vuelta al Gabinete', b: 'Regresó como ministro de *Agricultura*.' } }
    ]);
    B('cuenca|8|exp', 'c83', CH3, ['pvr', 'ecvr', 'emt', 'hv', 'sen', 'ctr'], [
      { ch: 'a', fu: [], m: [foto(Dc(s) + 'noche.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'Llega por *ADN*, el movimiento del presidente Daniel Noboa.' } },
      { ch: 'a', fu: ['pvr', 'ecvr'], ty: 380, m: [dt('1.08.2026', 165)],
        tx: { h: '«Hoy, la causa se llama Cuenca»', b: 'Renunció al Ministerio de *Agricultura* para postularse.' }, n: 'Primero de agosto de 2026. Hoy, la causa se llama Cuenca: renunció al Ministerio de Agricultura para postularse.' },
      { ch: 'a', fu: ['emt'], m: [foto(Dc(s) + 'prensa.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Debut en las urnas', b: 'Es su primera elección *popular*.' } },
      reg(['hv', 'sen', 'ctr'], 'Agrónomo · máster', 'Ministro de Agricultura (2026)')
    ]);
  }
})();
