import { GetCategories, GetProductsInCategory } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";
import { Category } from "@next-orders/api-sdk";

export default async function Page() {
  const categories = await GetCategories();

  const menu = categories?.map(async (category) => (
    <CategoryBlock key={category.id} category={category} />
  ));

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Товары</h1>
      <div className="mb-8">Вы можете увидеть загруженные товары</div>

      {menu}
    </div>
  );
}

const CategoryBlock = async ({ category }: { category: Category }) => {
  const products = await GetProductsInCategory(category.id);

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Название" },
    { key: "slug", label: "URL" },
    { key: "rating", label: "Рейтинг" },
  ];
  const tableData =
    products?.map((product) => {
      const Score = ({ score }: { score: number }) => {
        const color = score > 70 ? "border-teal-500" : "border-amber-500";
        return (
          <div
            className={`w-12 flex flex-row justify-center items-center border-2 rounded-full aspect-square ${color}`}
          >
            <div className="text-xl">{score}</div>
          </div>
        );
      };

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        rating: <Score score={product.score} />,
      };
    }) || [];

  return (
    <div key={category.id} className="mb-8">
      <h2 className="mb-2 text-xl">{category.name}</h2>

      <TableWithData data={{ columns: tableColumns, data: tableData }} />
    </div>
  );
};
