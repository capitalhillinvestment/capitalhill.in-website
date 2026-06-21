import { fundMaster } from "../data/funds/fundMaster";

export async function onRequestGet() {
  return Response.json(fundMaster);
}
