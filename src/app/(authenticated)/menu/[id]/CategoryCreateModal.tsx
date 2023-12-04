"use client";

import React from "react";
import slugify from "slug";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState, useFormStatus } from "react-dom";
import { CreateMenuCategoryForm } from "@/server/actions";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

type CategoryCreateModalProps = {
  menuId: string;
};

export const CategoryCreateModal = ({ menuId }: CategoryCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMenuCategory);
  const isOpened = useModalStore((state) => state.isOpenedCreateMenuCategory);

  const [state, formAction] = useFormState(
    CreateMenuCategoryForm,
    initialState,
  );
  const { pending } = useFormStatus();

  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");

  // Lets generate slug on Name change
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  return (
    <Modal title="Create new Category" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <input type="hidden" name="menuId" value={menuId} />

        <div className="mb-4">
          <Input
            name="name"
            label="Name"
            placeholder="Main heading"
            isRequired
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="mb-4">
          <Input
            name="slug"
            label="Slug"
            placeholder="Unique identifying part of a web address"
            isRequired
            value={slug}
            onChange={setSlug}
          />
        </div>

        <div className="mt-6">
          <Button type="submit" isLoading={pending}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
