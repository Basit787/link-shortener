"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAddLink } from "./api/hooks";

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

  const { mutate, data, reset, isPending: loading } = useAddLink();

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
                <FormItem className="w-full relative">
                  <FormControl>
                    <Input
                      placeholder="Enter your URL here"
                      {...field}
                      disabled={!!data}
                      className="w-full md:max-w-[50rem]"
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-10" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!!data || loading}
              className="w-full md:w-auto"
            >
              {loading && <LoaderPinwheel className="animate-spin h-5 w-5" />}
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
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${data.key}`
                  );
                  toast("Key copied");
                }}
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
