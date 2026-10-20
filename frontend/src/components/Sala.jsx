import { Building2, Landmark, Store, Trees } from 'lucide-react';

/** La "sala" desenfocada del fondo (diseño Fitness), pintada solo con degradados. */
export default function Sala() {
  return (
    <div className="sala" aria-hidden="true">
      <i className="techo" /><i className="viga" /><i className="viga d" /><i className="muro" /><i className="cuadro" />
      <i className="ventana" /><i className="lampara" /><i className="sofa" /><i className="cojin" /><i className="piso" />
    </div>
  );
}

/** Ícono por categoría de sitio. */
export const ICONO_CATEGORIA = { Misiones: Landmark, Ecoturismo: Trees, Historia: Building2, Centro: Store };
