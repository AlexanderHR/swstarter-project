// atoms/StatusMessage.tsx
import React from "react";

interface StatusMessageProps {
  children: React.ReactNode;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ children }) => {
  return (
    <div
      className="flex items-center justify-center h-full"
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
};
