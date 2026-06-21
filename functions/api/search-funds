import { fundMaster } from "../data/funds/fundMaster";

export async function onRequestGet({ request }: any) {
  const url = new URL(request.url);

  const query = url.searchParams.get("q")?.toLowerCase() || "";

  const results = fundMaster.filter(
    (fund) =>
      fund.name.toLowerCase().includes(query) ||
      fund.amc.toLowerCase().includes(query) ||
      fund.category.toLowerCase().includes(query)
  );

  return Response.json({
    count: results.length,
    results,
  });
}
