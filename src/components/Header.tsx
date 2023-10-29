import Link from "next/link";
import { Avatar, Burger, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { SignOut } from "@/server/actions";

type Props = {
  isNavbarOpened: boolean;
  toggle: () => void;
};

export const Header = ({ isNavbarOpened, toggle }: Props) => {
  const userAvatar = `https://v1.next-orders.org/api/avatar/32d735e8-977d-4a19-ab8a-35c955c97a19?gender=male&emotion=7&size=140`;

  return (
    <div className="w-full h-full px-4 md:px-6 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <div className="mr-2 flex justify-center items-center justify-items-center h-full hover:scale-110 transition duration-200">
        <Burger
          opened={isNavbarOpened}
          onClick={toggle}
          size="md"
          aria-label="Navigation"
        />
      </div>

      <div className="mr-auto">
        <div className="flex flex-row gap-2 items-center">
          <IconSearch stroke={1.5} />
          <Input placeholder="Find anything" />
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Link
          href={"https://v1.next-orders.org"}
          className="px-4 py-2 font-medium rounded-xl bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 hidden sm:block"
        >
          Open website
        </Link>
        <Avatar
          src={userAvatar}
          onClick={() => SignOut()}
          className="w-12 h-12 cursor-pointer hover:scale-95 duration-200"
        />
      </div>
    </div>
  );
};
