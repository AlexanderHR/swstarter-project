import { cn } from "@/util";
import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        `w-full h-10 px-4 rounded bg-white border border-pinkish-grey shadow-inner text-sm font-bold font-montserrat text-dark-grey placeholder:text-pinkish-grey focus:outline-none focus:border-dark-grey`,
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
