export async function onRequestGet() {
  try {
    const res = await fetch(
      "https://portal.amfiindia.com/spages/NAVAll.txt",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `AMFI request failed: ${res.status} ${res.statusText}`
      );
    }

    const text = await res.text();

    const lines = text.split("\n");

    const navData: any[] = [];

    for (const line of lines) {
      const cleanLine = line.trim();

      if (!cleanLine) continue;

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
      data: navData.slice(0, 50),
    });

  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err?.message || "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
