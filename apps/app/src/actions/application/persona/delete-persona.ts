"use server";

import { authActionClient } from "@/actions/safe-action";
import { deleteUserPersona } from "@v1/supabase/mutations";
import { z } from "zod";

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
    return result;
  });