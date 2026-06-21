import { mutualFunds } from "../data/mutualFunds";

export async function onRequestGet() {
  try {
    const categoryMap: Record<string, any[]> = {};

    mutualFunds.forEach((fund) => {
      if (!categoryMap[fund.category]) {
        categoryMap[fund.category] = [];
      }

      categoryMap[fund.category].push(fund);
    });

    const rankings = Object.entries(categoryMap).map(
      ([category, funds]) => {
        const avg1Y =
          funds.reduce(
            (sum, fund) =>
              sum + fund.returns.oneYear,
            0
          ) / funds.length;

        const avg3Y =
          funds.reduce(
            (sum, fund) =>
              sum + fund.returns.threeYear,
            0
          ) / funds.length;

        const avg5Y =
          funds.reduce(
            (sum, fund) =>
              sum + fund.returns.fiveYear,
            0
          ) / funds.length;

        const avgExpense =
          funds.reduce(
            (sum, fund) =>
              sum + fund.expenseRatio,
            0
          ) / funds.length;

        const totalAum = funds.reduce(
          (sum, fund) => sum + fund.aum,
          0
        );

        return {
          category,

          fundCount: funds.length,

          averageReturns: {
            oneYear: Number(avg1Y.toFixed(2)),
            threeYear: Number(avg3Y.toFixed(2)),
            fiveYear: Number(avg5Y.toFixed(2)),
          },

          averageExpenseRatio: Number(
            avgExpense.toFixed(2)
          ),

          totalAum,
        };
      }
    );

    rankings.sort(
      (a, b) =>
        b.averageReturns.threeYear -
        a.averageReturns.threeYear
    );

    return Response.json({
      success: true,
      count: rankings.length,
      data: rankings,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error:
          error.message || "Category ranking failed",
      },
      { status: 500 }
    );
  }
}
