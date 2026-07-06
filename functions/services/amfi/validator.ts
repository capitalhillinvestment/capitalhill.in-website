import { AMFIFund } from "./types";

export function validateFunds(funds: AMFIFund[]): AMFIFund[] {
  return funds.filter(
    (fund) =>
      fund.schemeCode &&
      fund.schemeName &&
      !isNaN(fund.nav) &&
      fund.nav > 0 &&
      fund.date
  );
}

