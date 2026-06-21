import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestPost({ request }) {
  const { age, income, riskTolerance } = await request.json();

  let riskProfile = "Moderate";

  if (age < 30 && riskTolerance === "High") riskProfile = "High";
  if (age > 50) riskProfile = "Low";
  if (income > 2000000) riskProfile = "High";

  const recommended = mutualFunds.filter(f => {
    if (riskProfile === "Low") return f.riskLevel === "Low";
    if (riskProfile === "Moderate") return f.riskLevel.includes("Moderate");
    return f.riskLevel === "High" || f.riskLevel === "Moderately High";
  });

  return Response.json({
    userProfile: { age, income, riskTolerance },
    derivedRiskProfile: riskProfile,
    recommendations: recommended.slice(0, 8),
  });
}
