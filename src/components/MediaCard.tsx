"use client";

import Image from "next/image";
import { IconEyeOff, IconFileArrowRight } from "@tabler/icons-react";
import { Media } from "@next-orders/api-sdk";
import { MenuAction } from "@/types";

type MediaCardProps = {
  media: Media;
};

export const MediaCard = ({ media }: MediaCardProps) => {
  const actionsInMenu: MenuAction[] = [
    {
      id: "1",
      label: "Open",
      url: `/product/123`,
      icon: <IconFileArrowRight stroke={1.5} className="text-zinc-500" />,
    },
    {
      id: "2",
      label: "Enable / Disable",
      icon: <IconEyeOff stroke={1.5} className="text-zinc-500" />,
    },
  ];

  return (
    <div
      onClick={() => navigator.clipboard.writeText(media.id)}
      className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 active:scale-90 duration-200 group"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={media.url ?? ""}
          alt={media.alt ?? ""}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          objectPosition="center"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      <div className="mt-2 text-base font-medium leading-tight text-center">
        {media.alt}
      </div>
    </div>
  );
};

export const MediaCardSkeleton = () => {
  return (
    <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-zinc-200" />
      <div className="mt-2 text-base font-medium leading-tight text-center text-zinc-400">
        Loading
      </div>
    </div>
  );
};
