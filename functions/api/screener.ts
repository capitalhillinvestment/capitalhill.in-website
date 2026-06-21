import { mutualFunds } from "../data/mutualFunds";

export const onRequestGet = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get("category");
    const riskLevel = url.searchParams.get("riskLevel");
    const minReturn = url.searchParams.get("minReturn");
    const maxExpenseRatio = url.searchParams.get("maxExpenseRatio");

    let results = [...mutualFunds];

    // Filter by category
    if (category) {
      results = results.filter(
        (f) => f.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by risk level
    if (riskLevel) {
      results = results.filter(
        (f) => f.riskLevel.toLowerCase() === riskLevel.toLowerCase()
      );
    }

    // Filter by 1Y return
    if (minReturn) {
      const min = Number(minReturn);
      results = results.filter(
        (f) => f.returns.oneYear >= min
      );
    }

    // Filter by expense ratio
    if (maxExpenseRatio) {
      const max = Number(maxExpenseRatio);
      results = results.filter(
        (f) => f.expenseRatio <= max
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: results.length,
        data: results,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Screener failed",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
