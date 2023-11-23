"use client";

import Image from "next/image";
import { IconPhotoPlus } from "@tabler/icons-react";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";
import { useModalStore } from "@/store/modal";

type MediaCreateBlockProps = {
  locale: Locale;
  countNow: number;
};

export const MediaCreateBlock = ({
  locale,
  countNow,
}: MediaCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMedia);

  const {
    YOU_HAVE_SOME_LABEL,
    YOU_HAVE_NONE_LABEL,
    MAYBE_ITS_TIME_LABEL,
    CREATE_MEDIA_LABEL,
  } = getDictionary(locale);

  const title = countNow > 0 ? YOU_HAVE_SOME_LABEL : YOU_HAVE_NONE_LABEL;

  return (
    <div className="text-center max-w-xl mx-auto p-4">
      <Image
        src="/static/green-notebook.png"
        alt=""
        unoptimized
        width={64}
        height={64}
        className="mx-auto mb-6"
      />
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      <p>{MAYBE_ITS_TIME_LABEL}</p>

      <div className="mt-4 mx-auto w-fit">
        <Button onClick={toggle}>
          <IconPhotoPlus stroke={1.5} /> {CREATE_MEDIA_LABEL}
        </Button>
      </div>
    </div>
  );
};
