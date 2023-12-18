import { create } from "zustand";
import { MenuCategory, MenuCategoryIcon } from "@next-orders/api-sdk";
import { GetMenuCategoryById } from "@/client/api";

interface MenuCategoryState {
  category: MenuCategory | null;
  // eslint-disable-next-line no-unused-vars
  loadData: (id: string) => void;

  name: string;
  // eslint-disable-next-line no-unused-vars
  setName: (name: string) => void;

  slug: string;
  // eslint-disable-next-line no-unused-vars
  setSlug: (slug: string) => void;

  icon: MenuCategoryIcon | null;
  // eslint-disable-next-line no-unused-vars
  setIcon: (icon: MenuCategoryIcon) => void;
}

export const useMenuCategory = create<MenuCategoryState>((set) => ({
  category: null,
  loadData: async (id) => {
    const category = await GetMenuCategoryById(id);
    if (!category) return;

    set(() => ({ category, ...category }));
  },
  name: "",
  setName: (name) => set(() => ({ name })),
  slug: "",
  setSlug: (slug) => set(() => ({ slug })),
  icon: null,
  setIcon: (icon) => set(() => ({ icon })),
}));
