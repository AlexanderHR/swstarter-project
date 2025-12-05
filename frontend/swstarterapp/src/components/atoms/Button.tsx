import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "disabled";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full h-button-height rounded-button font-bold text-sm transition-colors duration-200 flex items-center justify-center uppercase font-montserrat";

  const variants = {
    primary: "bg-green-teal text-white hover:bg-opacity-90", // Assuming green-teal for primary based on logo
    disabled:
      "bg-pinkish-grey text-white cursor-not-allowed border border-pinkish-grey",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={variant === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
};
