"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { deleteLink, getAllLinks } from "../actions/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";

const MyLinks = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  const { mutate } = useMutation({
    mutationKey: ["links"],
    mutationFn: async (id: string) => {
      const result = await deleteLink(id);
      console.log("djfgjkdfgdkj", result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast("Link deleted successfully");
    },
    onError: (err) => {
      console.log(err);
      toast("Failed to delete the link");
    },
  });

  console.log(data);

  if (isPending) return "Loading...";

  if (!!!data?.length)
    return (
      <div className="text-center text-xl font-semibold">No Link added</div>
    );

  if (error) return "An error has occurred: " + error.message;
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
          {data.map((data, index) => (
            <TableRow
              key={data.id}
              className={`${
                index % 2 == 0 ? "bg-foreground/1" : "bg-foreground/5"
              }`}
            >
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/${data.key}`
                      );
                      toast("Key coppied sucessfully");
                    }}
                  >
                    <Copy />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent shadow-none border-none"
                    onClick={() => mutate(data.id)}
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
