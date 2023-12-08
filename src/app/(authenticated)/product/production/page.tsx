import { Breadcrumbs } from "@/components/Breadcrumbs";
import ProductionBlock from "@/app/(authenticated)/product/production/ProductionBlock";
import { ProductionCreateModal } from "@/app/(authenticated)/product/production/ProductionCreateModal";

export default async function Page() {
  return (
    <>
      <Breadcrumbs keys={["PRODUCTS", "PRODUCTION_PAGE"]} />

      <h1 className="mb-2 text-3xl font-semibold">Production</h1>
      <div className="mb-8">All loaded items</div>

      <ProductionBlock />

      <ProductionCreateModal />
    </>
  );
}
