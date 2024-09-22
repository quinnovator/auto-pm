"use server";

import { authActionClient } from "@/actions/safe-action";
import { getFeature, getFeatures } from "@v1/supabase/queries";
import { z } from "zod";

const getFeatureSchema = z.object({
  featureId: z.string().uuid(),
});

const getFeaturesSchema = z.object({
  applicationId: z.string().uuid(),
});

export const getFeatureAction = authActionClient
  .schema(getFeatureSchema)
  .metadata({
    name: "get-feature",
  })
  .action(async ({ parsedInput: { featureId } }) => {
    const result = await getFeature(featureId);
    return result;
  });

export const getFeaturesAction = authActionClient
  .schema(getFeaturesSchema)
  .metadata({
    name: "get-features",
  })
  .action(async ({ parsedInput: { applicationId } }) => {
    const result = await getFeatures(applicationId);
    return result;
  });
