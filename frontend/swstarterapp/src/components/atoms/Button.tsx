import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full h-button-height rounded-button font-bold text-sm transition-colors duration-200 flex items-center justify-center uppercase font-montserrat",
  {
    variants: {
      variant: {
        default: "bg-green-teal text-white hover:bg-opacity-90",
        disabled:
          "bg-pinkish-grey text-white cursor-not-allowed border border-pinkish-grey",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className = "",
  ...props
}) => {
  const isDisabled = variant === "disabled";

  return (
    <button
      className={buttonVariants({ variant, className })}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      role="button"
      {...props}
    >
      {children}
    </button>
  );
};
