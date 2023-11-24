import {
  GetLocale,
  GetMenuById,
  GetProductVariantsInCategory,
} from "@/client/api";
import { CategoryCreateBlock } from "@/app/(authenticated)/menu/[id]/CategoryCreateBlock";
import { MenuCategory } from "@next-orders/api-sdk";

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
    <CategoryBlock key={category.id} category={category} />
  ));

  return (
    <div className="mt-4">
      {showCategories}
      <div className="col-span-1">
        <CategoryCreateBlock locale={locale} menuId={menuId} />
      </div>
    </div>
  );
}

type CategoryBlockProps = {
  category: MenuCategory;
};

const CategoryBlock = async ({ category }: CategoryBlockProps) => {
  const products = await GetProductVariantsInCategory(category.id);

  return (
    <div className="mt-4 mb-6">
      <h2 className="text-2xl font-medium">{category.name}</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};
