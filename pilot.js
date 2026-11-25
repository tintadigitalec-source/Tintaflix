/* =====================================================================
   TINTAFLIX · contenido editorial enriquecido (piloto)
   Fuente única: lo usan el perfil, los episodios y el comparador.
   p = página del PDF del plan de trabajo inscrito en el CNE.
   ctx:true  → explicación o contexto de Tinta (no es texto del plan).
   gl        → glosario: término técnico explicado.
   ===================================================================== */
window.RICH = {
/* ---------------------------------------------------------------- */
'quito:DIAZ': {
  pilot: true,
  synopsis: 'César Díaz conoce el Municipio de Quito desde adentro: pasó por la **Secretaría General de Seguridad y Gobernabilidad** y por la **Agencia de Coordinación Distrital del Comercio**, y su último cargo registrado es de **funcionario directivo (2022)**.\n\nAhora cambia el escritorio por la papeleta. Llega con la **lista 4, Pueblo, Igualdad y Democracia (PID)**, y un plan de ocho ejes que arranca por la **seguridad** y apuesta por **un Metro con ramales**. ¿Le alcanzará conocer la casa por dentro para quedarse con las llaves?',
  eps: {
    origen: { t: 'Antes de la papeleta', when: 'Hoja de vida',
      d: 'Ingeniero comercial y **magíster en Conducción y Administración**. Así arranca la hoja de vida que César Díaz inscribió en el CNE: números, gestión y administración pública como punto de partida.' },
    tray: { t: 'La casa por dentro', when: 'Hasta 2022',
      d: 'Toda su trayectoria registrada pasa por el mismo edificio: **el Municipio de Quito**. Coordinó la Agencia Distrital del Comercio, fue **secretario general de Seguridad y Gobernabilidad** y su último cargo registrado es de funcionario directivo, en 2022. Ninguno de elección popular… hasta ahora.' },
    exp: { t: 'El expediente', when: 'Corte: 24 nov. 2026',
      d: 'Antecedentes penales, deudas en firme con el SRI y pensiones alimenticias pendientes. En la consulta a registros públicos, César Díaz **no registra nada en ninguno de los tres**.' },
    seg: { t: '¿Quién vigila la ciudad?', when: 'Plan 2027–2031',
      d: 'Una sala de comando conectada al ECU 911, cámaras que leen placas y una meta que el propio plan pone en números: **homicidios a un dígito por cada 100.000 habitantes**. Cuatro propuestas, de la videovigilancia a la prevención de adicciones.' },
    mov: { t: 'Dos horas de ida', when: 'Plan 2027–2031', pilot: true,
      d: 'Desde Calderón o los valles, llegar al hipercentro puede tomar **más de dos horas por trayecto**. César Díaz responde con un Metro que se ramifica, un segundo túnel Guayasamín y un solo pasaje para todo el transporte público. Seis propuestas y una meta: **viajes de máximo 60 minutos**. ¿Cuánto de eso es obra y cuánto es estudio?' },
    agua: { t: 'Cuando el grifo deja de sonar', when: 'Plan 2027–2031',
      d: 'El Machángara, el Monjas y el San Pedro reciben descargas sin tratamiento suficiente, dice su propio diagnóstico. La apuesta: **descontaminarlos de forma progresiva y proteger las microcuencas** que abastecen a Quito. Dos propuestas; el plan no tiene más en este tema.' },
    amb: { t: 'Una ciudad bajo presión', when: 'Plan 2027–2031',
      d: 'Basura con sensores, más verde para la periferia y obras de mitigación. Tres propuestas para una ciudad de quebradas y laderas donde, según su diagnóstico, **el cambio climático agrava inundaciones y deslizamientos**.' }
  },
  mov: {
    open: [
      { st: 'apertura', viz: 'mapa-tiempo', h: 'Dos horas para llegar',
        b: 'Ese es el punto de partida que el propio plan pone sobre la mesa: desde **Calderón y los valles**, los viajes hacia el hipercentro pueden superar **las dos horas por trayecto**.',
        gl: ['Hipercentro', 'la zona donde se concentran empleos, trámites y servicios de la ciudad.'], p: [3] },
      { st: 'apertura', viz: 'metro-linea', h: 'Un Metro de una sola línea',
        b: 'El diagnóstico describe un Metro que opera como **línea única, de Quitumbe a El Labrador**, sin integración plena con el sur, los valles ni una red de buses alimentadores eficiente. Suma **poca infraestructura para caminar o pedalear** y un mantenimiento vial barrial insuficiente, **sobre todo en la periferia**.',
        gl: ['Alimentador', 'bus que recoge pasajeros en los barrios y los lleva a una estación principal.'], p: [3] },
      { st: 'indice', viz: 'indice', h: 'Seis propuestas en este capítulo',
        b: 'Las vamos a ver una por una: **qué plantea**, **qué significa** y **cómo dice que lo haría**. Y cuando el plan no lo explica, también lo vas a saber.' }
    ],
    props: [
      { id: 'metro', t: 'Un Metro con ramas', icon: 'tren', sub: ['metro'],
        official: 'Plan maestro de expansión del Metro con estudios de ramales al sur, al norte y a los valles, mediante el sistema de tren elevado.',
        scenes: [
          { st: 'problema', viz: 'metro-linea', h: 'Una línea para una ciudad muy larga',
            b: 'Hoy el Metro une **Quitumbe con El Labrador**. Según el diagnóstico del plan, todavía no se integra del todo con **el sur** ni con **los valles**.', p: [3] },
          { st: 'propuesta', viz: 'metro-ramales', h: 'Un Metro que se ramifica',
            b: 'César Díaz propone un **plan maestro de expansión del Metro**, con **estudios de ramales al sur, al norte y a los valles**, mediante un sistema de **tren elevado**.', p: [7] },
          { st: 'significa', viz: 'estudio-obra', vizo: { on: 'estudio' }, h: 'La palabra clave: estudios',
            b: 'Lo que el plan compromete para estos cuatro años es **estudiar** los ramales, no construirlos completos. Su propio documento lo aclara: la construcción integral de nuevos ramales **excede el financiamiento de un solo período**.',
            gl: ['Ramal', 'línea que se desprende de la principal para llegar a otra zona de la ciudad.'], p: [7, 13] },
          { st: 'significa', viz: 'corredores', h: 'Dos corredores con nombre propio',
            b: 'En la columna de costos, el plan menciona **alrededor de USD 450 millones** para implementar el sistema de trenes elevados en dos corredores: **Labrador–Zabala** y **Marín–El Triángulo**, con un modelo de gestión **vía concesión internacional**.',
            gl: ['Concesión', 'contrato en el que una empresa construye u opera una obra durante un tiempo, bajo reglas que fija el Municipio.'], p: [7, 9] },
          { st: 'como', viz: 'instituciones', vizo: { set: 'mov' }, h: '¿Quién llevaría el timón?',
            b: 'La conducción estaría en la **Secretaría de Movilidad** y en las empresas metropolitanas **EPMTP y EPMMOP**, articulada al **PMDOT** y al **PUGS**: los grandes planes de desarrollo y de uso del suelo de Quito.',
            gl: ['EPMTP y EPMMOP', 'Empresa Pública Metropolitana de Transporte de Pasajeros y Empresa Pública Metropolitana de Movilidad y Obras Públicas.'], p: [7] },
          { st: 'como', viz: 'checklist', vizo: { items: ['Demanda', 'Factibilidad', 'Impacto', 'Recién ahí: compromiso'] }, h: 'Antes de cualquier ramal, números',
            b: 'El plan pone una condición: **estudios técnicos de demanda y factibilidad** antes de cualquier ramal. En su matriz de viabilidad agrega que todo ramal debe sustentarse en estudios de demanda, factibilidad e impacto **antes de anunciarse como compromiso**.', p: [7, 17] },
          { st: 'como', viz: 'timeline', vizo: { items: [['2028', 'Inicio de los estudios de ramales'], ['2028', 'Indicador: «estudios de ramales concluidos»'], ['2031', 'Meta: estudios concluidos y en gestión']] }, h: 'El calendario',
            b: 'La programación anual ubica el **inicio de los estudios en 2028**, y ese mismo año aparece como indicador «estudios de ramales concluidos». La meta para 2031: **estudios concluidos y en gestión**.', p: [15, 7] },
          { st: 'detalles', viz: 'presupuesto', vizo: { lo: 170, hi: 380, note: 'Estudios y primeras obras de integración · no incluye construir los ramales' }, h: 'La letra pequeña del costo',
            b: 'El eje de movilidad completo tiene un costo referencial de **USD 170–380 millones** (2027–2031). El plan aclara que esa cifra cubre **estudios y primeras obras de integración**, no la construcción de los ramales, que requeriría **crédito multilateral adicional**. Como referencia cita el costo real del Metro de Quito: **cerca de USD 92–96 millones por kilómetro**.', p: [7] }
        ],
        falta: ['Cuántos kilómetros tendrían los ramales', 'Por dónde pasarían y cuántas estaciones tendrían', 'Cuánto costarían los estudios por separado'],
        cmp: { propone: 'Plan maestro de expansión del Metro con estudios de ramales al sur, al norte y a los valles, mediante tren elevado. Menciona dos corredores: Labrador–Zabala y Marín–El Triángulo.',
          significa: 'En este período se compromete a estudiar los ramales, no a construirlos completos.',
          como: ['Conducción: Secretaría de Movilidad y EPMTP/EPMMOP, articulada al PMDOT y al PUGS', 'Estudios técnicos de demanda y factibilidad previos a cualquier ramal', 'Trenes elevados mediante un modelo de gestión vía concesión internacional'],
          inst: 'Secretaría de Movilidad, EPMTP, EPMMOP', rec: 'Eje completo: USD 170–380 millones (estudios y primeras obras de integración). Trenes elevados: alrededor de USD 450 millones. Construir los ramales requeriría crédito multilateral adicional.',
          plazo: 'Inicio de estudios: 2028. Meta 2031: estudios concluidos y en gestión.', p: [7, 9, 15] } },

      { id: 'tunel', t: 'Un segundo túnel Guayasamín', icon: 'tunel', sub: ['vial'],
        official: 'Construcción del segundo túnel Guayasamín.',
        scenes: [
          { st: 'problema', viz: 'mapa-tiempo', vizo: { focus: 'valles' }, ctx: true, h: 'La puerta hacia los valles',
            b: 'El túnel Guayasamín es uno de los accesos entre el centro-norte de Quito y el valle de Cumbayá–Tumbaco. El plan señala a **los valles** como uno de los orígenes de los viajes de **más de dos horas**.', p: [3] },
          { st: 'propuesta', viz: 'tunel', h: 'Otro túnel',
            b: 'César Díaz propone la **construcción del segundo túnel Guayasamín**.', p: [7] },
          { st: 'significa', viz: 'estudio-obra', vizo: { on: 'obra' }, h: 'Aquí el verbo es construir',
            b: 'A diferencia del Metro, este punto aparece como **obra**: sumar un segundo túnel a ese acceso. El plan **no dice dónde iría exactamente** ni cuántos carriles tendría.', p: [7] },
          { st: 'como', viz: 'checklist', vizo: { items: ['Secretaría de Movilidad', 'EPMTP / EPMMOP', 'Estudios de demanda, factibilidad e impacto'] }, h: 'Con estudios de por medio',
            b: 'No tiene una ruta propia en el plan; aplican las reglas generales del eje: conducción desde la **Secretaría de Movilidad y la EPMTP/EPMMOP**, y una matriz de viabilidad que exige que toda intervención de infraestructura se sustente en **estudios de demanda, factibilidad e impacto** antes de anunciarse como compromiso.', p: [7, 17] },
          { st: 'detalles', viz: 'presupuesto', vizo: { lo: 170, hi: 380, gap: true, note: 'El túnel no tiene un costo propio en el plan' }, h: '¿Y cuánto cuesta?',
            b: 'El plan **no desglosa** el costo del túnel. Para infraestructura de gran escala, menciona como fuentes el **crédito multilateral** y las **alianzas público-privadas reguladas**, además de recursos propios.', p: [7, 9] }
        ],
        falta: ['Costo de la obra', 'Ubicación exacta y número de carriles', 'Año de inicio y de entrega'],
        cmp: { propone: 'Construcción del segundo túnel Guayasamín.', significa: 'Una obra vial nueva en uno de los accesos a los valles.',
          como: ['Conducción: Secretaría de Movilidad y EPMTP/EPMMOP', 'Toda intervención de infraestructura debe sustentarse en estudios de demanda, factibilidad e impacto'],
          inst: 'Secretaría de Movilidad, EPMTP, EPMMOP', rec: 'Sin costo propio. Fuentes generales: recursos propios, crédito multilateral y alianzas público-privadas reguladas.', plazo: 'No especifica.', p: [7, 9, 17] } },

      { id: 'simon', t: 'La Simón Bolívar, por tramos', icon: 'via', sub: ['vial'],
        official: 'Ampliación parcial de la Av. Simón Bolívar.',
        scenes: [
          { st: 'problema', viz: 'avenida', vizo: { stage: 0 }, ctx: true, h: 'La avenida que bordea la ciudad',
            b: 'La avenida Simón Bolívar recorre el oriente de Quito y conecta el sur con el norte sin pasar por el centro. Es una de las vías por donde se mueve el tráfico de largo recorrido.' },
          { st: 'propuesta', viz: 'avenida', vizo: { stage: 1 }, h: 'Más ancha, pero no toda',
            b: 'Propone la **ampliación parcial de la avenida Simón Bolívar**.', p: [7] },
          { st: 'significa', viz: 'avenida', vizo: { stage: 2 }, h: '«Parcial» es la palabra clave',
            b: 'No se trata de ampliar toda la avenida, sino **algunos tramos**. El plan **no dice cuáles** ni cuántos carriles se sumarían. Como el túnel, queda sujeta a la regla del plan: **estudios de demanda, factibilidad e impacto** antes de convertirse en compromiso.', p: [7, 17] }
        ],
        falta: ['Qué tramos se ampliarían', 'Cuántos carriles', 'Costo y fechas'],
        cmp: { propone: 'Ampliación parcial de la Av. Simón Bolívar.', significa: 'Ampliar algunos tramos, no toda la avenida.',
          como: ['Conducción: Secretaría de Movilidad y EPMTP/EPMMOP', 'Estudios de demanda, factibilidad e impacto antes de anunciarse como compromiso'],
          inst: 'Secretaría de Movilidad, EPMTP, EPMMOP', rec: 'Sin costo propio.', plazo: 'No especifica.', p: [7, 17] } },

      { id: 'pasaje', t: 'Un solo pasaje', icon: 'tarjeta', sub: ['integracion'],
        official: 'Integración física y tarifaria del transporte público con pago unificado.',
        scenes: [
          { st: 'problema', viz: 'pasaje', vizo: { stage: 0 }, h: 'Varios sistemas, varios pagos',
            b: 'El diagnóstico habla de un transporte **poco integrado** y de una **presión tarifaria sobre la economía familiar**.', p: [3] },
          { st: 'propuesta', viz: 'pasaje', vizo: { stage: 1 }, h: 'Pagar con un solo sistema',
            b: 'Propone la **integración física y tarifaria del transporte público con pago unificado**.', p: [7] },
          { st: 'significa', viz: 'pasaje', vizo: { stage: 2 }, ctx: true, h: 'Dos ideas en una',
            b: '**Integración física:** que estaciones y paradas estén conectadas para pasar de un servicio a otro sin dar vueltas. **Integración tarifaria:** un esquema de pago común entre Metro, buses y alimentadores. El plan **no detalla** si el transbordo sería gratis, más barato ni cuánto costaría el pasaje.' },
          { st: 'como', viz: 'mesa', vizo: { seats: ['Usuarios', 'Transportistas', 'Ciclistas'] }, h: 'Una mesa con todos',
            b: 'Plantea **mesas de movilidad con usuarios, transportistas y ciclistas**.', p: [7] },
          { st: 'como', viz: 'checklist', vizo: { items: ['Estudios de demanda y factibilidad', 'Estudios de impacto', 'Diálogo y participación temprana', 'Recién ahí: ajuste tarifario'] }, h: 'Ningún ajuste sin estudios',
            b: 'Exige **estudios técnicos de demanda y factibilidad antes de cualquier ajuste tarifario**. Para los impactos tarifarios, la matriz de viabilidad propone **diálogo, estudios de impacto y participación temprana**.', p: [7, 17] },
          { st: 'detalles', viz: 'timeline', vizo: { items: [['2031', 'Meta: sistema de integración tarifaria operando']] }, h: 'La meta',
            b: 'Para 2031, el indicador es concreto: **sistema de integración tarifaria operando**.', p: [7] }
        ],
        falta: ['El valor del pasaje', 'La tecnología de pago', 'Cómo se repartiría lo recaudado entre operadores', 'El costo de implementarlo'],
        cmp: { propone: 'Integración física y tarifaria del transporte público con pago unificado.', significa: 'Un esquema de pago común y conexiones físicas entre servicios. No detalla tarifas.',
          como: ['Mesas de movilidad con usuarios, transportistas y ciclistas', 'Estudios de demanda y factibilidad antes de cualquier ajuste tarifario', 'Diálogo, estudios de impacto y participación temprana'],
          inst: 'Secretaría de Movilidad, EPMTP, EPMMOP', rec: 'No especifica un costo propio.', plazo: 'Meta 2031: sistema de integración tarifaria operando.', p: [7, 17] } },

      { id: 'aceras', t: 'Calles para caminar y pedalear', icon: 'bici', sub: ['activa'],
        official: 'Programa de aceras seguras, ciclovías y peatonalización.',
        scenes: [
          { st: 'problema', viz: 'calle', vizo: { stage: 0 }, h: 'Poco espacio para ir a pie',
            b: 'El plan reconoce un **déficit de infraestructura para el transporte no motorizado**.',
            gl: ['Transporte no motorizado', 'moverse caminando, en bicicleta o en otros medios sin motor.'], p: [3] },
          { st: 'propuesta', viz: 'calle', vizo: { stage: 1 }, h: 'Aceras, ciclovías y calles peatonales',
            b: 'Propone un **programa de aceras seguras, ciclovías y peatonalización**.', p: [7] },
          { st: 'significa', viz: 'calle', vizo: { stage: 2 }, ctx: true, h: 'Más calle para las personas',
            b: 'Más espacio y seguridad para quien camina, carriles para bicicletas y tramos donde el peatón tenga prioridad.',
            gl: ['Peatonalizar', 'cerrar o restringir una calle al tráfico de vehículos para que la usen las personas a pie.'] },
          { st: 'como', viz: 'mesa', vizo: { seats: ['Usuarios', 'Transportistas', 'Ciclistas'], hi: 2 }, h: 'Con ciclistas en la mesa',
            b: 'Las **mesas de movilidad** incluyen a **ciclistas**. Como referencia de costo, el plan usa precios de mercado nacional de **USD 80 a 180 por metro cuadrado** de vía para pavimentación, aceras y ciclovías.', p: [7] }
        ],
        falta: ['Cuántos kilómetros de ciclovías o aceras', 'Qué calles se peatonalizarían', 'En qué años'],
        cmp: { propone: 'Programa de aceras seguras, ciclovías y peatonalización.', significa: 'Más espacio y seguridad para caminar y andar en bicicleta.',
          como: ['Mesas de movilidad con ciclistas', 'Referencia de costo: USD 80–180 por m² de vía'],
          inst: 'Secretaría de Movilidad, EPMTP, EPMMOP', rec: 'Referencia de mercado: USD 80–180 por m² (pavimentación, aceras y ciclovías), dentro del eje de USD 170–380 millones.', plazo: 'No especifica.', p: [7] } },

      { id: 'baches', t: 'Barrios sin baches', icon: 'obra', sub: ['mantenimiento'],
        official: 'Mantenimiento y pavimentación vial barrial y rural.',
        scenes: [
          { st: 'problema', viz: 'baches', vizo: { stage: 0 }, h: 'La periferia, la más olvidada',
            b: 'El diagnóstico apunta a un **mantenimiento vial barrial insuficiente, sobre todo en la periferia**.', p: [3] },
          { st: 'propuesta', viz: 'baches', vizo: { stage: 1 }, h: 'Arreglar las calles de barrio',
            b: 'Propone **mantenimiento y pavimentación vial barrial y rural**.', p: [7] },
          { st: 'como', viz: 'baches', vizo: { stage: 2 }, h: 'Los primeros 100 días',
            b: 'Entre sus acciones de arranque está un **plan emergente de mantenimiento vial, iluminación y limpieza en puntos críticos**. Resultado esperado al día 100: **cronograma público y primeras intervenciones**.', p: [17] },
          { st: 'como', viz: 'instituciones', vizo: { set: 'baches' }, h: 'Quiénes y con cuánto',
            b: 'Responsables: **EPMMOP, EMASEO y la Secretaría de Movilidad**. Costo referencial de esa fase: **USD 2–4 millones**.',
            gl: ['EMASEO', 'Empresa Pública Metropolitana de Aseo, encargada de la limpieza.'], p: [17] },
          { st: 'detalles', viz: 'timeline', vizo: { items: [['2027', 'Plan emergente de mantenimiento vial, iluminación y limpieza'], ['2030–31', 'Indicador: cartera de mantenimiento financiada']] }, h: 'Y después del arranque',
            b: 'La programación anual pone el **plan emergente en 2027** y, para el cierre de 2030–2031, una **cartera de mantenimiento financiada** como indicador.', p: [15] }
        ],
        falta: ['Cuántos kilómetros se intervendrían', 'En qué barrios y parroquias rurales', 'El presupuesto después de los primeros 100 días'],
        cmp: { propone: 'Mantenimiento y pavimentación vial barrial y rural.', significa: 'Arreglar calles de barrio y vías rurales, empezando por puntos críticos.',
          como: ['Plan emergente de mantenimiento vial, iluminación y limpieza (primeros 100 días)', 'Resultado al día 100: cronograma público y primeras intervenciones'],
          inst: 'EPMMOP, EMASEO, Secretaría de Movilidad', rec: 'Plan emergente: USD 2–4 millones.', plazo: '2027: plan emergente. 2030–2031: cartera de mantenimiento financiada.', p: [7, 15, 17] } }
    ],
    close: [
      { st: 'cierre', viz: 'reloj', h: 'La meta del capítulo',
        b: 'Todo el eje apunta a una cifra: que el **tiempo promedio de viaje entre la ruralidad y el hipercentro no supere los 60 minutos** en 2031. Es una **meta del plan**, no un resultado garantizado.', p: [7] },
      { st: 'cierre', viz: 'presupuesto', vizo: { lo: 170, hi: 380, note: 'Recursos propios · crédito multilateral · alianzas público-privadas reguladas' }, h: 'La cuenta del eje',
        b: '**USD 170–380 millones** para 2027–2031. El plan advierte que su costeo es referencial y que **debe ajustarse con estudios técnicos reales**.', p: [7, 9, 13] }
    ]
  }
},
/* ---------------------------------------------------------------- */
'quito:ALMEIDA': {
  mov: {
    props: [
      { id: 'quito-se-mueve', t: 'Quito se mueve', icon: 'tren', sub: ['metro', 'integracion', 'activa'],
        official: 'Propuesta 3: Quito se mueve – Sistema Integrado de Movilidad.',
        problema: 'Sistema de movilidad fragmentado, cobertura insuficiente, congestión vial y poca priorización de alternativas integradas, sostenibles e inclusivas.',
        cmp: { propone: 'Consolidar el Metro como columna vertebral del transporte público y avanzar en su extensión hacia el norte, integrándolo física, operacional y tarifariamente con Trolebús, Ecovía y alimentadores; articular esa red con infraestructura segura y accesible para caminar y pedalear.',
          significa: 'Que Metro, Trolebús, Ecovía y alimentadores funcionen como un solo sistema, y que el Metro crezca hacia el norte.',
          como: ['Estudios técnicos', 'Estructuración financiera', 'Gestión de recursos nacionales e internacionales', 'Integración tarifaria', 'Reorganización progresiva del sistema de transporte'],
          inst: 'No especifica qué entidad lo conduciría.', rec: 'No especifica costo.',
          plazo: '2027–2031. Meta: dejar financiada y en ejecución la extensión del Metro hacia el norte y consolidar un sistema integrado.',
          ind: '% de avance de la extensión; número de subsistemas integrados; % de viajes integrados.', p: [31],
          subnote: { integracion: 'Integrar el Metro física, operacional y tarifariamente con Trolebús, Ecovía y alimentadores.', activa: 'Articular la red de transporte con infraestructura segura y accesible para caminar y pedalear.' } },
        falta: ['Costo de la extensión', 'Longitud y recorrido de la extensión norte', 'Valor del pasaje integrado', 'Qué entidad lo conduciría'] },
      { id: 'quito-360', t: 'Transporte Metropolitano Quito 360°', icon: 'bus', sub: ['rutas'],
        official: 'Propuesta 4: Transporte Metropolitano – Quito 360°.',
        problema: 'Sectores con baja cobertura, rutas desactualizadas y limitada capacidad pública de planificación y control operacional.',
        cmp: { propone: 'Revisar y ampliar las rutas del transporte público e implementar progresivamente un modelo de mayor gestión pública y municipal del sistema, con cobertura urbana y rural.',
          significa: 'Un nuevo mapa de rutas para llegar a sectores sin servicio, con más control municipal.',
          como: ['Nuevo mapa de rutas basado en la demanda', 'Fortalecimiento de corredores municipales', 'Integración de operadores', 'Centro Metropolitano de Control de Rutas y Frecuencias de Transporte Público'],
          inst: 'Centro Metropolitano de Control de Rutas y Frecuencias (a crear).', rec: 'No especifica costo.',
          plazo: '2027–2031. Meta: reorganizar las rutas del DMQ e implementar un sistema unificado de monitoreo y control.',
          ind: '% de rutas revisadas; sectores incorporados; sistema de control operativo implementado.', p: [31, 32] },
        falta: ['Costo', 'Cuántas rutas y qué sectores se incorporarían'] }
    ]
  }
}
};

