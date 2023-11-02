import { MainAPI } from "@next-orders/api-sdk";
import { cookies } from "next/headers";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/lib/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";
const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID || "no-shop-id-env";

const MAX_CACHE_SECONDS = 0; // no data cache

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  return new MainAPI(API_URL, accessToken);
};

/** Need Permission READ_MEDIA */
export const GetAllMedia = async () => {
  const media = await apiWithAccess().getAllMedia({
    next: {
      ...nextConfig,
      tags: ["all", "media"],
    },
  });
  if (media instanceof Error) {
    if (media.message.includes("Forbidden")) {
      return new Error("You have no required Permissions: READ_MEDIA");
    }
    return new Error("Unknown");
  }

  return media;
};
