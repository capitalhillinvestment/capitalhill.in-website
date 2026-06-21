import { MutualFund } from "../data/mutualFunds";
import { calculateFundScore } from "./fundScore";

export interface FundFilter {
  category?: string;
  riskLevel?: MutualFund["riskLevel"];
  amc?: string;
  minReturn1Y?: number;
}

export function screenFunds(
  funds: MutualFund[],
  filter: FundFilter
) {
  let result = [...funds];

  // 1. Category filter
  if (filter.category) {
    result = result.filter(
      (f) => f.category === filter.category
    );
  }

  // 2. Risk filter
  if (filter.riskLevel) {
    result = result.filter(
      (f) => f.riskLevel === filter.riskLevel
    );
  }

  // 3. AMC filter
  if (filter.amc) {
    result = result.filter((f) => f.amc === filter.amc);
  }

  // 4. Return filter (1Y minimum)
  if (filter.minReturn1Y !== undefined) {
    result = result.filter(
      (f) => f.returns.oneYear >= filter.minReturn1Y!
    );
  }

  // 5. Add score to each fund
  const scored = result.map((f) => ({
    ...f,
    score: calculateFundScore(f),
  }));

  // 6. Sort by score (descending)
  return scored.sort((a, b) => b.score - a.score);
}
