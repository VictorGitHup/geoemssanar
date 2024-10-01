// app/page.tsx
"use client"; // Esto indica que este componente es del lado del cliente

import { useState } from "react";
import Image from "next/image";
import { fetchGeoData } from "./components/geo"; // Ajusta la ruta según tu estructura

export default function Home() {
  // Estados para guardar la selección de departamento y municipio
  const [departamento, setDepartamento] = useState<number | "">("");
  const [municipio, setMunicipio] = useState<number | "">("");
  const [data, setData] = useState<any>(null); // Para almacenar los datos de la respuesta
  const [error, setError] = useState<string>(""); // Para almacenar errores

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar que se seleccionaron departamento y municipio
    if (!departamento || !municipio) {
      alert("Por favor, selecciona un departamento y un municipio.");
      return;
    }

    // Realizar la solicitud a la API de Supabase
    try {
      const result = await fetchGeoData(departamento, municipio);
      setData(result); // Guardar datos en el estado
      setError(""); // Limpiar errores
      alert("Datos recibidos correctamente. Consulta la consola.");
    } catch (error: any) {
      console.error("Error al hacer la solicitud:", error);
      setError(error.message); // Guardar error en el estado
      alert("Hubo un problema al enviar los datos. Revisa la consola.");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* Formulario para seleccionar departamento y municipio */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            Departamento:
            <select
              value={departamento}
              onChange={(e) => setDepartamento(Number(e.target.value))}
              className="p-2 border rounded"
              required
            >
              <option value="">Seleccione un departamento</option>
              <option value="76">Valle del Cauca (76)</option>
              {/* Puedes agregar más departamentos si es necesario */}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Municipio:
            <select
              value={municipio}
              onChange={(e) => setMunicipio(Number(e.target.value))}
              className="p-2 border rounded"
              required
            >
              <option value="">Seleccione un municipio</option>
              <option value="76109">Buenaventura (76109)</option>
              {/* Puedes agregar más municipios si es necesario */}
            </select>
          </label>

          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-colors h-10 px-4"
          >
            Enviar
          </button>
        </form>

        {/* Muestra los datos obtenidos o un mensaje de error */}
        {error && <p className="text-red-500">{error}</p>}
        {data && <div>{JSON.stringify(data)}</div>}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Pie de página adicional */}
      </footer>
    </div>
  );
}
