import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestPost({ request }) {
  const { riskProfile } = await request.json();

  const scored = mutualFunds.map(fund => {
    let score = 0;

    // return score
    score += fund.returns.threeYear;

    // expense penalty
    score -= fund.expenseRatio * 5;

    // risk alignment
    const riskMatch =
      (riskProfile === "Low" && fund.riskLevel === "Low") ||
      (riskProfile === "Moderate" && fund.riskLevel.includes("Moderate")) ||
      (riskProfile === "High" && (fund.riskLevel === "High" || fund.riskLevel === "Moderately High"));

    if (riskMatch) score += 10;

    return { ...fund, score };
  });

  return Response.json({
    riskProfile,
    recommendations: scored.sort((a, b) => b.score - a.score).slice(0, 10),
  });
}
