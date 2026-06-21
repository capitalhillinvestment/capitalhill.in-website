import mutualFunds from "../data/mutualFunds";
import { calculateFundScore } from "../engine/fundScore";

export async function onRequestGet() {
  const enriched = mutualFunds.map((fund) => ({
    ...fund,
    score: calculateFundScore(fund),
  }));

  return Response.json(enriched);
}
