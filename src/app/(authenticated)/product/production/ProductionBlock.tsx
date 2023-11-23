import { GetLocale, GetProducts } from "@/client/api";
import { ProductProductionCard } from "@/components/ProductProductionCard";
import { ProductionCreateBlock } from "@/app/(authenticated)/product/production/ProductionCreateBlock";

export default async function ProductionBlock() {
  const products = await GetProducts();
  const locale = GetLocale();

  const showProducts = products
    ?.filter((product) => product.type === "PRODUCTION")
    ?.map((product) => (
      <ProductProductionCard key={product.id} product={product} />
    ));

  const haveNoEntities = !showProducts?.length;
  if (haveNoEntities) {
    return <ProductionCreateBlock locale={locale} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-center">
      <div className="col-span-1">
        <ProductionCreateBlock locale={locale} />
      </div>
      {showProducts}
    </div>
  );
}
