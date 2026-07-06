/**
 * AMFI Downloader Service
 * -----------------------
 * Responsibility:
 * Download the latest AMFI NAV file.
 * Returns the raw text exactly as received from AMFI.
 */

const AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

export async function downloadAMFI(): Promise<string> {
  const response = await fetch(AMFI_URL);

  if (!response.ok) {
    throw new Error(
      `AMFI download failed (${response.status} ${response.statusText})`
    );
  }

  return await response.text();
}
