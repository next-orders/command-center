import { GetClientById } from "@/server/actions";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { LevelBadge } from "@/components/LevelBadge";
import { ClientTraitBadge } from "@/components/ClientTraitBadge";

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

      <div className="mt-24 text-center max-w-xl mx-auto">
        <Image
          src="/command-center/static/eggs.png"
          alt=""
          unoptimized
          width={64}
          height={64}
          className="mx-auto mb-4"
        />
        <h2 className="mb-4 text-lg font-semibold">
          The client constantly gains experience and new levels
        </h2>
        <p className="text-left">
          What do we need in our business? Progression! Each client will have
          their own accumulation of <b>experience</b>, which will be expressed
          in a number - <b>Client Level</b>. This way you can very quickly
          understand whether the client is new or old.
        </p>
      </div>

      <div className="mt-24 text-center max-w-xl mx-auto">
        <Image
          src="/command-center/static/recipe-book.png"
          alt=""
          unoptimized
          width={64}
          height={64}
          className="mx-auto mb-4"
        />
        <h2 className="mb-4 text-lg font-semibold">
          The client may gain and lose Traits!
        </h2>
        <p className="text-left">
          To make it easier to understand what a client is, we introduce a
          series of abstract metrics. The first of them: <b>Client Traits</b>.
          There are currently 7 of them.
        </p>

        <div className="mt-4 flex flex-row gap-1 justify-center">
          <ClientTraitBadge size="md" variant="orderly" />
          <ClientTraitBadge size="md" variant="spontaneous" />
          <ClientTraitBadge size="md" variant="cold" />
          <ClientTraitBadge size="md" variant="well-fed" />
          <ClientTraitBadge size="md" variant="satisfied" />
          <ClientTraitBadge size="md" variant="picky" />
          <ClientTraitBadge size="md" variant="cautious" />
        </div>

        <ul className="mt-4 text-left leading-loose">
          <li>
            <b>Orderly</b>: often orders, but for small amounts.
          </li>
          <li>
            <b>Spontaneous</b>: rarely orders, but for large amounts.
          </li>
          <li>
            <b>Cold</b>: hasn&apos;t ordered for a long time.
          </li>
          <li>
            <b>Well-fed</b>: often orders for large amounts.
          </li>
          <li>
            <b>Satisfied</b>: happy with everything and always.
          </li>
          <li>
            <b>Picky</b>: always dissatisfied.
          </li>
          <li>
            <b>Cautious</b>: don&apos;t know what&apos;s on the client&apos;s
            mind.
          </li>
        </ul>
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
            114 XP to Lvl Up
          </div>
        </div>
        <div className="absolute -bottom-3.5 -left-3">
          <LevelBadge level={level} size="lg" />
        </div>
      </div>
    </>
  );
};
