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

export const onRequestGet = async () => {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Goal Plan GET route works"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
