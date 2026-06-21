import { mutualFunds } from '../data/mutualfunds';
export async function onRequestGet() {
  return Response.json(mutualFunds);
}
