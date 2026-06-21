import { mutualFunds } from "../mutualFunds";

export const fundPerformance = mutualFunds.map((fund) => ({
  id: fund.id,
  name: fund.name,

  // performance metrics
  nav: fund.nav,
  navDate: fund.navDate,

  returns: {
    oneYear: fund.returns.oneYear,
    threeYear: fund.returns.threeYear,
    fiveYear: fund.returns.fiveYear,
  },

  // optional benchmark comparison
  benchmark: fund.benchmark,
}));
