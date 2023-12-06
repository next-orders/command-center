import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { GetLocale } from "@/client/api";

export default async function Page() {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.EMPLOYEE_BASE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Employee base</h1>
      <div className="mb-8">Here you can see all data</div>
    </>
  );
}
