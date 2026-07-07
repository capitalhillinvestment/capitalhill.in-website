import { mutualFunds } from "../data/mutualFunds";
import { mapNavToFunds } from "../utils/mapNav";
import { syncAMFI } from "../services/amfi/sync";
import {
  saveLatestFunds,
  saveSyncStatus,
  getLatestFunds,
} from "../services/amfi/kv";

export async function onRequestGet(context: any) {
  const env = context?.env;

  try {
    const amfiFunds = await syncAMFI();

    const updatedFunds = mapNavToFunds(mutualFunds, amfiFunds);

    const matchedFunds = updatedFunds.filter(
      (fund, i) =>
        fund.nav !== mutualFunds[i].nav || fund.navDate !== mutualFunds[i].navDate
    ).length;

    // TEMPORARY DEBUG: remove once matching is confirmed working.
    // Shows a sample of AMFI's actual scheme name format alongside what
    // our first few funds' names look like, so mismatches are visible.
    const debugAmfiSample = amfiFunds.slice(0, 8).map((f) => f.schemeName);
    const debugOurFunds = mutualFunds.slice(0, 5).map((f) => `${f.amc} | ${f.name}`);

    if (env?.CAPITAL_HILL_DATA) {
      await saveLatestFunds(env, updatedFunds);
      await saveSyncStatus(env, {
        totalFunds: updatedFunds.length,
        latestNavDate: amfiFunds[0]?.date ?? "",
        syncedAt: new Date().toISOString(),
      });
    }

    return Response.json({
      success: true,
      updatedAt: new Date().toISOString(),
      totalFunds: updatedFunds.length,
      totalAmfiRecords: amfiFunds.length,
      matchedFunds,
      debugAmfiSample,
      debugOurFunds,
      data: updatedFunds,
    });
  } catch (error: any) {
    // AMFI is unreachable right now — fall back to the last good snapshot
    // in KV rather than breaking the page.
    if (env?.CAPITAL_HILL_DATA) {
      const cached = await getLatestFunds(env);
      if (cached && cached.length) {
        return Response.json({
          success: true,
          stale: true,
          error: error?.message || "Failed to fetch AMFI NAV",
          totalFunds: cached.length,
          data: cached,
        });
      }
    }

    return Response.json(
      {
        success: false,
        error: error?.message || "Failed to fetch AMFI NAV",
      },
      { status: 500 }
    );
  }
}