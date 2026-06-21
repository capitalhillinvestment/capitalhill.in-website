import { fundRisk } from "../../data/funds/fundRisk";

const riskWeight: Record<string, number> = {
  "Low": 1,
  "Low to Moderate": 2,
  "Moderate": 3,
  "Moderately High": 4,
  "High": 5,
};

export async function onRequestPost({ request }) {
  const body = await request.json();

  const { investments } = body;

  let totalWeight = 0;
  let totalAmount = 0;

  investments.forEach((inv: any) => {
    const fund = fundRisk.find(f => f.id === inv.fundId);

    if (!fund) return;

    totalAmount += inv.amount;
    totalWeight += riskWeight[fund.riskLevel] * inv.amount;
  });

  const portfolioRiskScore = totalWeight / totalAmount;

  let category =
    portfolioRiskScore <= 1.5 ? "Low" :
    portfolioRiskScore <= 2.5 ? "Low to Moderate" :
    portfolioRiskScore <= 3.5 ? "Moderate" :
    portfolioRiskScore <= 4.5 ? "High" : "Very High";

  return Response.json({
    portfolioRiskScore,
    category,
  });
}
