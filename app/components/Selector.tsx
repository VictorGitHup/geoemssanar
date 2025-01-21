import React, { useEffect, useState } from 'react';
import { GeoData } from './types';

interface SelectorProps {
  data: GeoData[];
  onPrestadorPrimarioChange: (prestadorId: number) => void;
  onPrestadorComplementarioChange: (prestadorId: number) => void;
  onPrestadorMedicamentosChange: (prestadorId: number) => void;
  onPrestadorOtrosChange: (prestadorId: number) => void;
  onPrestadorInfoChange: (prestadorId: number) => void;
  selectedPrestadorPrimario: number | null;
  selectedPrestadorComplementario: number | null;
  selectedPrestadorMedicamentos: number | null;
  selectedPrestadorOtros: number | null;
  selectedPrestadorInfo: number | null;
}

const Selector: React.FC<SelectorProps> = ({
  data,
  onPrestadorPrimarioChange,
  onPrestadorComplementarioChange,
  onPrestadorMedicamentosChange,
  onPrestadorOtrosChange,
  onPrestadorInfoChange,
  selectedPrestadorPrimario,
  selectedPrestadorComplementario,
  selectedPrestadorMedicamentos,
  selectedPrestadorOtros,
  selectedPrestadorInfo


}) => {
  const [prestadoresPrimarios, setPrestadoresPrimarios] = useState<GeoData[]>([]);
  const [prestadoresComplementarios, setPrestadoresComplementarios] = useState<GeoData[]>([]);
  const [prestadoresMedicamentos, setPrestadoresMedicamentos] = useState<GeoData[]>([]);
  const [prestadoresOtros, setPrestadoresOtros] = useState<GeoData[]>([]);
  const [prestadoresInfo, setPrestadoresInfo] = useState<GeoData[]>([]);

  useEffect(() => {
    // Filtrar y eliminar duplicados de prestadores primarios
    const filteredPrimarios = data
      .filter((prestador) => prestador.estado_contrato === true)
      .reduce((unique: GeoData[], current) => {
        if (!unique.some((item) => item.id_prestador === current.id_prestador)) {
          unique.push(current);
        }
        return unique;
      }, []);
    setPrestadoresPrimarios(filteredPrimarios);

    // Filtrar y eliminar duplicados de prestadores complementarios
    const filteredComplementarios = data
      .filter((prestador) => prestador.estado_contrato_compl === true)
      .reduce((unique: GeoData[], current) => {
        if (!unique.some((item) => item.id_pres_compl === current.id_pres_compl)) {
          unique.push(current);
        }
        return unique;
      }, []);
    setPrestadoresComplementarios(filteredComplementarios);

    // Filtrar y eliminar duplicados de prestadores medicamentos
    const filteredMedicamentos = data
      .filter((prestador) => prestador.estado_contrato_med === true)
      .reduce((unique: GeoData[], current) => {
        if (!unique.some((item) => item.id_pres_med === current.id_pres_med)) {
          unique.push(current);
        }
        return unique;
      }, []);
    setPrestadoresMedicamentos(filteredMedicamentos);

      // Filtrar y eliminar duplicados de prestadores otros servicios
    const filteredOtros = data
    .filter((prestador) => prestador.estado_contrato_otros === true)
    .reduce((unique: GeoData[], current) => {
      if (!unique.some((item) => item.id_pres_otros === current.id_pres_otros)) {
        unique.push(current);
      }
      return unique;
    }, []);
  setPrestadoresOtros(filteredOtros);

    // Filtrar y eliminar duplicados de prestadores otros servicios
    const filteredInfo = data
    .filter((prestador) => prestador.estado_centralidad === true)
    .reduce((unique: GeoData[], current) => {
      if (!unique.some((item) => item.id_pres_infocom === current.id_pres_infocom)) {
        unique.push(current);
      }
      return unique;
    }, []);
  setPrestadoresInfo(filteredInfo);

  }, [data]);

  return (
    <div className="selector-container">
      {/* Lista desplegable de Prestadores Primarios */}
      <div className="mb-5">
        <label htmlFor="prestadorPrimario" className="block text-lg font-semibold text-black">
          Prestador Primario:
        </label>
        <select
          id="prestadorPrimario"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          value={selectedPrestadorPrimario ?? ''}
          onChange={(e) => onPrestadorPrimarioChange(Number(e.target.value))}
        >
          <option value="">Prestador primario</option>
          {prestadoresPrimarios.map((prestador) => (
            <option key={prestador.id_prestador} value={prestador.id_prestador}>
              {prestador.prestador_p_nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Lista desplegable de Prestadores Complementarios */}
      <div className="mb-5">
        <label htmlFor="prestadorComplementario" className="block text-lg font-semibold text-black">
          Prestador Complementario:
        </label>
        <select
          id="prestadorComplementario"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          value={selectedPrestadorComplementario ?? ''}
          onChange={(e) => onPrestadorComplementarioChange(Number(e.target.value))}
        >
          <option value="">Seleccione un prestador complementario</option>
          {prestadoresComplementarios.map((prestador) => (
            <option key={prestador.id_pres_compl} value={prestador.id_pres_compl}>
              {prestador.prestador_compl_nombre}
            </option>
          ))}
        </select>
      </div>

          {/* Lista desplegable de Prestadores Medicamentos */}
      <div className="mb-5">
        <label htmlFor="prestadorMedicamentos" className="block text-lg font-semibold text-black">
          Prestador Medicamentos:
        </label>
        <select
          id="prestadorMedicamentos"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          value={selectedPrestadorMedicamentos ?? ''}
          onChange={(e) => onPrestadorMedicamentosChange(Number(e.target.value))}
        >
          <option value="">Prestador medicamentos</option>
          {prestadoresMedicamentos.map((prestador) => (
            <option key={prestador.id_pres_med} value={prestador.id_pres_med}>
              {prestador.prestador_med_nombre}
            </option>
          ))}
        </select>
      </div>

          {/* Lista desplegable de Prestadores Otros */}
      <div className="mb-5">
        <label htmlFor="prestadorOtros" className="block text-lg font-semibold text-black">
          Otros servicios:
        </label>
        <select
          id="prestadorOtros"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          value={selectedPrestadorOtros ?? ''}
          onChange={(e) => onPrestadorOtrosChange(Number(e.target.value))}
        >
          <option value="">Seleccione un prestador otros servicios</option>
          {prestadoresOtros.map((prestador) => (
            <option key={prestador.id_pres_otros} value={prestador.id_pres_otros}>
              {prestador.prestador_otros_nombre}
            </option>
          ))}
        </select>
      </div>

      

    </div>
  );
};

export default Selector;
