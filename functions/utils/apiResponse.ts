export function apiSuccess(data: any, endpoint: string) {
  return new Response(
    JSON.stringify({
      success: true,
      meta: {
        timestamp: new Date().toISOString(),
        version: "v1",
        endpoint,
      },
      data,
      error: null,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function apiError(message: string, endpoint: string, status = 500) {
  return new Response(
    JSON.stringify({
      success: false,
      meta: {
        timestamp: new Date().toISOString(),
        version: "v1",
        endpoint,
      },
      data: null,
      error: message,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
