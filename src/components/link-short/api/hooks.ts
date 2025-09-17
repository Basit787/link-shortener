import { useMutation } from "@tanstack/react-query";
import { addLinkInDb } from "./api";
import { toast } from "sonner";
import { queryClient } from "@/providers";

export const useAddLink = () => {
  return useMutation({
    mutationKey: ["links"],
    mutationFn: addLinkInDb(),
    onSuccess: (data) => {
      toast.success("Short link created successfully", {
        description: "Copy the link",
        duration: 4000,
        action: {
          label: "OK",
          onClick: () => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/${data.key}`
            );
          },
        },
      });
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => {
      toast.error("Failed to create the short link", {
        description: "Please try again later.",
        duration: 4000,
      });
    },
  });
};
