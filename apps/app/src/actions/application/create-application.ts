"use server";

import { authActionClient } from "@/actions/safe-action";
import { createApplication } from "@v1/supabase/mutations";
import { createApplicationSchema } from "./schema";

export const createApplicationAction = authActionClient
  .schema(createApplicationSchema)
  .metadata({
    name: "create-application",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await createApplication(user.id, input);

    return result;
  });
