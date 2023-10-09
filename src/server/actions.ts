"use server";

import { MainAPI } from "@next-orders/api-sdk";
import { MenuItem } from "@/types";

const api = new MainAPI(process.env.API_URL || "no-api-url-env", "supersecret");

export const GetCategories = async () => {
  const categories = await api.getCategories();
  if (!categories || categories instanceof Error) {
    return null;
  }

  return categories;
};

export const GetProductsInCategory = async (id: string) => {
  const products = await api.getProductsInCategory(id);
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
};

export const GetProductBySlug = async (slug: string) => {
  const product = await api.getProductBySlug(slug);
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetMenu = async (): Promise<MenuItem[]> => {
  return [
    {
      id: "1",
      label: "Главная",
      href: "/",
    },
    {
      id: "2",
      label: "Категории",
      href: "/category",
    },
    {
      id: "3",
      label: "Товары",
      href: "/product",
    },
  ];
};
