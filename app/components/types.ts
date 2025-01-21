export interface GeoData {

  //Datos Prestador Primario
  id_prestador: number;
  prestador_p_nombre: string;
  prestador_direccion: string;
  prestador_telf: string;
  estado_contrato: boolean;
  
  // Nuevas propiedades de prestador complementario
  id_pres_compl: number;
  prestador_compl_nombre: string;
  pres_compl_direccion: string;
  pres_compl_telf: string;
  estado_contrato_compl: boolean;

  //Prestador medicamentos
  id_pres_med: number;
  prestador_med_nombre: string;
  pres_med_direccion: string;
  pres_med_telf: string;
  estado_contrato_med: boolean;

  //Otros Servicios
  id_pres_otros: number;
  prestador_otros_nombre: string;
  pres_otros_direccion: string;
  pres_otros_telf: string;
  estado_contrato_otros: boolean;

  //Información complementaria
  id_pres_infocom: number;
  centralidad_nom: string;
  pres_centralidad_nombre: string;
  estado_centralidad: boolean;

  
  //Información general
  departamento_nombre: string;
  municipio_nombre: string;
  latitud: number;
  longitud: number;
}
