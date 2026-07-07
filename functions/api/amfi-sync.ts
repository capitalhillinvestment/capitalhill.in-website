import { syncAMFI } from "../services/amfi/sync";
import { saveLatestFunds, saveSyncStatus } from "../services/amfi/kv";

/**
 * Manually triggers an AMFI sync and caches the raw result in KV.
 * (This is also what a scheduled/cron job would call to keep the KV
 * cache warm, so /api/funds-live doesn't need to hit AMFI on every
 * page view.)
 */
export const onRequestGet = async (context: any) => {
  const env = context?.env;

  try {
    const amfiFunds = await syncAMFI();

    let persisted = false;
    if (env?.CAPITAL_HILL_DATA) {
      await saveLatestFunds(env, amfiFunds);
      await saveSyncStatus(env, {
        totalFunds: amfiFunds.length,
        latestNavDate: amfiFunds[0]?.date ?? "",
        syncedAt: new Date().toISOString(),
      });
      persisted = true;
    }

    return Response.json({
      success: true,
      count: amfiFunds.length,
      persisted,
      sample: amfiFunds.slice(0, 5),
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};