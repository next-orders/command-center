import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
import { GetDemoSignInData } from "@/client/api";

export default async function Page() {
  const demoData = await GetDemoSignInData();

  return (
    <div className="w-full h-screen mx-auto flex flex-row justify-center items-center">
      <div>
        <Image
          src="/static/eggs.png"
          alt=""
          unoptimized
          width={64}
          height={64}
          className="mx-auto mb-2"
        />

        <h1 className="mb-10 text-2xl text-center">
          We&apos;ve been waiting for you!
        </h1>

        <LoginForm demo={demoData} />
      </div>
    </div>
  );
}
