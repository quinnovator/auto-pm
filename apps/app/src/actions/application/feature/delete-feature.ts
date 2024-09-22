"use server";

import { authActionClient } from "@/actions/safe-action";
import { deleteFeature } from "@v1/supabase/mutations";
import { z } from "zod";

const deleteFeatureSchema = z.object({
  featureId: z.string().uuid(),
});

export const deleteFeatureAction = authActionClient
  .schema(deleteFeatureSchema)
  .metadata({
    name: "delete-feature",
  })
  .action(async ({ parsedInput: { featureId } }) => {
    const result = await deleteFeature(featureId);
    return result;
  });