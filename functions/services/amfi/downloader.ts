/**
 * AMFI Downloader Service
 * -----------------------
 * Responsibility:
 * Download the latest AMFI NAV file.
 * Returns the raw text exactly as received from AMFI.
 */

import { ENDPOINTS } from "../../config/endpoints";

export async function downloadAMFI(): Promise<string> {
  const response = await fetch(ENDPOINTS.AMFI_NAV);

  if (!response.ok) {
    throw new Error(
      `AMFI download failed (${response.status} ${response.statusText})`
    );
  }

  return await response.text();
}
