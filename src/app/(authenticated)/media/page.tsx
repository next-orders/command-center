import { Suspense } from "react";
import { IconPhotoPlus } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MediaBlock from "./MediaBlock";
import { MediaBlockSkeleton } from "./MediaBlockSkeleton";
import { BreadcrumbLinks } from "@/types";
import { PAGES } from "@/lib/pages";
import { GetLocale } from "@/client/api";
import { Button } from "@/components/Button";

export default async function Page() {
  const locale = GetLocale();

  const breadcrumbs: BreadcrumbLinks[] = [{ page: PAGES.MEDIA, href: "#" }];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} locale={locale} />
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Media</h1>
          <div>You can see the loaded files</div>
        </div>

        <div>
          <Button>
            <IconPhotoPlus stroke={1.5} /> Load new file
          </Button>
        </div>
      </div>

      <Suspense fallback={<MediaBlockSkeleton />}>
        <MediaBlock />
      </Suspense>
    </>
  );
}
