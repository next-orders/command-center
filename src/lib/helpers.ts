import { Locale } from "@/dictionaries";

export const COOKIES_ACCESS_TOKEN_KEY = "next-orders.access-token";
export const COOKIES_LOCALE_KEY = "next-orders.locale";

export const getColorByClientLevel = (level: number) => {
  if (level < 10) return "amber";
  if (level < 20) return "green";
  if (level < 30) return "blue";
  if (level < 40) return "teal";
  if (level < 50) return "pink";

  return "violet";
};

export const getBrowserLocale = (
  acceptLanguage: unknown | null | undefined,
): Locale => {
  if (!acceptLanguage || typeof acceptLanguage !== "string") {
    return "EN";
  }

  const browserLanguage = acceptLanguage.toLowerCase().split(",", 2);
  if (!browserLanguage[0]) {
    console.warn(`Not found lang in headers: ${browserLanguage}`);
    return "EN";
  }

  switch (browserLanguage[0]) {
    case "ru":
    case "ru-ru":
      return "RU";
    case "en":
    case "en-us":
      return "EN";
    default:
      console.warn(
        `Not found available lang: ${browserLanguage}. Returning default EN.`,
      );
      return "EN";
  }
};

export const getIconUrl = (icon: string | null) => {
  if (!icon) {
    return "/static/food-icon/DEFAULT.png";
  }

  return `/static/food-icon/${icon}.png`;
};
