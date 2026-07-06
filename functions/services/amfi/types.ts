/**
 * Raw AMFI fund record after parsing.
 * This represents exactly one scheme from the AMFI NAV file.
 */
export interface AMFIFund {
  schemeCode: string;
  isinGrowth: string;
  isinDividend: string;
  schemeName: string;
  nav: number;
  date: string;
}
