"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { createApplicationAction } from "@/actions/application/create-application";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const applicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().url().optional().or(z.literal("")),
});

function NewApplicationForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    const app = await createApplicationAction(values);

    if (app?.data) {
      router.push(`/applications/${app.data.id}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter application title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter application description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter icon URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="brutalist" type="submit">Create Application</Button>
      </form>
    </Form>
  );
}

function NewApplicationPage() {
  return (
    <div className="space-y-6">
      <Title>Create New Application</Title>
      <NewApplicationForm />
    </div>
  );
}

export default NewApplicationPage;