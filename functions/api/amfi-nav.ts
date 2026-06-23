export async function onRequestGet() {
  try {
    const res = await fetch(
      "https://www.amfiindia.com/spages/NAVAll.txt"
    );

    const text = await res.text();

    const lines = text.split("\n");

return Response.json({
  success: true,
  count: navData.length,
  data: navData.slice(0, 50),
});
   const navData = [];

for (const line of lines) {
  const cleanLine = line.trim();

  if (!cleanLine.includes(";")) continue;

  const parts = cleanLine.split(";");

  if (parts.length < 6) continue;

  const nav = Number(parts[4]);

  if (isNaN(nav)) continue;

  navData.push({
    schemeCode: parts[0],
    isin: parts[1],
    schemeName: parts[3],
    nav,
    date: parts[5],
  });
}

    return Response.json({
      success: true,
      count: navData.length,
      data: navData.slice(0, 50), // limit for now
    });

  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
