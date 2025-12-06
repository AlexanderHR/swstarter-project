import { cn } from "@/util";
import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  checked,
  className = "",
  ...props
}) => {
  return (
    <label className={`flex items-center cursor-pointer gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-4 h-4">
        <input
          type="radio"
          className={cn(
            "peer appearance-none w-4 h-4 rounded-full border border-pinkish-grey checked:border-emerald checked:bg-emerald transition-colors",
            className
          )}
          checked={checked}
          {...props}
        />
        {checked && (
          <div className="absolute w-1 h-1 bg-white rounded-full pointer-events-none" />
        )}
      </div>
      <span className="text-sm font-bold font-montserrat text-black">
        {label}
      </span>
    </label>
  );
};
