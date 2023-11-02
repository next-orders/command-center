import { MediaCardSkeleton } from "@/components/MediaCard";

export const MediaBlockSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      <MediaCardSkeleton />
      <MediaCardSkeleton />
      <MediaCardSkeleton />
      <MediaCardSkeleton />
      <MediaCardSkeleton />
      <MediaCardSkeleton />
      <MediaCardSkeleton />
    </div>
  );
};
