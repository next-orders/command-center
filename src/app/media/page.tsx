import Image from "next/image";
import { GetAllMedia } from "@/server/actions";
import { Media } from "@next-orders/api-sdk";
import { Button } from "@mantine/core";

export default async function Page() {
  const media = await GetAllMedia();

  const mediaCards = media?.map((media) => (
    <MediaCard key={media.id} media={media} />
  ));

  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Media</h1>
          <div>You can see the loaded files</div>
        </div>
        <Button className="px-2 bg-emerald-400 hover:bg-emerald-500">
          Load new
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {mediaCards}
      </div>
    </div>
  );
}

type MediaCardProps = {
  media: Media;
};

const MediaCard = ({ media }: MediaCardProps) => {
  return (
    <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-[.98] duration-200">
      <Image
        src={media.url ?? ""}
        alt={media.alt ?? ""}
        unoptimized
        width={300}
        height={300}
        className="w-full aspect-square rounded-xl"
      />
      <div className="mt-2 text-xs text-zinc-500">{media.id}</div>
      <div className="mt-1 text-lg font-medium leading-tight">{media.alt}</div>
    </div>
  );
};
