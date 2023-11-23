import React from "react";
import Image from "next/image";
import { getDictionary, Locale } from "@/dictionaries";

type CreateBlockProps = {
  locale: Locale;
  children: React.ReactNode;
};

export const CreateBlock = ({ locale, children }: CreateBlockProps) => {
  const { MAYBE_ITS_TIME_LABEL } = getDictionary(locale);

  return (
    <div className="text-center max-w-xl mx-auto p-4">
      <Image
        src="/static/green-notebook.png"
        alt=""
        width={64}
        height={64}
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-medium">{MAYBE_ITS_TIME_LABEL}</h2>

      <div className="mt-4 mx-auto w-fit">{children}</div>
    </div>
  );
};
