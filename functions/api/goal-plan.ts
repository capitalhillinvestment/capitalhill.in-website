import { buildGoalPlan } from "../engine/goalPlanner";
import { mutualFunds } from "../data/mutualFunds";

export const onRequestPost = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();

    const {
      goalType,
      years,
      monthlySIP,
      riskProfile,
    } = body;

    // basic validation (important for production safety)
    if (!goalType || !years || !monthlySIP || !riskProfile) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    const result = buildGoalPlan(
      {
        goalType,
        years: Number(years),
        monthlySIP: Number(monthlySIP),
        riskProfile,
      },
      mutualFunds
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
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
        error: error.message || "Goal plan generation failed",
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
