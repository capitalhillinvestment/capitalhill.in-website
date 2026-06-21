import { mutualFunds } from "../../data/mutualFunds";

export const onRequestPost = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const body = await request.json();

    const portfolio = body.funds;

    if (!portfolio || !Array.isArray(portfolio)) {
      return Response.json(
        {
          success: false,
          message: "Funds array required",
        },
        { status: 400 }
      );
    }

    let portfolioValue = 0;
    let weightedExpense = 0;

    const categoryAllocation: Record<string, number> = {};
    const riskAllocation: Record<string, number> = {};

    for (const holding of portfolio) {
      const fund = mutualFunds.find(
        (f) => f.id === holding.id
      );

      if (!fund) continue;

      const amount = Number(holding.amount);

      portfolioValue += amount;

      weightedExpense +=
        amount * fund.expenseRatio;

      categoryAllocation[fund.category] =
        (categoryAllocation[fund.category] || 0) +
        amount;

      riskAllocation[fund.riskLevel] =
        (riskAllocation[fund.riskLevel] || 0) +
        amount;
    }

    const averageExpense =
      portfolioValue > 0
        ? weightedExpense / portfolioValue
        : 0;

    const allocationPercentages: Record<
      string,
      number
    > = {};

    Object.entries(categoryAllocation).forEach(
      ([category, amount]) => {
        allocationPercentages[category] = Number(
          ((amount / portfolioValue) * 100).toFixed(2)
        );
      }
    );

    let diversificationScore = Math.min(
      Object.keys(categoryAllocation).length * 20,
      100
    );

    let riskScore = 50;

    if (riskAllocation["High"])
      riskScore += 20;

    if (riskAllocation["Moderately High"])
      riskScore += 10;

    if (riskAllocation["Low"])
      riskScore -= 10;

    return Response.json({
      success: true,

      portfolioValue,

      diversificationScore,

      riskScore,

      averageExpenseRatio: Number(
        averageExpense.toFixed(2)
      ),

      categoryAllocation:
        allocationPercentages,

      riskAllocation,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error:
          error.message ||
          "Portfolio analysis failed",
      },
      { status: 500 }
    );
  }
};
