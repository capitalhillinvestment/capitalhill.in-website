export async function onRequestGet() {
  try {
    const res = await fetch(
      "https://www.amfiindia.com/spages/NAVAll.txt"
    );

    const text = await res.text();

    const lines = text.split("\n");

    const navData = [];

    for (const line of lines) {
      const parts = line.split(";");

      // AMFI format check
      if (parts.length > 5 && parts[3] && parts[4]) {
        navData.push({
          schemeCode: parts[0],
          isin: parts[1],
          schemeName: parts[3],
          nav: parseFloat(parts[4]),
          date: parts[5],
        });
      }
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
