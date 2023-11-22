"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState } from "react-dom";
import { CreateChannelForm } from "@/server/actions";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

export const ChannelCreateModal = () => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);
  const isOpened = useModalStore((state) => state.isOpenedCreateChannel);

  const [state, formAction] = useFormState(CreateChannelForm, initialState);

  const [slug, setSlug] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [currencyCode, setCurrencyCode] = React.useState("");
  const [languageCode, setLanguageCode] = React.useState("");

  return (
    <Modal title="Create new Channel" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

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

        <div className="mb-4">
          <Input
            name="name"
            label="Name"
            placeholder="Main heading"
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

        <div className="mb-4">
          <Input
            name="currencyCode"
            label="Currency"
            placeholder="Currency used in sales"
            isRequired
            value={currencyCode}
            onChange={setCurrencyCode}
          />
        </div>

        <div className="mb-4">
          <Input
            name="languageCode"
            label="Language"
            placeholder="Main language"
            isRequired
            value={languageCode}
            onChange={setLanguageCode}
          />
        </div>

        <div className="mt-6">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};
