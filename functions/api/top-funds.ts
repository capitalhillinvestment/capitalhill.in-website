import { mutualFunds } from "../data/mutualFunds";
import { calculateFundScore } from "../engine/calculateFundScore";

export async function onRequestGet({ request }: any) {
  const url = new URL(request.url);

  const category = url.searchParams.get("category");

  let funds = [...mutualFunds];

  if (category) {
    funds = funds.filter(
      (f) =>
        f.category.toLowerCase() ===
        category.toLowerCase()
    );
  }

  const ranked = funds
    .map((fund) => ({
      ...fund,
      score: calculateFundScore(fund),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return Response.json({
    success: true,
    category,
    count: ranked.length,
    data: ranked,
  });
}
