"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDialogBox from "@/context/dialog-provider/use-dialog";
import { queryClient } from "@/providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteLink, getAllLinks } from "../actions/link";

const MyLinks = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  const { showDialog, closeDialog } = useDialogBox();

  const { mutate } = useMutation({
    mutationKey: ["links"],
    mutationFn: async (id: string) => {
      return await deleteLink(id);
    },
    onSuccess: () => {
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast("Link deleted successfully");
    },
    onError: () => {
      toast("Failed to delete the link");
    },
  });

  const handleDelete = (id: string) => {
    return showDialog({
      title: "Confirm link delete",
      description: "Are you sure to delete the link, this step is undone",
      positiveAction: () => mutate(id),
      negativeAction: () => closeDialog(),
      positiveLabel: "Delete",
      negativeLabel: "Cancel",
    });
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!!!data?.length)
    return (
      <div className="text-center text-xl font-semibold">No Link added</div>
    );
  return (
    <section>
      <h1>My Links</h1>
      <Table>
        <TableCaption>A list of your recent Links.</TableCaption>
        <TableHeader className="bg-foreground/30">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Original URl</TableHead>
            <TableHead>Key</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell className="w-[5rem]">{data.link}</TableCell>
              <TableCell>{data.key}</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex md:flex-row flex-col gap-2">
                  <Button
                    variant="outline"
                    className="bg-transparent shadow-none border-none"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${data.key}`
                      );
                      toast("Key coppied sucessfully");
                    }}
                  >
                    <Copy />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent shadow-none border-none"
                    onClick={() => handleDelete(data.id)}
                  >
                    <Trash2 color="red" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default MyLinks;
