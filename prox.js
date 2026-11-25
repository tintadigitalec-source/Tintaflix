/* Próximos capítulos: ciudades cuyos capítulos documentales 1–3 se estrenan más adelante.
   El aviso desaparece solo cuando pasa la hora del estreno. */
(function () {
  const AT = '2026-11-26T12:00:00-05:00';               /* jueves 26 de noviembre, 12:00 (Ecuador) */
  const CITIES = ['ambato', 'latacunga', 'zamora', 'galapagos'];
  const T = new Date(AT).getTime();
  const on = id => CITIES.includes(id) && Date.now() < T;
  const left = () => { const m = Math.max(0, Math.round((T - Date.now()) / 60000)); const h = Math.floor(m / 60); return h >= 24 ? `Faltan ${Math.floor(h / 24)} d ${h % 24} h` : h ? `Faltan ${h} h ${m % 60} min` : `Faltan ${m} min`; };
  function ics(city) {
    const s = 'DTSTART:20261126T170000Z', e = 'DTEND:20261126T173000Z';
    const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tinta Digital//Tintaflix//ES', 'BEGIN:VEVENT', 'UID:tintaflix-' + city + '-20261126@tintadigital', 'DTSTAMP:20261125T000000Z', s, e,
      'SUMMARY:Tintaflix · nuevos capítulos de ' + city, 'DESCRIPTION:Llegan los capítulos documentales de las candidaturas a la Alcaldía.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body);
  }
  /* mode: 'chip' (tarjeta de ciudad) · 'hero' (portada de ciudad) · 'serie' (ficha de candidatura) */
  window.proxOn = on;
  window.proxHTML = function (id, name, mode) {
    if (!on(id)) return '';
    if (mode === 'chip') return '<span class="pxchip">Próximos capítulos · jue 12:00</span>';
    const lead = mode === 'serie'
      ? 'Los capítulos 1 a 3 se renuevan en formato documental: quién es, qué ha hecho y cómo llega a la papeleta. Mientras tanto, aquí tienes la versión de su hoja de vida.'
      : `Llegan los capítulos documentales de ${name}: quién es cada candidatura, qué ha hecho y cómo llega a la papeleta.`;
    return `<aside class="prox ${mode}" aria-label="Próximos capítulos"><p class="pxk"><i></i>Próximos capítulos</p>
      <p class="pxd">Jueves 26 de noviembre · 12:00</p><p class="pxl">${lead}</p>
      <p class="pxf"><span class="pxt" data-pxleft>${left()}</span><a class="pxa" href="${ics(name)}" download="tintaflix-${id}.ics">Agéndalo</a></p></aside>`;
  };
  setInterval(() => document.querySelectorAll('[data-pxleft]').forEach(e => { e.textContent = left(); }), 30000);
})();
