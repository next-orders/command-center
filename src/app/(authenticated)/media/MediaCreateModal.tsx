"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useModalStore } from "@/store/modal";
import { CreateMediaForm } from "@/server/actions";
import { getDictionary, Locale } from "@/dictionaries";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

type MediaCreateModalProps = {
  locale: Locale;
};

export const MediaCreateModal = ({ locale }: MediaCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMedia);
  const isOpened = useModalStore((state) => state.isOpenedCreateMedia);

  const [state, formAction] = useFormState(CreateMediaForm, initialState);

  const [alt, setAlt] = React.useState("");

  return (
    <Modal title="Upload new Media" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <div className="mb-4">
          <Input
            name="alt"
            label="Name"
            placeholder="Short description of the file"
            isRequired
            value={alt}
            onChange={setAlt}
          />
        </div>

        <div className="mb-4">
          <input type="file" name="file" required />
        </div>

        <div className="mt-6">
          <SubmitBlock locale={locale} />
        </div>
      </form>
    </Modal>
  );
};

const SubmitBlock = ({ locale }: { locale: Locale }) => {
  const { UPLOAD_BUTTON } = getDictionary(locale);
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {UPLOAD_BUTTON}
    </Button>
  );
};
