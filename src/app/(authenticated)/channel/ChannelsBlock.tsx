import Link from "next/link";
import { GetChannels } from "@/client/api";
import { ChannelEmptyStateBlock } from "@/app/(authenticated)/channel/ChannelEmptyStateBlock";
import { Channel } from "@next-orders/api-sdk";

export default async function ChannelsBlock() {
  const channels = await GetChannels();

  const haveNoEntities = !channels?.length;

  if (haveNoEntities) {
    return <ChannelEmptyStateBlock />;
  }

  const showChannels = channels?.map((channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  ));

  return (
    <>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
        {showChannels}
      </div>
    </>
  );
}

type ChannelCardProps = {
  channel: Channel;
};

const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <Link href={`/channel/${channel.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto px-4 py-6 cursor-pointer hover:scale-95 duration-200 group">
        <div className="mb-2 text-xl font-medium leading-tight text-center">
          {channel.name}
        </div>
        <div className="text-base font-normal leading-tight text-center">
          {channel.description}
        </div>

        <div className="mt-4 text-base font-normal leading-tight text-center text-zinc-500">
          {channel.slug}
        </div>

        <div className="mt-6 flex flex-row gap-2 justify-center">
          <div className="p-4 bg-white rounded-full">
            {channel.currencyCode}
          </div>
          <div className="p-4 bg-white rounded-full">
            {channel.languageCode}
          </div>
        </div>
      </div>
    </Link>
  );
};
