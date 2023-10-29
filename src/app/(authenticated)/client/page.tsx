import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ClientsBlock from "@/app/(authenticated)/client/ClientsBlock";
import { ClientsBlockSkeleton } from "@/app/(authenticated)/client/ClientsBlockSkeleton";

export default async function Page() {
  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Client base", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">Client base</h1>
      <div className="mb-8">Wait, what? They are like bosses in game?</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
        <Suspense fallback={<ClientsBlockSkeleton />}>
          <ClientsBlock />
        </Suspense>
      </div>
    </>
  );
}
