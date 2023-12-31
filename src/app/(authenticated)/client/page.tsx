import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ClientsBlock from "./ClientsBlock";
import { ClientsBlockSkeleton } from "./ClientsBlockSkeleton";
import { getLocale } from "@/client/locale";

export default async function Page() {
  const locale = getLocale();

  return (
    <>
      <Breadcrumbs keys={["CLIENT_BASE"]} />

      <h1 className="mb-2 text-3xl font-semibold">Client base</h1>
      <div className="mb-8">Wait, what? They are like bosses in game?</div>

      <Suspense fallback={<ClientsBlockSkeleton locale={locale} />}>
        <ClientsBlock />
      </Suspense>
    </>
  );
}
