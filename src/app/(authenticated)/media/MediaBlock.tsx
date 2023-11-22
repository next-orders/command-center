import { GetAllMedia } from "@/client/api";
import { MediaCard } from "@/components/MediaCard";
import { ErrorBlock } from "@/components/ErrorBlock";
import Image from "next/image";

export default async function MediaBlock() {
  const media = await GetAllMedia();

  if (media instanceof Error) {
    return <ErrorBlock error={media} />;
  }

  const haveNoEntities = !media?.length;

  if (haveNoEntities) {
    return <MediaEmptyStateBlock />;
  }

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      {media?.map((media) => <MediaCard key={media.id} media={media} />)}
    </div>
  );
}

const MediaEmptyStateBlock = () => {
  return (
    <div className="mt-10 text-center max-w-xl mx-auto">
      <Image
        src="/static/green-notebook.png"
        alt=""
        unoptimized
        width={64}
        height={64}
        className="mx-auto mb-6"
      />
      <h2 className="mb-1 text-lg font-semibold">You have no Media files</h2>
      <p>Maybe it&apos;s time to add one?</p>
    </div>
  );
};
