/* Datos oficiales de donación de TINTAFLIX (entregados por Tinta Digital, 25 nov. 2026).
   Mientras un campo esté vacío, la interfaz lo muestra como «pendiente» y
   desactiva la copia o el botón correspondiente. No inventar datos. */
window.TINTA_DONAR = {
  pagoNombre: 'Payphone',
  /* enlaces de cobro de Payphone por monto fijo (vigentes nov.–dic. 2026) */
  pagos: [
    { monto: 50, url: 'https://ppls.me/yhEdrcKxcPob1O3eKPiQ' },
    { monto: 100, url: 'https://ppls.me/sipRQCyuQcfp1hhqQQomg' },
    { monto: 200, url: 'https://ppls.me/d8NhqM6YrESzyISIZdiDw' }
  ],
  banco: {
    titular: 'Fundación Tinta Lab',
    banco: 'Banco del Pacífico',
    tipo: 'Corriente',
    numero: '8558906',
    identificacion: '1793212229001',   /* RUC */
    correo: 'info@nevolun.la'      /* correo para enviar el comprobante */
  }
};
