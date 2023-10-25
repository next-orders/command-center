"use server";

import { MainAPI } from "@next-orders/api-sdk";
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
  return [
    {
      id: "1",
      firstName: "James",
      lastName: "Franco",
      level: 1,
      avatar:
        "https://avatar.o5system.net/api/3620b2a9-3efe-4f31-b4e8-5e3cfaac55b5.svg?gender=male&emotion=3&size=140",
    },
    {
      id: "2",
      firstName: "Juliet",
      level: 12,
      avatar:
        "https://avatar.o5system.net/api/18859251-b3e0-4099-87e4-8e9397e54aef.svg?gender=female&emotion=9&size=140",
    },
    {
      id: "3",
      firstName: "Ferdinand",
      level: 24,
      avatar:
        "https://avatar.o5system.net/api/7d8551f5-2fa9-4f99-ba00-617656f31144.svg?gender=male&emotion=8&size=140",
    },
    {
      id: "4",
      firstName: "Dale",
      level: 38,
      avatar:
        "https://avatar.o5system.net/api/3db90139-4122-4e30-85a1-6c15e8ecca79.svg?gender=male&emotion=7&size=140",
    },
    {
      id: "5",
      firstName: "Stacia",
      level: 41,
      avatar:
        "https://avatar.o5system.net/api/649dbdc7-5a5d-43be-9051-7bab6a8e3e7a.svg?gender=female&emotion=5&size=140",
    },
    {
      id: "6",
      firstName: "Marilyn",
      level: 7,
      avatar:
        "https://avatar.o5system.net/api/ee3ac3ec-6d05-43cb-a847-bdc6134e36a8.svg?gender=female&emotion=6&size=140",
    },
    {
      id: "7",
      firstName: "Darwin",
      level: 50,
      avatar:
        "https://avatar.o5system.net/api/3aaf80a3-3104-4888-980e-d83bf8363663.svg?gender=male&emotion=7&size=140",
    },
    {
      id: "8",
      firstName: "Bryanne",
      level: 24,
      avatar:
        "https://avatar.o5system.net/api/dd90cef4-281d-4ec0-b101-1cf0ad8ab807.svg?gender=female&emotion=10&size=140",
    },
    {
      id: "9",
      firstName: "Lessie",
      level: 15,
      avatar:
        "https://avatar.o5system.net/api/72f53a2e-7b44-4d7c-8e3f-fe88dfb19b59.svg?gender=female&emotion=9&size=140",
    },
    {
      id: "10",
      firstName: "Cortney",
      level: 33,
      avatar:
        "https://avatar.o5system.net/api/4b209064-5a1b-4007-88f2-4a6640891c61.svg?gender=female&emotion=4&size=140",
    },
    {
      id: "11",
      firstName: "Damian",
      level: 19,
      avatar:
        "https://avatar.o5system.net/api/58ecc81c-931f-48c7-9ae9-ec759f76ae91.svg?gender=male&emotion=1&size=140",
    },
    {
      id: "12",
      firstName: "Thornton",
      level: 8,
      avatar:
        "https://avatar.o5system.net/api/a1b42269-0f9c-4f09-b7e9-4f3ccc41a8a8.svg?gender=male&emotion=5&size=140",
    },
    {
      id: "13",
      firstName: "Terrell",
      level: 44,
      avatar:
        "https://avatar.o5system.net/api/bbb2dbb4-2e9b-44ff-bc51-c67f3b050036.svg?gender=male&emotion=6&size=140",
    },
    {
      id: "14",
      firstName: "Cathy",
      level: 37,
      avatar:
        "https://avatar.o5system.net/api/3f2c02a6-d0c7-4824-9708-bcb655ac7c69.svg?gender=female&emotion=7&size=140",
    },
  ];
};

export const GetClientById = async (id: string) => {
  const clients = await GetClients();
  return clients.find((client) => client.id === id);
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
