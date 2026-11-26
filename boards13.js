/* Tableros documentales v2 · candidaturas de Manta (Manabí).
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   Debate obligatorio del CNE el 23 de noviembre: Ecuador Chequea verificó 13
   afirmaciones. Jaime Estrada Bonilla está detenido en Panamá por un pedido de
   extradición de EE. UU.: se cuenta la etapa exacta (acusación, detención
   provisional) y la respuesta de su movimiento; no es una condena.
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/manta-ciudad-', n: 3 };
  const Dc = s => 'docu/mta-' + s + '-';
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
  const chq = (veredicto, b) => ({ ch: 'a', fu: ['ecq'], m: [card('Verificación del debate · 23 de noviembre', veredicto, 0, 40, 540, -1.5, { fx: 'hv' })],
    tx: { h: 'Bajo la lupa', b } });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pl: ['Plan de trabajo inscrito en el CNE (lectura de Tinta Digital)', ''],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    cne: ['CNE · Voto Informado: candidaturas a la Alcaldía de Manta 2026', 'https://votoinformado.cne.gob.ec/voto-informado/dignidad/140/4?nombre=ALCALDE&ambito=C&origen=inicio&provincia=13&canton=450'],
    ecq: ['Ecuador Chequea · «Debate por la Alcaldía de Manta: verificamos 13 afirmaciones» (25 de noviembre de 2026)', 'https://ecuadorchequea.com/debate-alcaldia-manta-ciertas-imprecisas-enganosa-inverificables/'],
    exp: ['Expreso · «Manta: ocho aspirantes buscan la Alcaldía en las próximas elecciones seccionales» (20 de agosto de 2026)', 'https://www.expreso.ec/politica/manta-ocho-aspirantes-buscan-alcaldia-proximas-elecciones-seccionales-293036.html'],
    lic: ['El Diario · «Marciana Valdivieso solicita licencia sin sueldo para participar en las elecciones» (10 de noviembre de 2026)', 'https://www.eldiario.ec/manta/marciana-valdivieso-solicita-licencia-sin-sueldo-para-participar-en-las-elecciones-10112026'],
    elc: ['El Comercio · «Jaime Estrada estará en la papeleta para la Alcaldía de Manta pese a su detención en Panamá»', 'https://www.elcomercio.com/elecciones/jaime-estrada-estara-papeleta-alcaldia-manta-pese-detencion-panama/'],
    spo: ['El Diario · «El Movimiento Sí Podemos rechaza la detención de Jaime Estrada Bonilla y su hijo en Panamá» (4 de noviembre de 2026)', 'https://www.eldiario.ec/manta/el-movimiento-si-podemos-rechaza-la-detencion-de-jaime-estrada-bonilla-y-su-hijo-en-panama-04112026/'],
    eld: ['El Diario · «Manta perfila una reñida carrera por la Alcaldía rumbo a las Elecciones Seccionales 2026» (3 de julio de 2026)', 'https://eldiario.ec/manta/manta-perfila-una-renida-carrera-por-la-alcaldia-rumbo-a-las-elecciones-seccionales-2026-03072026/'],
    eld2: ['El Diario · «Manta ya mueve sus fichas: precandidatos a la Alcaldía emergen entre confirmaciones y silencios» (17 de abril de 2026)', 'https://www.eldiario.ec/lamarea/manta-ya-mueve-sus-fichas-precandidatos-a-la-alcaldia-emergen-entre-confirmaciones-y-silencios-17042026/'],
    deb: ['El Comercio · «Debate por la Alcaldía de Manta empezó con el espacio vacío de Jaime Estrada»', 'https://elcomercio.com/elecciones/debate-por-la-alcaldia-de-manta-empezo-con-el-espacio-vacio-de-jaime-estrada']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== JORGE CEVALLOS · manta|0 ===================== */
  {
    const s = 'cevallos'; NOM = 'Jorge Cevallos';
    B('manta|0|origen', 'm01', CH1, ['hv', 'sen', 'ctr'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'El arquitecto', b: 'Jorge José *Cevallos Macías*. Arquitecto y magíster en Gestión Ambiental.' } },
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Universidad Laica Eloy Alfaro de Manabí', 'Docente', 0, 40, 480, 1.5)],
        tx: { h: 'En las aulas', b: 'Su último cargo registrado es de docente *universitario*.' } }
    ]);
    B('manta|0|tray', 'm02', CH2, ['exp', 'eld', 'hv'], [
      { ch: 'a', fu: ['exp', 'eld'], ty: 380, m: [wd('Congreso Nacional', 92, -2)],
        tx: { kk: K2, b: 'Fue su presidente: el último antes de que la Constituyente lo reemplazara por la *Asamblea*.' }, n: 'Congreso Nacional. Fue su presidente: el último antes de que la Constituyente lo reemplazara por la Asamblea.' },
      { ch: 'a', fu: ['hv', 'eld'], m: [foto(Dc(s) + 'entrevista.webp', 60, 0, 540, 1.5)],
        tx: { h: 'Lo que no consta', b: 'También fue concejal de Manta, pero su hoja de vida inscrita solo registra la *docencia*.' } }
    ]);
    B('manta|0|exp', 'm03', CH3, ['cne', 'ecq', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], ty: 380, m: [wd('Listas 20-4', 130, -2)],
        tx: { kk: K3, b: 'Llega con la alianza *Por la Razón*.' }, n: 'Listas 20-4. Llega con la alianza Por la Razón.' },
      { ch: 'a', fu: ['ecq', 'pl'], ty: 380, m: [dt('52', 300)],
        tx: { h: 'páginas', b: 'Tiene su plan, publicado como imagen. Ecuador Chequea confirmó que en la página 15 propone crear empresas municipales, sin *costos*.' }, n: 'Cincuenta y dos páginas tiene su plan, publicado como imagen. Ecuador Chequea confirmó que en la página 15 propone crear empresas municipales, sin costos.' },
      reg(['hv', 'sen'], 'Arquitecto · magíster', 'Docente (ULEAM)')
    ]);
  }

  /* ===================== JAIME ESTRADA BONILLA · manta|1 ===================== */
  {
    const s = 'estrada'; NOM = 'Jaime Estrada Bonilla';
    B('manta|1|origen', 'm11', CH1, ['hv', 'sen', 'ctr', 'ecq'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'El ingeniero', b: 'Jaime Edulfo *Estrada Bonilla*. Ingeniero comercial.' } },
      { ch: 'a', fu: ['hv', 'ctr', 'ecq'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 500, 1.5, { fx: 'hv' })],
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida no registra cargos, aunque fue *alcalde*.' } }
    ]);
    B('manta|1|tray', 'm12', CH2, ['ecq', 'elc', 'spo'], [
      { ch: 'a', fu: ['ecq'], m: [foto(Dc(s) + 'radio.webp', 60, 0, 540, -1.5)],
        tx: { kk: K2, h: 'Alcalde 2009–2014', b: 'En 2013, bajo su gestión, se aprobó un préstamo de 100 millones del *Banco Mundial*.' } },
      { ch: 'a', fu: ['elc'], m: [card('Panamá · 3 de noviembre de 2026', 'Detención provisional por un pedido de extradición de EE. UU.', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'La acusación', b: 'EE. UU. lo acusa de conspirar para importar cocaína y de posesión de ametralladoras. Es una acusación, no una *condena*.' } },
      { ch: 'a', fu: ['elc', 'spo'], ty: 380, m: [wd('Dos meses', 130, -2)],
        tx: { b: 'Tiene EE. UU. para formalizar la extradición. Su movimiento, Sí Podemos, rechazó la *detención*.' }, n: 'Dos meses tiene Estados Unidos para formalizar la extradición. Su movimiento, Sí Podemos, rechazó la detención.' }
    ]);
    B('manta|1|exp', 'm13', CH3, ['cne', 'elc', 'deb', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'elc', 'deb'], m: [foto(Dc(s) + 'mitin.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 72-111', b: 'Sigue en la papeleta con *Por el Rescate de la Ciudad*. Pidió participar en el debate por vía telemática; su atril quedó vacío.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('80 km', 260)],
        tx: { h: 'de vías', b: 'Es la meta de su plan al 2031, con USD 4 millones al año en *repavimentación*.' }, n: 'Ochenta kilómetros de vías: es la meta de su plan al 2031, con cuatro millones de dólares al año en repavimentación.' },
      reg(['hv', 'sen'], 'Ingeniero comercial', 'No registra')
    ]);
  }

  /* ===================== FERNANDO PICO · manta|2 ===================== */
  {
    const s = 'pico'; NOM = 'Fernando Pico';
    B('manta|2|origen', 'm21', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'Sin títulos registrados', b: 'José Fernando *Pico Arteaga*. No registra títulos de tercer ni cuarto nivel.' } }
    ]);
    B('manta|2|tray', 'm22', CH2, ['hv', 'ctr', 'eld2', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr', 'eld2'], m: [card('Concejo Municipal de Manta', 'Concejal · 2014–2019', 0, 40, 440, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'Su único cargo público registrado es el de *concejal*.' } },
      chq('Impreciso', 'Dijo que la zona norte tiene créditos no reembolsables para agua: los fondos existen, pero son para otra zona y la obra no había *empezado*.')
    ]);
    B('manta|2|exp', 'm23', CH3, ['cne', 'pl', 'ecq', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'casa.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 1-8-61-63', b: 'Llega con *Somos Manabas*.' } },
      { ch: 'a', fu: ['pl', 'ecq'], ty: 380, m: [wd('Agua 24/7', 130, -2)],
        tx: { b: 'Es su proyecto prioritario. Su plan no asigna costos a ningún proyecto ni fija una meta de horas de *servicio*.' }, n: 'Agua veinticuatro siete. Es su proyecto prioritario. Su plan no asigna costos a ningún proyecto ni fija una meta de horas de servicio.' },
      reg(['hv', 'sen'], 'No registra', 'Concejal de Manta')
    ]);
  }

  /* ===================== HERNÁN SALCEDO · manta|3 ===================== */
  {
    const s = 'salcedo'; NOM = 'Hernán Salcedo';
    B('manta|3|origen', 'm31', CH1, ['hv', 'sen', 'ctr'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'El ingeniero comercial', b: 'Hernán Vladimir *Salcedo Loor*. Ingeniero comercial y magíster en Administración de Empresas.' } },
      { ch: 'a', fu: ['hv', 'ctr'], m: [foto(Dc(s) + 'jovenes.webp', 60, 0, 540, 1.5)],
        tx: { h: 'En las aulas', b: 'Su último cargo registrado es de docente en la Universidad Laica Eloy *Alfaro*.' } }
    ]);
    B('manta|3|tray', 'm32', CH2, ['eld', 'ecq'], [
      { ch: 'a', fu: ['eld'], m: [card('Concejo Municipal de Manta', 'Concejal en la administración de Agustín Intriago', 0, 40, 500, -2)],
        tx: { kk: K2, h: 'Concejal', b: 'También es dirigente gremial y docente *universitario*.' } },
      chq('Engañoso', 'Dijo que el plan de Pico no tiene «ni un dólar» para el agua: no asigna costos a ningún proyecto, pero el agua es su prioridad *declarada*.'),
      chq('Cierto', 'Dijo que el plan de Vera tiene solo 10 páginas: tiene exactamente *10*.')
    ]);
    B('manta|3|exp', 'm33', CH3, ['cne', 'eld', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'eld'], m: [foto(Dc(s) + 'charla.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'En las primarias lo escogió Caminantes; se inscribió por *ADN*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('14→20', 220)],
        tx: { h: 'horas de agua', b: 'Es la meta de servicio continuo en zonas consolidadas, con pérdidas de agua bajando al *35 %*.' }, n: 'De catorce a veinte horas de agua: es la meta de servicio continuo en zonas consolidadas, con pérdidas de agua bajando al treinta y cinco por ciento.' },
      reg(['hv', 'sen'], 'Ingeniero comercial · magíster', 'Docente (ULEAM)')
    ]);
  }

  /* ===================== JOSUÉ SUÁREZ · manta|4 ===================== */
  {
    const s = 'suarez'; NOM = 'Josué Suárez';
    B('manta|4|origen', 'm41', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'Sin títulos registrados', b: 'Michael Josué *Suárez Espinar*. No registra títulos de tercer ni cuarto nivel.' } }
    ]);
    B('manta|4|tray', 'm42', CH2, ['hv', 'ctr', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
        tx: { kk: K2, h: 'Sin cargos públicos', b: 'Es su primera candidatura sin un cargo público *registrado*.' } },
      chq('Cierto', 'Dijo que Caza Lagarto no es una planta de tratamiento: es captación y bombeo; el agua se potabiliza en Colorado y El *Ceibal*.')
    ]);
    B('manta|4|exp', 'm43', CH3, ['cne', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'selfie.webp', 150, -50, 340, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 62', b: 'Llega por el movimiento *Caminantes*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('5.100 m³', 220)],
        tx: { h: 'de agua desalinizada al día', b: 'Es la primera fase que propone para zonas rurales y la parte alta, sin costo ni *fecha*.' }, n: 'Cinco mil cien metros cúbicos de agua desalinizada al día: es la primera fase que propone para zonas rurales y la parte alta, sin costo ni fecha.' },
      reg(['hv', 'sen'], 'No registra', 'No registra')
    ]);
  }

  /* ===================== MARCIANA VALDIVIESO · manta|5 ===================== */
  {
    const s = 'valdivieso'; NOM = 'Marciana Valdivieso';
    B('manta|5|origen', 'm51', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'La ingeniera comercial', b: 'Marciana Auxiliadora *Valdivieso Zamora*. Ingeniera comercial y magíster en Administración Pública.' } }
    ]);
    B('manta|5|tray', 'm52', CH2, ['exp', 'lic', 'ecq'], [
      { ch: 'a', fu: ['exp'], ty: 380, m: [wd('2023', 160, -2)],
        tx: { kk: K2, h: 'Alcaldesa', b: 'Electa concejal y designada vicealcaldesa, asumió la Alcaldía tras el asesinato del alcalde Agustín *Intriago*.' }, n: 'Dos mil veintitrés. Electa concejal y designada vicealcaldesa, asumió la Alcaldía tras el asesinato del alcalde Agustín Intriago.' },
      { ch: 'a', fu: ['lic'], m: [card('Concejo Cantonal de Manta', 'Licencia sin sueldo · 12 al 30 de noviembre', 0, 40, 500, 1.5)],
        tx: { h: 'Con licencia', b: 'Se separó del cargo para hacer *campaña*.' } },
      chq('Cierto', 'Dijo que dejaron endeudada a la Alcaldía con 100 millones del Banco Mundial: se aprobaron en 2013; es el monto original, no el *saldo*.')
    ]);
    B('manta|5|exp', 'm53', CH3, ['cne', 'exp', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'exp'], m: [foto(Dc(s) + 'entrevista.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 107', b: 'Es la única mujer en la papeleta y busca la Alcaldía, esta vez por voto popular, con *Mejor Ciudad*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('33', 300)],
        tx: { h: 'áreas', b: 'Del Plan Cantonal de Seguridad promete recuperar; las metas y montos los remite a *anexos*.' }, n: 'Treinta y tres áreas del Plan Cantonal de Seguridad promete recuperar; las metas y montos los remite a anexos.' },
      reg(['hv', 'sen'], 'Ingeniera comercial · magíster', 'Alcaldesa (con licencia)')
    ]);
  }

  /* ===================== BOSCO VERA · manta|6 ===================== */
  {
    const s = 'vera'; NOM = 'Bosco Vera';
    B('manta|6|origen', 'm61', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'El comunicador', b: 'Bosco Adrián *Vera Delgado*. Licenciado en Comunicación y magíster en Ciencia Política.' } }
    ]);
    B('manta|6|tray', 'm62', CH2, ['hv', 'ctr', 'eld', 'ecq'], [
      { ch: 'a', fu: ['hv', 'ctr', 'eld'], m: [card('Municipio de Manta', 'Subdirector de Gestión Patrimonial · exconcejal', 0, 40, 520, -2)],
        tx: { kk: K2, h: 'En el Municipio', b: 'Pasó por el Concejo y luego por la administración *municipal*.' } },
      chq('Cierto', 'Habló de 402 muertes violentas en 2026: coincide con los conteos policiales, aunque la cifra es del distrito y no solo de *Manta*.')
    ]);
    B('manta|6|exp', 'm63', CH3, ['cne', 'pl', 'ecq', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'caminata.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Listas 2-17', b: 'Llega con la alianza *Por el Común*.' } },
      { ch: 'a', fu: ['pl', 'ecq'], ty: 380, m: [dt('61,86%', 190)],
        tx: { h: 'de agua que se pierde', b: 'Propone bajarla a 50–55 % en tres años; su plan tiene 10 *páginas*.' }, n: 'Sesenta y uno coma ochenta y seis por ciento de agua que se pierde: propone bajarla a entre cincuenta y cincuenta y cinco por ciento en tres años; su plan tiene diez páginas.' },
      reg(['hv', 'sen'], 'Lic. en Comunicación · magíster', 'Subdirector (Municipio)')
    ]);
  }
})();
