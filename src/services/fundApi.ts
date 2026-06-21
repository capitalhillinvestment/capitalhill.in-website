const API_URL = import.meta.env.VITE_API_URL || '';

export async function getFunds() {
  const response = await fetch(`${API_URL}/api/funds`);

  if (!response.ok) {
    throw new Error('Failed to fetch funds');
  }

  return response.json();
}
