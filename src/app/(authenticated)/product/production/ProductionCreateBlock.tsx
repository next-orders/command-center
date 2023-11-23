"use client";

import { IconTextPlus } from "@tabler/icons-react";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";
import { CreateBlock } from "@/components/CreateBlock";
import { useModalStore } from "@/store/modal";

type ProductionCreateBlockProps = {
  locale: Locale;
  countNow: number;
};

export const ProductionCreateBlock = ({
  locale,
  countNow,
}: ProductionCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProduction);

  const { CREATE_PRODUCTION_LABEL } = getDictionary(locale);

  return (
    <CreateBlock locale={locale} countNow={countNow}>
      <Button onClick={toggle}>
        <IconTextPlus stroke={1.5} /> {CREATE_PRODUCTION_LABEL}
      </Button>
    </CreateBlock>
  );
};
