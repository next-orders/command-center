import { GetAllMedia } from "@/server/actions";
import { MediaCard } from "@/components/MediaCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  const media = await GetAllMedia();

  const mediaCards = media?.map((media) => (
    <MediaCard key={media.id} media={media} />
  ));

  const breadcrumbs = [
    { title: "Home", href: "/" },
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
        <div className="px-6 py-4 bg-zinc-100 rounded-xl cursor-pointer hover:bg-emerald-200 duration-200">
          Load new
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {mediaCards}
      </div>
    </>
  );
}
