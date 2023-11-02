import { Suspense } from "react";
import { IconPhotoPlus } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import MediaBlock from "./MediaBlock";
import { MediaBlockSkeleton } from "./MediaBlockSkeleton";

export default async function Page() {
  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Media", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Media</h1>
          <div>You can see the loaded files</div>
        </div>
        <div className="px-4 py-4 flex flex-row gap-2 font-medium bg-zinc-100 rounded-2xl cursor-pointer hover:scale-95 duration-200">
          <IconPhotoPlus stroke={1.5} /> Load new file
        </div>
      </div>

      <Suspense fallback={<MediaBlockSkeleton />}>
        <MediaBlock />
      </Suspense>
    </>
  );
}
