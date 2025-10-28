import type { ReactNode } from "react";

interface InputProps {
  hasIcon?: boolean;
  icon?: ReactNode;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  maxLength?: number;
  minLength?: number;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

export default function Input({
  hasIcon = false,
  icon,
  type,
  id,
  name,
  placeholder,
  required,
  value,
  onChange,
  children,
  maxLength,
  minLength,
  minValue,
  maxValue,
  className
}: InputProps) {
  return (
    <div className="relative w-full">
      {hasIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-input px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-lg ${hasIcon ? "pl-10" : ""} ${className}`}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        min={minValue}
        max={maxValue}
      />
      {children}
    </div>
  );
}