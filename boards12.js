/* Tableros documentales v2 · candidaturas de San Cristóbal (Galápagos).
   Misma metodología que Quito: la tipografía integrada narra; cada dato una
   sola vez; fotos de la carpeta de Drive de cada candidatura (ilustrativas,
   no documentan los hechos narrados). Sin Diario Extra.
   San Cristóbal tiene menos de 100.000 electores: el CNE no organizó debate
   obligatorio. La carpeta de Hugo Caiza llegó sin fotos: sus capítulos se
   arman con fichas hasta que lleguen. Fotos de ciudad: solo las que son de
   San Cristóbal (se excluyeron Bartolomé y Puerto Ayora).
   Cada candidatura cierra con una propuesta de su plan inscrito en el CNE. */
(function () {
  const { make, card } = window.BK;
  const OPT = { q: 'fotos/galapagos-ciudad-', n: 1 };
  const Dc = s => 'docu/gal-' + s + '-';
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
  const nada = (fu, b) => ({ ch: 'a', fu, m: [card('Hoja de vida inscrita en el CNE', 'Cargos públicos: no registra', 0, 40, 520, -1.5, { fx: 'hv' })],
    tx: { kk: K2, h: 'Sin cargos públicos', b } });

  const G = {
    hv: ['Hoja de vida inscrita en el CNE (registros públicos de candidaturas)', ''],
    pl: ['Plan de trabajo inscrito en el CNE (lectura de Tinta Digital)', ''],
    sen: ['Senescyt · registro público de títulos de educación superior (consulta por nombre o cédula)', 'https://www.senescyt.gob.ec/web/guest/consultas'],
    ctr: ['Contraloría General del Estado · declaraciones patrimoniales juradas (cargos públicos declarados)', 'https://www.contraloria.gob.ec/'],
    cne: ['CNE · candidaturas calificadas para las seccionales 2026', 'https://www.cne.gob.ec/'],
    cner: ['CNE · resultados oficiales de las seccionales 2023', 'https://www.cne.gob.ec/'],
    ecq: ['Ecuador Chequea · «Galápagos: el correísmo perdió terreno en las islas» (febrero de 2023)', 'https://ecuadorchequea.com/galapagos-el-correismo-perdio-terreno-en-las-islas/'],
    gad: ['GAD Municipal de San Cristóbal · perfil del alcalde', 'https://gadmsc.gob.ec/team/alcalde-rolando-caiza-carrillo/'],
    tam: ['Teleamazonas · «Corte Constitucional admite a trámite acción contra aumento de tasas de ingreso a Galápagos»', 'https://www.teleamazonas.com/corte-constitucional-tramite-accion-tasas-galapagos/'],
    euo: ['El Universo · «ADN anuncia nuevas precandidaturas para Galápagos» (julio de 2026)', 'https://www.eluniverso.com/noticias/politica/adn-anuncia-nuevas-precandidaturas-para-galapagos-nota/'],
    him: ['Himno de Galápagos (1973), coro · Wikisource', 'https://es.wikisource.org/wiki/Himno_de_Gal%C3%A1pagos_(Ecuador)']
  };
  const SRC = ids => ids.map(i => [i, ...G[i]]);
  const B = (key, id, ch, src, EV) => { window.BOARDS[key] = make(id, 0, ch, SRC(src), lay(EV), OPT) };

  /* ===================== MANUEL ANDRADE · galapagos|0 ===================== */
  {
    const s = 'andrade'; NOM = 'Manuel Andrade';
    B('galapagos|0|origen', 'g01', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 140, -50, 360, -2)], ty: 500,
        tx: { kk: K1, h: 'El abogado', b: 'Manuel Andrés *Andrade Vera*. Abogado e ingeniero en Desarrollo de Negocios Bilingüe.' } },
      { ch: 'a', fu: ['hv', 'sen'], ty: 380, m: [dt('2', 300)],
        tx: { h: 'maestrías', b: 'En Derecho Constitucional y en Derecho Administrativo, con mención en *contratación pública*.' }, n: 'Dos maestrías: en Derecho Constitucional y en Derecho Administrativo, con mención en contratación pública.' }
    ]);
    B('galapagos|0|tray', 'g02', CH2, ['hv', 'ctr'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Hospital General Oskar Jandl', 'Analista de Talento Humano', 0, 40, 460, -2)],
        tx: { kk: K2, h: 'En el hospital', b: 'Su único cargo público registrado está en el hospital de la *isla*.' } },
      { ch: 'a', fu: ['hv'], m: [foto(Dc(s) + 'radio.webp', 160, -40, 280, 1.5)], ty: 520,
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida no detalla fechas, y no encontramos cobertura de prensa sobre su *trayectoria*.' } }
    ]);
    B('galapagos|0|exp', 'g03', CH3, ['cne', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], m: [foto(Dc(s) + 'reconocimiento.webp', 160, -50, 320, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Lista 61', b: 'Llega por el Movimiento de Identidad *Provincial*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('2 de 49', 220)],
        tx: { h: 'viviendas', b: 'Son las que su plan reporta conectadas al alcantarillado en Floreana; propone priorizarla junto a Puerto *Baquerizo*.' }, n: 'Dos de cuarenta y nueve viviendas: son las que su plan reporta conectadas al alcantarillado en Floreana; propone priorizarla junto a Puerto Baquerizo.' },
      reg(['hv', 'sen'], 'Abogado · magíster', 'Analista (hospital)')
    ]);
  }

  /* ===================== HUGO CAIZA · galapagos|1 (sin fotos aún) ===================== */
  {
    NOM = 'Hugo Caiza';
    B('galapagos|1|origen', 'g11', CH1, ['hv', 'sen', 'gad'], [
      { ch: 'a', fu: ['hv', 'sen', 'gad'], m: [card('Registro de títulos', 'Ingeniero civil', 0, 40, 420, -2, { fx: 'hv' })],
        tx: { kk: K1, h: 'El ingeniero', b: 'Hugo Rolando *Caiza Carrillo*. Ingeniero civil.' } },
      { ch: 'a', fu: ['hv'], m: [card('Hoja de vida inscrita en el CNE', 'Un solo cargo público registrado', 0, 40, 480, 1.5, { fx: 'hv' })],
        tx: { h: 'Lo que no consta', b: 'Su hoja de vida inscrita no detalla otros cargos antes de la *Alcaldía*.' } }
    ]);
    B('galapagos|1|tray', 'g12', CH2, ['cner', 'ecq', 'gad', 'tam'], [
      { ch: 'a', fu: ['cner', 'ecq', 'gad'], ty: 380, m: [dt('38,49%', 220)],
        tx: { kk: K2, h: 'en 2023', b: 'Ganó la Alcaldía con el PSC y Galápagos Poder *Ciudadano*.' }, n: 'Treinta y ocho coma cuarenta y nueve por ciento en 2023: ganó la Alcaldía con el PSC y Galápagos Poder Ciudadano.' },
      { ch: 'a', fu: ['tam'], m: [card('Corte Constitucional · 2024', 'Demanda contra el alza de la tarifa de ingreso a Galápagos: admitida, sin suspender el cobro', 0, 40, 540, 1.5, { fx: 'hv' })],
        tx: { h: 'Contra la tarifa', b: 'Como alcalde pidió tarifas distintas para quienes navegan y quienes se hospedan en *tierra*.' } }
    ]);
    B('galapagos|1|exp', 'g13', CH3, ['cne', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne'], ty: 380, m: [wd('Reelección', 130, -2)],
        tx: { kk: K3, b: 'Busca un segundo periodo con la *Alianza por la Prosperidad*.' }, n: 'Reelección. Busca un segundo periodo con la Alianza por la Prosperidad.' },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Residuos', 130, -2)],
        tx: { b: 'Su plan propone repotenciar el centro de tratamiento con economía circular, junto al MAATE y el Consejo de *Gobierno*.' }, n: 'Residuos. Su plan propone repotenciar el centro de tratamiento con economía circular, junto al MAATE y el Consejo de Gobierno.' },
      reg(['hv', 'sen'], 'Ingeniero civil', 'Alcalde (en funciones)')
    ]);
  }

  /* ===================== ZENAIDA FREIRE · galapagos|2 ===================== */
  {
    const s = 'freire'; NOM = 'Zenaida Freire';
    B('galapagos|2|origen', 'g21', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'simulacro.webp', 150, -60, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'La abogada', b: 'Zenaida Mariela *Freire Escarabay*. Abogada.' } },
      { ch: 'a', fu: ['hv', 'sen'], m: [card('Registro de títulos', 'Guía profesional de turismo', 0, 40, 460, 1.5)],
        tx: { h: 'Guía', b: 'También tiene título de guía profesional de *turismo*.' } }
    ]);
    B('galapagos|2|tray', 'g22', CH2, ['hv', 'ctr'], [
      nada(['hv', 'ctr'], 'Su hoja de vida inscrita no registra cargos públicos, y no encontramos cobertura de prensa sobre su *trayectoria*.')
    ]);
    B('galapagos|2|exp', 'g23', CH3, ['cne', 'him', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'him'], m: [foto(Dc(s) + 'afiche.webp', 160, -50, 320, -1.5)], ty: 520,
        tx: { kk: K3, h: 'Somos Luz y Esperanza', b: 'Su movimiento lleva el verso con el que abre el coro del himno de *Galápagos*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [dt('100%', 280)],
        tx: { h: 'de aguas urbanas tratadas', b: 'Es la meta al 2031 de la nueva planta de tratamiento que propone, con la obra en *2030*.' }, n: 'Cien por ciento de aguas urbanas tratadas: es la meta al 2031 de la nueva planta de tratamiento que propone, con la obra en 2030.' },
      reg(['hv', 'sen'], 'Abogada · guía de turismo', 'No registra')
    ]);
  }

  /* ===================== JEIMY OCHOA · galapagos|3 ===================== */
  {
    const s = 'ochoa'; NOM = 'Jeimy Ochoa';
    B('galapagos|3|origen', 'g31', CH1, ['hv', 'sen'], [
      { ch: 'a', fu: ['hv', 'sen'], m: [foto(Dc(s) + 'retrato.webp', 150, -50, 340, -2)], ty: 520,
        tx: { kk: K1, h: 'La veterinaria', b: 'Jeimy Solange *Ochoa Caiza*. Médica veterinaria y magíster en Sanidad Animal.' } }
    ]);
    B('galapagos|3|tray', 'g32', CH2, ['hv', 'ctr'], [
      { ch: 'a', fu: ['hv', 'ctr'], m: [card('Hoja de vida inscrita en el CNE', 'Teniente política', 0, 40, 440, -2)],
        tx: { kk: K2, h: 'Teniente política', b: 'Es el único cargo público que registra: representante del *Ejecutivo* en territorio.' } },
      { ch: 'a', fu: ['hv'], ty: 380, m: [wd('Sin fechas', 130, -2)],
        tx: { b: 'Su hoja de vida no detalla cuándo ni en qué parroquia ejerció ese *cargo*.' }, n: 'Sin fechas. Su hoja de vida no detalla cuándo ni en qué parroquia ejerció ese cargo.' }
    ]);
    B('galapagos|3|exp', 'g33', CH3, ['cne', 'euo', 'pl', 'hv', 'sen'], [
      { ch: 'a', fu: ['cne', 'euo'], m: [foto(Dc(s) + 'equipo.webp', 60, 0, 540, -1.5)],
        tx: { kk: K3, h: 'Lista 7', b: 'ADN la presentó como precandidata en *julio de 2026*.' } },
      { ch: 'a', fu: ['pl'], ty: 380, m: [wd('Faenamiento', 120, -2)],
        tx: { b: 'Su plan propone un nuevo centro municipal de faenamiento con tratamiento de *efluentes*.' }, n: 'Faenamiento. Su plan propone un nuevo centro municipal de faenamiento con tratamiento de efluentes.' },
      reg(['hv', 'sen'], 'Médica veterinaria · magíster', 'Teniente política')
    ]);
  }
})();
