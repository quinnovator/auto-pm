"use server";

import { authActionClient } from "@/actions/safe-action";
import { deleteUserPersona } from "@v1/supabase/mutations";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const deletePersonaSchema = z.object({
  personaId: z.string().uuid(),
});

export const deletePersonaAction = authActionClient
  .schema(deletePersonaSchema)
  .metadata({
    name: "delete-persona",
  })
  .action(async ({ parsedInput: { personaId } }) => {
    const result = await deleteUserPersona(personaId);

    revalidatePath(`/applications/${result.application_id}`);

    return result;
  });