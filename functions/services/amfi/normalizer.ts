import { AMFIFund } from "./types";

export function normalizeFunds(funds: AMFIFund[]): AMFIFund[] {
  return funds.map((fund) => ({
    ...fund,
    schemeName: fund.schemeName.replace(/\s+/g, " ").trim(),
  }));
}
