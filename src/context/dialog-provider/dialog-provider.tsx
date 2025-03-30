import React, { createContext, ReactNode, useState } from "react";

interface DialogState {
  open?: boolean;
  title: string;
  description: string;
  positiveAction: () => void;
  negativeAction: () => void;
  positiveLabel?: string;
  negativeLabel?: string;
}

interface DialogContextType {
  dialog: DialogState;
  showDialog: (config: DialogState) => void;
  closeDialog: () => void;
}

export const DialogBoxContext = createContext<DialogContextType | undefined>(
  undefined
);
const DialogBoxProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
    description: "",
    positiveAction: () => {},
    negativeAction: () => {},
  });

  const showDialog = (config: DialogState) => {
    setDialog({ open: true, ...config });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, open: false }));
  };
  return (
    <DialogBoxContext.Provider value={{ dialog, showDialog, closeDialog }}>
      {children}
    </DialogBoxContext.Provider>
  );
};

export default DialogBoxProvider;
