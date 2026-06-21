export interface Fund {
  id: string;
  name: string;
  amc: string;
  category: string;
  nav: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export async function getFunds() {
  const response = await fetch(`${API_URL}/api/funds`);

  if (!response.ok) {
    throw new Error('Failed to fetch funds');
  }

  return response.json();
}
