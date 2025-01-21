import React, { useState, useEffect } from 'react';
import Selector from './Selector';
import { GeoData } from './types';

interface InfoPanelProps {
  data: GeoData[];
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onLocationSelect, onClose }) => {
  const [filteredPrestadoresPrimarios, setFilteredPrestadoresPrimarios] = useState<GeoData[]>([]);
  const [filteredPrestadoresComplementarios, setFilteredPrestadoresComplementarios] = useState<GeoData[]>([]);
  const [filteredPrestadoresMedicamentos, setFilteredPrestadoresMedicamentos] = useState<GeoData[]>([]);
  const [filteredPrestadoresOtros, setFilteredPrestadoresOtros] = useState<GeoData[]>([]);
  const [filteredPrestadoresInfo, setFilteredPrestadoresInfo] = useState<GeoData[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedPrestadorPrimario, setSelectedPrestadorPrimario] = useState<number | null>(null);
  const [selectedPrestadorComplementario, setSelectedPrestadorComplementario] = useState<number | null>(null);
  const [selectedPrestadorMedicamentos, setSelectedPrestadorMedicamentos] = useState<number | null>(null);
  const [selectedPrestadorOtros, setSelectedPrestadorOtros] = useState<number | null>(null);
  const [selectedPrestadorInfo, setSelectedPrestadorInfo] = useState<number | null>(null);

  useEffect(() => {
    // Filtrar prestadores primarios activos
    const prestadoresPrimariosActivos = data.filter(
      (item) => item.estado_contrato && item.id_prestador
    );
    setFilteredPrestadoresPrimarios(prestadoresPrimariosActivos);

    // Filtrar prestadores complementarios activos
    const prestadoresComplementariosActivos = data.filter(
      (item) => item.estado_contrato_compl && item.id_pres_compl
    );
    setFilteredPrestadoresComplementarios(prestadoresComplementariosActivos);

    // Filtrar prestadores complementarios activos
    const prestadoresMedicamentosActivos = data.filter(
      (item) => item.estado_contrato_med && item.id_pres_med
    );
    setFilteredPrestadoresMedicamentos(prestadoresMedicamentosActivos);

    // Filtrar prestadores complementarios otros servicios
    const prestadoresOtrosActivos = data.filter(
      (item) => item.estado_contrato_otros && item.id_pres_otros    );
    setFilteredPrestadoresOtros(prestadoresOtrosActivos);

    // Filtrar prestadores información complementaria
    const prestadoresInfoActivos = data.filter(
      (item) => item.estado_centralidad && item.id_pres_infocom    );
    setFilteredPrestadoresInfo(prestadoresInfoActivos);

  }, 
  
  [data]);

  const handlePrestadorPrimarioSelect = (prestadorId: number) => {
    setSelectedPrestadorPrimario(prestadorId);
  };

  const handlePrestadorComplementarioSelect = (prestadorId: number) => {
    setSelectedPrestadorComplementario(prestadorId);
  };

  const handlePrestadorMedicamentosSelect = (prestadorId: number) => {
    setSelectedPrestadorMedicamentos(prestadorId);
  };

  const handlePrestadorOtrosSelect = (prestadorId: number) => {
    setSelectedPrestadorOtros(prestadorId);
  };

  const handlePrestadorInfoSelect = (prestadorId: number) => {
    setSelectedPrestadorInfo(prestadorId);
  };

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

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className={`bg-green-500 text-white p-3 hover:bg-gray-600 transition duration-200 absolute right-1 top-0 ${
          isExpanded
            ? 'bg-toggleClose hover:bg-toggleClose-hover'
            : 'bg-toggleOpen hover:bg-toggleOpen-hover'
        } rounded-tl-lg rounded-bl-lg`}
      >
        {isExpanded ? '✖ ' : ' ◀ '}
      </button>

      <div
        className={`bg-white p-4 rounded-lg shadow-lg z-10 transition-all duration-300 ${
    isExpanded ? 'block' : 'hidden'
  } md:w-70 lg:w-lg max-h-screen overflow-y-auto ${
          isExpanded ? 'block' : 'hidden'
        }`}
      >
        {isExpanded && (
          <>
            <div className="mb-4">
              <Selector
                data={data}
                onPrestadorPrimarioChange={handlePrestadorPrimarioSelect}
                onPrestadorComplementarioChange={handlePrestadorComplementarioSelect}
                onPrestadorMedicamentosChange={handlePrestadorMedicamentosSelect}
                onPrestadorOtrosChange={handlePrestadorOtrosSelect}
                onPrestadorInfoChange={handlePrestadorInfoSelect}
                selectedPrestadorPrimario={selectedPrestadorPrimario}
                selectedPrestadorComplementario={selectedPrestadorComplementario}
                selectedPrestadorMedicamentos={selectedPrestadorMedicamentos}
                selectedPrestadorOtros={selectedPrestadorOtros}
                selectedPrestadorInfo={selectedPrestadorInfo}
              />
            </div>

            {/* Mostrar detalles del prestador primario */}
            {selectedPrestadorPrimario ? (
              <div className="w-full p-2 border border-gray-300 rounded mt-2 text-black bg-gray-100">

              {/* Título con texto más pequeño */}
              <h5 className="text-xs sm:text-sm lg:text-base font-semibold">
  Detalles del Prestador Primario
</h5>          
              {/* Datos con texto más pequeño */}
              <p className="text-sm">Nombre: {filteredPrestadoresPrimarios.find((p) => p.id_prestador === selectedPrestadorPrimario)?.prestador_p_nombre}</p>
              <p className="text-sm">Dirección: {filteredPrestadoresPrimarios.find((p) => p.id_prestador === selectedPrestadorPrimario)?.prestador_direccion}</p>
              <p className="text-sm">Teléfono: {filteredPrestadoresPrimarios.find((p) => p.id_prestador === selectedPrestadorPrimario)?.prestador_telf}</p>
              
            </div>
            
            ) : null}

            {/* Mostrar detalles del prestador complementario */}
            {selectedPrestadorComplementario ? (
              <div className="w-full p-2 border border-gray-300 rounded mt-2 text-black bg-gray-100">

                <h3 className="text-xs sm:text-sm lg:text-base font-semibold">
                  Detalles del Prestador Complementario
                </h3>
                <p className="text-sm">Nombre: {filteredPrestadoresComplementarios.find((p) => p.id_pres_compl === selectedPrestadorComplementario)?.prestador_compl_nombre}</p>
                <p className="text-sm">Dirección: {filteredPrestadoresComplementarios.find((p) => p.id_pres_compl === selectedPrestadorComplementario)?.pres_compl_direccion}</p>
                <p className="text-sm">Teléfono: {filteredPrestadoresComplementarios.find((p) => p.id_pres_compl === selectedPrestadorComplementario)?.pres_compl_telf}</p>
              </div>
            ) : null}

            {/* Mostrar detalles del prestador medicamentos */}
            {selectedPrestadorMedicamentos ? (
              <div className="w-full p-2 border border-gray-300 rounded mt-2 text-black bg-gray-100">

                <h3 className="text-xs sm:text-sm lg:text-base font-semibold">
                  Detalles del Prestador Complementario
                </h3>
                <p className="text-sm">Nombre: {filteredPrestadoresMedicamentos.find((p) => p.id_pres_med === selectedPrestadorMedicamentos)?.prestador_med_nombre}</p>
                <p className="text-sm">Dirección: {filteredPrestadoresMedicamentos.find((p) => p.id_pres_med === selectedPrestadorMedicamentos)?.pres_med_direccion}</p>
                <p className="text-sm">Teléfono: {filteredPrestadoresMedicamentos.find((p) => p.id_pres_med === selectedPrestadorMedicamentos)?.pres_med_telf}</p>
              </div>
            ) : null}

            {/* Mostrar detalles del prestador otros servicios */}
            {selectedPrestadorOtros ? (
              <div className="w-full p-1 border border-gray-300 rounded mt-2 text-black bg-gray-100">

                <h3 className="text-xs sm:text-sm lg:text-base font-semibold">
                  Detalles del Otros Prestadores
                </h3>
                <p className="text-sm">Nombre: {filteredPrestadoresOtros.find((p) => p.id_pres_otros === selectedPrestadorOtros)?.prestador_otros_nombre}</p>
                <p className="text-sm">Dirección: {filteredPrestadoresOtros.find((p) => p.id_pres_otros === selectedPrestadorOtros)?.pres_otros_direccion}</p>
                <p className="text-sm">Teléfono: {filteredPrestadoresOtros.find((p) => p.id_pres_otros === selectedPrestadorOtros)?.pres_otros_telf}</p>
              </div>
            ) : null}

            {/* Campo de búsqueda */}
  <div className="flex p-1  rounded mt-2 flex-row space-x-2">

  <input
    type="text"
    id="search"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Escribe un lugar"
    className="w-full text-black p-2 border border-gray-300 rounded-md"
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearchClick();  // Llama a la función de búsqueda al presionar Enter
      }
    }}
  />
  <button
    onClick={handleSearchClick}
    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition duration-200"
  >
    Buscar
  </button>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
