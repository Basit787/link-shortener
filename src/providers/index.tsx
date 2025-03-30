"use client";

import { ThemeProvider } from "@/components/theme-provider";
import ContextProviders from "@/context";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <ContextProviders>{children}</ContextProviders>
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default Providers;
