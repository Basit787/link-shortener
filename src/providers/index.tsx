"use client";

import ContextProviders from "@/context";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ContextProviders>{children}</ContextProviders>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
