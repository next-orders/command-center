"use server";

import { AvatarParams, MainAPI } from "@next-orders/api-sdk";
import { MenuItem } from "@/types";

const API_URL = process.env.API_URL || "no-api-url-env";
const API_PRIVATE_TOKEN =
  process.env.API_PRIVATE_TOKEN || "no-api-private-token-env";
const SHOP_ID = process.env.SHOP_ID || "no-shop-id-env";

const api = new MainAPI(API_URL, API_PRIVATE_TOKEN);

const MAX_CACHE_SECONDS = 0; // no data cache

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

export const GetShop = async () => {
  const shop = await api.getShop(SHOP_ID, {
    next: {
      ...nextConfig,
      tags: ["all", "shop"],
    },
  });
  if (!shop || shop instanceof Error) {
    return null;
  }

  return shop;
};

export const GetChannels = async () => {
  const channels = await api.getChannels({
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

export const GetAllMedia = async () => {
  const media = await api.getAllMedia({
    next: {
      ...nextConfig,
      tags: ["all", "media"],
    },
  });
  if (!media || media instanceof Error) {
    return null;
  }

  return media;
};

export const GetAllDomains = async () => {
  const domains = await api.getAllDomains({
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

export const GetCategories = async () => {
  const categories = await api.getCategories({
    next: {
      ...nextConfig,
      tags: ["all", "categories"],
    },
  });
  if (!categories || categories instanceof Error) {
    return null;
  }

  return categories;
};

export const GetProducts = async () => {
  const products = await api.getProducts({
    next: { ...nextConfig, tags: ["all", `products`] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await api.getProductsInCategory(id, {
    next: { ...nextConfig, tags: ["all", `category-products-${id}`] },
  });
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductById = async (id: string) => {
  const product = await api.getProductById(id, {
    next: { ...nextConfig, tags: ["all", `product-${id}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetClients = async () => {
  const clients = await api.getClients({
    next: { ...nextConfig, tags: ["all", "clients"] },
  });
  if (!clients || clients instanceof Error) {
    return null;
  }

  return clients;
};

export const GetClientById = async (id: string) => {
  const client = await api.getClientById(id, {
    next: { ...nextConfig, tags: ["all", `client-${id}`] },
  });
  if (!client || client instanceof Error) {
    return null;
  }

  return client;
};

export const GetAvatarURL = (
  avatarId: string,
  size: number,
  params?: AvatarParams,
): string => {
  return api.getAvatarURL(avatarId, size, params);
};

export const GetNavigationMenu = async (): Promise<MenuItem[]> => {
  return [
    {
      id: "1",
      label: "Home",
      href: "/",
      icon: "IconDashboard",
    },
    {
      id: "2",
      label: "Media",
      href: "/media",
      icon: "IconPhoto",
    },
    {
      id: "3",
      label: "Domains",
      href: "/domain",
      icon: "IconWorldWww",
    },
    {
      id: "4",
      label: "Channels",
      href: "/channel",
      icon: "IconBuildingStore",
    },
    {
      id: "5",
      label: "Products",
      href: "/product",
      icon: "IconCheese",
    },
    {
      id: "6",
      label: "Clients",
      href: "/client",
      icon: "IconUsers",
    },
  ];
};
