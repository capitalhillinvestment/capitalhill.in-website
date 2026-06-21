import { fundPerformance } from "../../data/funds/fundPerformance";

export async function onRequestGet() {
  return Response.json(fundPerformance);
}

