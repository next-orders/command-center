"use client";

import React from "react";
import slugify from "slug";
import { useFormState, useFormStatus } from "react-dom";
import { useModalStore } from "@/store/modal";
import { CreateProductVariantForm } from "@/server/actions";
import { ProductChooseModal } from "@/app/(authenticated)/menu/[id]/ProductChooseModal";
import { MenuCategory, Product } from "@next-orders/api-sdk";
import { Locale } from "@/dictionaries";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { EntitySelect } from "@/components/EntitySelect";
import { Select } from "@/components/Select";

const initialState = {
  message: "",
};

type ProductVariantCreateModalProps = {
  locale: Locale;
  products: Product[] | null;
  categories: MenuCategory[] | null | undefined;
};

export const ProductVariantCreateModal = ({
  locale,
  products,
  categories,
}: ProductVariantCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProductVariant);
  const isOpened = useModalStore((state) => state.isOpenedCreateProductVariant);

  const toggleChooseProduct = useModalStore(
    (state) => state.toggleChooseProduct,
  );

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
  const [weightUnit, setWeightUnit] = React.useState("");
  const [weightValue, setWeightValue] = React.useState("");
  const [gross, setGross] = React.useState("");

  // Lets generate slug on Name change
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  // Find selected Product
  const productSelected = products?.find((p) => p.id === productId);

  // Prepare categories for select
  const categoriesOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <>
      <Modal title="Create new Product" toggle={toggle} isOpened={isOpened}>
        <form action={formAction}>
          <input type="hidden" name="productId" value={productId} required />
          <input type="hidden" name="slug" value={slug} required />

          <div className="w-full text-center text-red-700">
            {state?.message}
          </div>

          <div className="mb-4">
            <EntitySelect
              type="PRODUCT"
              entity={productSelected}
              onClick={toggleChooseProduct}
              locale={locale}
            />
          </div>

          <div className="mb-4">
            <Select
              name="categoryId"
              label="Category"
              isRequired
              defaultValue={categoryId}
              onChange={setCategoryId}
              options={categoriesOptions}
            />
          </div>

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
              name="description"
              label="Description"
              placeholder="Short description"
              isRequired={false}
              value={description}
              onChange={setDescription}
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
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

            <div>
              <Select
                name="weightUnit"
                label="Weight Unit"
                isRequired
                defaultValue={weightUnit}
                onChange={setWeightUnit}
                options={[
                  {
                    value: "G",
                    label: "g",
                  },
                  {
                    value: "KG",
                    label: "kg",
                  },
                  {
                    value: "LB",
                    label: "lb",
                  },
                  {
                    value: "OZ",
                    label: "oz",
                  },
                ]}
              />
            </div>
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

          <div className="mt-6">
            <Button type="submit" isLoading={pending}>
              Create
            </Button>
          </div>
        </form>
      </Modal>

      <ProductChooseModal
        locale={locale}
        products={products}
        selected={productId}
        setSelected={setProductId}
      />
    </>
  );
};
