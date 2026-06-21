export interface FundMaster {
  id: string;
  name: string;
  amc: string;
  category: string;
  subCategory: string;
}

export const fundMaster: FundMaster[] = [
  { id: "MF001", name: "HDFC Top 100 Fund", amc: "HDFC", category: "Large Cap", subCategory: "Growth" },
  { id: "MF002", name: "ICICI Prudential Bluechip Equity Fund", amc: "ICICI Prudential", category: "Large Cap", subCategory: "Growth" },
  { id: "MF003", name: "SBI Large Cap Fund", amc: "SBI", category: "Large Cap", subCategory: "Growth" },
  { id: "MF004", name: "Kotak Bluechip Fund", amc: "Kotak", category: "Large Cap", subCategory: "Growth" },
  { id: "MF005", name: "Axis Bluechip Fund", amc: "Axis", category: "Large Cap", subCategory: "Growth" },
  { id: "MF006", name: "Aditya Birla Sun Life Frontline Equity Fund", amc: "Aditya Birla Sun Life", category: "Large Cap", subCategory: "Growth" },

  { id: "MF007", name: "HDFC Mid-Cap Opportunities Fund", amc: "HDFC", category: "Mid Cap", subCategory: "Growth" },
  { id: "MF008", name: "Kotak Emerging Equity Fund", amc: "Kotak", category: "Mid Cap", subCategory: "Growth" },
  { id: "MF009", name: "SBI Magnum Midcap Fund", amc: "SBI", category: "Mid Cap", subCategory: "Growth" },
  { id: "MF010", name: "Axis Midcap Fund", amc: "Axis", category: "Mid Cap", subCategory: "Growth" },

  { id: "MF011", name: "HDFC Small Cap Fund", amc: "HDFC", category: "Small Cap", subCategory: "Growth" },
  { id: "MF012", name: "SBI Small Cap Fund", amc: "SBI", category: "Small Cap", subCategory: "Growth" },
  { id: "MF013", name: "Nippon India Small Cap Fund", amc: "Nippon India", category: "Small Cap", subCategory: "Growth" },

  { id: "MF014", name: "HDFC Flexi Cap Fund", amc: "HDFC", category: "Flexi Cap", subCategory: "Growth" },
  { id: "MF015", name: "Kotak Flexicap Fund", amc: "Kotak", category: "Flexi Cap", subCategory: "Growth" },
  { id: "MF016", name: "UTI Flexi Cap Fund", amc: "UTI", category: "Flexi Cap", subCategory: "Growth" },

  { id: "MF017", name: "Axis Long Term Equity Fund", amc: "Axis", category: "ELSS", subCategory: "Tax Saving" },
  { id: "MF018", name: "ICICI Prudential Long Term Equity Fund", amc: "ICICI Prudential", category: "ELSS", subCategory: "Tax Saving" },
  { id: "MF019", name: "HDFC Tax Saver Fund", amc: "HDFC", category: "ELSS", subCategory: "Tax Saving" },

  { id: "MF020", name: "HDFC Corporate Bond Fund", amc: "HDFC", category: "Corporate Bond", subCategory: "Debt" },
  { id: "MF021", name: "ICICI Prudential Corporate Bond Fund", amc: "ICICI Prudential", category: "Corporate Bond", subCategory: "Debt" },

  { id: "MF022", name: "HDFC Balanced Advantage Fund", amc: "HDFC", category: "Balanced Advantage", subCategory: "Hybrid" },
  { id: "MF023", name: "ICICI Prudential Equity & Debt Fund", amc: "ICICI Prudential", category: "Hybrid Equity", subCategory: "Hybrid" },

  { id: "MF024", name: "SBI Dividend Yield Fund", amc: "SBI", category: "Dividend Yield", subCategory: "Value" },
  { id: "MF025", name: "Aditya Birla Sun Life Pure Value Fund", amc: "Aditya Birla Sun Life", category: "Value Fund", subCategory: "Value" }
];
