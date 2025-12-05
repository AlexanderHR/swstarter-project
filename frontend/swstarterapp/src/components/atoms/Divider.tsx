import React from "react";

export const Divider: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return <hr className={`border-t border-pinkish-grey ${className}`} />;
};
