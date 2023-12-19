"use client";

import slugify from "slug";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateMenuCategoryForm } from "@/server/actions";
import { Input } from "@/components/Input";
import { getDictionary, Locale } from "@/dictionaries";
import { useMenuCategory } from "@/store/MenuCategory";
import { MenuCategory, MenuCategoryIcon } from "@next-orders/api-sdk";
import Image from "next/image";
import { getIconUrl } from "@/lib/helpers";

const initialState = {
  message: "",
};

type CategoryEditModalProps = {
  locale: Locale;
  category: MenuCategory | null;
};

export const CategoryEditModal = ({
  locale,
  category,
}: CategoryEditModalProps) => {
  const toggle = useModalStore((state) => state.toggleEditMenuCategory);
  const isOpened = useModalStore((state) => state.isOpenedEditMenuCategory);

  //const category = useMenuCategory((state) => state.category);
  const { name, setName, slug, setSlug, icon } = useMenuCategory(
    (state) => state,
  );

  const {
    EDIT_MENU_CATEGORY_LABEL,
    NAME_LABEL,
    SLUG_LABEL,
    SLUG_PLACEHOLDER,
    CATEGORY_ICON_LABEL,
  } = getDictionary(locale);

  const [state, formAction] = useFormState(
    UpdateMenuCategoryForm,
    initialState,
  );

  // Lets generate slug on Name change
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  return (
    <Modal title={EDIT_MENU_CATEGORY_LABEL} toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <input type="hidden" name="categoryId" value={category?.id} />
        <input type="hidden" name="icon" value={icon || ""} />

        <div className="mb-4">
          <Input
            name="name"
            label={NAME_LABEL}
            isRequired
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="mb-4">
          <Input
            name="slug"
            label={SLUG_LABEL}
            placeholder={SLUG_PLACEHOLDER}
            isRequired
            value={slug}
            onChange={setSlug}
          />
        </div>

        <div className="mb-4">
          <div className="mb-1 block text-sm font-medium text-zinc-900">
            {CATEGORY_ICON_LABEL}
          </div>
          <MenuCategoryIconChooseBlock selected={icon} />
        </div>

        <div className="mt-6">
          <SubmitBlock locale={locale} />
        </div>
      </form>
    </Modal>
  );
};

const SubmitBlock = ({ locale }: { locale: Locale }) => {
  const { SAVE_BUTTON } = getDictionary(locale);
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {SAVE_BUTTON}
    </Button>
  );
};

type MenuCategoryIconChooseBlockProps = {
  selected: MenuCategoryIcon | null;
};

const MenuCategoryIconChooseBlock = ({
  selected,
}: MenuCategoryIconChooseBlockProps) => {
  const allPossible: MenuCategoryIcon[] = [
    "DEFAULT",
    "BURGER",
    "PIZZA",
    "LASAGNA",
    "ROLLS",
    "SUSHI",
    "WOK",
    "CAKE",
    "DRINK",
  ];

  const IconBlock = ({
    icon,
    isSelected,
  }: {
    icon: MenuCategoryIcon;
    isSelected: boolean;
  }) => {
    const { setIcon } = useMenuCategory((state) => state);

    const iconUrl = getIconUrl(icon);

    return (
      <button
        className="p-2 rounded-2xl border-4 border-transparent data-[active=true]:border-teal-500 cursor-pointer hover:bg-zinc-100 hover:scale-95 active:scale-90 duration-200"
        data-active={isSelected}
        onClick={() => setIcon(icon)}
      >
        <Image
          src={iconUrl}
          alt=""
          width={32}
          height={32}
          className="w-10 h-10"
        />
      </button>
    );
  };

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {allPossible.map((icon, index) => (
        <IconBlock key={index} icon={icon} isSelected={selected === icon} />
      ))}
    </div>
  );
};
