import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDialogBox from "@/context/dialog-provider/use-dialog";

export function DialogBox() {
  const {
    dialog: {
      open,
      title,
      description,
      positiveAction,
      negativeAction,
      positiveLabel,
      negativeLabel,
    },
    closeDialog,
  } = useDialogBox();
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            onClick={() => negativeAction()}
          >
            {negativeLabel}
          </Button>
          <Button
            type="submit"
            variant="outline"
            onClick={() => positiveAction()}
          >
            {positiveLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
