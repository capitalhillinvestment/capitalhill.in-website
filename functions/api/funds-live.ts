import mutualFunds from "../data/mutualFunds";
import { mapNavToFunds } from "../utils/mapNav";

export async function onRequestGet() {
  try {
    const res = await fetch(
      "https://www.amfiindia.com/spages/NAVAll.txt"
    );

    const text = await res.text();
    const lines = text.split("\n");

    const amfiNav = [];

    for (const line of lines) {
      const parts = line.split(";");

      if (parts.length > 5 && parts[3] && parts[4]) {
        amfiNav.push({
          schemeName: parts[3],
          nav: parseFloat(parts[4]),
          date: parts[5],
        });
      }
    }

    const updatedFunds = mapNavToFunds(mutualFunds, amfiNav);

    return Response.json({
      success: true,
      updatedAt: new Date().toISOString(),
      data: updatedFunds,
    });

  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
