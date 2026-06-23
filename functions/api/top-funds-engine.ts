import { mutualFunds } from "../data/mutualFunds";
import { calculateFundScore } from "../engine/calculateFundScore";

export async function onRequestGet() {
  const scored = mutualFunds.map((fund) => ({
    ...fund,
    score: calculateFundScore(fund),
  }));

  const topFunds = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return Response.json({
    success: true,
    count: topFunds.length,
    data: topFunds,
  });
}
