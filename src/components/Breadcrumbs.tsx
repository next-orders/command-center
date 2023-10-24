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
    const bg = link.href === "#" ? "bg-zinc-50" : "bg-zinc-100";

    return (
      <li
        key={index}
        className="relative after:content-['/'] after:px-1 after:text-lg after:text-zinc-300 last:after:content-['']"
      >
        <Link
          href={link.href}
          className={`px-3 py-2 inline-block rounded-xl hover:bg-zinc-200 hover:scale-95 duration-200 ${bg}`}
        >
          {link.title}
        </Link>
      </li>
    );
  });

  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <nav className="hidden md:block">
        <ol role="list" className="flex flex-row">
          {crumbs}
        </ol>
      </nav>

      <BackBlock />
    </div>
  );
};
