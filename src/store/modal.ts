import { create } from "zustand";

interface ModalState {
  isOpenedCreateChannel: boolean;
  toggleCreateChannel: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpenedCreateChannel: false,
  toggleCreateChannel: () =>
    set(({ isOpenedCreateChannel }) => ({
      isOpenedCreateChannel: !isOpenedCreateChannel,
    })),
}));