/* Subtemas para comparar: agrupación editorial de Tinta, no del plan. */
window.SUBS = {
  seg: [['tecnologia', 'Cámaras y tecnología', /c[aá]mar|videov|monitoreo|alarma|bot[oó]n|placas|\bia\b|inteligen|comando/i],
        ['espacio', 'Iluminación y espacio público', /ilumin|parque|espacio|luminar|cpted|plaza/i],
        ['comunidad', 'Prevención y comunidad', /barri|comunit|j[oó]ven|preven|adicci|mujer|violencia|ni[ñn]ez|rescate/i],
        ['coordinacion', 'Coordinación e instituciones', /consejo|polic[ií]a|ecu|agentes|coordinac|observatorio|catastro|tasa/i]],
  mov: [['metro', 'Metro y transporte masivo', /metro|tren|tranv|cable|aerov|telef/i],
        ['integracion', 'Integración y pasaje', /tarif|pasaje|integra|pago|tarjeta/i],
        ['rutas', 'Rutas de buses y control', /ruta|frecuencia|\bbus|alimentador|operador|terminal/i],
        ['vial', 'Obras viales', /t[uú]nel|avenida|anillo|paso |intercambiador|puente|v[ií]as? nuevas|construcci[oó]n vial|vialidad/i],
        ['activa', 'Caminar y pedalear', /acera|cicl|peat|bici|camin/i],
        ['mantenimiento', 'Mantenimiento y baches', /bache|mantenim|recapeo|asfalt|pavimen|adoquin/i],
        ['transito', 'Gestión del tránsito', /sem[aá]for|tr[aá]nsito|se[ñn]aliz|parqueo|estacionamiento/i]],
  agua: [['potable', 'Agua potable', /agua potable|abastec|captac|potabiliz|cobertura de agua|tanque|reserv|p[eé]rdidas|redes de agua/i],
         ['saneamiento', 'Alcantarillado y aguas servidas', /alcantar|residual|ptar|saneam|colector|tratamiento/i],
         ['rios', 'Ríos y fuentes de agua', /r[ií]o|quebrad|fuente|p[aá]ramo|cuenca/i],
         ['drenaje', 'Lluvias e inundaciones', /pluvial|inund|drenaje|lluvia/i]],
  amb: [['residuos', 'Basura y reciclaje', /resid|basura|recicl|relleno|compost|contenedor|contenerizac/i],
        ['riesgos', 'Riesgos y alertas', /riesgo|alerta|volc|lahar|desliz|emergenc|simulacro|mitigac/i],
        ['verde', 'Árboles y áreas verdes', /[aá]rbol|verde|refores|arboriz|parque/i],
        ['clima', 'Clima y aire', /clim|aire|emisi|carbono/i]]
};

/* Notas de revisión factual detectadas al reconstruir el piloto (trazabilidad). */
window.REVISION = [
  { donde: 'Quito · César Díaz · Movilidad', antes: 'Referencia de costo de pavimentación «USD 180/m²».', ahora: 'El plan dice «USD 80–180/m² de vía» para pavimentación, aceras y ciclovías.', p: 7 },
  { donde: 'Quito · César Díaz · Movilidad', antes: 'La propuesta vial decía «ampliación de la Simón Bolívar».', ahora: 'El plan dice «ampliación parcial de la Av. Simón Bolívar».', p: 7 },
  { donde: 'Quito · César Díaz · Movilidad', antes: 'Tres propuestas: túnel y Simón Bolívar juntos; pasaje integrado y aceras juntos.', ahora: 'Seis propuestas distintas: Metro, túnel, Simón Bolívar, pasaje, aceras/ciclovías y mantenimiento vial (este último no estaba).', p: 7 },
  { donde: 'Quito · César Díaz · Movilidad', antes: 'La meta de 60 minutos aparecía como parte del pasaje integrado.', ahora: 'Es la meta de todo el eje de movilidad.', p: 7 }
];
