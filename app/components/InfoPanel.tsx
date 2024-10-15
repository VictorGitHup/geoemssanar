// components/InfoPanel.tsx
import React, { useState } from 'react';
import Selector from './Selector';
import { GeoData } from './types'; // Importa GeoData

interface Specialty {
  id: number;
  nombre_especialidad: string;
  categoria_especialidad: string;
}

const InfoPanel: React.FC<{ data: GeoData[] }> = ({ data }) => {
  const [filteredPrestadores, setFilteredPrestadores] = useState<string[]>([]);

  // Verificar si hay datos disponibles
  if (data.length === 0) {
    return <p>No hay datos disponibles_.</p>; // Mensaje si no hay datos
  }

  // Estructura de especialidades a partir de los datos
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const specialtiesData: Specialty[] = Array.from(
    new Map(
      data.map((item, index) => [
        item.nombre_especialidad,
        { id: index, nombre_especialidad: item.nombre_especialidad, categoria_especialidad: item.categoria_especialidad },
      ])
    ).values()
  );

  // Manejo del cambio de categoría
  const handleCategoryChange = (category: string) => {
    // Filtrar especialidades en función de la categoría seleccionada
    const specialties = specialtiesData
      .filter((item) => item.categoria_especialidad === category)
      .map((item) => item.nombre_especialidad);
    setFilteredPrestadores([]); // Reinicia los prestadores al cambiar de categoría
    handleSpecialtyChange(''); // Reinicia la especialidad seleccionada
  };

  // Manejo del cambio de especialidad
  const handleSpecialtyChange = (specialty: string) => {
    const prestadores = Array.from(
      new Set(
        data
          .filter((item) => item.nombre_especialidad === specialty)
          .map((item) => item.prestador_nombre)
      )
    );
    setFilteredPrestadores(prestadores); // Actualiza los prestadores filtrados
  };

  // Obtener prestadores primarios únicos
  const prestadoresPrimarios = Array.from(
    new Set(data.filter((item) => item.es_prestador_primario).map((item) => item.prestador_nombre))
  );

  return (
    <div className="bg-white p-4 rounded shadow-lg space-y-6">
      {/* Sección de Prestador Primario */}
      {prestadoresPrimarios.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2 text-custom-color">Prestador Primario</h2>
          <ul className="list-disc pl-5 text-custom-color">
            {prestadoresPrimarios.map((prestador, index) => (
              <li key={index} className="mb-2">{prestador}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Selector de Especialidades */}
      <Selector
        data={specialtiesData}
        onCategoryChange={handleCategoryChange}
        onSpecialtyChange={handleSpecialtyChange}
      />

      {/* Mostrar Prestadores Filtrados */}
      {filteredPrestadores.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-custom-color">Prestadores por Especialidad:</h3>
          <ul className="list-disc pl-5 text-custom-color">
            {filteredPrestadores.map((prestador, index) => (
              <li key={index} className="mb-2">{prestador}</li>
            ))}
          </ul>
        </div>
      ) : (
        filteredPrestadores.length === 0 && <p>Selecciona una especialidad para ver los prestadores.</p>
      )}
    </div>
  );
};

export default InfoPanel;
