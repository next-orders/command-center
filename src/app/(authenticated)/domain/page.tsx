import { GetAllDomains } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  const domains = await GetAllDomains();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "host", label: "Host" },
  ];
  const tableData =
    domains?.map((el) => ({
      id: el.id,
      host: el.host,
    })) || [];

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Domains", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className="mb-2 text-3xl font-semibold">Domains</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </>
  );
}
