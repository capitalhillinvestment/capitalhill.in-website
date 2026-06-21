import { fundRisk } from "../../data/funds/fundRisk";

export async function onRequestGet() {
  return Response.json(fundRisk);
}
