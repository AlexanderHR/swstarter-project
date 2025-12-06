import { cn } from "@/util";
import React from "react";

export const Divider: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return <hr className={cn(`border-t border-pinkish-grey`, className)} />;
};
