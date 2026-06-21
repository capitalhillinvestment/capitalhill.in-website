export const onRequestGet = async () => {
  return Response.json([
    {
      id: "1",
      name: "HDFC Top 100 Fund",
      amc: "HDFC Mutual Fund",
      category: "Large Cap",
      nav: 100.25,
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund",
      amc: "ICICI Prudential Mutual Fund",
      category: "Large Cap",
      nav: 85.40,
    },
  ]);
};
