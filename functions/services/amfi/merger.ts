import { MutualFund } from "../../data/mutualFunds";
import { AMFIFund } from "./types";

/**
 * Normalize a scheme/fund name into a compact fingerprint for matching
 * between our research dataset and AMFI's raw scheme names.
 *
 * AMFI's naming is inconsistent in the wild: mixed case ("SBI LARGE &
 * MIDCAP FUND -DIRECT PLAN -Growth"), "&" vs "and", inconsistent spacing
 * around hyphens, and words that are sometimes joined and sometimes
 * split ("Bluechip" vs "Blue Chip"). To be resilient to all of that,
 * this strips plan/option qualifiers as whole words, then removes ALL
 * remaining whitespace/punctuation entirely (not just replacing with a
 * space) so that spacing/hyphenation variants collapse to the same key.
 */
function normalizeName(name: string): string {
  let n = name
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]/g, " ");

  const stopwords = new Set([
    "direct",
    "regular",
    "growth",
    "idcw",
    "dividend",
    "payout",
    "reinvestment",
    "plan",
    "option",
    "options",
    "fund",
    "income",
    "distribution",
    "cum",
    "capital",
    "withdrawal",
    "daily",
    "weekly",
    "monthly",
    "quarterly",
    "annual",
    "bonus",
  ]);

  n = n
    .split(" ")
    .filter((w) => w && !stopwords.has(w))
    .join(""); // collapse all remaining whitespace -> immune to spacing variants

  return n;
}

/**
 * Canonical merge of research fund data with the live AMFI NAV feed.
 *
 * Match priority:
 *  1. Exact `amfiCode` -> AMFI `schemeCode` (authoritative, once populated).
 *  2. Fuzzy name match on "<AMC> <fund name>", preferring the Growth plan
 *     record (our research NAVs are growth-plan values).
 *
 * Only `nav` and `navDate` are ever overwritten. Every other research field
 * (category, returns, AUM, expense ratio, risk, rating, etc.) is preserved
 * via object spread, so this can never corrupt the research dataset.
 *
 * Note: some funds in a hand-maintained research dataset may not match
 * any current AMFI scheme at all (funds get renamed/recategorized/merged
 * over time under SEBI rules) — those are left with their static
 * placeholder NAV rather than forced into an incorrect match.
 */
export function mergeFundsWithNav(
  funds: MutualFund[],
  amfiFunds: AMFIFund[]
): MutualFund[] {
  const byCode = new Map<string, AMFIFund>();
  for (const a of amfiFunds) {
    if (a.schemeCode) byCode.set(a.schemeCode, a);
  }

  const byName = new Map<string, AMFIFund>();
  for (const a of amfiFunds) {
    const key = normalizeName(a.schemeName);
    if (!key) continue;

    const isGrowth =
      /growth/i.test(a.schemeName) && !/idcw|dividend/i.test(a.schemeName);
    const existing = byName.get(key);

    if (!existing || (isGrowth && !/growth/i.test(existing.schemeName))) {
      byName.set(key, a);
    }
  }

  return funds.map((fund) => {
    const amfiCode = (fund as { amfiCode?: string }).amfiCode;
    let match = amfiCode ? byCode.get(amfiCode) : undefined;

    if (!match) {
      match =
        byName.get(normalizeName(`${fund.amc} ${fund.name}`)) ||
        byName.get(normalizeName(fund.name));
    }

    if (!match) return fund;

    return {
      ...fund,
      nav: match.nav,
      navDate: match.date,
    };
  });
}
