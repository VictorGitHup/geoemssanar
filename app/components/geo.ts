// app/components/geo.tsx

const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export async function fetchGeoData(id_departamento_param: number, id_municipio_param: number) {
  // Validar que la URL y la clave de API estén definidas
  if (!SUPABASE_API_URL) {
    throw new Error("SUPABASE_API_URL no está definida. Asegúrate de que la variable de entorno esté configurada.");
  }
  
  if (!SUPABASE_API_KEY) {
    throw new Error("SUPABASE_API_KEY no está definida. Asegúrate de que la variable de entorno esté configurada.");
  }

  const response = await fetch(SUPABASE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_API_KEY,
      'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    },
    body: JSON.stringify({
      id_departamento_param,
      id_municipio_param,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
