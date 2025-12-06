import { cn } from "@/util";
import React from "react";

interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const Paragraph: React.FC<LabelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <p
      className={cn(
        `text-sm font-bold text-pinkish-grey font-montserrat`,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
