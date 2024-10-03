import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number; // Añadimos zoom como prop
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom }) => {
  // Comprobar si las coordenadas son válidas
  if (isNaN(latitude) || isNaN(longitude)) {
    return <div>Error: Coordenadas inválidas.</div>;
  }

  const position = { lat: latitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY_MAPS as string}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={zoom} // Utilizamos la prop zoom
      >
        {/* Usando el marcador básico */}
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
