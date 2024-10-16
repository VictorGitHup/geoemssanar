// pages/_app.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_MAPS}&callback=initMap&v=weekly&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Eliminar el script al desmontar
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Definimos la función de callback `initMap` para inicializar el mapa
  window.initMap = () => {
    console.log('Mapa inicializado');
    // Aquí puedes hacer cualquier cosa que necesites hacer al inicializar el mapa
  };

  return <Component {...pageProps} />;
}

export default MyApp;
