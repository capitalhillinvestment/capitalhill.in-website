const API_URL = import.meta.env.VITE_API_URL || '';

export async function getFunds() {
  const response = await fetch(`${API_URL}/api/funds`);

  if (!response.ok) {
    throw new Error(`Failed to fetch funds: ${response.status}`);
  }

  const result = await response.json();

  console.log('API Response:', result);

  // API returns:
  // {
  //   success: true,
  //   count: 43,
  //   data: [...]
  // }

  return Array.isArray(result.data) ? result.data : [];
}
