import { fundRisk } from "../../data/funds/fundRisk";

export async function onRequestPost({ request }) {
  const body = await request.json();

  const { riskProfile } = body;
  // Low | Moderate | High

  const recommended = fundRisk
    .filter(f => {
      if (riskProfile === "Low") return f.riskLevel === "Low";
      if (riskProfile === "Moderate") return f.riskLevel.includes("Moderate");
      if (riskProfile === "High") return f.riskLevel === "High" || f.riskLevel === "Moderately High";
      return true;
    })
    .slice(0, 10);

  return Response.json({
    riskProfile,
    recommendations: recommended,
  });
}
