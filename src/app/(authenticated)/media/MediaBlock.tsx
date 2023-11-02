import { GetAllMedia } from "@/client/api";
import { MediaCard } from "@/components/MediaCard";

export default async function MediaBlock() {
  const media = await GetAllMedia();
  if (!media) {
    return <div>You have no Media</div>;
  }

  return media?.map((media) => <MediaCard key={media.id} media={media} />);
}
