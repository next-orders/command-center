import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.layer.css";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Command Center",
  description: "Management of all Business Entities",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="bg-white">
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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
