import { TableWithData } from "@/components/TableWithData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetCategories } from "@/client/api";

export default async function Page() {
  const categories = await GetCategories();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
  ];
  const tableData =
    categories?.map((el) => ({
      id: el.id,
      name: el.name,
    })) || [];

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Categories", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className="mb-2 text-3xl font-semibold">Categories</h1>
      <div>You can see the loaded categories</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </>
  );
}
