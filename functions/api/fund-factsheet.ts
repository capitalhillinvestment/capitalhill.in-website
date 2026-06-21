import { mutualFunds } from "../data/mutualFunds";

export const onRequestGet = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const url = new URL(request.url);

    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Fund id is required",
        },
        { status: 400 }
      );
    }

    const fund = mutualFunds.find(
      (f) => f.id.toLowerCase() === id.toLowerCase()
    );

    if (!fund) {
      return Response.json(
        {
          success: false,
          message: "Fund not found",
        },
        { status: 404 }
      );
    }

    // Calculate simple research score
    const riskWeight: Record<string, number> = {
      Low: 5,
      "Low to Moderate": 4.5,
      Moderate: 4,
      "Moderately High": 3,
      High: 2,
    };

    const score =
      fund.returns.threeYear * 0.35 +
      fund.returns.fiveYear * 0.35 +
      fund.rating * 3 +
      (2 - fund.expenseRatio) * 5 +
      (riskWeight[fund.riskLevel] || 0);

    return Response.json({
      success: true,

      factsheet: {
        id: fund.id,
        name: fund.name,
        amc: fund.amc,
        category: fund.category,

        nav: fund.nav,
        navDate: fund.navDate,

        aum: fund.aum,
        expenseRatio: fund.expenseRatio,

        riskLevel: fund.riskLevel,
        rating: fund.rating,

        score: Number(score.toFixed(2)),

        returns: {
          oneYear: fund.returns.oneYear,
          threeYear: fund.returns.threeYear,
          fiveYear: fund.returns.fiveYear,
        },
      },
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message || "Factsheet failed",
      },
      { status: 500 }
    );
  }
};
