/* =====================================================================
   GUION v3 · César Díaz · Movilidad · «Dos horas de ida»
   Fotomontaje conceptual: cada propuesta es una composición que se
   transforma a mitad del plano (fase A: qué propone · fase B: cómo,
   cuándo, cuánto). Texto verificado en el plan (PDF CNE); v1 y v2 en
   /home/claude/guion-diaz.v1/.v2.backup.js. Investigación completa: pilot.js.
   ===================================================================== */
window.GUION = window.GUION || {};
window.GUION['quito:DIAZ|mov'] = {
  chs: [
    { id: 'intro', t: 'Dos horas de ida', k: 'Apertura' },
    { id: 'metro', t: 'Estudiar la ampliación del Metro', k: 'Propuesta 1' },
    { id: 'tren', t: 'Trenes elevados', k: 'Propuesta 2' },
    { id: 'tunel', t: 'Segundo túnel Guayasamín', k: 'Propuesta 3' },
    { id: 'simon', t: 'Ampliar parcialmente la Simón Bolívar', k: 'Propuesta 4' },
    { id: 'pasaje', t: 'Un solo pasaje', k: 'Propuesta 5' },
    { id: 'aceras', t: 'Aceras y ciclovías', k: 'Propuesta 6' },
    { id: 'baches', t: 'Barrios sin baches', k: 'Propuesta 7' },
    { id: 'cierre', t: 'La meta y la cuenta', k: 'Cierre' }
  ],
  shots: [
    { ch: 'intro', c: 'col', th: 'mov', seed: 0, els: ['mov-mapa', 'mov-bus', 'mov-semaforo', 'mov-cono'], h: 'Dos horas de ida', kick: 'César Díaz · Movilidad',
      n: 'Más de *dos horas* por trayecto desde Calderón y los valles hasta el hipercentro: así empieza el diagnóstico de movilidad de César Díaz.', tBw: 1,
      B: { fig: { pre: 'Más de', v: '2', u: 'horas', l: 'por trayecto, desde Calderón y los valles' } }, p: [3] },

    { ch: 'metro', c: 'col', th: 'mov', seed: 1, els: ['mov-metro', 'mov-mapa', 'mov-viaducto', 'mov-parada'], kick: 'Propuesta 1 de 7', h: 'Estudiar la ampliación del Metro',
      n: 'Díaz propone *estudiar* la ampliación del Metro hacia el norte, el sur y los valles. Los estudios comenzarían en *2028*. Construir los ramales completos supera el financiamiento de su periodo y requeriría *crédito adicional*.', atB: /^Los$/,
      B: { fig: { v: '2028', l: 'inicio de estudios · meta 2031: concluidos y en gestión' }, doc: 'p7-costo', hl: ['noconst'], oy: '38%' }, p: [7, 15],
      gl: 'Conducción: Secretaría de Movilidad con EPMTP y EPMMOP, articulada al PMDOT y al PUGS (p. 7). Todo ramal requiere estudios de demanda, factibilidad e impacto antes de anunciarse como compromiso (p. 17). Referencia del plan: el Metro actual costó USD 92–96 millones por km (p. 7).' },

    { ch: 'tren', c: 'col', th: 'mov', seed: 2, els: ['mov-viaducto', 'mov-metro', 'mov-edificios', 'mov-semaforo'], kick: 'Propuesta 2 de 7', h: 'Trenes elevados',
      n: 'Plantea trenes elevados entre Labrador y Zabala, y entre Marín y El Triángulo. Estima unos *450 millones* de dólares y propone financiarlos con una *concesión internacional*.', atB: /^Estima$/,
      B: { fig: { pre: 'USD', v: '450', u: 'millones', l: 'financiamiento: concesión internacional' }, tags: ['Labrador – Zabala', 'Marín – El Triángulo'] }, p: [7, 9] },

    { ch: 'tunel', c: 'col', th: 'mov', seed: 3, els: ['mov-tunel', 'mov-volcan', 'mov-arbol', 'mov-cono'], back: 'mov-volcan', kick: 'Propuesta 3 de 7', h: 'Segundo túnel Guayasamín',
      n: 'Propone *construir* un segundo túnel Guayasamín, hacia Cumbayá y Tumbaco. El plan no precisa su ubicación exacta, su presupuesto ni su cronograma.', atB: /^El$/,
      B: { note: 'Sin ubicación exacta, presupuesto propio ni cronograma en el plan. Para obras grandes menciona recursos propios, crédito multilateral o alianzas público-privadas.' }, p: [7, 9] },

    { ch: 'simon', c: 'col', th: 'mov', seed: 4, els: ['mov-via', 'mov-edificios', 'mov-barrera', 'mov-cono'], kick: 'Propuesta 4 de 7', h: 'Ampliar parcialmente la Simón Bolívar',
      n: 'También plantea *ampliar parcialmente* la avenida Simón Bolívar. El documento no especifica qué tramos se intervendrían ni en qué plazos.', atB: /^El$/,
      B: { note: 'Ampliación parcial: el plan no dice qué tramos ni cuántos carriles. Toda obra se sujeta a estudios antes de convertirse en compromiso (p. 17).' }, p: [7, 17] },

    { ch: 'pasaje', c: 'col', th: 'mov', seed: 5, els: ['mov-bus', 'mov-metro', 'mov-parada', 'mov-ciclista'], kick: 'Propuesta 5 de 7', h: 'Un solo pasaje',
      n: 'Para el transporte público propone *integración física y tarifaria* con pago unificado. Antes de tocar el pasaje haría estudios de demanda y mesas con usuarios, transportistas y ciclistas. Meta: el sistema operando en *2031*. No fija el valor del pasaje.', atB: /^Antes$/,
      B: { steps: ['Integración física y tarifaria, con pago unificado', 'Mesas de movilidad: usuarios, transportistas y ciclistas', 'Estudios de demanda y factibilidad antes de cualquier ajuste tarifario'], fig: null, tags: ['Meta 2031: sistema de integración operando', 'No fija el valor del pasaje'] }, p: [7, 17] },

    { ch: 'aceras', c: 'col', th: 'mov', seed: 6, els: ['mov-ciclista', 'mov-paso', 'mov-arbol2', 'mov-parada'], kick: 'Propuesta 6 de 7', h: 'Aceras seguras y ciclovías',
      n: 'Suma un programa de *aceras seguras, ciclovías y peatonalización*, con un costo de referencia de *80 a 180 dólares* por metro cuadrado. No precisa kilómetros ni calles.', atB: /^con$/,
      B: { fig: { pre: 'USD', v: '80–180', u: 'por m²', l: 'precio de mercado de referencia · sin kilómetros ni calles definidos' } }, p: [7] },

    { ch: 'baches', c: 'col', th: 'mov', seed: 7, els: ['mov-cono', 'mov-via', 'mov-barrera', 'mov-semaforo'], kick: 'Propuesta 7 de 7', h: 'Barrios sin baches',
      n: 'Para el mantenimiento vial barrial y rural, arrancaría en los *primeros 100 días* con un plan emergente de *2 a 4 millones*, a cargo de EPMMOP, EMASEO y la Secretaría de Movilidad.', atB: /^con$/,
      B: { fig: { v: 'DÍA 100', l: 'plan emergente · USD 2–4 millones · cronograma público' }, tags: ['EPMMOP', 'EMASEO', 'Secretaría de Movilidad'] }, p: [7, 15, 17],
      gl: 'Programación: 2027 plan emergente; 2030–2031 cartera de mantenimiento financiada (p. 15).' },

    { ch: 'cierre', c: 'col', th: 'mov', seed: 8, els: ['mov-mapa', 'mov-metro', 'mov-bus', 'mov-ciclista'], h: 'La meta: 60 minutos', kick: 'Cierre',
      n: 'La meta del eje: que el viaje entre la ruralidad y el hipercentro *no supere los 60 minutos* en 2031. Costo referencial: *170 a 380 millones*, una cifra que el propio plan dice que debe ajustarse con estudios.', atB: /^Costo$/,
      B: { fig: { pre: 'USD', v: '170–380', u: 'millones', l: 'costo referencial del eje 2027–2031 · se ajusta con estudios' } }, p: [7, 9, 13] }
  ]
};
