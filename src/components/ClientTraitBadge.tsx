import {
  IconCactus,
  IconGlassFull,
  IconHexagonFilled,
  IconHourglassHigh,
  IconMoodHappy,
  IconPencilQuestion,
  IconSnowflake,
  IconSortDescending,
} from "@tabler/icons-react";

type ClientTraitBadgeProps = {
  size: "sm" | "md" | "lg" | "xl";
  variant:
    | "orderly"
    | "spontaneous"
    | "cold"
    | "well-fed"
    | "satisfied"
    | "picky"
    | "cautious";
};

export const ClientTraitBadge = ({ size, variant }: ClientTraitBadgeProps) => {
  let widthAndHeight = "";
  let widthAndHeightIcon = "";
  let icon;
  let bg;

  if (size === "sm") {
    widthAndHeight = "w-8 h-8";
    widthAndHeightIcon = "w-5 h-5";
  }
  if (size === "md") {
    widthAndHeight = "w-12 h-12";
    widthAndHeightIcon = "w-8 h-8";
  }
  if (size === "lg") {
    widthAndHeight = "w-16 h-16";
    widthAndHeightIcon = "w-12 h-12";
  }
  if (size === "xl") {
    widthAndHeight = "w-20 h-20";
    widthAndHeightIcon = "w-16 h-16";
  }

  if (variant === "orderly") {
    bg = "text-lime-400";
    icon = (
      <IconSortDescending
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "spontaneous") {
    bg = "text-orange-400";
    icon = (
      <IconHourglassHigh
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "cold") {
    bg = "text-sky-400";
    icon = (
      <IconSnowflake
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "well-fed") {
    bg = "text-emerald-400";
    icon = (
      <IconGlassFull
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "satisfied") {
    bg = "text-green-400";
    icon = (
      <IconMoodHappy
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "picky") {
    bg = "text-rose-400";
    icon = (
      <IconCactus
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }
  if (variant === "cautious") {
    bg = "text-blue-400";
    icon = (
      <IconPencilQuestion
        className={`absolute bottom-2 left-1 text-white ${widthAndHeightIcon}`}
      />
    );
  }

  return (
    <div className={`relative cursor-default ${widthAndHeight}`}>
      <IconHexagonFilled
        className={`absolute bottom-0 left-0 drop-shadow-md ${bg} ${widthAndHeight}`}
      />
      {icon}
    </div>
  );
};
