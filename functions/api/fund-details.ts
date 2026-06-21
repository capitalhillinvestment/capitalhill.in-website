import { mutualFunds } from "../data/mutualFunds";

export const onRequestGet = async ({ request }: { request: Request }) => {
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

    return Response.json({
      success: true,
      data: fund,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch fund",
      },
      { status: 500 }
    );
  }
};
