import { mutualFunds } from "../data/mutualFunds";

export async function onRequestGet({ request }: any) {
  const url = new URL(request.url);

  const ids = url.searchParams.get("ids");

  if (!ids) {
    return Response.json({
      success: false,
      message: "Pass fund ids",
    });
  }

  const fundIds = ids.split(",");

  const funds = mutualFunds.filter(
    (f) => fundIds.includes(f.id)
  );

  return Response.json({
    success: true,
    count: funds.length,
    data: funds,
  });
}
