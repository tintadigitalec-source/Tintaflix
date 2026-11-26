/* Fotografías reales de candidaturas (Drive: ELECTIONS 2026 › FOTOGRAFIAS CANDIDATOS TINTAFLIX › QUITO).
   Recortadas sin fondo; sin alterar rasgos. «recorte» = versión collage (B/N, trama, borde de papel).
   Díaz y Yunda: fotos subidas el 25 nov. (Díaz: recorte desde la foto del debate; portada desde la foto de campaña). */
window.FOTOS = {
  'quito|0': 'almeida', 'quito|1': 'burbano', 'quito|2': 'desamblanc', 'quito|4': 'jijon',
  'quito|5': 'larrea', 'quito|3': 'diaz', 'quito|9': 'yunda', 'quito|6': 'merino', 'quito|7': 'munoz', 'quito|8': 'romero'
};
window.CIUDAD_FOTOS = { quito: ['fotos/quito-ciudad-1.webp', 'fotos/quito-ciudad-2.webp', 'fotos/quito-ciudad-3.webp', 'fotos/quito-ciudad-4.webp', 'fotos/quito-ciudad-5.webp'] };
window.CIUDAD_FOTOS_COLOR = { quito: 'fotos/quito-ciudad-3-color.webp', guayaquil: 'fotos/guayaquil-ciudad-1-color.webp' };
/* encuadre de cada fotografía en la portada (object-position) */
window.FOCO = { 'quito|0': '50% 30%', 'quito|1': '45% 22%', 'quito|2': '55% 18%', 'quito|4': '50% 12%', 'quito|5': '50% 12%', 'quito|6': '55% 18%', 'quito|7': '58% 20%', 'quito|8': '45% 30%', 'quito|3': '50% 20%', 'quito|9': '56% 22%' };

/* Guayaquil y Cuenca (Drive, 25 nov.). Elegimos fotos con una sola persona o con rótulo que la identifica;
   las fotos grupales sin forma de verificar quién es quién no se usaron. */
Object.assign(window.FOTOS, {
  'guayaquil|0': 'baldeon', 'guayaquil|1': 'garcia', 'guayaquil|2': 'icaza', 'guayaquil|3': 'luzarraga', 'guayaquil|4': 'medina',
  'guayaquil|5': 'roche', 'guayaquil|6': 'santistevan', 'guayaquil|7': 'viteri',
  'cuenca|0': 'cabrera', 'cuenca|1': 'carrasco', 'cuenca|2': 'lloret', 'cuenca|3': 'mera', 'cuenca|4': 'morales',
  'cuenca|5': 'palacios', 'cuenca|6': 'perez', 'cuenca|7': 'riquetti', 'cuenca|8': 'vega'
});
Object.assign(window.CIUDAD_FOTOS_COLOR, { cuenca: 'fotos/cuenca-ciudad-1-color.webp' });
/* galería para los capítulos biográficos: fotos adicionales de cada carpeta (sin asignarlas a hechos concretos) */
window.GALERIA = { 'quito|0': ['g1'], 'quito|1': ['g1'], 'quito|2': ['g1'], 'quito|3': ['g1', 'g2'], 'quito|4': ['g1'], 'quito|5': ['g1'],
  'quito|6': ['g1'], 'quito|7': ['g1'], 'quito|8': ['g1'], 'quito|9': ['g1'] };
/* Loja (Drive, 25 nov.): sin fotos de identidad dudosa (una de Castillo y una de Picoita quedaron fuera) */
Object.assign(window.FOTOS, { 'loja|0': 'aguirre', 'loja|1': 'cardenas', 'loja|2': 'carrion', 'loja|3': 'castillo', 'loja|4': 'picoita', 'loja|5': 'quezada', 'loja|6': 'reyes', 'loja|7': 'valdivieso' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { loja: 'fotos/loja-ciudad-1-color.webp' });
/* Machala (Drive, 25 nov.): una foto de Medina quedó fuera por identidad dudosa */
Object.assign(window.FOTOS, { 'machala|0': 'bravo', 'machala|1': 'gonzalez', 'machala|2': 'izquierdo', 'machala|3': 'medina', 'machala|4': 'pereira', 'machala|5': 'rodriguez', 'machala|6': 'rosado', 'machala|7': 'vazquez', 'machala|8': 'zambrano' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { machala: 'fotos/machala-ciudad-1-color.webp' });
Object.assign(window.FOTOS, { 'riobamba|0': 'abarca', 'riobamba|1': 'aldas', 'riobamba|2': 'daqui', 'riobamba|3': 'didonato', 'riobamba|4': 'falconi', 'riobamba|5': 'jara', 'riobamba|6': 'nunez', 'riobamba|7': 'sinaluisa', 'riobamba|8': 'vinueza' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { riobamba: 'fotos/riobamba-ciudad-1-color.webp' });
Object.assign(window.FOTOS, { 'ibarra|0': 'arias', 'ibarra|1': 'cabezas', 'ibarra|2': 'castillo', 'ibarra|3': 'moncayo', 'ibarra|4': 'posso' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { ibarra: 'fotos/ibarra-ciudad-1-color.webp' });
Object.assign(window.FOTOS, { 'ambato|0': 'altamirano', 'ambato|1': 'amoroso', 'ambato|2': 'caiza', 'ambato|3': 'lopez', 'ambato|4': 'naranjo', 'ambato|5': 'robayo', 'ambato|6': 'salazar', 'ambato|7': 'zuniga' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { ambato: 'fotos/ambato-ciudad-2-color.webp' });
Object.assign(window.FOTOS, { 'latacunga|0': 'condor', 'latacunga|1': 'espin', 'latacunga|2': 'guaman', 'latacunga|3': 'iturralde', 'latacunga|4': 'pacheco', 'latacunga|5': 'sanchez', 'latacunga|6': 'teran', 'latacunga|7': 'tinajero', 'latacunga|8': 'umajinga' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { latacunga: 'fotos/latacunga-ciudad-2-color.webp' });
Object.assign(window.FOTOS, { 'zamora|0': 'balladares', 'zamora|1': 'cabrera', 'zamora|2': 'rodriguez', 'zamora|3': 'simbana' });
Object.assign(window.CIUDAD_FOTOS_COLOR, { zamora: 'fotos/zamora-ciudad-1-color.webp' });
