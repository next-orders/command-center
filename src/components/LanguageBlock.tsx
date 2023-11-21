"use client";

import { Locale } from "@/dictionaries";
import { SetLocale } from "@/server/actions";

export const LanguageBlock = ({ locale }: { locale: Locale }) => {
  return (
    <div className="mb-4">
      <select
        defaultValue={locale}
        onChange={(event) => SetLocale(event.currentTarget.value as Locale)}
      >
        <option value="EN">🇺🇸 English</option>
        <option value="RU">🇷🇺 Русский</option>
      </select>
    </div>
  );
};
