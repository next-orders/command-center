import Image from "next/image";
import { ErrorBase } from "@next-orders/api-sdk";

type ErrorBlockProps = {
  error: ErrorBase;
};

export const ErrorBlock = ({ error }: ErrorBlockProps) => {
  return (
    <div className="my-12 text-center">
      <Image
        src="/command-center/static/hot-drink.png"
        alt=""
        width={128}
        height={128}
        className="mx-auto mb-2"
      />

      <h1 className="mt-8 mb-2 text-3xl font-bold text-rose-400">Ooops!</h1>
      <p className="font-medium text-zinc-500">{error.message}</p>
    </div>
  );
};
