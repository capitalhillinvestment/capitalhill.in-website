import { mutualFunds } from "../data/mutualFunds";
import { mapNavToFunds } from "../utils/mapNav";

export async function onRequestGet() {
  try {
    const response = await fetch(
      "https://www.amfiindia.com/spages/NAVAll.txt"
    );

    const text = await response.text();

    const lines = text.split("\n");

    const amfiNav: any[] = [];

    for (const line of lines) {
      const parts = line.split(";");

      if (
        parts.length > 5 &&
        parts[0] &&
        parts[3] &&
        parts[4]
      ) {
        amfiNav.push({
          schemeCode: parts[0].trim(),
          schemeName: parts[3].trim(),
          nav: Number(parts[4]),
          date: parts[5]?.trim(),
        });
      }
    }

    const updatedFunds = mapNavToFunds(
      mutualFunds,
      amfiNav
    );

    return Response.json({
      success: true,
      updatedAt: new Date().toISOString(),
      totalFunds: updatedFunds.length,
      totalAmfiRecords: amfiNav.length,
      data: updatedFunds,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error:
          error.message || "Failed to fetch AMFI NAV",
      },
      { status: 500 }
    );
  }
}
