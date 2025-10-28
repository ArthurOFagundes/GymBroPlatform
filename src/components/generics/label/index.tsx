import type { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  children?: ReactNode;
  text: string;
}

export default function Label({ htmlFor, children, text }: LabelProps) {
  return (
    <label
      className="text-sm md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
      htmlFor={htmlFor}
    >
      {children}
      {text}
    </label>
  )
}
