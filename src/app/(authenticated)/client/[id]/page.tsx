import { Suspense } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientTraitBadge } from "@/components/ClientTraitBadge";
import ClientAvatarBlock from "@/app/(authenticated)/client/[id]/ClientAvatarBlock";
import { ClientAvatarBlockSkeleton } from "@/app/(authenticated)/client/[id]/ClientAvatarBlockSkeleton";
import { PAGES } from "@/lib/pages";
import { BreadcrumbLinks } from "@/types";
import { GetLocale } from "@/client/api";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [
    { page: PAGES.CLIENT_BASE, href: `/client` },
    { page: PAGES.CLIENT_PAGE, href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Client page</h1>
      <div className="mb-8">Get all data about this client</div>

      <Suspense fallback={<ClientAvatarBlockSkeleton locale={locale} />}>
        <ClientAvatarBlock id={params.id} locale={locale} />
      </Suspense>

      <ClientInfoBlock />
    </>
  );
}

const ClientInfoBlock = () => {
  return (
    <>
      <div className="mt-24 text-center max-w-xl mx-auto">
        <Image
          src="/static/eggs.png"
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
          src="/static/recipe-book.png"
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
          <ClientTraitBadge size="md" type="WELL_FED" />
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
};
