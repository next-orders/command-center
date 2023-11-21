"use client";

import Link from "next/link";
import { BackBlock } from "@/components/BackBlock";
import { getDictionary, Locale } from "@/dictionaries";
import { BreadcrumbLinks } from "@/types";

type Props = {
  links: BreadcrumbLinks[];
  locale: Locale;
};

export const Breadcrumbs = ({ links, locale }: Props) => {
  const preparedLinks = prepareLinks(links, locale);

  const crumbs = preparedLinks.map((link, index) => (
    <li
      key={index}
      className="relative after:content-['/'] after:px-1 after:text-lg after:text-zinc-300 last:after:content-['']"
    >
      <Link
        href={link.href}
        className="px-3 py-2 inline-block rounded-xl hover:bg-zinc-200 hover:scale-95 duration-200 bg-zinc-100 data-[active=true]:bg-zinc-50"
        data-active={link.href === "#"}
      >
        {link.title}
      </Link>
    </li>
  ));

  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <nav className="hidden md:block">
        <ol role="list" className="flex flex-row">
          {crumbs}
        </ol>
      </nav>

      <BackBlock locale={locale} />
    </div>
  );
};

const prepareLinks = (links: BreadcrumbLinks[], locale: Locale) => {
  const dictionary = getDictionary(locale);

  const prepared = [{ title: dictionary.DASHBOARD_LABEL, href: "/dashboard" }];

  for (const link of links) {
    prepared.push({
      title: dictionary[link.page.dictionary],
      href: link.href,
    });
  }

  return prepared;
};
