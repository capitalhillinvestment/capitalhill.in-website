import { AMFIFund } from "./types";

export function parseAMFI(rawData: string): AMFIFund[] {
  const lines = rawData.split("\n");

  const funds: AMFIFund[] = [];

  for (const line of lines) {
    const cols = line.split(";");

    // Skip invalid rows
    if (cols.length < 6) continue;

    const schemeCode = cols[0].trim();

    // Skip headers/non-fund rows
    if (!/^\d+$/.test(schemeCode)) continue;

    funds.push({
      schemeCode,
      isinGrowth: cols[1]?.trim() || "",
      isinDividend: cols[2]?.trim() || "",
      schemeName: cols[3]?.trim() || "",
      nav: Number(cols[4]),
      date: cols[5]?.trim() || "",
    });
  }

  return funds;
}
