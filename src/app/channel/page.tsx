import { GetChannels } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";

export default async function Page() {
  const channels = await GetChannels();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "currencyCode", label: "Currency" },
    { key: "domainId", label: "Domain Id" },
    { key: "isActive", label: "Active" },
  ];
  const tableData =
    channels?.map((el) => ({
      id: el.id,
      name: el.name,
      currencyCode: el.currencyCode,
      domainId: el.domainId,
      isActive: el.isActive ? "true" : "false",
    })) || [];

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Channels</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </div>
  );
}
