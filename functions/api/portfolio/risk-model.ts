import { mutualFunds } from "../../data/mutualFunds";

const riskScoreMap: any = {
  Low: 1,
  "Low to Moderate": 2,
  Moderate: 3,
  "Moderately High": 4,
  High: 5,
};

export async function onRequestPost({ request }) {
  const { investments } = await request.json();

  let total = 0;
  let score = 0;

  investments.forEach((inv: any) => {
    const fund = mutualFunds.find(f => f.id === inv.fundId);
    if (!fund) return;

    const baseRisk = riskScoreMap[fund.riskLevel];

    const expensePenalty = fund.expenseRatio > 1 ? 0.2 : 0;

    const adjustedRisk = baseRisk + expensePenalty;

    total += inv.amount;
    score += adjustedRisk * inv.amount;
  });

  const finalRisk = score / total;

  return Response.json({
    riskScore: finalRisk,
    category:
      finalRisk < 1.5 ? "Very Low" :
      finalRisk < 2.5 ? "Low" :
      finalRisk < 3.5 ? "Moderate" :
      finalRisk < 4.5 ? "High" : "Very High",
  });
}
