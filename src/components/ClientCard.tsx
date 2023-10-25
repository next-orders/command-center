import Image from "next/image";
import { LevelBadge } from "@/components/LevelBadge";
import Link from "next/link";

type ClientCardProps = {
  client: {
    id: string;
    firstName: string;
    lastName?: string;
    avatar: string;
    level: number;
  };
};

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <Link href={`/client/${client.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 duration-200 group">
        <div className="relative">
          <Image
            src={client.avatar}
            alt="Client"
            unoptimized
            width={300}
            height={300}
            className="w-full aspect-square rounded-xl"
          />
          <div className="absolute top-1 right-1 group-hover:scale-110 duration-200">
            <LevelBadge level={client.level} size="md" />
          </div>
        </div>

        <div className="mt-2 text-base font-medium leading-tight text-center">
          {client.firstName}
        </div>
      </div>
    </Link>
  );
};
