import { MutualFund } from "../data/mutualFunds";

export function calculateFundScore(fund: MutualFund): number {
  let score = 0;

  // 1. Returns (normalized weight)
  const returnsScore =
    fund.returns.oneYear * 0.2 +
    fund.returns.threeYear * 0.3 +
    fund.returns.fiveYear * 0.5;

  score += Math.min(returnsScore / 2, 30); // capped properly

  // 2. Risk score
  const riskMap: Record<string, number> = {
    Low: 20,
    "Low to Moderate": 16,
    Moderate: 12,
    "Moderately High": 8,
    High: 4,
  };

  score += riskMap[fund.riskLevel] ?? 10;

  // 3. Expense penalty (smoother)
  score += Math.max(0, 12 - fund.expenseRatio * 4);

  // 4. AUM stability (unchanged but safe)
  if (fund.aum > 50000) score += 12;
  else if (fund.aum > 20000) score += 9;
  else if (fund.aum > 10000) score += 6;
  else score += 3;

  // 5. Rating (balanced)
  score += fund.rating * 3;

  return Math.round(score);
}
