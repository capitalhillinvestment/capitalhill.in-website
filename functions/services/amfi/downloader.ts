/**
 * AMFI Downloader Service
 * -----------------------
 * Responsibility:
 * Download the latest AMFI NAV file.
 * Returns the raw text exactly as received from AMFI.
 */

import { ENDPOINTS } from "../../config/endpoints";

export async function downloadAMFI(): Promise<string> {
  const response = await fetch(ENDPOINTS.AMFI_NAV, {
    headers: {
      // AMFI's server rejects or returns unexpected content for requests
      // without a browser-like User-Agent (common with serverless/edge
      // runtimes like Cloudflare Workers, whose fetch() sends no UA by
      // default). This mirrors a standard browser request.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      Accept: "text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new Error(
      `AMFI download failed (${response.status} ${response.statusText})`
    );
  }

  const text = await response.text();

  // AMFI occasionally returns a 200 with an empty or near-empty body
  // (maintenance windows, WAF challenge pages, etc.) — treat that as a
  // failure too, rather than silently returning 0 records downstream.
  if (!text || text.trim().length < 100) {
    throw new Error(
      `AMFI download returned unexpectedly short content (${text.length} chars)`
    );
  }

  return text;
}