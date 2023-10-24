import Link from "next/link";
import { IconCheese, IconChefHat, IconPaperBag } from "@tabler/icons-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function Page() {
  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Products", href: "#" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />

      <h1 className="mb-2 text-3xl font-semibold">Products</h1>
      <div className="mb-8">Can be a Production, Ready or Ingredient</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href={"/product/production"}
          className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group"
        >
          <div className="mt-4">
            <IconChefHat
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-violet-500"
            />
            <div className="text-2xl font-semibold">Production</div>
            <p>Items that need to be prepared</p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-500">
              35
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-violet-200 duration-200">
              Show all
            </div>
          </div>
        </Link>

        <div className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group">
          <div className="mt-4">
            <IconPaperBag
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-blue-500"
            />
            <div className="text-2xl font-semibold">Ready</div>
            <p>They are prepared, packaged and labeled for sale</p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-500">
              24
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-blue-200 duration-200">
              Show all
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex flex-col justify-between bg-zinc-50 rounded-2xl text-center cursor-pointer hover:scale-95 duration-200 group">
          <div className="mt-4">
            <IconCheese
              stroke={1.5}
              className="mx-auto mb-2 w-14 h-14 text-green-500"
            />
            <div className="text-2xl font-semibold">Ingredients</div>
            <p>
              The basic components that are combined to create the finished
              product
            </p>
          </div>

          <div>
            <div className="mt-4 mb-4 text-2xl font-semibold text-zinc-500">
              46
            </div>
            <div className="px-6 py-4 font-medium bg-zinc-100 rounded-xl group-hover:bg-green-200 duration-200">
              Show all
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
