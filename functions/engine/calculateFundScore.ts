import { MutualFund } from "../data/mutualFunds";

export function calculateFundScore(fund: MutualFund): number {
  let score = 0;

  // Returns (40%)
  const returnsScore =
    fund.returns.oneYear * 0.2 +
    fund.returns.threeYear * 0.3 +
    fund.returns.fiveYear * 0.5;

  score += Math.min(returnsScore, 40);

  // Risk (20%)
  const riskMap: Record<string, number> = {
    Low: 20,
    "Low to Moderate": 16,
    Moderate: 12,
    "Moderately High": 8,
    High: 4,
  };

  score += riskMap[fund.riskLevel] || 10;

  // Expense penalty (10%)
  score += Math.max(0, 10 - fund.expenseRatio * 5);

  // AUM stability (10%)
  if (fund.aum > 50000) score += 10;
  else if (fund.aum > 20000) score += 7;
  else if (fund.aum > 10000) score += 5;
  else score += 3;

  // Rating (20%)
  score += fund.rating * 4;

  return Math.round(score);
}
