import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import { ColorSchemeScript } from "@mantine/core";

import "@mantine/core/styles.layer.css";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Command Center",
  description: "Management of all business Entities",
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
      <body className="bg-white">{children}</body>
    </html>
  );
}
