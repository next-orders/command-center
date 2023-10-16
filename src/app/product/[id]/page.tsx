import { notFound } from "next/navigation";
import { GetProductById } from "@/server/actions";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const product = await GetProductById(params.id);
  if (!product) {
    notFound();
  }

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">{product.name}</h1>
      <div className="mb-8">You can see the product</div>
    </div>
  );
}
