import { mutualFunds } from "../../data/mutualFunds";

export async function onRequestGet() {
  const conservative = mutualFunds.filter(f => f.riskLevel === "Low");
  const balanced = mutualFunds.filter(f => f.riskLevel.includes("Moderate"));
  const aggressive = mutualFunds.filter(f => f.riskLevel === "High");

  return Response.json({
    conservative: conservative.slice(0, 5),
    balanced: balanced.slice(0, 5),
    aggressive: aggressive.slice(0, 5),
  });
}
