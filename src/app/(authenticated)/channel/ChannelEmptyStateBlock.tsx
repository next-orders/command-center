"use client";

import Image from "next/image";
import { IconTextPlus } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";

export const ChannelEmptyStateBlock = () => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);

  return (
    <div className="mt-10 text-center max-w-xl mx-auto">
      <Image
        src="/static/green-notebook.png"
        alt=""
        unoptimized
        width={64}
        height={64}
        className="mx-auto mb-6"
      />
      <h2 className="mb-1 text-lg font-semibold">You have no Channels</h2>
      <p>Maybe it&apos;s time to create one?</p>

      <div className="mt-4 mx-auto w-fit">
        <Button onClick={toggle}>
          <IconTextPlus stroke={1.5} /> Create Channel
        </Button>
      </div>
    </div>
  );
};
