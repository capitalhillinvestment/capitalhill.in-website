export const onRequestPost = async () => {
  return new Response(
    JSON.stringify({
      success: true,
      message: "goal-plan API is working",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
