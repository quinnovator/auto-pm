"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { editApplicationAction } from "@/actions/application/edit-application";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { getApplicationAction } from "@/actions/application/get-application";

const applicationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

function EditApplicationForm({ applicationId }: { applicationId: string }) {
  const router = useRouter();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      id: applicationId,
      title: "",
      description: "",
      icon: "",
    },
  });

  useEffect(() => {
    async function loadApplication() {
      const result = await getApplicationAction({ appId: applicationId });
      if (result?.data) {
        form.reset({
          id: result.data.id,
          title: result.data.title,
          description: result.data.description ?? undefined,
          icon: result.data.icon ?? undefined,
        });
      }
    }
    
    loadApplication();
  }, [applicationId, form]);

  async function onSubmit(values: ApplicationFormValues) {
    const result = await editApplicationAction(values);

    if (result?.data) {
      router.push(`/applications/${applicationId}`);
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
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input placeholder="Enter icon URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="brutalist" type="submit">Update Application</Button>
      </form>
    </Form>
  );
}

function EditApplicationPage({ params }: { params: { appId: string } }) {
  return (
    <div className="space-y-6">
      <Title>Edit Application</Title>
      <EditApplicationForm applicationId={params.appId} />
    </div>
  );
}

export default EditApplicationPage;
