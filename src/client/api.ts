import { AvatarParams, MainAPI } from "@next-orders/api-sdk";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

const MAX_CACHE_SECONDS = 0; // no data cache

const nextConfig = {
  // Problem: on build time Next try to fetch API, which is not declared. Empty data on deploy, until revalidation.
  // Solution: set revalidate to 0
  revalidate: process.env.DATA_CACHE_DISABLED ? 0 : MAX_CACHE_SECONDS,
};

const apiWithPublicAccess = new MainAPI(API_URL, "");

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
      tags: ["all", "menus", `menu-${menuId}`],
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
      tags: ["all", "menus", `menus-${channelId}`],
    },
  });
  if (!menus || menus instanceof Error) {
    return null;
  }

  return menus;
};

export const GetMenuCategoryById = async (id: string) => {
  const category = await apiWithPublicAccess.getMenuCategoryById(id, {
    next: {
      ...nextConfig,
      tags: ["all", "categories", `menu-category-${id}`],
    },
  });
  if (!category || category instanceof Error) {
    return null;
  }

  return category;
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
    next: { ...nextConfig, tags: ["all", "products", `product-${id}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetProductVariantById = async (id: string) => {
  const product = await apiWithPublicAccess.getProductVariantById(id, {
    next: { ...nextConfig, tags: ["all", "products", `product-variant-${id}`] },
  });
  if (!product || product instanceof Error) {
    return null;
  }

  return product;
};

export const GetProductVariantsInCategory = async (categoryId: string) => {
  const products = await apiWithPublicAccess.getProductVariantsInCategory(
    categoryId,
    {
      next: {
        ...nextConfig,
        tags: ["all", "products", `product-variants-${categoryId}`],
      },
    },
  );
  if (!products || products instanceof Error) {
    return null;
  }

  return products;
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
