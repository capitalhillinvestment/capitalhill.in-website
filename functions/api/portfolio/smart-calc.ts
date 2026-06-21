import { fundPerformance } from "../../data/funds/fundPerformance";

function getCAGR(rate: number) {
  return Math.pow(1 + rate / 100, 1 / 3) - 1;
}

export async function onRequestPost({ request }) {
  const { investments } = await request.json();

  let invested = 0;
  let finalValue = 0;

  const breakdown = investments.map((inv: any) => {
    const fund = fundPerformance.find(f => f.id === inv.fundId);
    if (!fund) return null;

    invested += inv.amount;

    const cagr = getCAGR(fund.returns.threeYear * 100);
    const value = inv.amount * Math.pow(1 + cagr, 3);

    finalValue += value;

    return {
      fundId: fund.id,
      name: fund.name,
      invested: inv.amount,
      estimatedValue: value,
      cagr: cagr * 100,
    };
  });

  return Response.json({
    invested,
    finalValue,
    profit: finalValue - invested,
    breakdown,
  });
}
