"use client";

import { addLink } from "@/app/actions/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    <section className="flex justify-center items-center p-4">
      <div className="space-y-4 w-full max-w-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-0 flex flex-col md:flex-row md:items-center gap-2"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter your URL here"
                      {...field}
                      disabled={!!data}
                      className="w-full md:max-w-[50rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!!data}
              className="w-full md:w-auto"
            >
              Submit
            </Button>
          </form>
        </Form>

        {!!data && (
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <Input
                placeholder="Shortened URL"
                value={data.key}
                readOnly
                className="w-full md:max-w-[50rem]"
              />
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${data.key}`
                  )
                }
                className="w-full md:w-auto"
              >
                Copy
              </Button>
            </div>
            <p
              onClick={() => {
                form.reset();
                reset();
              }}
              className="text-foreground/50 cursor-pointer text-center"
            >
              Create New Short Link
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
