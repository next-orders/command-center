import { GetAllMedia, GetLocale } from "@/client/api";
import { MediaCard } from "@/components/MediaCard";
import { ErrorBlock } from "@/components/ErrorBlock";
import { MediaCreateBlock } from "@/app/(authenticated)/media/MediaCreateBlock";

export default async function MediaBlock() {
  const media = await GetAllMedia();

  if (media instanceof Error) {
    return <ErrorBlock error={media} />;
  }

  const locale = GetLocale();

  const haveNoEntities = !media?.length;
  if (haveNoEntities) {
    return <MediaCreateBlock locale={locale} />;
  }

  const showMedia = media?.map((media) => (
    <MediaCard key={media.id} media={media} />
  ));

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 items-center">
      <div className="col-span-2">
        <MediaCreateBlock locale={locale} />
      </div>
      {showMedia}
    </div>
  );
}
