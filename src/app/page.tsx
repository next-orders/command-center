import { GetShop } from "@/server/actions";

export default async function Page() {
  const shop = await GetShop();

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <h1 className="mb-2 text-3xl font-semibold">{shop?.name}</h1>
      <div>{shop?.description}</div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(shop, undefined, 2)}
      </pre>
    </div>
  );
}
