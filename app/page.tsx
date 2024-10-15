// page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { fetchGeoData } from "./components/geo";
import Map from "./components/Map";
import InfoPanel from "./components/InfoPanel";
import { GeoData } from "./components/types";

export default function Home() {
  const [departamento, setDepartamento] = useState<number | "">("");
  const [municipio, setMunicipio] = useState<number | "">("");
  const [data, setData] = useState<GeoData[]>([]);
  const [error, setError] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false); // Nuevo estado para el InfoPanel

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 2.454167,
    longitude: -74.08175,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(6);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!departamento || !municipio) {
      alert("Por favor, selecciona un departamento y un municipio.");
      return;
    }

    try {
      const result = await fetchGeoData(departamento, municipio);
      setData(result as GeoData[]);
      setError("");

      const { latitud, longitud } = result[0];
      setMapCoordinates({ latitude: latitud, longitude: longitud });
      setZoomLevel(15); // Ajusta el nivel de zoom al buscar
      setShowInfoPanel(true); // Muestra el InfoPanel al buscar
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      setError("Hubo un problema al enviar los datos.");
    }
  };

  // Función para manejar la selección de ubicación
  const handleLocationSelect = (location: google.maps.LatLngLiteral) => {
    setMapCoordinates({
      latitude: location.lat,
      longitude: location.lng,
    });
    setZoomLevel(16); // Establece el nivel de zoom al seleccionar desde el InfoPanel
    console.log('Ubicación seleccionada:', location);
  };

  // Función para cerrar el InfoPanel
  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <Map
        latitude={mapCoordinates.latitude}
        longitude={mapCoordinates.longitude}
        zoom={zoomLevel}
      />

      <div className="absolute left-2 top-14 bg-white p-4 rounded-lg shadow-lg z-10 w-72 sm:w-80 md:w-96 lg:w-1/6">
        <Image
          src="https://raw.githubusercontent.com/VictorGitHup/img/2d4cd36f1e3c384d3022ed7e269f0df4a95fc94b/logo-emssanareps.svg"
          alt="Logo de Emssanar EPS"
          width={180}
          height={38}
          priority
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
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
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* InfoPanel con la nueva funcionalidad de cierre */}
      {showInfoPanel && (
        <div className="absolute right-2 top-14 z-10">
          <InfoPanel 
            data={data} 
            onLocationSelect={handleLocationSelect} 
            onClose={handleCloseInfoPanel} 
          />
        </div>
      )}

      {data.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-4xl">
          <h5
            className="text-lg font-semibold mb-4 text-custom-color text-sm text-center cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          >
            Información Complementaria {showInfo ? "▲" : "▼"}
          </h5>

          {showInfo && (
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div className="bg-gray-100 p-4 rounded-lg flex-1">
                <div className="flex justify-between w-full text-custom-color text-sm">
                  <span className="font-semibold">Región:</span>
                  <span>{Array.from(new Set(data.map((item) => item.region))).join(", ")}</span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex-1">
                <div className="flex justify-between w-full text-custom-color text-sm">
                  <span className="font-semibold">Subregión:</span>
                  <span>{Array.from(new Set(data.map((item) => item.subregion))).join(", ")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
