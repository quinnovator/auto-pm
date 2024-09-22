"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateUserPersona } from "@v1/supabase/mutations";
import { z } from "zod";

const editPersonaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  jobTitle: z.string().min(1).optional(),
  dayToDayDescription: z.string().min(1).optional(),
  importantFactors: z.string().min(1).optional(),
  applicationSatisfaction: z.number().int().min(1).max(10).optional(),
  painPoints: z.string().optional(),
  goals: z.string().optional(),
});

export const editPersonaAction = authActionClient
  .schema(editPersonaSchema)
  .metadata({
    name: "edit-persona",
  })
  .action(async ({ parsedInput: input }) => {
    const result = await updateUserPersona({
      id: input.id,
      name: input.name,
      job_title: input.jobTitle,
      day_to_day_description: input.dayToDayDescription,
      important_factors: input.importantFactors,
      application_satisfaction: input.applicationSatisfaction,
      pain_points: input.painPoints,
      goals: input.goals,
    });

    return result;
  });
