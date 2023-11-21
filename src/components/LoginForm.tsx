"use client";

import React from "react";
import { IconArrowRight, IconWand } from "@tabler/icons-react";
import { useFormState, useFormStatus } from "react-dom";
import { SignInForm } from "@/server/actions";
import { getDictionary, Locale } from "@/dictionaries";

const initialState = {
  message: "",
};

type LoginFormProps = {
  locale: Locale;
  demo: {
    email: string;
    password: string;
  } | null;
};

export const LoginForm = ({ locale, demo }: LoginFormProps) => {
  const {
    EMAIL_LABEL,
    EMAIL_PLACEHOLDER,
    PASSWORD_LABEL,
    PASSWORD_PLACEHOLDER,
  } = getDictionary(locale);

  const [state, formAction] = useFormState(SignInForm, initialState);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form action={formAction} className="max-w-sm">
      <div className="w-full mb-6">
        <div>
          <label
            className="mb-1 mt-5 block text-sm font-medium text-zinc-900"
            htmlFor="email"
          >
            {EMAIL_LABEL}
          </label>
          <input
            className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
            id="email"
            type="email"
            name="email"
            placeholder={EMAIL_PLACEHOLDER}
            required
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className="mt-4">
          <label
            className="mb-1 mt-5 block text-sm font-medium text-zinc-900"
            htmlFor="password"
          >
            {PASSWORD_LABEL}
          </label>
          <input
            className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
            id="password"
            type="password"
            name="password"
            placeholder={PASSWORD_PLACEHOLDER}
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        <SubmitButton locale={locale} />
        <SubmitAsDemoButton
          locale={locale}
          setEmail={setEmail}
          setPassword={setPassword}
          demo={demo}
        />
      </div>

      <div className="mt-4 w-full text-center text-red-700">
        {state.message}
      </div>
    </form>
  );
};

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  const { SIGN_IN_BUTTON } = getDictionary(locale);

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 rounded-2xl"
    >
      {SIGN_IN_BUTTON} <IconArrowRight stroke={1.5} />
    </button>
  );
}

type SubmitAsDemoButtonProps = {
  locale: Locale;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  demo: {
    email: string;
    password: string;
  } | null;
};

function SubmitAsDemoButton({
  locale,
  setEmail,
  setPassword,
  demo,
}: SubmitAsDemoButtonProps) {
  const { pending } = useFormStatus();
  const { DEMO_EMPLOYEE_BUTTON } = getDictionary(locale);

  if (!demo || !demo.email) {
    return null;
  }

  return (
    <button
      onClick={() => {
        setEmail(demo.email);
        setPassword(demo.password);
      }}
      type="submit"
      aria-disabled={pending}
      className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-teal-100 hover:bg-teal-200 hover:scale-95 duration-200 rounded-2xl"
    >
      {DEMO_EMPLOYEE_BUTTON} <IconWand stroke={1.5} />
    </button>
  );
}
