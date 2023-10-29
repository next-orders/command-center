import { GetProducts } from "@/server/actions";
import { ProductProductionCard } from "@/components/ProductProductionCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  const products = await GetProducts();

  const cards = products
    ?.filter((product) => product.type === "PRODUCTION")
    ?.map((product) => (
      <ProductProductionCard key={product.id} product={product} />
    ));

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Products", href: `/product` },
    { title: "Production", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">Production Products</h1>
      <div className="mb-8">All loaded items</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </>
  );
}
