import { cookies, headers } from "next/headers";
import { AvatarParams, MainAPI } from "@next-orders/api-sdk";
import {
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_LOCALE_KEY,
  getBrowserLocale,
} from "@/lib/helpers";
import { MenuItem } from "@/types";
import { Locale } from "@/dictionaries";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

const MAX_CACHE_SECONDS = 0; // no data cache

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

const apiWithPublicAccess = new MainAPI(API_URL, "");

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  return new MainAPI(API_URL, accessToken);
};

export const GetLocale = (): Locale => {
  const language = headers().get("Accept-Language");
  const browserLocale = getBrowserLocale(language);

  const locale = cookies().get(COOKIES_LOCALE_KEY)?.value;
  if (!locale) {
    return browserLocale;
  }

  return locale as Locale;
};

export const GetApiVersion = async () => {
  const apiData = await apiWithPublicAccess.getApiVersion({
    next: {
      revalidate: 60,
      tags: ["all", "api"],
    },
  });
  if (apiData instanceof Error) {
    return null;
  }

  return apiData;
};

export const GetShop = async () => {
  const shop = await apiWithPublicAccess.getShop({
    next: {
      revalidate: 60,
      tags: ["all", "shop"],
    },
  });
  if (shop instanceof Error) {
    // No shop in DB
    return null;
  }

  return shop;
};

export const GetChannels = async () => {
  const channels = await apiWithPublicAccess.getChannels({
    next: {
      ...nextConfig,
      tags: ["all", "channels"],
    },
  });
  if (!channels || channels instanceof Error) {
    return null;
  }

  return channels;
};

export const GetAllDomains = async () => {
  const domains = await apiWithPublicAccess.getAllDomains({
    next: {
      ...nextConfig,
      tags: ["all", "domains"],
    },
  });
  if (!domains || domains instanceof Error) {
    return null;
  }

  return domains;
};

/** Need Permission READ_MEDIA */
export const GetAllMedia = async () => {
  return apiWithAccess().getAllMedia({
    next: {
      ...nextConfig,
      tags: ["all", "media"],
    },
  });
};

/** Need Permission READ_CLIENTS */
export const GetClients = async () => {
  return apiWithAccess().getClients({
    next: { ...nextConfig, tags: ["all", "clients"] },
  });
};

/** Need Permission READ_CLIENTS */
export const GetClientById = async (id: string) => {
  return apiWithAccess().getClientById(id, {
    next: { ...nextConfig, tags: ["all", `client-${id}`] },
  });
};

export const GetChannelById = async (channelId: string) => {
  const channel = await apiWithPublicAccess.getChannel(channelId, {
    next: {
      ...nextConfig,
      tags: ["all", `channel-${channelId}`],
    },
  });
  if (!channel || channel instanceof Error) {
    return null;
  }

  return channel;
};

export const GetMenuById = async (menuId: string) => {
  const menu = await apiWithPublicAccess.getMenuById(menuId, {
    next: {
      ...nextConfig,
      tags: ["all", `menu-${menuId}`],
    },
  });
  if (!menu || menu instanceof Error) {
    return null;
  }

  return menu;
};

export const GetMenusInChannel = async (channelId: string) => {
  const menus = await apiWithPublicAccess.getAllMenusInChannel(channelId, {
    next: {
      ...nextConfig,
      tags: ["all", `menus-${channelId}`],
    },
  });
  if (!menus || menus instanceof Error) {
    return null;
  }

  return menus;
};

export const GetProducts = async () => {
  const products = await apiWithPublicAccess.getProducts({
    next: { ...nextConfig, tags: ["all", "products"] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductById = async (id: string) => {
  const product = await apiWithPublicAccess.getProductById(id, {
    next: { ...nextConfig, tags: ["all", `product-${id}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetAvatarURL = (
  avatarId: string,
  size: number,
  params?: AvatarParams,
): string => {
  return apiWithPublicAccess.getAvatarURL(avatarId, size, params);
};

export const GetDemoSignInData = async () => {
  const data = await apiWithPublicAccess.signInDemoData({
    next: { ...nextConfig, tags: ["all", "demo"] },
  });
  if (data instanceof Error) {
    return null;
  }

  return data;
};

export const GetNavigationMenu = async (): Promise<MenuItem[]> => {
  return [
    {
      id: "1",
      label: "Dashboard",
      href: "/dashboard",
      icon: "IconDashboard",
    },
    {
      id: "2",
      label: "Channels",
      href: "/channel",
      icon: "IconBuildingStore",
    },
    {
      id: "3",
      label: "Menus",
      href: "/menu",
      icon: "IconNews",
    },
    {
      id: "4",
      label: "Media",
      href: "/media",
      icon: "IconPhoto",
    },
    {
      id: "5",
      label: "Domains",
      href: "/domain",
      icon: "IconWorldWww",
    },
    {
      id: "6",
      label: "Products",
      href: "/product",
      icon: "IconCheese",
    },
    {
      id: "7",
      label: "Clients",
      href: "/client",
      icon: "IconUsers",
    },
  ];
};
