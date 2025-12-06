import { cn } from "@/util";
import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      className={cn(
        `w-full h-10 px-4 rounded bg-white border border-pinkish-grey shadow-inner text-sm font-bold font-montserrat text-dark-grey placeholder:text-pinkish-grey focus:outline-none focus:border-dark-grey`,
        className
      )}
      {...props}
    />
  );
};
