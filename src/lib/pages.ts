import { DictionaryKey } from "@/dictionaries/en";

export const PAGES = {
  CLIENT_BASE: { dictionary: "CLIENT_BASE_LABEL", label: "Client Base" },
  CLIENT_PAGE: { dictionary: "CLIENT_PAGE_LABEL", label: "Client Page" },
  CHANNELS: { dictionary: "CHANNELS_LABEL", label: "Channels" },
  CHANNEL_PAGE: { dictionary: "CHANNEL_PAGE_LABEL", label: "Channel Page" },
  DOMAINS: { dictionary: "DOMAINS_LABEL", label: "Domains" },
  MEDIA: { dictionary: "MEDIA_LABEL", label: "Media" },
  PRODUCTS: { dictionary: "PRODUCTS_LABEL", label: "Products" },
  PRODUCT_PAGE: {
    dictionary: "PRODUCT_PAGE_LABEL",
    label: "Product page",
  },
  INGREDIENTS_PAGE: {
    dictionary: "INGREDIENTS_PAGE_LABEL",
    label: "Ingredients page",
  },
  PRODUCTION_PAGE: {
    dictionary: "PRODUCTION_PAGE_LABEL",
    label: "Production page",
  },
  READY_PAGE: {
    dictionary: "READY_PAGE_LABEL",
    label: "Ready page",
  },
} as const;

export type Page = {
  dictionary: DictionaryKey;
  label: string;
};
