"use client";

import Image from "next/image";
import { IconTextPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { getDictionary, Locale } from "@/dictionaries";

type ChannelCreateBlockProps = {
  locale: Locale;
  countNow: number;
};

export const ChannelCreateBlock = ({
  locale,
  countNow,
}: ChannelCreateBlockProps) => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);

  const {
    YOU_HAVE_SOME_LABEL,
    YOU_HAVE_NONE_LABEL,
    MAYBE_ITS_TIME_LABEL,
    CREATE_CHANNEL_LABEL,
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
          <IconTextPlus stroke={1.5} /> {CREATE_CHANNEL_LABEL}
        </Button>
      </div>
    </div>
  );
};
