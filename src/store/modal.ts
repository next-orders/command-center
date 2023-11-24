import { create } from "zustand";

interface ModalState {
  // Channel
  isOpenedCreateChannel: boolean;
  toggleCreateChannel: () => void;
  // MenuCategory
  isOpenedCreateMenuCategory: boolean;
  toggleCreateMenuCategory: () => void;
  // Media
  isOpenedCreateMedia: boolean;
  toggleCreateMedia: () => void;
  // Production
  isOpenedCreateProduction: boolean;
  toggleCreateProduction: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpenedCreateChannel: false,
  toggleCreateChannel: () =>
    set(({ isOpenedCreateChannel }) => ({
      isOpenedCreateChannel: !isOpenedCreateChannel,
    })),
  isOpenedCreateMenuCategory: false,
  toggleCreateMenuCategory: () =>
    set(({ isOpenedCreateMenuCategory }) => ({
      isOpenedCreateMenuCategory: !isOpenedCreateMenuCategory,
    })),
  isOpenedCreateMedia: false,
  toggleCreateMedia: () =>
    set(({ isOpenedCreateMedia }) => ({
      isOpenedCreateMedia: !isOpenedCreateMedia,
    })),
  isOpenedCreateProduction: false,
  toggleCreateProduction: () =>
    set(({ isOpenedCreateProduction }) => ({
      isOpenedCreateProduction: !isOpenedCreateProduction,
    })),
}));
