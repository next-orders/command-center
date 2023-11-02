import { GetAllMedia } from "@/client/api";
import { MediaCard } from "@/components/MediaCard";
import { ErrorBlock } from "@/components/ErrorBlock";

export default async function MediaBlock() {
  const media = await GetAllMedia();

  if (media instanceof Error) {
    return <ErrorBlock error={media} />;
  }

  if (!media) {
    return <div>You have no Media</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      {media?.map((media) => <MediaCard key={media.id} media={media} />)}
    </div>
  );
}
