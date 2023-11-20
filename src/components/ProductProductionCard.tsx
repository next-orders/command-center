import Image from "next/image";
import Link from "next/link";
import {
  IconDiamond,
  IconEye,
  IconEyeOff,
  IconFileArrowRight,
  IconTag,
} from "@tabler/icons-react";
import { Product, ProductVariant } from "@next-orders/api-sdk";
import { MenuAction } from "@/types";

export const ProductProductionCard = ({ product }: { product: Product }) => {
  const mainVariant = product.variants?.length
    ? product.variants[0]
    : undefined;

  const media = mainVariant?.media?.length ? mainVariant.media[0] : undefined;

  const actionsInMenu: MenuAction[] = [
    {
      id: "1",
      label: "Open",
      url: `/product/${product.id}`,
      icon: <IconFileArrowRight stroke={1.5} className="text-zinc-500" />,
    },
    {
      id: "2",
      label: "Enable / Disable",
      icon: <IconEyeOff stroke={1.5} className="text-zinc-500" />,
    },
  ];

  return (
    <Link href={`/product/${product.id}`}>
      <div className="px-4 py-4 bg-zinc-50 rounded-2xl cursor-pointer hover:scale-95 duration-200">
        <div className="mb-2 flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={media?.url || "/static/no-image-zinc.png"}
              alt={media?.alt || "Empty alt"}
              width={60}
              height={60}
              unoptimized
              className="rounded-xl"
            />
            <div>
              <div className="text-lg font-medium line-clamp-2">
                {product.name}
              </div>
              <div className="text-sm text-zinc-500">{product.description}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          <OnOffBlock isAvailable={product.isAvailableForPurchase} />
          <ScoreBlock score={product.score} />
          <VariantsBlock variants={product.variants} />
        </div>
      </div>
    </Link>
  );
};

const OnOffBlock = ({ isAvailable }: { isAvailable: boolean }) => {
  const color = isAvailable ? "text-teal-500" : "text-amber-500";
  const text = isAvailable ? "ON" : "OFF";

  return (
    <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
      <IconEye stroke={1.5} className={`w-5 h-5 ${color}`} />
      <div>{text}</div>
    </div>
  );
};

const ScoreBlock = ({ score }: { score: number }) => {
  const color = score > 70 ? "text-teal-500" : "text-amber-500";

  return (
    <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
      <IconDiamond stroke={1.5} className={`w-5 h-5 ${color}`} />
      <div>{score}</div>
    </div>
  );
};

const VariantsBlock = ({
  variants,
}: {
  variants: ProductVariant[] | undefined;
}) => {
  const count = variants?.length;

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
        <IconTag stroke={1.5} className="w-5 h-5 text-zinc-400" />
        <div>{count}</div>
      </div>
    </div>
  );
};
