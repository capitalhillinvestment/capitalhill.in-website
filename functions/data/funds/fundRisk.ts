
import { mutualFunds } from "../mutualFunds";

export const fundRisk = mutualFunds.map((fund) => ({
  id: fund.id,
  name: fund.name,

  // risk profile
  riskLevel: fund.riskLevel,

  // cost factor
  expenseRatio: fund.expenseRatio,

  // quality score
  rating: fund.rating,

  // optional safety indicator
  category: fund.category,
  subCategory: fund.subCategory,
}));
