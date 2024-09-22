"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { createPersonaAction } from "@/actions/application/persona/create-persona";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const personaSchema = z.object({
  applicationId: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  dayToDayDescription: z.string().min(1, "Day-to-day description is required"),
  importantFactors: z.string().min(1, "Important factors are required"),
  applicationSatisfaction: z.number().int().min(1).max(10),
  painPoints: z.string().optional(),
  goals: z.string().optional(),
});

function NewPersonaForm({ applicationId }: { applicationId: string }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      applicationId,
      name: "",
      jobTitle: "",
      dayToDayDescription: "",
      importantFactors: "",
      applicationSatisfaction: 5,
      painPoints: "",
      goals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof personaSchema>) {
    const result = await createPersonaAction(values);

    if (result?.data) {
      router.push(`/applications/${applicationId}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter persona name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dayToDayDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day-to-Day Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe day-to-day activities" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="importantFactors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Important Factors</FormLabel>
              <FormControl>
                <Textarea placeholder="List important factors" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applicationSatisfaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Satisfaction (1-10)</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="painPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pain Points (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe pain points" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goals (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe goals" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create User Persona</Button>
      </form>
    </Form>
  );
}

function NewPersonaPage({ params }: { params: { appId: string } }) {
  return (
    <div className="space-y-6">
      <Title>Create New User Persona</Title>
      <NewPersonaForm applicationId={params.appId} />
    </div>
  );
}

export default NewPersonaPage;
