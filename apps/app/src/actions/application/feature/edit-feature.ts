"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateFeature } from "@v1/supabase/mutations";
import { z } from "zod";

const editFeatureSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  businessValue: z.string().min(1).optional(),
  userBenefit: z.string().min(1).optional(),
  state: z.enum(["REFINEMENT", "PROPOSED", "IMPLEMENTED"]).optional(),
});

export const editFeatureAction = authActionClient
  .schema(editFeatureSchema)
  .metadata({
    name: "edit-feature",
  })
  .action(async ({ parsedInput: input }) => {
    const result = await updateFeature({
      id: input.id,
      title: input.title,
      description: input.description,
      business_value: input.businessValue,
      user_benefit: input.userBenefit,
      state: input.state,
    });

    return result;
  });
