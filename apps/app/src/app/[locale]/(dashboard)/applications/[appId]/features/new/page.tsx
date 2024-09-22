"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { createFeatureAction } from "@/actions/application/feature/create-feature";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@v1/ui/select";

const featureSchema = z.object({
  applicationId: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  businessValue: z.string().min(1, "Business value is required"),
  userBenefit: z.string().min(1, "User benefit is required"),
  state: z.enum(["REFINEMENT", "PROPOSED", "IMPLEMENTED"]),
});

type FeatureFormValues = z.infer<typeof featureSchema>;

function NewFeatureForm({ applicationId }: { applicationId: string }) {
  const router = useRouter();

  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      applicationId,
      title: "",
      description: "",
      businessValue: "",
      userBenefit: "",
      state: "REFINEMENT",
    },
  });

  async function onSubmit(values: FeatureFormValues) {
    const result = await createFeatureAction(values);

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
                <Input placeholder="Enter feature title" {...field} />
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
                <Textarea placeholder="Enter feature description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Value</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter business value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userBenefit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Benefit</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter user benefit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feature state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="REFINEMENT">Refinement</SelectItem>
                  <SelectItem value="PROPOSED">Proposed</SelectItem>
                  <SelectItem value="IMPLEMENTED">Implemented</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="brutalist" type="submit">Create Feature</Button>
      </form>
    </Form>
  );
}

function NewFeaturePage({ params }: { params: { appId: string } }) {
  return (
    <div className="space-y-6">
      <Title>Create New Feature</Title>
      <NewFeatureForm applicationId={params.appId} />
    </div>
  );
}

export default NewFeaturePage;
