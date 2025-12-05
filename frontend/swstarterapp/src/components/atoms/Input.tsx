import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full h-[40px] px-4 rounded bg-white border border-pinkish-grey shadow-inner text-sm font-bold font-montserrat placeholder:text-pinkish-grey focus:outline-none focus:border-emerald ${className}`}
      {...props}
    />
  );
};
