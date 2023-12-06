"use client";

import Image from "next/image";
import { MenuCategory } from "@next-orders/api-sdk";

type CategoryButtonProps = {
  category: MenuCategory;
  iconUrl: string;
};

export const CategoryButton = ({ category, iconUrl }: CategoryButtonProps) => {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(category.id)}
      className="px-5 py-3 flex flex-row gap-2 bg-zinc-100 rounded-2xl cursor-pointer hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200"
    >
      <Image src={iconUrl} alt="" width={32} height={32} className="w-8 h-8" />

      <h2 className="text-2xl font-medium">{category.name}</h2>
    </button>
  );
};
