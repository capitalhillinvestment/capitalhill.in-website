export async function onRequestGet() {
  try {
    const res = await fetch(
      "https://www.amfiindia.com/spages/NAVAll.txt"
    );

    const text = await res.text();

    const lines = text.split("\n");

    const navData: any[] = [];

    for (const line of lines) {
      const cleanLine = line.trim();

      // Skip empty lines
      if (!cleanLine) continue;

      // Skip non-data lines
      if (!cleanLine.includes(";")) continue;

      const parts = cleanLine.split(";");

      // AMFI NAV records should have at least 6 columns
      if (parts.length < 6) continue;

      const nav = Number(parts[4]);

      // Skip headers and invalid NAV rows
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

      // Debug information
      totalLines: lines.length,
      first10Lines: lines.slice(0, 10),

      // Parsed data
      count: navData.length,
      data: navData.slice(0, 20),
    });

  } catch (err: any) {
    return Response.json(
      {
        success: false,
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
