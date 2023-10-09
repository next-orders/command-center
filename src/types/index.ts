export type MenuItem = {
  id: string;
  label: string;
  href: string;
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
  [key: string]: string;
};
