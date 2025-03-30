"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const SignedInComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
};

export default SignedInComponent;
