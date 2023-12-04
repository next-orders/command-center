import Image from "next/image";
import Link from "next/link";
import {
  GetLocale,
  GetMenuById,
  GetProductVariantsInCategory,
} from "@/client/api";
import { MenuCategory, ProductVariant } from "@next-orders/api-sdk";
import { Locale } from "@/dictionaries";
import { CategoryCreateBlock } from "@/app/(authenticated)/menu/[id]/CategoryCreateBlock";
import { getIconUrl } from "@/lib/helpers";

type CategoriesBlockProps = {
  menuId: string;
};

export default async function CategoriesBlock({
  menuId,
}: CategoriesBlockProps) {
  const menu = await GetMenuById(menuId);
  const locale = GetLocale();

  const haveNoEntities = !menu?.categories?.length;
  if (haveNoEntities) {
    return <CategoryCreateBlock locale={locale} menuId={menuId} />;
  }

  const showCategories = menu.categories.map((category) => (
    <CategoryBlock key={category.id} category={category} locale={locale} />
  ));

  return (
    <div className="mt-4 mb-8">
      <div className="mb-8">
        <CategoryCreateBlock locale={locale} menuId={menuId} />
      </div>
      {showCategories}
    </div>
  );
}

type CategoryBlockProps = {
  locale: Locale;
  category: MenuCategory;
};

const CategoryBlock = async ({ category, locale }: CategoryBlockProps) => {
  const products = await GetProductVariantsInCategory(category.id);

  const showProducts = products?.map((variant) => (
    <ProductVariantCard key={variant.id} variant={variant} />
  ));

  const iconUrl = getIconUrl(category.icon);

  return (
    <div className="mb-8">
      <div className="flex flex-row gap-2">
        <Image
          src={iconUrl}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 cursor-pointer hover:scale-90 duration-200"
        />

        <h2 className="text-2xl font-medium">
          {category.name}{" "}
          <span className="ml-2 text-xs text-zinc-500">{category.id}</span>
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {showProducts}
      </div>
    </div>
  );
};

type ProductVariantCardProps = {
  variant: ProductVariant;
};

const ProductVariantCard = ({ variant }: ProductVariantCardProps) => {
  const photo = variant.media.length ? variant.media[0].media : null;
  const url = `/product-variant/${variant.id}`;

  return (
    <Link
      href={url}
      className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={photo?.url ?? "/static/no-image-zinc.png"}
          alt={photo?.alt ?? ""}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="rounded-xl object-cover object-center"
        />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {variant.name}
      </div>
    </Link>
  );
};
