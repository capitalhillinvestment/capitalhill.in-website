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

  return normalizedFunds;
}
