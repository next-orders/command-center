import React from "react";
import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { GetNavigationMenu } from "@/server/actions";

export const metadata: Metadata = {
  title: "Command Center",
  description: "Management of all Business Entities",
};

type Props = {
  children: React.ReactNode;
};

export default async function AuthenticatedLayout({ children }: Props) {
  const [menu] = await Promise.all([GetNavigationMenu()]);

  return <Shell menu={menu}>{children}</Shell>;
}
