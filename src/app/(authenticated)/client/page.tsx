import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ClientsBlock from "./ClientsBlock";
import { ClientsBlockSkeleton } from "./ClientsBlockSkeleton";

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

      <Suspense fallback={<ClientsBlockSkeleton />}>
        <ClientsBlock />
      </Suspense>
    </>
  );
}
