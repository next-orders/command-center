import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MediaBlock from "./MediaBlock";
import { MediaBlockSkeleton } from "./MediaBlockSkeleton";
import { MediaCreateModal } from "@/app/(authenticated)/media/MediaCreateModal";
import { getLocale } from "@/client/locale";

export default async function Page() {
  const locale = getLocale();

  return (
    <>
      <Breadcrumbs keys={["MEDIA"]} />

      <h1 className="mb-2 text-3xl font-semibold">Media</h1>
      <div>You can see the loaded files</div>

      <Suspense fallback={<MediaBlockSkeleton />}>
        <MediaBlock />
      </Suspense>

      <MediaCreateModal locale={locale} />
    </>
  );
}
