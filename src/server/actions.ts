"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AvatarParams, MainAPI } from "@next-orders/api-sdk";
import { MenuItem } from "@/types";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/lib/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

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

  redirect("/command-center/dashboard");
};

export const SignOut = () => {
  cookies().delete(COOKIES_ACCESS_TOKEN_KEY);
  redirect("/command-center/auth/login");
};

export const GetDemoSignInData = async () => {
  const data = await api.signInDemoData({
    next: { ...nextConfig, tags: ["all", "demo"] },
  });
  if (data instanceof Error) {
    return null;
  }

  return data;
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

export const CreateShopForm = async (prevState: any, formData: FormData) => {
  const name = (formData.get("name") as string) || "";
  const description = (formData.get("description") as string) || "";

  const create = await api.createShop(
    { name, description },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return { message: "Data is not correct" };
  }

  redirect("/command-center/dashboard");
};

export const GetShop = async () => {
  const shop = await api.getShop({
    next: {
      ...nextConfig,
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

export const GetProductById = async (id: string) => {
  const product = await api.getProductById(id, {
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
