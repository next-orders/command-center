import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";

export default function Page() {
  return (
    <div className="w-full h-screen mx-auto flex flex-row justify-center items-center">
      <div>
        <Image
          src="/command-center/static/eggs.png"
          alt=""
          unoptimized
          width={64}
          height={64}
          className="mx-auto mb-2"
        />

        <h1 className="mb-10 text-2xl text-center">
          We&apos;ve been waiting for you!
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}
