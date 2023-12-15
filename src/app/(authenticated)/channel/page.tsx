import { Suspense } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ChannelsBlock from "@/app/(authenticated)/channel/ChannelsBlock";
import { ChannelsBlockSkeleton } from "@/app/(authenticated)/channel/ChannelsBlockSkeleton";
import { ChannelCreateModal } from "@/app/(authenticated)/channel/ChannelCreateModal";
import { GetLocale } from "@/client/api";

export default async function Page() {
  const locale = GetLocale();

  return (
    <>
      <Breadcrumbs keys={["CHANNELS"]} />

      <h1 className="mb-2 text-3xl font-semibold">Channels</h1>
      <div>You can see the loaded data</div>

      <Suspense fallback={<ChannelsBlockSkeleton />}>
        <ChannelsBlock />
      </Suspense>

      <ChannelInfoBlock />
      <ChannelCreateModal locale={locale} />
    </>
  );
}

const ChannelInfoBlock = () => {
  return (
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
        Sales channels are one of the main business entities
      </h2>
      <p className="text-left">
        Website, Telegram channel, social network group, point on the map with
        contacts - all these are your online sales channels. It is through them
        that people learn about your cuisine and become customers.
      </p>
    </div>
  );
};
