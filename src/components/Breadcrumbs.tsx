import Link from "next/link";
import { BackBlock } from "@/components/BackBlock";

type Links = {
  title: string;
  href: string;
};

type Props = {
  links: Links[];
};

export const Breadcrumbs = ({ links }: Props) => {
  const crumbs = links.map((link, index) => {
    const bg = link.href === "#" ? "bg-none" : "bg-zinc-100";

    return (
      <li
        key={index}
        className="relative after:content-['/'] after:px-2 last:after:content-['']"
      >
        <Link
          href={link.href}
          className={`px-3 py-2 rounded-xl hover:bg-zinc-200 hover:scale-95 duration-200 ${bg}`}
        >
          {link.title}
        </Link>
      </li>
    );
  });

  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <nav className="hidden lg:block">
        <ol role="list" className="flex flex-row">
          {crumbs}
        </ol>
      </nav>

      <BackBlock />
    </div>
  );
};
