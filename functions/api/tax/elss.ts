import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestPost({ request }) {
  const { investmentAmount } = await request.json();

  const elssFunds = mutualFunds.filter(f => f.category === "ELSS");

  const recommendations = elssFunds.map(fund => ({
    id: fund.id,
    name: fund.name,
    lockIn: 3,
    taxBenefit: Math.min(investmentAmount, 150000) * 0.3, // approx 80C logic simplified
    expectedReturn: fund.returns.threeYear,
  }));

  return Response.json({
    investmentAmount,
    recommendations,
  });
}
