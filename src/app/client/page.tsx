import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientCard } from "@/components/ClientCard";
import { GetClients } from "@/server/actions";

export default async function Page() {
  const clients = await GetClients();

  const clientsBlock = clients.map((client) => (
    <ClientCard key={client.id} client={client} />
  ));

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Client base", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">Client base</h1>
      <div className="mb-8">Wait, what? They are like bosses in game?</div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
        {clientsBlock}
      </div>
    </>
  );
}
