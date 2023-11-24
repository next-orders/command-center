"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState, useFormStatus } from "react-dom";
import { CreateProductVariantForm } from "@/server/actions";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

export const ProductVariantCreateModal = () => {
  const toggle = useModalStore((state) => state.toggleCreateProductVariant);
  const isOpened = useModalStore((state) => state.isOpenedCreateProductVariant);

  const [state, formAction] = useFormState(
    CreateProductVariantForm,
    initialState,
  );
  const { pending } = useFormStatus();

  const [categoryId, setCategoryId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [sku, setSku] = React.useState("");
  const [weightUnit, setWeightUnit] = React.useState("");
  const [weightValue, setWeightValue] = React.useState("");
  const [gross, setGross] = React.useState("");
  const [net, setNet] = React.useState("");
  const [tax, setTax] = React.useState("");

  return (
    <Modal title="Create new Product" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <div className="mb-4">
          <Input
            name="categoryId"
            label="Category Id"
            placeholder="Menu Category"
            isRequired
            value={categoryId}
            onChange={setCategoryId}
          />
        </div>

        <div className="mb-4">
          <Input
            name="productId"
            label="Abstract Product"
            placeholder="The main product that is the parent"
            isRequired
            value={productId}
            onChange={setProductId}
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
            name="sku"
            label="SKU"
            placeholder="Stock keeping unit, unique identifier"
            isRequired={false}
            value={sku}
            onChange={setSku}
          />
        </div>

        <div className="mb-4">
          <Input
            name="weightUnit"
            label="Weight Unit"
            placeholder="G, KG, LB or OZ"
            isRequired
            value={weightUnit}
            onChange={setWeightUnit}
          />
        </div>

        <div className="mb-4">
          <Input
            type="number"
            name="weightValue"
            label="Weight Value"
            placeholder="Positive number"
            isRequired
            value={weightValue}
            onChange={setWeightValue}
          />
        </div>

        <div className="mb-4">
          <Input
            type="number"
            name="gross"
            label="Gross"
            placeholder="Final price for client, including taxes"
            isRequired
            value={gross}
            onChange={setGross}
          />
        </div>

        <div className="mb-4">
          <Input
            type="number"
            name="net"
            label="Net"
            placeholder="Price without taxes"
            isRequired
            value={net}
            onChange={setNet}
          />
        </div>

        <div className="mb-4">
          <Input
            type="number"
            name="tax"
            label="Tax"
            placeholder="Amount of taxes"
            isRequired
            value={tax}
            onChange={setTax}
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
