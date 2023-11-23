import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MediaBlock from "./MediaBlock";
import { MediaBlockSkeleton } from "./MediaBlockSkeleton";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { GetLocale } from "@/client/api";
import { MediaCreateModal } from "@/app/(authenticated)/media/MediaCreateModal";

export default async function Page() {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.MEDIA, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />

      <h1 className="mb-2 text-3xl font-semibold">Media</h1>
      <div>You can see the loaded files</div>

      <Suspense fallback={<MediaBlockSkeleton />}>
        <MediaBlock />
      </Suspense>

      <MediaCreateModal />
    </>
  );
}
