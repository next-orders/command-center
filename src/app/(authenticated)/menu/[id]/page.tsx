import { GetMenuById, GetProducts } from "@/client/api";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CategoriesBlock from "@/app/(authenticated)/menu/[id]/CategoriesBlock";
import { ProductVariantCreateModal } from "@/app/(authenticated)/menu/[id]/ProductVariantCreateModal";
import { getLocale } from "@/client/locale";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = getLocale();
  const products = await GetProducts();
  const menu = await GetMenuById(params.id);

  return (
    <>
      <Breadcrumbs keys={["MENU_PAGE"]} />

      <h1 className="mb-2 text-3xl font-semibold">Menu Page</h1>
      <div>You can see the loaded data</div>

      <CategoriesBlock menuId={params.id} />

      <ProductVariantCreateModal
        menu={menu}
        products={products}
        categories={menu?.categories}
        locale={locale}
      />
    </>
  );
}
