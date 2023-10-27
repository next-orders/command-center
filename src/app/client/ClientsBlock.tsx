import { GetClients } from "@/server/actions";
import { ClientCard } from "@/components/ClientCard";

export default async function ClientsBlock() {
  const clients = await GetClients();
  if (!clients) {
    return <div>You have no Clients</div>;
  }

  return clients?.map((client) => (
    <ClientCard key={client.id} client={client} />
  ));
}
