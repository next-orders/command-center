import React from "react";
import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { MantineProvider } from "@mantine/core";
import { GetNavigationMenu } from "@/server/actions";

import "@mantine/core/styles.layer.css";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Command Center",
  description: "Management of all business Entities",
};

type Props = {
  children: React.ReactNode;
};

export default async function AuthenticatedLayout({ children }: Props) {
  const [menu] = await Promise.all([GetNavigationMenu()]);

  return (
    <MantineProvider
      theme={{
        fontFamily: "inherit",
        primaryColor: "blue",
        primaryShade: { light: 5, dark: 7 },
        colors: {
          blue: [
            "#eff6ff",
            "#dbeafe",
            "#bfdbfe",
            "#93c5fd",
            "#60a5fa",
            "#3b82f6",
            "#2563eb",
            "#1d4ed8",
            "#1e40af",
            "#1e3a8a",
          ],
        },
      }}
      defaultColorScheme="light"
      forceColorScheme="light"
    >
      <Shell menu={menu}>{children}</Shell>
    </MantineProvider>
  );
}
