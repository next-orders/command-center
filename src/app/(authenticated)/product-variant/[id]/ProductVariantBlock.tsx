"use client";

import Image from "next/image";
import { ProductVariant } from "@next-orders/api-sdk";
import { useModalStore } from "@/store/modal";

type ProductVariantBlockProps = {
  product: ProductVariant;
};

export const ProductVariantBlock = ({ product }: ProductVariantBlockProps) => {
  const toggle = useModalStore((state) => state.toggleEditProductVariantMedia);

  const photo = product.media.length ? product.media[0].media : undefined;

  return (
    <div className="mt-10">
      <div className="max-w-sm">
        <div className="relative w-full aspect-square">
          <Image
            src={photo?.url ?? "/static/no-image-zinc.png"}
            alt={photo?.alt ?? ""}
            priority
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="rounded-xl object-cover object-center"
            onClick={toggle}
          />
        </div>
      </div>
    </div>
  );
};
