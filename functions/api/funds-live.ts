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
    // For the first 5 funds, search AMFI's raw data for anything
    // containing that fund's AMC name, so we can see the real scheme
    // name format AMFI uses for these specific houses/funds.
    const debugRealNames = mutualFunds.slice(0, 5).map((fund) => {
      const amcToken = fund.amc.split(" ")[0].toLowerCase();
      const candidates = amfiFunds
        .filter((a) => a.schemeName.toLowerCase().includes(amcToken))
        .map((a) => a.schemeName)
        .filter((name) => {
          const lower = name.toLowerCase();
          const nameWords = fund.name
            .toLowerCase()
            .replace(/fund/g, "")
            .trim()
            .split(" ")
            .filter((w) => w.length > 3);
          return nameWords.some((w) => lower.includes(w));
        })
        .slice(0, 5);
      return { ourFund: `${fund.amc} | ${fund.name}`, realAmfiMatches: candidates };
    });

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
      debugRealNames,
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