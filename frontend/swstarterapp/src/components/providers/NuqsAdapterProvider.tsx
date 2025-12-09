"use client";

import { NuqsAdapter } from "nuqs/adapters/next";
import { ReactNode, Suspense } from "react";

export function NuqsAdapterProvider({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <Suspense>{children}</Suspense>
    </NuqsAdapter>
  );
}
