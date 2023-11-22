import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
};

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full px-4 py-3 flex flex-row gap-2 justify-center font-normal bg-zinc-100 rounded-2xl cursor-pointer hover:bg-zinc-200 hover:scale-95 active:scale-90 duration-200"
    >
      {children}
    </button>
  );
};
