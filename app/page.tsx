"use client";
import { useState } from "react";
import Image from "next/image";
import { fetchGeoData } from "./components/geo";
import Map from "./components/Map";
import InfoPanel from "./components/InfoPanel";
import { GeoData } from "./components/types";

export default function Home() {
  const [id_departamento_param, setDepartamento] = useState<number | "">("");
  const [id_municipio_param, setMunicipio] = useState<number | "">("");
  const [data, setData] = useState<GeoData[]>([]);
  const [error, setError] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 2.454167,
    longitude: -74.08175,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(6);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id_departamento_param || !id_municipio_param) {
      alert("Por favor, selecciona un departamento y un municipio.");
      return;
    }

    try {
      const result = await fetchGeoData(id_departamento_param, id_municipio_param);
      setData(result);
      setError("");

      // Usar la latitud y longitud de la primera entrada para la vista inicial del mapa
      const { latitud, longitud } = result[0];
      setMapCoordinates({ latitude: latitud, longitude: longitud });
      setZoomLevel(15);
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      setError("Hubo un problema al enviar los datos.");
    }
  };

  const handleLocationSelect = (location: google.maps.LatLngLiteral) => {
    setMapCoordinates({
      latitude: location.lat,
      longitude: location.lng,
    });
    setZoomLevel(16);
  };

  const handleClose = () => {
    console.log("El panel de información se ha cerrado.");
  };

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <Map
        latitude={mapCoordinates.latitude}
        longitude={mapCoordinates.longitude}
        zoom={zoomLevel}
      />

      <div className="absolute top-14 left-3 z-10 transition-transform duration-300">
        <div className="bg-white p-4 rounded-lg shadow-lg w-72 sm:w-80 md:w-15 lg:w-1/1 relative">
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
                value={id_departamento_param}
                onChange={(e) => setDepartamento(Number(e.target.value))}
                className="p-2 border rounded"
                required
              >
                <option value="">Seleccione un departamento</option>
                <option value="76">Nariño</option>
                <option value="86">Putumayo</option>
                <option value="76">Valle del Cauca</option>
                <option value="19">Cauca</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-custom-color">
              Municipio:
              <select
                value={id_municipio_param}
                onChange={(e) => setMunicipio(Number(e.target.value))}
                className="p-2 border rounded"
                required
              >
                <option value="">Seleccione un municipio</option>
                <option value="520001">Pasto</option>
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
      </div>

      {data.length > 0 && (
        <div className={`absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-4xl transition-all duration-300 ease-in-out ${
          showDetails ? "max-h-[500px] opacity-100" : "max-h-[60px] opacity-70"
        } overflow-hidden`}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-500 flex items-center gap-2 focus:outline-none"
          >
            {showDetails ? "✖ Cerrar" : "▼ Desplegar"}
          </button>

          {showDetails && (
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-custom-color">Información Complementaria</h5>
              <div className="text-sm text-gray-700">
                <p><strong>Prestador Centralidad:</strong> {data[0]?.pres_centralidad_nombre || "No disponible"}</p>
                <p><strong>Ubicación:</strong> {data[0]?.centralidad_nom || "No disponible"}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {data.length > 0 && (
        <div className="absolute right-2 top-14 z-10">
          <InfoPanel
            data={data}
            onLocationSelect={handleLocationSelect}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
