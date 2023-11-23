import React from "react";
import Image from "next/image";
import { getDictionary, Locale } from "@/dictionaries";

type CreateBlockProps = {
  locale: Locale;
  countNow: number;
  children: React.ReactNode;
};

export const CreateBlock = ({
  locale,
  countNow,
  children,
}: CreateBlockProps) => {
  const { YOU_HAVE_SOME_LABEL, YOU_HAVE_NONE_LABEL, MAYBE_ITS_TIME_LABEL } =
    getDictionary(locale);

  const title = countNow > 0 ? YOU_HAVE_SOME_LABEL : YOU_HAVE_NONE_LABEL;

  return (
    <div className="text-center max-w-xl mx-auto p-4">
      <Image
        src="/static/green-notebook.png"
        alt=""
        width={64}
        height={64}
        className="mx-auto mb-6"
      />
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      <p>{MAYBE_ITS_TIME_LABEL}</p>

      <div className="mt-4 mx-auto w-fit">{children}</div>
    </div>
  );
};
