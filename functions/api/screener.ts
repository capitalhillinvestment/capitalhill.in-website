import mutualFunds from "../data/mutualFunds";
import { screenFunds } from "../engine/fundScreener";

export async function onRequestGet({ request }) {
  const url = new URL(request.url);

  const category = url.searchParams.get("category") || undefined;
  const riskLevel = url.searchParams.get("riskLevel") || undefined;
  const amc = url.searchParams.get("amc") || undefined;
  const minReturn1Y = url.searchParams.get("minReturn1Y");

  const result = screenFunds(mutualFunds, {
    category,
    riskLevel: riskLevel as any,
    amc,
    minReturn1Y: minReturn1Y ? Number(minReturn1Y) : undefined,
  });

  return Response.json(result);
}
