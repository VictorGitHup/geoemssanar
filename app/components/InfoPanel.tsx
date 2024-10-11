// components/InfoPanel.tsx
import React, { useState } from "react";
import Selector from "./Selector";

interface GeoData {
  prestador_nombre: string;
  es_prestador_primario: boolean;
  categoria_especialidad: string;
  nombre_especialidad: string;
}

interface InfoPanelProps {
  data: GeoData[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
  const [filteredPrestadores, setFilteredPrestadores] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const specialties = data
      .filter((item) => item.categoria_especialidad === category)
      .map((item) => item.nombre_especialidad);
    setFilteredPrestadores([]);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const prestadores = data
      .filter((item) => item.nombre_especialidad === specialty)
      .map((item) => item.prestador_nombre);

    setFilteredPrestadores(Array.from(new Set(prestadores))); // Elimina duplicados
  };

  return (
    <div className="space-y-6">
      {/* Prestador Primario */}
      {data.length > 0 && data.some((item) => item.es_prestador_primario) && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-120">
          <h2 className="text-lg font-semibold mb-4 text-custom-color">Prestador Primario</h2>
          <ul className="list-disc pl-5 text-custom-color">
            {Array.from(new Set(
              data.filter((item) => item.es_prestador_primario).map((item) => item.prestador_nombre)
            )).map((prestadorNombre, index) => (
              <li key={index} className="mb-2">{prestadorNombre}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtrar por Especialidad - Solo mostrar si hay datos */}
      {data.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-120">
          <Selector
            data={data}
            onCategoryChange={handleCategoryChange}
            onSpecialtyChange={handleSpecialtyChange}
          />
          {filteredPrestadores.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-custom-color">Prestadores:</h3>
              <ul className="list-disc pl-5 text-custom-color">
                {filteredPrestadores.map((prestadorNombre, index) => (
                  <li key={index} className="mb-2">
                    {prestadorNombre}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
