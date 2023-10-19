import Image from "next/image";
import {
  IconCheese,
  IconChefHat,
  IconDiamond,
  IconEye,
  IconEyeOff,
  IconFileArrowRight,
  IconPaperBag,
  IconTag,
} from "@tabler/icons-react";
import { Category, Product, ProductVariant } from "@next-orders/api-sdk";
import { MenuAction } from "@/types";
import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { ActionsMenu } from "@/components/ActionsMenu";

export default async function Page() {
  const categories = await GetCategories();

  const menu = categories?.map(async (category) => (
    <CategoryBlock key={category.id} category={category} />
  ));

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Products</h1>
      <div className="mb-8">Can be a Production, Ready or Ingredient</div>

      {menu}
    </div>
  );
}

const CategoryBlock = async ({ category }: { category: Category }) => {
  const products = await GetProductsInCategory(category.id);

  const cards = products?.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div key={category.id} className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold text-zinc-400">
        {category.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
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
    <div className="px-2 py-2 bg-zinc-50 rounded-2xl">
      <div className="mb-2 flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={media?.url || "/command-center/static/no-image.png"}
            alt={media?.alt || "Empty alt"}
            width={60}
            height={60}
            unoptimized
            className="rounded-xl"
          />
          <div>
            <div className="text-lg line-clamp-2">{product.name}</div>
            <div className="text-sm text-zinc-500">{product.description}</div>
          </div>
        </div>

        <ActionsMenu actions={actionsInMenu} />
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        <TypeBlock type={product.type} />
        <OnOffBlock isAvailable={product.isAvailableForPurchase} />
        <ScoreBlock score={product.score} />
        <VariantsBlock variants={product.variants} />
      </div>
    </div>
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

const TypeBlock = ({ type }: { type: string }) => {
  let label = null;
  let icon = null;

  if (type === "PRODUCTION") {
    // This product needs to be prepared (ex. Pizza)
    label = <div>Production</div>;
    icon = <IconChefHat stroke={1.5} className="w-5 h-5 text-violet-500" />;
  }
  if (type === "READY") {
    // This product is manufactured (ex. Soda)
    label = <div>Ready</div>;
    icon = <IconPaperBag stroke={1.5} className="w-5 h-5 text-blue-500" />;
  }
  if (type === "INGREDIENT") {
    // This product is a part of other products (ex. Gouda cheese)
    label = <div>Ingredient</div>;
    icon = <IconCheese stroke={1.5} className="w-5 h-5 text-green-500" />;
  }

  return (
    <div className="w-fit max-w-full px-3 py-2 flex flex-row flex-wrap gap-2 items-center bg-white rounded-2xl">
      {icon}
      {label}
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
