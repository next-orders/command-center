"use client";

import { Locale } from "@/dictionaries";
import { SetLocale } from "@/server/actions";

export const LanguageBlock = ({ locale }: { locale: Locale }) => {
  return (
    <div className="mb-4">
      <select
        defaultValue={locale}
        onChange={(event) => SetLocale(event.currentTarget.value as Locale)}
        className="px-4 py-3 text-base bg-zinc-100 rounded-2xl outline-2 outline-offset-1 outline-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 cursor-pointer hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200"
      >
        <option value="EN">🇺🇸 English</option>
        <option value="RU">🇷🇺 Русский</option>
      </select>
    </div>
  );
};
