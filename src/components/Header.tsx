import Link from "next/link";
import { Avatar, Burger } from "@mantine/core";

type Props = {
  isNavbarOpened: boolean;
  toggle: () => void;
};

export const Header = ({ isNavbarOpened, toggle }: Props) => {
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

      <div className="flex flex-row gap-4 items-center">
        <Link
          href={"https://v1.next-orders.org"}
          className="px-4 py-1 text-white font-semibold rounded-full bg-emerald-500 hover:bg-emerald-600"
        >
          Открыть веб-сайт
        </Link>
        <Avatar />
      </div>
    </div>
  );
};
