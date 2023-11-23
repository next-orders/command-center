"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { useFormState } from "react-dom";
import { CreateProductionForm } from "@/server/actions";
import { useModalStore } from "@/store/modal";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

export const ProductionCreateModal = () => {
  const toggle = useModalStore((state) => state.toggleCreateProduction);
  const isOpened = useModalStore((state) => state.isOpenedCreateProduction);

  const [state, formAction] = useFormState(CreateProductionForm, initialState);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <Modal title="Create new Product" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <div className="mb-4">
          <Input
            name="name"
            label="Name"
            placeholder="Title of the Product"
            isRequired
            value={name}
            onChange={setName}
          />
        </div>

        <div className="mb-4">
          <Input
            name="description"
            label="Description"
            placeholder="Short description"
            isRequired={false}
            value={description}
            onChange={setDescription}
          />
        </div>

        <div className="mt-6">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};
