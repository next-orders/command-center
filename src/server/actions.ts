"use server";

import { cookies } from "next/headers";
import { AvatarParams, MainAPI } from "@next-orders/api-sdk";
import { MenuItem } from "@/types";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/lib/helpers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || "no-api-url-env";
const SHOP_ID = process.env.SHOP_ID || "no-shop-id-env";
const MAX_CACHE_SECONDS = 0; // no data cache

const api = new MainAPI(API_URL, ""); // Public access only

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  return new MainAPI(API_URL, accessToken);
};

export const SignInForm = async (prevState: any, formData: FormData) => {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  const employee = await api.signInEmployeeByEmail(
    { email, password },
    { next: { revalidate: 0 } },
  );
  if (employee instanceof Error) {
    return { message: "Data is not correct" };
  }

  // Valid data
  if (employee.result.access_token) {
    // Set Access Token in Cookie
    cookies().set(COOKIES_ACCESS_TOKEN_KEY, employee.result.access_token);
  }

  redirect("/dashboard");
};

export const SignOut = () => {
  cookies().delete(COOKIES_ACCESS_TOKEN_KEY);
  redirect("/auth/login");
};

export const GetDemoSignInData = () => {
  return {
    email: process.env.DEMO_AUTH_EMAIL as string,
    password: process.env.DEMO_AUTH_PASS as string,
  };
};

export const GetEmployeeAccessPayload = async () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  const payload = await apiWithAccess().verifyToken(accessToken, {
    next: { revalidate: 60, tags: ["all", "token"] },
  });
  if (payload instanceof Error) {
    if (payload.message.includes("400")) {
      throw new Error("Access Token is not valid");
    }
    throw new Error("Unknown");
  }

  return payload;
};

export const GetShop = async () => {
  const shop = await api.getShop(SHOP_ID, {
    next: {
      ...nextConfig,
      tags: ["all", "shop"],
    },
  });
  if (shop instanceof Error) {
    throw shop;
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

/** Need Permission READ_CLIENTS */
export const GetClients = async () => {
  const clients = await apiWithAccess().getClients({
    next: { ...nextConfig, tags: ["all", "clients"] },
  });
  if (clients instanceof Error) {
    if (clients.message.includes("401")) {
      throw new Error("You have no required Permissions: READ_CLIENTS");
    }
    throw new Error("Unknown");
  }

  return clients;
};

/** Need Permission READ_CLIENTS */
export const GetClientById = async (id: string) => {
  const client = await apiWithAccess().getClientById(id, {
    next: { ...nextConfig, tags: ["all", `client-${id}`] },
  });
  if (client instanceof Error) {
    if (client.message.includes("401")) {
      throw new Error("You have no required Permissions: READ_CLIENTS");
    }
    throw new Error("Unknown");
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
      label: "Dashboard",
      href: "/dashboard",
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
