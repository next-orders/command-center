"use client";

import { Media } from "@next-orders/api-sdk";
import { MenuAction } from "@/types";
import { IconEyeOff, IconFileArrowRight } from "@tabler/icons-react";
import { Menu } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type MediaCardProps = {
  media: Media;
};

export const MediaCard = ({ media }: MediaCardProps) => {
  const actionsInMenu: MenuAction[] = [
    {
      id: "1",
      label: "Open",
      url: `/product/123`,
      icon: <IconFileArrowRight stroke={1.5} className="text-zinc-500" />,
    },
    {
      id: "2",
      label: "Enable / Disable",
      icon: <IconEyeOff stroke={1.5} className="text-zinc-500" />,
    },
  ];

  const menuItems = actionsInMenu.map((action) => {
    const isLink = typeof action.url === "string";

    if (isLink && action.url)
      return (
        <Menu.Item
          component={Link}
          href={action.url}
          key={action.id}
          leftSection={action.icon}
          className="px-3 py-3 rounded-xl hover:bg-zinc-100 text-base"
        >
          {action.label}
        </Menu.Item>
      );

    return (
      <Menu.Item
        key={action.id}
        leftSection={action.icon}
        className="px-3 py-3 rounded-xl hover:bg-zinc-100 text-base"
      >
        {action.label}
      </Menu.Item>
    );
  });

  return (
    <Menu
      position="top"
      width={200}
      shadow="sm"
      trigger="click"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 duration-200 group">
          <div className="relative">
            <Image
              src={media.url ?? ""}
              alt={media.alt ?? ""}
              unoptimized
              width={300}
              height={300}
              className="w-full aspect-square rounded-xl"
            />
            <div className="mt-2 px-2 py-2 rounded-xl text-xs bg-white absolute bottom-1 left-1 hidden group-hover:block">
              {media.id}
            </div>
          </div>

          <div className="mt-2 text-base font-medium leading-tight text-center">
            {media.alt}
          </div>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="px-2 py-2 rounded-2xl">
        {menuItems}
      </Menu.Dropdown>
    </Menu>
  );
};
