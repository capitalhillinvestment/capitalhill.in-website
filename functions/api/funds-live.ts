import { syncAMFI } from "../services/amfi/sync";
import { saveLatestFunds, getLatestFunds } from "../services/amfi/kv";
import type { AMFIFund } from "../services/amfi/types";

/**
 * Live AMFI fund data — returns real, current schemes straight from
 * AMFI's daily NAV feed (not merged with the static research dataset,
 * since fund names/categories drift out of date with reality over time
 * and forcing a match onto stale names causes more harm than good).
 *
 * Supports:
 *   ?q=<text>      case-insensitive search on scheme name
 *   ?limit=<n>     default 50, max 200
 *   ?offset=<n>    default 0
 */
export async function onRequestGet(context: any) {
  const env = context?.env;
  const url = new URL(context.request.url);

  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit")) || 50, 1),
    200
  );
  const offset = Math.max(Number(url.searchParams.get("offset")) || 0, 0);

  let amfiFunds: AMFIFund[];
  let stale = false;
  let fetchError: string | undefined;

  try {
    amfiFunds = await syncAMFI();

    if (env?.CAPITAL_HILL_DATA) {
      await saveLatestFunds(env, amfiFunds);
    }
  } catch (error: any) {
    fetchError = error?.message || "Failed to fetch AMFI NAV";

    if (env?.CAPITAL_HILL_DATA) {
      const cached = await getLatestFunds(env);
      if (cached && cached.length) {
        amfiFunds = cached as AMFIFund[];
        stale = true;
      } else {
        return Response.json(
          { success: false, error: fetchError },
          { status: 500 }
        );
      }
    } else {
      return Response.json(
        { success: false, error: fetchError },
        { status: 500 }
      );
    }
  }

  const filtered = q
    ? amfiFunds.filter((f) => f.schemeName.toLowerCase().includes(q))
    : amfiFunds;

  const page = filtered.slice(offset, offset + limit);

  return Response.json({
    success: true,
    updatedAt: new Date().toISOString(),
    ...(stale ? { stale: true, error: fetchError } : {}),
    totalAmfiRecords: amfiFunds.length,
    totalMatchingQuery: filtered.length,
    limit,
    offset,
    data: page,
  });
}