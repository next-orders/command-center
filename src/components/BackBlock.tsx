"use client";

import { useRouter } from "next/navigation";
import { IconArrowBackUp } from "@tabler/icons-react";
import { getDictionary, Locale } from "@/dictionaries";
import { Button } from "@/components/Button";

type BackBlockProps = {
  locale: Locale;
};

export const BackBlock = ({ locale }: BackBlockProps) => {
  const router = useRouter();
  const { RETURN_BUTTON } = getDictionary(locale);

  return (
    <div className="w-full md:w-auto mx-auto md:mx-0">
      <Button onClick={() => router.back()}>
        <IconArrowBackUp stroke={1.5} /> {RETURN_BUTTON}
      </Button>
    </div>
  );
};
