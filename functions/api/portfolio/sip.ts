import { fundPerformance } from "../../data/funds/fundPerformance";

export async function onRequestPost({ request }) {
  const body = await request.json();

  const { monthlyInvestment, years, fundId } = body;

  const fund = fundPerformance.find(f => f.id === fundId);

  if (!fund) {
    return Response.json({ error: "Fund not found" }, { status: 404 });
  }

  const rate = fund.returns.fiveYear / 100 / 12; // monthly return approximation
  const months = years * 12;

  let value = 0;

  for (let i = 0; i < months; i++) {
    value = (value + monthlyInvestment) * (1 + rate);
  }

  return Response.json({
    fundId,
    fundName: fund.name,
    monthlyInvestment,
    years,
    invested: monthlyInvestment * months,
    maturityValue: value,
    gain: value - monthlyInvestment * months,
  });
}
