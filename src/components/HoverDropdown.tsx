"use client";

import React from "react";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type HoverDropdownProps = {
  dropdown: React.ReactNode;
  children: React.ReactNode;
};

export const HoverDropdown = ({ dropdown, children }: HoverDropdownProps) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width={280}
      trapFocus
      position="bottom"
      withArrow={false}
      shadow="md"
      radius="lg"
      opened={opened}
    >
      <Popover.Target>
        <div onMouseEnter={open} onMouseLeave={close}>
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown className="font-medium leading-normal">
        {dropdown}
      </Popover.Dropdown>
    </Popover>
  );
};
