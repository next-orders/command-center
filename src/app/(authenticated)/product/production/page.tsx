import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetLocale } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import ProductionBlock from "@/app/(authenticated)/product/production/ProductionBlock";
import { ProductionCreateModal } from "@/app/(authenticated)/product/production/ProductionCreateModal";

export default async function Page() {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.PRODUCTS, href: `/product` },
    { page: PAGES.PRODUCTION_PAGE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Production</h1>
      <div className="mb-8">All loaded items</div>

      <ProductionBlock />

      <ProductionCreateModal />
    </>
  );
}
