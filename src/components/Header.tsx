"use client";

import Image from "next/image";
import Link from "next/link";
import { IconMenu2, IconSearch, IconX } from "@tabler/icons-react";
import { SignOut } from "@/server/actions";
import { useUIStore } from "@/store/ui";

export const Header = () => {
  const isNavbarOpened = useUIStore((state) => state.isNavbarOpened);
  const toggleNavbar = useUIStore((state) => state.toggleNavbar);

  const userAvatar = `https://v1.next-orders.org/api/avatar/32d735e8-977d-4a19-ab8a-35c955c97a19?gender=male&emotion=7&size=140`;

  return (
    <div className="w-full h-full px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <div className="mr-2 2xl:hidden flex justify-center items-center justify-items-center h-full hover:scale-110 transition duration-200">
        <button
          aria-label="Close Navigation"
          data-active={isNavbarOpened}
          onClick={toggleNavbar}
          className="hidden data-[active=true]:block"
        >
          <IconX stroke={1.5} className="w-8 h-8" />
        </button>
        <button
          aria-label="Open Navigation"
          data-active={!isNavbarOpened}
          onClick={toggleNavbar}
          className="hidden data-[active=true]:block"
        >
          <IconMenu2 stroke={1.5} className="w-8 h-8" />
        </button>
      </div>

      <div className="mr-auto">
        <div className="flex flex-row gap-2 items-center">
          <IconSearch stroke={1.5} />
          <input type="text" placeholder="Find anything" />
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Link
          href={"https://v1.next-orders.org"}
          className="px-4 py-2 font-medium rounded-xl bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 hidden sm:block"
        >
          Open website
        </Link>
        <Image
          src={userAvatar}
          width={40}
          height={40}
          alt=""
          unoptimized
          onClick={() => SignOut()}
          className="w-12 h-12 rounded-full cursor-pointer hover:scale-95 duration-200"
        />
      </div>
    </div>
  );
};
