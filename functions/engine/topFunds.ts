import { mutualFunds } from "../data/mutualFunds";
import { calculateFundScore } from "../engine/fundScore";

export async function onRequestGet() {
  try {
    // 1. Score all funds
    const scoredFunds = mutualFunds.map((fund) => ({
      ...fund,
      score: calculateFundScore(fund),
    }));

    // 2. Sort by score (highest first)
    const sorted = [...scoredFunds].sort((a, b) => b.score - a.score);

    // 3. Top 10 overall funds
    const topOverall = sorted.slice(0, 10);

    // 4. Top by category
    const byCategory: Record<string, typeof scoredFunds> = {};

    scoredFunds.forEach((fund) => {
      if (!byCategory[fund.category]) {
        byCategory[fund.category] = [];
      }
      byCategory[fund.category].push(fund);
    });

    // sort each category internally
    Object.keys(byCategory).forEach((cat) => {
      byCategory[cat].sort((a, b) => b.score - a.score);
      byCategory[cat] = byCategory[cat].slice(0, 5);
    });

    // 5. Top risk-adjusted (balanced score already includes risk)
    const topRiskAdjusted = [...sorted]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    // 6. Top returns (pure performance focus)
    const topReturns = [...mutualFunds]
      .sort(
        (a, b) =>
          b.returns.fiveYear +
          b.returns.threeYear +
          b.returns.oneYear -
          (a.returns.fiveYear + a.returns.threeYear + a.returns.oneYear)
      )
      .slice(0, 10);

    // 7. Response
    return Response.json({
      success: true,
      data: {
        topOverall,
        byCategory,
        topRiskAdjusted,
        topReturns,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to generate top funds",
      },
      { status: 500 }
    );
  }
}
