import {
  IconBuildingStore,
  IconCheese,
  IconDashboard,
  IconPhoto,
  IconPoint,
  IconWorldWww,
} from "@tabler/icons-react";

export const TablerIcon = ({ icon }: { icon: string | null }) => {
  if (icon === "IconCheese")
    return <IconCheese stroke={1.5} className="w-6 h-6" />;
  if (icon === "IconBuildingStore")
    return <IconBuildingStore stroke={1.5} className="w-6 h-6" />;
  if (icon === "IconDashboard")
    return <IconDashboard stroke={1.5} className="w-6 h-6" />;
  if (icon === "IconPhoto")
    return <IconPhoto stroke={1.5} className="w-6 h-6" />;
  if (icon === "IconWorldWww")
    return <IconWorldWww stroke={1.5} className="w-6 h-6" />;

  return <IconPoint stroke={1.5} className="w-6 h-6" />;
};
