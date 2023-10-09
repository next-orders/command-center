import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";

export default async function Page() {
  const categories = await GetCategories();

  const showTable = categories?.map(async (category) => {
    const products = await GetProductsInCategory(category.id);

    const tableColumns = [
      { key: "id", label: "Id" },
      { key: "name", label: "Название" },
      { key: "slug", label: "URL" },
    ];
    const tableData =
      products?.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
      })) || [];

    return (
      <div key={category.id} className="mb-8">
        <h2 className="mb-2 text-xl">{category.name}</h2>

        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    );
  });

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Товары</h1>
      <div className="mb-8">Вы можете увидеть загруженные товары</div>

      {showTable}
    </div>
  );
}
