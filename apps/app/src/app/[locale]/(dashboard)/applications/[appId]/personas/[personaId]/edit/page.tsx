"use client";

import { Title } from "@/components/title";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { Button } from "@v1/ui/button";
import { editPersonaAction } from "@/actions/application/persona/edit-persona";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { getPersonaAction } from "@/actions/application/persona/get-persona";

const personaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  dayToDayDescription: z.string().min(1, "Day-to-day description is required"),
  importantFactors: z.string().min(1, "Important factors are required"),
  applicationSatisfaction: z.number().int().min(1).max(10),
  painPoints: z.string().optional(),
  goals: z.string().optional(),
});

type PersonaFormValues = z.infer<typeof personaSchema>;

function EditPersonaForm({ personaId }: { personaId: string }) {
  const router = useRouter();

  const form = useForm<PersonaFormValues>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      id: personaId,
      name: "",
      jobTitle: "",
      dayToDayDescription: "",
      importantFactors: "",
      applicationSatisfaction: 5,
      painPoints: "",
      goals: "",
    },
  });

  useEffect(() => {
    async function loadPersona() {
      const result = await getPersonaAction({ personaId });

      if (result?.data) {
        form.reset({
          ...result.data,
          jobTitle: result.data.job_title,
          dayToDayDescription: result.data.day_to_day_description,
          importantFactors: result.data.important_factors,
          applicationSatisfaction: result.data.application_satisfaction,
          painPoints: result.data.pain_points ?? undefined,
          goals: result.data.goals ?? undefined,
        });
      }
    }
    
    loadPersona();
  }, [personaId, form]);

  async function onSubmit(values: PersonaFormValues) {
    const result = await editPersonaAction(values);

    if (result?.data) {
      router.push(`/applications/${result.data.application_id}`);
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
                <Input type="number" min={1} max={10} {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
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
              <FormLabel>Pain Points</FormLabel>
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
              <FormLabel>Goals</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe goals" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="brutalist" type="submit">Update Persona</Button>
      </form>
    </Form>
  );
}

function EditPersonaPage({ params }: { params: { personaId: string } }) {
  return (
    <div className="space-y-6">
      <Title>Edit Persona</Title>
      <EditPersonaForm personaId={params.personaId} />
    </div>
  );
}

export default EditPersonaPage;
