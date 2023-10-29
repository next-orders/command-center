"use client";

import React from "react";
import { IconArrowRight, IconWand } from "@tabler/icons-react";
import { useFormState, useFormStatus } from "react-dom";
import { SignInForm } from "@/server/actions";

const initialState = {
  message: null,
};

type LoginFormProps = {
  demo: {
    email: string;
    password: string;
  };
};

export const LoginForm = ({ demo }: LoginFormProps) => {
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
            Email
          </label>
          <input
            className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
            id="email"
            type="email"
            name="email"
            placeholder="Your email address"
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
            Password
          </label>
          <input
            className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        <SubmitButton />
        <SubmitAsDemoButton
          setEmail={setEmail}
          setPassword={setPassword}
          email={demo.email}
          password={demo.password}
        />
      </div>

      <div className="mt-4 w-full text-center text-red-700">
        {state.message}
      </div>
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 rounded-2xl"
    >
      Sign In <IconArrowRight stroke={1.5} />
    </button>
  );
}

type SubmitAsDemoButtonProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  password: string;
};

function SubmitAsDemoButton({
  setEmail,
  setPassword,
  email,
  password,
}: SubmitAsDemoButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={() => {
        setEmail(email);
        setPassword(password);
      }}
      type="submit"
      aria-disabled={pending}
      className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-teal-100 hover:bg-teal-200 hover:scale-95 duration-200 rounded-2xl"
    >
      Demo Employee <IconWand stroke={1.5} />
    </button>
  );
}
