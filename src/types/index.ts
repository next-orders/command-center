import { ReactNode } from "react";
import { Page } from "@/lib/pages";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: string | null;
};

export type TableData = {
  columns: TableHead[];
  data: TableRow[];
};

export type TableHead = {
  key: string;
  label: string;
};

export type TableRow = {
  [key: string]: string | ReactNode;
};

export type MenuAction = {
  id: string;
  label: string;
  url?: string;
  icon: ReactNode;
};

export type BreadcrumbLinks = {
  page: Page;
  href: string;
};
