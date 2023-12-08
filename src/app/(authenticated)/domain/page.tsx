import { TableWithData } from "@/components/TableWithData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetAllDomains } from "@/client/api";

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

  return (
    <>
      <Breadcrumbs keys={["DOMAINS"]} />
      <h1 className="mb-2 text-3xl font-semibold">Domains</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </>
  );
}
