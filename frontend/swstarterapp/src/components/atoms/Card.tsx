import { cn } from "@/util";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={cn(
        `bg-white rounded border border-[#dadada] shadow-[0_1px_2px_0_rgba(132,132,132,0.75)]`,
        className
      )}
    >
      {children}
    </div>
  );
};
