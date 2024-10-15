// components/InfoPanel.tsx
import React, { useState } from 'react';
import Selector from './Selector';
import { GeoData } from './types'; // Importa GeoData

interface Specialty {
  id: number;
  nombre_especialidad: string;
  categoria_especialidad: string;
}

interface InfoPanelProps {
  data: GeoData[];
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onLocationSelect }) => {
  const [filteredPrestadores, setFilteredPrestadores] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  // Verificar si hay datos disponibles
  if (data.length === 0) {
    return <p>No hay datos disponibles.</p>; // Mensaje si no hay datos
  }

  // Estructura de especialidades a partir de los datos
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
    const prestadores = data
      .filter((item) => item.nombre_especialidad === specialty)
      .map((item) => ({
        nombre: item.prestador_nombre,
        esPrestadorPrimario: item.es_prestador_primario,
        complejidad: item.complejidad,
      }));

    // Crear una lista única de prestadores
    const uniquePrestadores = Array.from(
      new Set(prestadores.map(prestador => prestador.nombre))
    ).map(nombre => {
      const prestadorInfo = prestadores.find(prestador => prestador.nombre === nombre);
      return `${prestadorInfo?.nombre} (${prestadorInfo?.complejidad})`;
    });

    setFilteredPrestadores(uniquePrestadores); // Establecer la lista de prestadores únicos
  };

  // Obtener prestadores primarios únicos
  const prestadoresPrimarios = Array.from(
    new Set(data.filter((item) => item.es_prestador_primario).map((item) => item.prestador_nombre))
  );

  // Función para manejar el cambio en el cuadro de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Función para manejar el clic en el botón de búsqueda
  const handleSearchClick = () => {
    // Aquí puedes implementar la lógica para realizar una búsqueda
    // en Google Maps usando la API
    // Asegúrate de tener el código para la inicialización de Google Maps.
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        const location = results[0]?.geometry.location;
        if (location) {
          onLocationSelect({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error('No se encontró la ubicación');
        }
      } else {
        console.error('Geocoding failed: ' + status);
      }
    });
  };

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

      {/* Cuadro de búsqueda de Google Maps */}
      <div className="mt-4">
  <input
    type="text"
    value={searchInput}
    onChange={handleSearchChange}
    placeholder="Buscar ubicación en Google Maps"
    className="border rounded p-2 w-full text-gray-700 placeholder-gray-400" // Cambia el color del texto y el placeholder
  />
  <button
    onClick={handleSearchClick}
    className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200" // Cambia el color de fondo y el texto del botón
  >
    Buscar
  </button>
</div>

    </div>
  );
};

export default InfoPanel;
