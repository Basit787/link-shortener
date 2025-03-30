import React, { ReactNode } from "react";
import DialogBoxProvider from "./dialog-provider/dialog-provider";
import { DialogBox } from "@/components/dialog-box";

const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <DialogBoxProvider>
      {children}
      <DialogBox />
    </DialogBoxProvider>
  );
};

export default ContextProviders;
