import { TraitsBlock } from "@/components/TraitsBlock";

export const ClientAvatarBlockSkeleton = () => {
  return (
    <div className="mb-4 mx-auto max-w-xs group">
      <div className="relative w-full bg-zinc-50 rounded-2xl h-auto px-3 py-3 animate-pulse">
        <div className="w-full aspect-square rounded-xl bg-zinc-200" />
        <div className="mt-3 text-lg font-medium leading-tight text-center text-zinc-400">
          Loading
        </div>
      </div>

      <div className="mt-4 animate-pulse">
        <TraitsBlock traits={[]} />
      </div>
    </div>
  );
};
