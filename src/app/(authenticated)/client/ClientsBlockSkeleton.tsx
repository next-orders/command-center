import { ClientCardSkeleton } from "@/components/ClientCard";

export const ClientsBlockSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
      <ClientCardSkeleton />
      <ClientCardSkeleton />
      <ClientCardSkeleton />
      <ClientCardSkeleton />
      <ClientCardSkeleton />
      <ClientCardSkeleton />
      <ClientCardSkeleton />
    </div>
  );
};
