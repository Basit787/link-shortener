"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { addLink } from "@/app/actions/link";
import { queryClient } from "@/providers";
import { toast } from "sonner";

const FormSchema = z.object({
  url: z.string().url({ message: "Url must be in proper format" }),
});

export default function LinkShortenerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
    mode: "onChange",
  });

  const { mutate, data, reset } = useMutation({
    mutationKey: ["links"],
    mutationFn: async (link: string) => {
      const result = await addLink(link);
      return result;
    },
    onSuccess: () => {
      toast("Short link created successfully");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => {
      form.setError("url", {
        message: "Error while creating short link",
      });
      toast("Failed to create the short link");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data.url);
  }

  return (
    <section className="flex justify-center items-center">
      <div className="space-y-4 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:flex gap-2"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your URL here"
                      {...field}
                      disabled={!!data}
                      className="md:w-[50rem] w-[20rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!!data}>
              Submit
            </Button>
          </form>
        </Form>
        {!!data && (
          <div>
            <div className="space-y-2 md:flex gap-2">
              <Input
                placeholder="Enter your URL here"
                value={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.key}`}
                readOnly
                className="md:w-[50rem] w-[20rem]"
              />
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/${data.key}`
                  )
                }
              >
                Copy
              </Button>
            </div>
            <p
              onClick={() => {
                form.reset();
                reset();
              }}
              className="text-foreground/50 cursor-pointer"
            >
              Create New Short Link
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
