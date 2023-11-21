import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
import { GetDemoSignInData, GetLocale } from "@/client/api";
import { getDictionary } from "@/dictionaries";

export default async function Page() {
  const demoData = await GetDemoSignInData();
  const locale = GetLocale();

  const { SIGNIN_PAGE_WELCOME_LABEL } = getDictionary(locale);

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
          {SIGNIN_PAGE_WELCOME_LABEL}
        </h1>

        <LoginForm demo={demoData} locale={locale} />
      </div>
    </div>
  );
}
