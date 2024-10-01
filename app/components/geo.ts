// app/components/geo.tsx

const SUPABASE_API_URL = 'https://smkaikcxhuwbazkaeenw.supabase.co/rest/v1/rpc/filtrar';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNta2Fpa2N4aHV3YmF6a2FlZW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzA0NzEsImV4cCI6MjA0Mjg0NjQ3MX0.bL5b4vNSMkh0UlPl7fbE3kN8NhK4IqDe2u-6DcNQ-UQ'; // Asegúrate de usar la clave API correcta

export async function fetchGeoData(id_departamento: number, id_municipio: number) {
  const response = await fetch(SUPABASE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_API_KEY,
      'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    },
    body: JSON.stringify({
      id_departamento,
      id_municipio,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
