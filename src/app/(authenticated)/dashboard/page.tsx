import { GetEmployeeAccessPayload } from "@/server/actions";
import { GetShop } from "@/client/api";

export default async function Page() {
  const me = await GetEmployeeAccessPayload();

  const shop = await GetShop();
  if (!shop) {
    return null;
  }

  return (
    <>
      <h1 className="mb-2 text-3xl font-semibold">{shop?.name}</h1>
      <div>{shop?.description}</div>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(me, undefined, 2)}
      </pre>

      <pre className="mt-10 text-sm opacity-50 overflow-auto">
        {JSON.stringify(shop, undefined, 2)}
      </pre>
    </>
  );
}
