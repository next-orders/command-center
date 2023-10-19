import { GetAllMedia } from "@/server/actions";
import { TableWithData } from "@/components/TableWithData";

export default async function Page() {
  const media = await GetAllMedia();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "alt", label: "Alt" },
    { key: "url", label: "URL" },
  ];
  const tableData =
    media?.map((el) => ({
      id: el.id,
      alt: el.alt,
      url: el.url,
    })) || [];

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">Media</h1>
      <div>You can see the loaded files</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </div>
  );
}
