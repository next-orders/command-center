"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { useFormState } from "react-dom";
import { CreateMediaForm } from "@/server/actions";
import { useModalStore } from "@/store/modal";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

export const MediaCreateModal = () => {
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
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </Modal>
  );
};
