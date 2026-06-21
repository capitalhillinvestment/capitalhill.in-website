import { fundPerformance } from "../../data/funds/fundPerformance";

function futureValue(monthly: number, rate: number, years: number) {
  const r = rate / 12;
  const n = years * 12;

  let value = 0;
  for (let i = 0; i < n; i++) {
    value = (value + monthly) * (1 + r);
  }

  return value;
}

export async function onRequestPost({ request }) {
  const { goalAmount, years, riskProfile } = await request.json();

  const filteredFunds = fundPerformance.filter(f => {
    if (riskProfile === "Low") return f.returns.threeYear < 10;
    if (riskProfile === "Moderate") return f.returns.threeYear >= 10 && f.returns.threeYear <= 18;
    return f.returns.threeYear > 15;
  });

  const recommendations = filteredFunds.map(fund => {
    const monthlyNeeded =
      goalAmount / futureValue(1, fund.returns.threeYear / 100, years);

    return {
      fundId: fund.id,
      name: fund.name,
      estimatedReturn: fund.returns.threeYear,
      suggestedSIP: monthlyNeeded,
    };
  });

  return Response.json({
    goalAmount,
    years,
    riskProfile,
    recommendations,
  });
}
