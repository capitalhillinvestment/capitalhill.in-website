import { mutualFunds } from "../data/mutualFunds";

export async function onRequestGet() {

  const topFunds = [...mutualFunds]
    .sort(
      (a, b) =>
        b.returns.threeYear - a.returns.threeYear
    )
    .slice(0, 10);

  return Response.json({
    success: true,
    count: topFunds.length,
    data: topFunds,
  });
}
