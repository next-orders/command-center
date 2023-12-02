import { notFound } from "next/navigation";
import { GetLocale, GetProductVariantById } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductVariantEditMediaModal } from "@/app/(authenticated)/product-variant/[id]/ProductVariantEditMediaModal";
import { ProductVariantBlock } from "@/app/(authenticated)/product-variant/[id]/ProductVariantBlock";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const product = await GetProductVariantById(params.id);
  if (!product) {
    notFound();
  }

  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.PRODUCT_VARIANT_PAGE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Product Variant</h1>
      <div>You can see the loaded data</div>

      <ProductVariantBlock product={product} />

      <pre className="mt-8">{JSON.stringify(product, null, 2)}</pre>

      <ProductVariantEditMediaModal productVariantId={product.id} />
    </>
  );
}
