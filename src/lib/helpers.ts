export const COOKIES_ACCESS_TOKEN_KEY = "next-orders.access-token";

export const getColorByClientLevel = (level: number) => {
  if (level < 10) return "amber";
  if (level < 20) return "green";
  if (level < 30) return "blue";
  if (level < 40) return "teal";
  if (level < 50) return "pink";

  return "violet";
};

export const fakeBusyServer = (ms = 5000) => {
  return new Promise((resolve) => setTimeout(() => resolve("ok"), ms));
};
