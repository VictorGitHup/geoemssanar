import React, { useState, useEffect } from 'react';
import { Specialty } from './types';

interface SelectorProps {
  data: Specialty[];
  onCategoryChange: (category: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  selectedSpecialty: string; // Pasa el valor seleccionado
  selectedCategory: string; // Pasa la categoría seleccionada
}

const Selector: React.FC<SelectorProps> = ({
  data,
  onCategoryChange,
  onSpecialtyChange,
  selectedSpecialty,
  selectedCategory,
}) => {
  const [filteredSpecialties, setFilteredSpecialties] = useState<Specialty[]>([]);
  const [showSpecialties, setShowSpecialties] = useState(false); // Nuevo estado para mostrar especialidades

  useEffect(() => {
    // Filtra las especialidades cuando cambia la categoría o al inicializar
    const specialtiesForCategory = data.filter(
      (item) => item.categoria_especialidad === selectedCategory
    );
    setFilteredSpecialties(specialtiesForCategory);

    // Solo muestra las especialidades si hay una categoría seleccionada
    setShowSpecialties(!!selectedCategory);
  }, [selectedCategory, data]);

  const handleSpecialtySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSpecialtyChange(e.target.value);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    onCategoryChange(selected);
    
    // Filtra las especialidades en base a la categoría seleccionada
    const specialtiesForCategory = data.filter(
      (item) => item.categoria_especialidad === selected
    );
    setFilteredSpecialties(specialtiesForCategory);
    setShowSpecialties(!!selected); // Asegúrate de que las especialidades se muestren si hay una categoría
  };

  const categories = Array.from(new Set(data.map((item) => item.categoria_especialidad)));

  return (
    <div className="mb-4">
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
          Categoría:
        </label>
        <select
          id="category"
          value={selectedCategory || "default"} // Mantener un valor por defecto
          onChange={handleCategorySelect}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-custom-color focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="default" >
            Seleccione una opción
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-custom-color">
              {category}
            </option>
          ))}
        </select>
      </div>

      {showSpecialties && ( // Mostrar solo si hay una categoría seleccionada
        <div>
          <label htmlFor="specialty" className="block text-gray-700 font-semibold mb-2">
            Especialidad:
          </label>
          <select
            id="specialty"
            value={selectedSpecialty || "default"} // Mantener un valor por defecto
            onChange={handleSpecialtySelect}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-custom-color focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            <option value="default" >
              Seleccione una opción
            </option>
            {filteredSpecialties.map((specialty) => (
              <option key={specialty.id} value={specialty.nombre_especialidad} className="text-custom-color">
                {specialty.nombre_especialidad}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Selector;
