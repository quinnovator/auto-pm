"use server";

import { authActionClient } from "@/actions/safe-action";
import { createUserPersona } from "@v1/supabase/mutations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createPersonaSchema = z.object({
  applicationId: z.string().uuid(),
  name: z.string().min(1),
  jobTitle: z.string().min(1),
  dayToDayDescription: z.string().min(1),
  importantFactors: z.string().min(1),
  applicationSatisfaction: z.number().int().min(1).max(10),
  painPoints: z.string().optional(),
  goals: z.string().optional(),
});

export const createPersonaAction = authActionClient
  .schema(createPersonaSchema)
  .metadata({
    name: "create-persona",
  })
  .action(async ({ parsedInput: input }) => {
    const result = await createUserPersona({
      application_id: input.applicationId,
      name: input.name,
      job_title: input.jobTitle,
      day_to_day_description: input.dayToDayDescription,
      important_factors: input.importantFactors,
      application_satisfaction: input.applicationSatisfaction,
      pain_points: input.painPoints,
      goals: input.goals,
    });

    revalidatePath(`/applications/${input.applicationId}`);

    return result;
  });
