import { ProductProductionCard } from "@/components/ProductProductionCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetLocale, GetProducts } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";

export default async function Page() {
  const products = await GetProducts();
  const locale = GetLocale();

  const cards = products
    ?.filter((product) => product.type === "READY")
    ?.map((product) => (
      <ProductProductionCard key={product.id} product={product} />
    ));

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.PRODUCTS, href: `/product` },
    { page: PAGES.READY_PAGE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Ready Products</h1>
      <div className="mb-8">All loaded items</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </>
  );
}
