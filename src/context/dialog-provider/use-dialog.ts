import { useContext } from "react";
import { DialogBoxContext } from "./dialog-provider";

const useDialogBox = () => {
  const context = useContext(DialogBoxContext);
  if (!context)
    throw new Error("useDialogBox must used within DialogBoxProvider");
  return context;
};

export default useDialogBox;
