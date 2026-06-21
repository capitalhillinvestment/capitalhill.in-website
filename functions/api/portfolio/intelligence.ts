import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestPost({ request }) {
  const { investments } = await request.json();

  const amcMap: Record<string, number> = {};
  const categoryMap: Record<string, number> = {};

  investments.forEach((inv: any) => {
    const fund = mutualFunds.find(f => f.id === inv.fundId);
    if (!fund) return;

    amcMap[fund.amc] = (amcMap[fund.amc] || 0) + inv.amount;
    categoryMap[fund.category] = (categoryMap[fund.category] || 0) + inv.amount;
  });

  const total = Object.values(amcMap).reduce((a, b) => a + b, 0);

  const diversificationScore =
    1 - Math.max(...Object.values(amcMap)) / total;

  return Response.json({
    diversificationScore,
    amcExposure: amcMap,
    categoryExposure: categoryMap,
  });
}
