import { fundPerformance } from "../../data/funds/fundPerformance";
import { calculateFundScore } from "../../engine/fundScore";

export async function onRequestGet() {
  try {
    const scored = fundPerformance.map((fund) => ({
      ...fund,
      score: calculateFundScore(fund, fundPerformance),
    }));

    const sorted = scored.sort((a, b) => b.score - a.score);

    const topOverall = sorted.slice(0, 10);

    const byCategory: Record<string, any[]> = {};

    sorted.forEach((fund) => {
      if (!byCategory[fund.category]) {
        byCategory[fund.category] = [];
      }
      byCategory[fund.category].push(fund);
    });

    Object.keys(byCategory).forEach((cat) => {
      byCategory[cat] = byCategory[cat]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    });

    const topReturns = [...fundPerformance]
      .sort(
        (a, b) =>
          (b.returns.fiveYear + b.returns.threeYear + b.returns.oneYear) -
          (a.returns.fiveYear + a.returns.threeYear + a.returns.oneYear)
      )
      .slice(0, 10);

    const topRiskAdjusted = sorted.slice(0, 10);

    return Response.json({
      success: true,
      data: {
        topOverall,
        byCategory,
        topReturns,
        topRiskAdjusted,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: "Top funds engine failed" },
      { status: 500 }
    );
  }
}
