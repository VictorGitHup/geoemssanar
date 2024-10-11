// components/Selector.tsx
import { useState, useEffect } from "react";

interface SelectorProps {
  data: any[];
  onCategoryChange: (category: string) => void;
  onSpecialtyChange: (specialty: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ data, onCategoryChange, onSpecialtyChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  useEffect(() => {
    if (selectedCategory) {
      onCategoryChange(selectedCategory);
    }
  }, [selectedCategory, onCategoryChange]);

  useEffect(() => {
    if (selectedSpecialty) {
      onSpecialtyChange(selectedSpecialty);
    }
  }, [selectedSpecialty, onSpecialtyChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-120">
      <h2 className="text-lg font-semibold mb-4 text-custom-color">Filtrar por Especialidad</h2>

      <label className="flex flex-col gap-2 text-custom-color">
        Categoría de Especialidad:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Seleccione una categoría</option>
          {Array.from(new Set(data.map((item) => item.categoria_especialidad))).map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-custom-color mt-4">
        Nombre de Especialidad:
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="p-2 border rounded"
          disabled={!selectedCategory} // Deshabilitar si no se ha seleccionado una categoría
        >
          <option value="">Seleccione una especialidad</option>
          {Array.from(
            new Set(
              data
                .filter((item) => item.categoria_especialidad === selectedCategory)
                .map((item) => item.nombre_especialidad)
            )
          ).map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Selector;
