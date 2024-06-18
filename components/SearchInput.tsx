"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";

const formSchema = z.object({
  input: z.string().min(2).max(50),
});

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef<number | undefined>();

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}

function SearchInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      console.log(values);
      router.push(`/search/${values.input}`);
    },
    [router]
  );

  const debouncedSubmit = useDebounce((values: z.infer<typeof formSchema>) => {
    form.handleSubmit(onSubmit)();
  }, 300);

  useEffect(() => {
    const subscription = form.watch((value) => {
      debouncedSubmit(value);
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSubmit]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchInput;
