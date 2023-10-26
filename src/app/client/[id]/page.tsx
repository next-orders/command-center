import { GetClientById } from "@/server/actions";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { LevelBadge } from "@/components/LevelBadge";
import { ClientTraitBadge } from "@/components/ClientTraitBadge";
import { HoverDropdown } from "@/components/HoverDropdown";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const client = await GetClientById(params.id);
  if (!client) {
    notFound();
  }

  const clientAvatar = `https://v1.next-orders.org/api/avatar/${client.avatarId}?gender=${client.gender}&emotion=${client.emotion}&size=140`;
  const clientLoyaltyPercent = client.loyalty;

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Client base", href: `/client` },
    { title: client.firstName, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">Client page</h1>
      <div className="mb-8">Get all data about this client</div>

      <div className="mb-4 mx-auto max-w-xs group">
        <div className="relative w-full bg-zinc-50 rounded-2xl h-auto px-3 py-3">
          <Image
            src={clientAvatar}
            alt="Client"
            unoptimized
            width={300}
            height={300}
            className="w-full aspect-square rounded-xl"
          />
          <div className="absolute top-5 left-0 right-0">
            <HoverDropdown
              dropdown={
                <div>
                  This is the level of <b>Client Loyalty</b>. For each action he
                  receives an increase. Every day the level decreases
                  automatically – &quot;passive cooling&quot;.
                </div>
              }
            >
              <LoyaltyProgress percent={clientLoyaltyPercent} />
            </HoverDropdown>
          </div>
          <div className="absolute top-1 right-1 md:group-hover:scale-105 duration-300">
            <HoverDropdown
              dropdown={
                <div>
                  This is the <b>Client Level</b>. It takes into account all
                  actions for all time.
                </div>
              }
            >
              <div className="md:hover:scale-125 duration-200">
                <LevelBadge level={client.level} size="lg" />
              </div>
            </HoverDropdown>
          </div>

          <div className="mt-3 text-lg font-medium leading-tight text-center">
            It&apos;s {client.firstName} {client.lastName}
          </div>
        </div>

        <div className="mt-4">
          <TraitsBlock traits={client.traits} />
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
          <ClientTraitBadge size="md" type="ORDERLY" />
          <ClientTraitBadge size="md" type="SPONTANEOUS" />
          <ClientTraitBadge size="md" type="COLD" />
          <ClientTraitBadge size="md" type="WELL-FED" />
          <ClientTraitBadge size="md" type="SATISFIED" />
          <ClientTraitBadge size="md" type="PICKY" />
          <ClientTraitBadge size="md" type="CAUTIOUS" />
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

type LoyaltyProgressProps = {
  percent: number;
};

const LoyaltyProgress = ({ percent }: LoyaltyProgressProps) => {
  if (percent < 10) percent = 10;
  if (percent > 100) percent = 100;

  return (
    <div className="relative w-full md:group-hover:scale-105 duration-300">
      <div className="relative w-28 h-4 mx-auto bg-zinc-50 rounded-xl drop-shadow-md md:hover:scale-125 duration-200">
        <div
          className="absolute bottom-0 left-0 h-4 bg-indigo-500 rounded-xl"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

type TraitsBlockProps = {
  traits: {
    id: string;
    type: string;
  }[];
};

const TraitsBlock = ({ traits }: TraitsBlockProps) => {
  // Min 3 to show, if less - add blank
  if (traits.length === 0) {
    traits.push(
      { id: "blank1", type: "BLANK" },
      { id: "blank2", type: "BLANK" },
      { id: "blank3", type: "BLANK" },
    );
  }
  if (traits.length === 1) {
    traits.push(
      { id: "blank1", type: "BLANK" },
      { id: "blank2", type: "BLANK" },
    );
  }
  if (traits.length === 2) {
    traits.push({ id: "blank1", type: "BLANK" });
  }

  const threeTraits = traits?.map((trait) => (
    <HoverDropdown
      key={trait.id}
      dropdown={<DropdownHintByTraitType type={trait.type} />}
    >
      <div className="cursor-default md:hover:scale-125 hover:drop-shadow-md duration-200">
        <ClientTraitBadge size="lg" type={trait.type} />
      </div>
    </HoverDropdown>
  ));

  return (
    <div className="flex flex-row gap-2 justify-center md:group-hover:scale-105 duration-300">
      {threeTraits}
    </div>
  );
};

const DropdownHintByTraitType = ({ type }: { type: string }) => {
  if (type === "BLANK") {
    return (
      <div>
        No Trait here. Wait a while, the client will probably receive it.
      </div>
    );
  }
  if (type === "ORDERLY") {
    return (
      <div>
        Client have a <b>Orderly Trait</b>. Often orders, but for small amounts.
      </div>
    );
  }
  if (type === "SPONTANEOUS") {
    return (
      <div>
        Client have a <b>Spontaneous Trait</b>. Rarely orders, but for large
        amounts.
      </div>
    );
  }
  if (type === "COLD") {
    return (
      <div>
        Client have a <b>Cold Trait</b>. Hasn&apos;t ordered for a long time.
      </div>
    );
  }
  if (type === "WELL-FED") {
    return (
      <div>
        Client have a <b>Well-fed Trait</b>. Often orders for large amounts.
      </div>
    );
  }
  if (type === "SATISFIED") {
    return (
      <div>
        Client have a <b>Satisfied Trait</b>. Happy with everything and always.
      </div>
    );
  }
  if (type === "PICKY") {
    return (
      <div>
        Client have a <b>Picky Trait</b>. Always dissatisfied.
      </div>
    );
  }
  if (type === "CAUTIOUS") {
    return (
      <div>
        Client have a <b>Cautious Trait</b>. Don&apos;t know what&apos;s on the
        client&apos;s mind.
      </div>
    );
  }

  return <div>No hint here.</div>;
};
