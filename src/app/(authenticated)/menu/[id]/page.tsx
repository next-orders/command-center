import { GetLocale, GetMenuById } from "@/client/api";
import { notFound } from "next/navigation";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const menu = await GetMenuById(params.id);
  if (!menu) {
    notFound();
  }

  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.MENUS, href: "/menu" },
    { page: PAGES.MENU_PAGE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Menu Page</h1>
          <div>You can see the loaded data</div>
        </div>
      </div>
    </>
  );
}
