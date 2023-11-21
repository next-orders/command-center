import { TableWithData } from "@/components/TableWithData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetAllDomains, GetLocale } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";

export default async function Page() {
  const domains = await GetAllDomains();
  const locale = GetLocale();

  const tableColumns = [
    { key: "id", label: "Id" },
    { key: "host", label: "Host" },
  ];
  const tableData =
    domains?.map((el) => ({
      id: el.id,
      host: el.host,
    })) || [];

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.DOMAINS, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />
      <h1 className="mb-2 text-3xl font-semibold">Domains</h1>
      <div>You can see the loaded data</div>

      <div className="mt-4">
        <TableWithData data={{ columns: tableColumns, data: tableData }} />
      </div>
    </>
  );
}
