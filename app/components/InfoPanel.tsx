import React, { useState, useEffect } from 'react';
import Selector from './Selector';
import { GeoData } from './types';

interface Specialty {
  id: number; 
  nombre_especialidad: string;
  categoria_especialidad: string;
}

interface InfoPanelProps {
  data: GeoData[];
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
  onClose: () => void; 
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onLocationSelect, onClose }) => {
  const [filteredPrestadores, setFilteredPrestadores] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Seleccione una especialidad');
  const [selectedCategory, setSelectedCategory] = useState<string>('Seleccione una categoría');

  useEffect(() => {
    setFilteredPrestadores([]);
  }, [data]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilteredPrestadores([]);
    setSelectedSpecialty('Seleccione una especialidad');
  };

  const handleSpecialtyChange = (specialty: string) => {
    if (specialty !== 'Seleccione una especialidad') {
      setSelectedSpecialty(specialty);
      const prestadores = data
        .filter((item) => item.nombre_especialidad === specialty)
        .map((item) => ({
          nombre: item.prestador_nombre,
          complejidad: item.complejidad,
        }));

      const uniquePrestadores = Array.from(
        new Set(prestadores.map((prestador) => prestador.nombre))
      ).map((nombre) => {
        const prestadorInfo = prestadores.find((prestador) => prestador.nombre === nombre);
        return `${prestadorInfo?.nombre} (${prestadorInfo?.complejidad})`;
      });

      setFilteredPrestadores(uniquePrestadores);
    }
  };

  const specialties: Specialty[] = Array.from(
    new Set(data.map(item => item.nombre_especialidad))
  ).map((nombre_especialidad, index) => ({
    id: index,
    nombre_especialidad,
    categoria_especialidad: data.find(item => item.nombre_especialidad === nombre_especialidad)?.categoria_especialidad || ''
  }));

  const prestadoresPrimarios = Array.from(
    new Set(data.filter((item) => item.es_prestador_primario).map((item) => item.prestador_nombre))
  );

  const handleSearchClick = () => {
    if (!searchInput.trim()) {
      alert('Por favor, ingrese un lugar para buscar.');
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        const location = results[0]?.geometry.location;
        if (location) {
          onLocationSelect({ lat: location.lat(), lng: location.lng() });
        } else {
          alert('No se encontró la ubicación. Por favor, intente con otro término.');
        }
      } else {
        alert('La búsqueda falló: ' + status);
      }
    });
  };

  return (
    <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-lg z-10 w-72 sm:w-80 md:w-96 lg:w-1/1">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" aria-label="Cerrar">
        &times;
      </button>

      {prestadoresPrimarios.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-custom-color text-center">
            Prestador Primario
          </h2>
          <ul className="list-disc pl-5 text-sm sm:text-base text-custom-color space-y-2">
            {prestadoresPrimarios.map((prestador, index) => (
              <li key={index}>{prestador}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <Selector
          data={specialties}
          onCategoryChange={handleCategoryChange}
          onSpecialtyChange={handleSpecialtyChange}
          selectedSpecialty={selectedSpecialty}
          selectedCategory={selectedCategory}
        />
      </div>

      {filteredPrestadores.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-custom-color">
            Prestadores por Especialidad:
          </h3>
          <ul className="list-disc pl-5 text-sm sm:text-base text-custom-color overflow-auto max-h-64 space-y-2">
            {filteredPrestadores.map((prestador, index) => (
              <li key={index}>{prestador}</li>
            ))}
          </ul>
        </div>
      ) : (
        filteredPrestadores.length === 0 && (
          <p className="text-custom-color text-center">Seleccione una especialidad</p>
        )
      )}

<div className="flex flex-col mt-4">
<label style={{ color: '#000000' }} htmlFor="search"> {/* Color Tomate */}
    Buscar ubicación:
  </label>
  <div className="flex items-center">
    <input style={{ color: '#000000' }}
      id="search"
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className="flex-1 p-2 border rounded mr-2"
    />
    <button
      onClick={handleSearchClick}
      className="bg-blue-500 text-white rounded px-4 py-2"
    >
      Buscar
    </button>
  </div>
</div>

    </div>
  );
};

export default InfoPanel;
