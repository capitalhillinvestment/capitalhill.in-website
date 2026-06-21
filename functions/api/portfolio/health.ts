import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestPost({ request }) {
  const { investments } = await request.json();

  let returnScore = 0;
  let riskScore = 0;
  let diversification = new Set();

  let total = 0;

  investments.forEach((inv: any) => {
    const fund = mutualFunds.find(f => f.id === inv.fundId);
    if (!fund) return;

    total += inv.amount;

    returnScore += fund.returns.threeYear * inv.amount;
    riskScore += (fund.riskLevel === "High" ? 5 : 2) * inv.amount;
    diversification.add(fund.category);
  });

  const score =
    (returnScore / total) * 0.5 +
    (1 - riskScore / (total * 5)) * 0.3 +
    (diversification.size / 10) * 0.2;

  return Response.json({
    portfolioHealthScore: score * 100,
    diversificationScore: diversification.size,
    note:
      score > 0.7 ? "Strong Portfolio" :
      score > 0.4 ? "Balanced Portfolio" : "Needs Improvement",
  });
}
