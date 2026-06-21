export const onRequestGet = async () => {
  return Response.json([
    {
      id: "1",
      name: "HDFC Top 100 Fund",
      amc: "HDFC Mutual Fund",
      category: "Equity",
      subCategory: "Large Cap",
      nav: 100.25,
      navDate: "2026-06-21",
      returns: {
        oneYear: 12.5,
        threeYear: 14.2,
        fiveYear: 16.1,
      },
      aum: 35000,
      expenseRatio: 1.2,
      riskLevel: "Moderately High",
      benchmark: "Nifty 100 TRI",
      minInvestment: 100,
      fundManager: "Sample Manager",
      launchDate: "2010-01-01",
      rating: 5,
    }
  ]);
};
