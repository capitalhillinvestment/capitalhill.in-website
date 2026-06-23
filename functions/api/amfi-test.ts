export async function onRequestGet() {
  const res = await fetch(
    "https://www.amfiindia.com/spages/NAVAll.txt",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0",
      },
    }
  );

  return Response.json({
    status: res.status,
    statusText: res.statusText,
    url: res.url,
  });
}
