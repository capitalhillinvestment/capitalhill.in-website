import { MutualFund } from "../data/mutualFunds";

/**
 * Converts risk into numeric score
 */
const riskScoreMap: Record<MutualFund["riskLevel"], number> = {
  "Low": 5,
  "Low to Moderate": 4,
  "Moderate": 3,
  "Moderately High": 2,
  "High": 1,
};

/**
 * Normalize returns (to avoid extreme bias)
 */
function normalizeReturn(value: number) {
  return Math.max(0, Math.min(value, 40)); // cap between 0–40%
}

/**
 * Core scoring engine
 */
export function calculateFundScore(
  fund: MutualFund,
  query?: string
): number {
  let score = 0;

  // -----------------------------
  // 1. LONG TERM PERFORMANCE (MOST IMPORTANT)
  // -----------------------------
  score += normalizeReturn(fund.returns.fiveYear) * 3;
  score += normalizeReturn(fund.returns.threeYear) * 2;
  score += normalizeReturn(fund.returns.oneYear) * 1;

  // -----------------------------
  // 2. RISK ADJUSTMENT
  // (Moderate risk is optimal for most users)
  // -----------------------------
  score += riskScoreMap[fund.riskLevel] * 2;

  // -----------------------------
  // 3. EXPENSE RATIO (lower is better)
  // -----------------------------
  score -= fund.expenseRatio * 8;

  // -----------------------------
  // 4. AUM STABILITY (slight bonus for large funds)
  // -----------------------------
  if (fund.aum > 20000) score += 3;
  if (fund.aum > 50000) score += 5;

  // -----------------------------
  // 5. USER QUERY MATCHING (SEARCH INTELLIGENCE)
  // -----------------------------
  if (query) {
    const q = query.toLowerCase();

    if (fund.name.toLowerCase().includes(q)) score += 15;
    if (fund.category.toLowerCase().includes(q)) score += 10;
    if (fund.amc.toLowerCase().includes(q)) score += 6;
    if (fund.riskLevel.toLowerCase().includes(q)) score += 4;
  }

  // -----------------------------
  // 6. FUND QUALITY BOOST (rating)
  // -----------------------------
  score += fund.rating * 2;

  return score;
}
