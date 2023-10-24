"use client";

import React from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MenuItem } from "@/types";

type Props = {
  menu: MenuItem[];
  children: React.ReactNode;
};

export const Shell = ({ menu, children }: Props) => {
  const [isNavbarOpened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 64, sm: 72, md: 72 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !isNavbarOpened, desktop: !isNavbarOpened },
      }}
      layout="alt"
    >
      <AppShell.Header withBorder={false}>
        <Header isNavbarOpened={isNavbarOpened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar withBorder={false} className="mt-16 md:mt-0">
        <Navigation menu={menu} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main onClick={close}>
        <div className="px-4 pb-10 mt-4 md:px-6 md:mt-6">{children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};
