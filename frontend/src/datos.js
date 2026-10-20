/**
 * Datos de ejemplo para el maquetado. Cuando el backend esté listo vendrán de
 * api/destinos y api/itinerarios; mantener la misma forma facilita el cambio.
 * x / y son coordenadas dentro del mapa ilustrado (viewBox 400 x 260).
 */

export const CATEGORIAS = {
  // color: acento de la categoría; suave: fondo claro; degradado: miniaturas, portada y galería.
  Misiones: { color: '#FF6A1A', suave: '#FFF1E8', degradado: 'linear-gradient(135deg, #FF8A3D, #E2541A)' },
  Ecoturismo: { color: '#22C55E', suave: '#E9F9EF', degradado: 'linear-gradient(135deg, #7FB77E, #3E7C4A)' },
  Historia: { color: '#4F7CFF', suave: '#ECF1FF', degradado: 'linear-gradient(135deg, #7C9BFF, #3D5BD9)' },
  Centro: { color: '#F0386B', suave: '#FFE9EF', degradado: 'linear-gradient(135deg, #F7708F, #C9264F)' },
};

export const SITIOS = [
  {
    id: 'mision-santiago',
    nombre: 'Misión Santiago Apóstol',
    nombreCompleto: 'Misión Santiago Apóstol de Jalpan',
    categoria: 'Misiones',
    calificacion: 4.8,
    direccion: 'Calle Flores, Jalpan de Serra, Qro.',
    visitaMin: 20,
    resena:
      'Construida entre 1751 y 1758, esta misión forma parte del conjunto de Misiones Franciscanas de la Sierra Gorda, declarado Patrimonio de la Humanidad por la UNESCO. Su fachada churrigueresca combina elementos indígenas y barrocos únicos en la región.',
    mejorHorario: 'Entre 9:00 y 11:00 AM, antes de que aumente el calor.',
    normas: 'Vestimenta respetuosa. Puedes tomar fotografías sin flash.',
    x: 186, y: 112,
  },
  {
    id: 'museo-sierra-gorda',
    nombre: 'Museo Histórico de la Sierra Gorda',
    nombreCompleto: 'Museo Histórico de la Sierra Gorda',
    categoria: 'Historia',
    calificacion: 4.5,
    direccion: 'Jardín Principal, Jalpan de Serra, Qro.',
    visitaMin: 30,
    resena:
      'Ocupa un antiguo fuerte junto a la misión. Sus salas recorren la historia de la región, desde los pueblos pame y jonaz hasta la llegada de fray Junípero Serra.',
    mejorHorario: 'Por la mañana, para combinarlo con la visita a la misión.',
    normas: 'Consulta los días de cierre antes de ir.',
    x: 214, y: 96,
  },
  {
    id: 'plaza-pergola',
    nombre: 'Plaza Pérgola',
    nombreCompleto: 'Plaza Pérgola',
    categoria: 'Centro',
    calificacion: 4.5,
    direccion: 'Centro, Jalpan de Serra, Qro.',
    visitaMin: 15,
    resena:
      'Punto de encuentro del centro de Jalpan, a unos pasos de la misión. Buen lugar para descansar a la sombra y probar antojitos de la región.',
    mejorHorario: 'Al atardecer, cuando baja el calor y hay más ambiente.',
    normas: 'Espacio público; cuida la limpieza del lugar.',
    x: 158, y: 140,
  },
  {
    id: 'presa-jalpan',
    nombre: 'Presa Jalpan',
    nombreCompleto: 'Presa Jalpan',
    categoria: 'Ecoturismo',
    calificacion: 4.6,
    direccion: 'Malecón de la presa, Jalpan de Serra, Qro.',
    visitaMin: 25,
    resena:
      'Embalse rodeado de sabinos y cerros de la reserva. El malecón es ideal para caminar y observar aves acuáticas.',
    mejorHorario: 'Temprano por la mañana o al atardecer.',
    normas: 'No dejes basura y respeta las zonas de anidación.',
    x: 300, y: 186,
  },
];

export const obtenerSitio = (id) => SITIOS.find((s) => s.id === id);

/** Itinerario de ejemplo: lo que hoy devuelve generar_itinerario.php, ampliado para la vista. */
export const ITINERARIO_DEMO = {
  id: 'demo-001',
  titulo: '3 sitios en Jalpan',
  plazo: 'Para 1 día',
  duracion: '40 min',
  distancia: '14.2 km',
  costo: '$0',
  estrategia: 'Ruta continua según cercanía y el tiempo que tienes disponible.',
  paradas: [
    { id: 'mision-santiago', hora: '9:00 AM' },
    { id: 'plaza-pergola', hora: '9:35 AM', traslado: '15 min de traslado' },
    { id: 'presa-jalpan', hora: '10:10 AM', traslado: '20 min de traslado' },
  ],
};
