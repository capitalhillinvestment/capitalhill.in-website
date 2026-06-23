import { mutualFunds } from "../data/mutualFunds";
import { calculateFundScore } from "../engine/calculateFundScore";

export async function onRequestGet() {
  const scoredFunds = mutualFunds.map((fund) => ({
    ...fund,
    score: calculateFundScore(fund),
  }));

  const topOverall = [...scoredFunds]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const topReturns = [...scoredFunds]
    .sort(
      (a, b) =>
        b.returns.threeYear -
        a.returns.threeYear
    )
    .slice(0, 10);

  const topRated = [...scoredFunds]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const lowExpense = [...scoredFunds]
    .sort(
      (a, b) =>
        a.expenseRatio -
        b.expenseRatio
    )
    .slice(0, 10);

  const categories = {};

  const uniqueCategories = [
    ...new Set(
      mutualFunds.map((f) => f.category)
    ),
  ];

  uniqueCategories.forEach((category) => {
    categories[category] = scoredFunds
      .filter((f) => f.category === category)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  });

  return Response.json({
    success: true,

    topOverall,
    topReturns,
    topRated,
    lowExpense,

    categories,
  });
}
