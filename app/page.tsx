"use client";
import { useState } from 'react';
import Image from 'next/image';
import { fetchGeoData } from './components/geo';
import Map from './components/Map';


interface GeoData {
  departamento_nombre: string;
  municipio_nombre: string;
  region: string;
  subregion: string;
  prestador_nombre: string;
  latitud: number;
  longitud: number;
}

export default function Home() {
  const [departamento, setDepartamento] = useState<number | "">("");
  const [municipio, setMunicipio] = useState<number | "">("");
  const [data, setData] = useState<GeoData[]>([]);
  const [error, setError] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);  // Estado para mostrar/ocultar info


  const [mapCoordinates, setMapCoordinates] = useState({ latitude: 4.60971, longitude: -74.08175 }); // Coordenadas iniciales (Bogotá)
  const [zoomLevel, setZoomLevel] = useState<number>(6); // Zoom inicial

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!departamento || !municipio) {
      alert('Por favor, selecciona un departamento y un municipio.');
      return;
    }

    try {
      const result = await fetchGeoData(departamento, municipio);
      setData(result as GeoData[]);
      setError("");

      // Cambiar las coordenadas y el zoom después de la selección
      const { latitud, longitud } = result[0];
      setMapCoordinates({ latitude: latitud, longitude: longitud });
      setZoomLevel(14); // Cambia el zoom después de seleccionar

    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Hubo un problema al enviar los datos.');
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Mapa que ocupará toda la pantalla */}
      <Map latitude={mapCoordinates.latitude} longitude={mapCoordinates.longitude} zoom={zoomLevel} />

      {/* Contenedor flotante para el formulario */}
      <div className="absolute left-2 top-14 bg-white p-6 rounded-lg shadow-lg z-10 w-72">
        <Image
          src="https://raw.githubusercontent.com/VictorGitHup/img/2d4cd36f1e3c384d3022ed7e269f0df4a95fc94b/logo-emssanareps.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label className="flex flex-col gap-2 text-custom-color">
            Departamento:
            <select
              value={departamento}
              onChange={(e) => setDepartamento(Number(e.target.value))}
              className="p-2 border rounded"
              required
            >
              <option value="">Seleccione un departamento</option>
              <option value="76">Valle del Cauca</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-custom-color">
            Municipio:
            <select
              value={municipio}
              onChange={(e) => setMunicipio(Number(e.target.value))}
              className="p-2 border rounded"
              required
            >
              <option value="">Seleccione un municipio</option>
              <option value="76109">Buenaventura</option>
            </select>
          </label>

          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-colors h-10 px-4"
          >
            Enviar
          </button>
        </form>

        {/* Muestra los errores si los hay */}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Contenedor flotante para mostrar solo los datos de prestador */}
      {data.length > 0 && (
        <div className="absolute right-2 top-14 bg-white p-6 rounded-lg shadow-lg z-10 w-72">
          <h2 className="text-lg font-semibold mb-4 text-custom-color">Prestador Primario</h2>
          <ul className="list-disc pl-5 text-custom-color">
            {data.map((item, index) => (
              <li key={index} className="mb-2">{item.prestador_nombre}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contenedor flotante para mostrar información complementaria */}
      {data.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-4xl">
          {/* Botón para desplegar o esconder la información */}
          <h5
            className="text-lg font-semibold mb-4 text-custom-color text-sm text-center cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}  // Toggle entre mostrar/ocultar
          >
            Información Complementaria {showInfo ? '▲' : '▼'}
          </h5>

          {/* Contenedor horizontal que se despliega o esconde */}
          {showInfo && (
            <div className="flex justify-between gap-8">
              {/* Bloque para la Región */}
              <div className="bg-gray-100 p-4 rounded-lg flex-1">
                <div className="flex justify-between w-full text-custom-color text-sm">
                  <span className="font-semibold">Región:</span>
                  <span>{Array.from(new Set(data.map(item => item.region))).join(", ")}</span>
                </div>
              </div>

              {/* Bloque para la Subregión */}
              <div className="bg-gray-100 p-4 rounded-lg flex-1">
                <div className="flex justify-between w-full text-custom-color text-sm">
                  <span className="font-semibold">Subregión:</span>
                  <span>{Array.from(new Set(data.map(item => item.subregion))).join(", ")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}
