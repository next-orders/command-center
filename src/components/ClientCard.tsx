import Image from "next/image";
import Link from "next/link";
import { LevelBadge } from "@/components/LevelBadge";

type ClientCardProps = {
  client: {
    id: string;
    firstName: string;
    lastName?: string;
    avatarId: string;
    level: number;
    gender: string;
    emotion: number;
    loyalty: number;
    traits: {
      id: string;
      type: string;
    }[];
  };
};

export const ClientCard = ({ client }: ClientCardProps) => {
  const clientAvatar = `https://v1.next-orders.org/api/avatar/${client.avatarId}?gender=${client.gender}&emotion=${client.emotion}&size=140`;

  return (
    <Link href={`/client/${client.id}`}>
      <div className="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 duration-200 group">
        <div className="relative">
          <Image
            src={clientAvatar}
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
