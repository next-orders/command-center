import { GetCategories } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";

export default async function Page() {
  const categories = await GetCategories();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "slug", label: "URL" },
  ];
  const tableData =
    categories?.map((el) => ({
      id: el.id,
      name: el.name,
      slug: el.slug,
    })) || [];

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Product categories</h1>
      <div>You can see the loaded categories</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </div>
  );
}
