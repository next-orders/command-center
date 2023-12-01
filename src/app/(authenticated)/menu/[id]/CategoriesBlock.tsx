import Image from "next/image";
import {
  GetLocale,
  GetMenuById,
  GetProductVariantsInCategory,
} from "@/client/api";
import { CategoryCreateBlock } from "@/app/(authenticated)/menu/[id]/CategoryCreateBlock";
import { MenuCategory, ProductVariant } from "@next-orders/api-sdk";
import { Locale } from "@/dictionaries";
import { ProductVariantCreateBlock } from "@/app/(authenticated)/menu/[id]/ProductVariantCreateBlock";

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
      {showCategories}
      <div className="col-span-1">
        <CategoryCreateBlock locale={locale} menuId={menuId} />
      </div>
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

  return (
    <div className="mt-4 mb-6">
      <h2 className="text-2xl font-medium">{category.name}</h2>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        <div className="col-span-1 self-center text-center">
          <ProductVariantCreateBlock locale={locale} />
        </div>
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

  return (
    <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 active:scale-90 duration-200 group">
      <div className="relative w-full aspect-square">
        <Image
          src={photo?.url ?? "/static/no-image-zinc.png"}
          alt={photo?.alt ?? ""}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          objectPosition="center"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {variant.name}
      </div>
    </div>
  );
};
