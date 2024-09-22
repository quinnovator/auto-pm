"use server";

import { getApplicationSchema } from "@/actions/application/schema";
import { authActionClient } from "@/actions/safe-action";
import { getApplication } from "@v1/supabase/queries";

export const getApplicationAction = authActionClient
  .schema(getApplicationSchema)
  .metadata({
    name: "get-application",
  })
  .action(async ({ parsedInput: { appId }, ctx: { user } }) => {
    const result = await getApplication(appId);

    return result;
  });