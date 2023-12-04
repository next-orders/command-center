"use client";

import React from "react";
import { IconChefHat } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { EntityModal } from "@/components/EntityModal";
import { Product } from "@next-orders/api-sdk";

type ProductChooseModalProps = {
  products: Product[] | null;
  selected: string;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: string) => void;
};

export const ProductChooseModal = ({
  products,
  selected,
  setSelected,
}: ProductChooseModalProps) => {
  const toggle = useModalStore((state) => state.toggleChooseProduct);
  const isOpened = useModalStore((state) => state.isOpenedChooseProduct);

  const showProducts = products
    ?.filter((product) => product.type === "PRODUCTION")
    ?.map((product) => {
      const isSelected = selected === product.id;

      return (
        <ProductChooseCard
          key={product.id}
          product={product}
          isSelected={isSelected}
          setSelected={setSelected}
        />
      );
    });

  return (
    <EntityModal title="Choose a Product" toggle={toggle} isOpened={isOpened}>
      <input
        type="text"
        placeholder="Find by name"
        value=""
        onWheel={(event) => event.currentTarget.blur()}
        // onChange={(event) => onChange(event.currentTarget.value)}
        className="peer block w-full rounded-2xl border border-zinc-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400"
      />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        {showProducts}
      </div>

      <div className="mt-6">
        <Button onClick={toggle}>Choose</Button>
      </div>
    </EntityModal>
  );
};

type ProductChooseCardProps = {
  product: Product;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: string) => void;
};

const ProductChooseCard = ({
  product,
  isSelected,
  setSelected,
}: ProductChooseCardProps) => {
  return (
    <div
      className="px-4 py-4 bg-zinc-50 rounded-2xl cursor-pointer hover:scale-95 active:scale-90 duration-200 group border-2 border-transparent data-[active=true]:border-teal-500"
      data-active={isSelected}
      onClick={() => setSelected(product.id)}
    >
      <div className="mb-2 px-4 py-4 bg-white rounded-2xl group-hover:scale-105 duration-200">
        <IconChefHat
          stroke={1.5}
          className="mx-auto mb-2 w-12 h-12 text-zinc-400 group-hover:text-violet-500 duration-500"
        />
      </div>

      <div className="text-center text-base font-medium line-clamp-2 leading-tight">
        {product.name}
      </div>
    </div>
  );
};
