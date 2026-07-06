import { syncAMFI } from "../services/amfi/sync";

export const onRequestGet = async () => {
  try {
    const funds = await syncAMFI();

    return Response.json({
      success: true,
      count: funds.length,
      sample: funds.slice(0, 5),
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
