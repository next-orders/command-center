import { TableWithData } from "@/components/TableWithData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetChannels, GetLocale } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";

export default async function Page() {
  const channels = await GetChannels();
  const locale = GetLocale();

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

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.CHANNELS, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />
      <h1 className="mb-2 text-3xl font-semibold">Channels</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </>
  );
}
