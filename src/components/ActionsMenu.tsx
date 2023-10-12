"use client";

import React from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { MenuAction } from "@/types";
import Link from "next/link";

type Props = {
  actions: MenuAction[];
};

export const ActionsMenu = ({ actions }: Props) => {
  const menuItems = actions.map((action) => {
    const isLink = typeof action.url === "string";

    if (isLink && action.url)
      return (
        <Menu.Item
          component={Link}
          href={action.url}
          key={action.id}
          leftSection={action.icon}
          className="px-2 py-2 rounded-xl hover:bg-zinc-100 text-base"
        >
          {action.label}
        </Menu.Item>
      );

    return (
      <Menu.Item
        key={action.id}
        leftSection={action.icon}
        className="px-2 py-2 rounded-xl hover:bg-zinc-100 text-base"
      >
        {action.label}
      </Menu.Item>
    );
  });

  return (
    <Menu
      position="left-start"
      width={200}
      shadow="sm"
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <ActionIcon variant="transparent" aria-label="Menu">
          <IconDots stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="px-2 py-2 rounded-2xl">
        {menuItems}
      </Menu.Dropdown>
    </Menu>
  );
};
