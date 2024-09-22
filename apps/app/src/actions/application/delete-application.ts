"use server";

import { authActionClient } from "@/actions/safe-action";
import { deleteApplication } from "@v1/supabase/mutations";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const deleteApplicationSchema = z.object({
  applicationId: z.string().uuid(),
});

export const deleteApplicationAction = authActionClient
  .schema(deleteApplicationSchema)
  .metadata({
    name: "delete-application",
  })
  .action(async ({ parsedInput: { applicationId } }) => {
    const result = await deleteApplication(applicationId);

    revalidatePath("/applications");

    return result;
  });