import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetChannelById, GetMenusInChannel } from "@/client/api";
import { Menu } from "@next-orders/api-sdk";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const channel = await GetChannelById(params.id);
  if (!channel) {
    notFound();
  }

  const menus = await GetMenusInChannel(channel.id);

  const showMenus = menus?.map((menu) => (
    <MenuCard key={menu.id} menu={menu} />
  ));

  return (
    <>
      <Breadcrumbs keys={["CHANNELS", "CHANNEL_PAGE"]} />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Channel Page</h1>
          <div>You can see the loaded data</div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Menus in this Channel</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
        {showMenus}
      </div>
    </>
  );
}

type MenuCardProps = {
  menu: Menu;
};

const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <Link href={`/menu/${menu.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto px-4 py-6 cursor-pointer hover:scale-95 duration-200 group">
        <div className="mb-2 text-xl font-medium leading-tight text-center">
          Menu X
        </div>
        <div className="text-base font-normal leading-tight text-center">
          Categories count: {menu.categories.length}
        </div>
      </div>
    </Link>
  );
};
