"use client";

import { getDictionary, Locale } from "@/dictionaries";
import { IconCopyPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";

type ProductVariantCreateBlockProps = {
  locale: Locale;
};

export const ProductVariantCreateBlock = ({
  locale,
}: ProductVariantCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProductVariant);

  const { CREATE_PRODUCT_VARIANT_LABEL } = getDictionary(locale);

  return (
    <button
      onClick={toggle}
      className="bg-zinc-50 rounded-2xl h-auto w-auto p-5 cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="flex items-center justify-center w-full aspect-square rounded-xl">
        <IconCopyPlus stroke={1.5} className="w-16 h-16 text-zinc-500" />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {CREATE_PRODUCT_VARIANT_LABEL}
      </div>
    </button>
  );
};
