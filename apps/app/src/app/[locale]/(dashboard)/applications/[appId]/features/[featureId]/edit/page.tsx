"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { editFeatureAction } from "@/actions/application/feature/edit-feature";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@v1/ui/select";
import { useEffect } from "react";
import { getFeatureAction } from "@/actions/application/feature/get-feature";

const featureSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  businessValue: z.string().min(1, "Business value is required"),
  userBenefit: z.string().min(1, "User benefit is required"),
  state: z.enum(["REFINEMENT", "PROPOSED", "IMPLEMENTED"]),
});

type FeatureFormValues = z.infer<typeof featureSchema>;

function EditFeatureForm({ featureId }: { featureId: string }) {
  const router = useRouter();

  const form = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      id: featureId,
      title: "",
      description: "",
      businessValue: "",
      userBenefit: "",
      state: "REFINEMENT",
    },
  });

  useEffect(() => {
    async function loadFeature() {
      const result = await getFeatureAction({ featureId });

      if (result?.data) {
        form.reset({
          id: result.data.id,
          title: result.data.title,
          description: result.data.description ?? "",
          businessValue: result.data.business_value ?? "",
          userBenefit: result.data.user_benefit ?? "",
          state: result.data.state as "REFINEMENT" | "PROPOSED" | "IMPLEMENTED",
        });
      }
    }
    
    loadFeature();
  }, [featureId, form]);

  async function onSubmit(values: FeatureFormValues) {
    const result = await editFeatureAction(values);

    if (result?.data) {
      router.push(`/applications/${result.data.application_id}`);
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
              <Select onValueChange={field.onChange} value={field.value}>
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
        <Button variant="brutalist" type="submit">Update Feature</Button>
      </form>
    </Form>
  );
}

function EditFeaturePage({ params }: { params: { featureId: string } }) {
  return (
    <div className="space-y-6">
      <Title>Edit Feature</Title>
      <EditFeatureForm featureId={params.featureId} />
    </div>
  );
}

export default EditFeaturePage;
