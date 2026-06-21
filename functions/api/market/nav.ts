export async function onRequestGet() {
  // later you replace this with AMFI or external API
  return Response.json({
    updatedAt: new Date().toISOString(),
    message: "NAV feed placeholder - connect AMFI here",
  });
}
