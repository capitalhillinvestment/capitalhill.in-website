export const KV_KEYS = {
  FUNDS: "funds/latest",
  NAV: "nav/latest",
  STATUS: "sync/status",
};

export async function saveLatestFunds(env: any, funds: unknown[]) {
  await env.CAPITAL_HILL_DATA.put(
    KV_KEYS.FUNDS,
    JSON.stringify(funds)
  );
}

export async function getLatestFunds(env: any) {
  const data = await env.CAPITAL_HILL_DATA.get(KV_KEYS.FUNDS);

  return data ? JSON.parse(data) : [];
}

export async function saveSyncStatus(
  env: any,
  status: {
    totalFunds: number;
    latestNavDate: string;
    syncedAt: string;
  }
) {
  await env.CAPITAL_HILL_DATA.put(
    KV_KEYS.STATUS,
    JSON.stringify(status)
  );
}

export async function getSyncStatus(env: any) {
  const data = await env.CAPITAL_HILL_DATA.get(KV_KEYS.STATUS);

  return data ? JSON.parse(data) : null;
}