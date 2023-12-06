import { GetLocale, GetMenuById, GetProducts } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CategoriesBlock from "@/app/(authenticated)/menu/[id]/CategoriesBlock";
import { ProductVariantCreateModal } from "@/app/(authenticated)/menu/[id]/ProductVariantCreateModal";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = GetLocale();
  const products = await GetProducts();
  const menu = await GetMenuById(params.id);

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.MENU_PAGE, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Menu Page</h1>
      <div>You can see the loaded data</div>

      <CategoriesBlock menuId={params.id} />

      <ProductVariantCreateModal
        products={products}
        categories={menu?.categories}
        locale={locale}
      />
    </>
  );
}
