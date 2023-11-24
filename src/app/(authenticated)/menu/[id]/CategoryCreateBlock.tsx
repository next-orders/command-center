"use client";

import { IconTextPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";
import { CreateBlock } from "@/components/CreateBlock";
import { CategoryCreateModal } from "@/app/(authenticated)/menu/[id]/CategoryCreateModal";

type CategoryCreateBlockProps = {
  menuId: string;
  locale: Locale;
};

export const CategoryCreateBlock = ({
  locale,
  menuId,
}: CategoryCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMenuCategory);

  const { CREATE_MENU_CATEGORY_LABEL } = getDictionary(locale);

  return (
    <>
      <CreateBlock locale={locale}>
        <Button onClick={toggle}>
          <IconTextPlus stroke={1.5} /> {CREATE_MENU_CATEGORY_LABEL}
        </Button>
      </CreateBlock>

      <CategoryCreateModal menuId={menuId} />
    </>
  );
};
