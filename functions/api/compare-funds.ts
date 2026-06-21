import { mutualFunds } from "../data/mutualFunds";

export async function onRequestGet({ request }: any) {
  try {
    const url = new URL(request.url);

    const ids = url.searchParams.get("ids");

    if (!ids) {
      return Response.json(
        {
          success: false,
          message: "Pass fund ids",
        },
        { status: 400 }
      );
    }

 const fundIds = ids
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

if (fundIds.length > 10) {
  return Response.json(
    {
      success: false,
      message: "Maximum 10 funds allowed",
    },
    { status: 400 }
  );
}

    const funds = mutualFunds.filter((fund) =>
      fundIds.includes(fund.id)
    );

    if (funds.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No matching funds found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      count: funds.length,
      data: funds,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
