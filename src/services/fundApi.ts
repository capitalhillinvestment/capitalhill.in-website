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

export interface LiveAmfiFund {
  schemeCode: string;
  isinGrowth: string;
  isinDividend: string;
  schemeName: string;
  nav: number;
  date: string;
  /**
   * Enrichment fields — not provided by AMFI's public feed today.
   * Reserved for a future data source. Render "—" when absent.
   */
  amc?: string;
  category?: string;
  riskLevel?: string;
  rating?: number;
  expenseRatio?: number;
  aum?: number;
  fundManager?: string;
  minInvestment?: number;
  returns?: {
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

export interface LiveFundsResult {
  data: LiveAmfiFund[];
  totalAmfiRecords: number;
  totalMatchingQuery: number;
  limit: number;
  offset: number;
  stale?: boolean;
  error?: string;
}

/**
 * Fetch real, live AMFI fund data (name, NAV, date only — AMFI's public
 * feed doesn't include AUM/expense ratio/risk/rating/manager).
 */
export async function getLiveFunds(
  query: string = '',
  limit: number = 50,
  offset: number = 0
): Promise<LiveFundsResult> {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  params.set('limit', String(limit));
  params.set('offset', String(offset));

  const response = await fetch(`${API_URL}/api/funds-live?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch live funds: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch live funds');
  }

  return result as LiveFundsResult;
}