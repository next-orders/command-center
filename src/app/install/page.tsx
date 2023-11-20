import { redirect } from "next/navigation";
import { GetShop } from "@/server/actions";
import InstallPage from "@/app/install/client";

export default async function Page() {
  const shop = await GetShop();
  if (shop) {
    // Shop is already in DB
    return redirect("/command-center/auth/login");
  }

  return <InstallPage />;
}
