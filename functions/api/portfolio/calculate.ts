import { fundPerformance } from "../../data/funds/fundPerformance";

export async function onRequestPost({ request }) {
  const body = await request.json();

  const { investments } = body;
  // investments = [{ fundId, amount }]

  let totalInvested = 0;
  let estimatedValue = 0;

  const result = investments.map((inv: any) => {
    const fund = fundPerformance.find(f => f.id === inv.fundId);

    if (!fund) return null;

    totalInvested += inv.amount;

    // use 3Y return as default growth indicator
    const growthRate = fund.returns.threeYear / 100;

    const futureValue = inv.amount * (1 + growthRate);

    estimatedValue += futureValue;

    return {
      fundId: fund.id,
      name: fund.name,
      invested: inv.amount,
      estimatedValue: futureValue,
    };
  });

  return Response.json({
    totalInvested,
    estimatedValue,
    totalGain: estimatedValue - totalInvested,
    breakdown: result,
  });
}
