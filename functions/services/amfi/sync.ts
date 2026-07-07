import { downloadAMFI } from "./downloader";
import { parseAMFI } from "./parser";
import { validateFunds } from "./validator";
import { normalizeFunds } from "./normalizer";
import type { AMFIFund } from "./types";

export async function syncAMFI(): Promise<AMFIFund[]> {
  const rawData = await downloadAMFI();

  const parsedFunds = parseAMFI(rawData);

  const validFunds = validateFunds(parsedFunds);

  const normalizedFunds = normalizeFunds(validFunds);

  if (normalizedFunds.length === 0) {
    // The download succeeded (didn't throw) but produced zero usable
    // records — likely AMFI served something other than the expected
    // NAVAll.txt format (a challenge/maintenance page, rate-limit
    // response, etc). Surface a preview of what we actually got instead
    // of failing silently with totalAmfiRecords: 0.
    const preview = rawData.slice(0, 300).replace(/\s+/g, " ").trim();
    throw new Error(
      `AMFI sync produced 0 valid records from ${rawData.length} chars of raw data. Preview: "${preview}"`
    );
  }

  return normalizedFunds;
}