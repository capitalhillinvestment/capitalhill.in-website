import { mutualFunds } from '../data/mutualFunds';

export async function onRequestGet() {
  return Response.json(mutualFunds);
}
