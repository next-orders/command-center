import { GetClientById } from "@/server/actions";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { LevelBadge } from "@/components/LevelBadge";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const client = await GetClientById(params.id);
  if (!client) {
    notFound();
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Client base", href: `/client` },
    { title: client.firstName, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">
        It&apos;s {client.firstName}
      </h1>
      <div className="mb-8">Some info about client</div>

      <div className="mb-4 mx-auto max-w-xs">
        <div className="relative w-full bg-zinc-50 rounded-2xl h-auto p-3">
          <Image
            src={client.avatar}
            alt="Client"
            unoptimized
            width={300}
            height={300}
            className="w-full aspect-square rounded-xl"
          />

          <div className="mt-4 mb-2">
            <MainProgress level={client.level} />
          </div>
        </div>
      </div>
    </>
  );
}

type MainProgressProps = {
  level: number;
};

const MainProgress = ({ level }: MainProgressProps) => {
  return (
    <>
      <div className="relative group">
        <div className="w-full h-6 bg-orange-200 rounded-xl">
          <div className="absolute bottom-0 left-0 w-[44%] h-6 bg-orange-400 rounded-xl"></div>
          <div className="absolute bottom-0 right-0 w-fit h-6 px-2 cursor-default hidden group-hover:block bg-white rounded-xl border-2 border-orange-200 text-orange-600 text-sm text-center font-semibold">
            114 XP to Lvl up
          </div>
        </div>
        <div className="absolute -bottom-3 -left-3">
          <LevelBadge level={level} size="lg" />
        </div>
      </div>
    </>
  );
};
