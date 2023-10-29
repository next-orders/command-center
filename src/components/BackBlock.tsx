"use client";

import { useRouter } from "next/navigation";
import { IconArrowBackUp } from "@tabler/icons-react";

export const BackBlock = () => {
  const router = useRouter();

  return (
    <div className="w-full md:w-auto mx-auto md:mx-0">
      <div
        onClick={() => router.back()}
        className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 rounded-2xl"
      >
        <IconArrowBackUp stroke={1.5} /> Return
      </div>
    </div>
  );
};
