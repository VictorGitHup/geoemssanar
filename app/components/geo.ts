// app/components/geo.tsx

const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

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
