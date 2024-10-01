import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  latitude: number;
  longitude: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  // Comprobar si las coordenadas son válidas
  if (isNaN(latitude) || isNaN(longitude)) {
    return <div>Error: Coordenadas inválidas.</div>; // Muestra un mensaje de error si las coordenadas son inválidas
  }

  const position = { lat: latitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY_MAPS as string}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={10}
      >
        {/* Usando el marcador básico */}
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
