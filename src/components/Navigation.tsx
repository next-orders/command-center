"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, UnstyledButton } from "@mantine/core";
import { MenuItem } from "@/types";
import { TablerIcon } from "@/components/TablerIcon";

type Props = {
  menu: MenuItem[];
  toggle: () => void;
};

export const Navigation = ({ menu, toggle }: Props) => {
  const menuBlock = menu?.map((item) => (
    <LinkButton
      key={item.id}
      link={item.href}
      label={item.label}
      icon={<TablerIcon icon={item.icon} />}
      toggle={toggle}
    />
  ));

  return (
    <div className="w-full bg-zinc-50 px-4 pt-4 border-r border-zinc-100">
      <ScrollArea className="h-screen">
        <div className="mb-32">
          <div className="flex flex-row items-center py-2">
            <div className="font-semibold text-xl">Command Center</div>
          </div>

          {menuBlock}
        </div>
      </ScrollArea>
    </div>
  );
};

const LinkButton = ({
  link,
  label,
  icon,
  toggle,
}: {
  link: string;
  label: string;
  icon: React.ReactNode;
  toggle: () => void;
}) => {
  const activePath = usePathname();
  const linkActive = activePath === link;

  return (
    <UnstyledButton component={Link} href={link} onClick={toggle}>
      <div
        className="text-base font-medium flex flex-row items-center gap-3 w-full h-12 px-3 rounded-2xl data-[active=true]:bg-zinc-200 data-[active=true]:font-semibold hover:bg-zinc-100 hover:scale-95 duration-200"
        data-active={linkActive}
      >
        {icon}
        {label}
      </div>
    </UnstyledButton>
  );
};
