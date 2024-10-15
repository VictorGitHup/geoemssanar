// types.ts
export interface GeoData {
    departamento_nombre: string;
    municipio_nombre: string;
    region: string;
    subregion: string;
    prestador_nombre: string;
    es_prestador_primario: boolean;
    categoria_especialidad: string;
    nombre_especialidad: string;
    latitud: number;
    longitud: number;
    complejidad: string; // Asegúrate de que esto esté incluido
  }
  
  export interface Specialty {
    id: number; // Un identificador único para la especialidad
    nombre_especialidad: string; // El nombre de la especialidad
    categoria_especialidad: string; // La categoría a la que pertenece la especialidad
  }