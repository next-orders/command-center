import { GetAllDomains } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";

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
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Domains</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </div>
  );
}
