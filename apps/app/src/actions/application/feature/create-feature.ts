"use server";

import { authActionClient } from "@/actions/safe-action";
import { createFeature } from "@v1/supabase/mutations";
import { z } from "zod";

const createFeatureSchema = z.object({
  applicationId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  businessValue: z.string().min(1),
  userBenefit: z.string().min(1),
  state: z.enum(["REFINEMENT", "PROPOSED", "IMPLEMENTED"]),
});

export const createFeatureAction = authActionClient
  .schema(createFeatureSchema)
  .metadata({
    name: "create-feature",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await createFeature({
      application_id: input.applicationId,
      title: input.title,
      description: input.description,
      business_value: input.businessValue,
      user_benefit: input.userBenefit,
      state: input.state,
    });

    return result;
  });
