import { GetLocale } from "@/client/api";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.MENUS, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Menus</h1>
          <div>You can see the loaded data</div>
        </div>
      </div>
    </>
  );
}
