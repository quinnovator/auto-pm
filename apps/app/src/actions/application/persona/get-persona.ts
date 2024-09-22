"use server";

import { authActionClient } from "@/actions/safe-action";
import { getUserPersona, getUserPersonas } from "@v1/supabase/queries";
import { z } from "zod";

const getPersonaSchema = z.object({
  personaId: z.string().uuid(),
});

const getPersonasSchema = z.object({
  applicationId: z.string().uuid(),
});

export const getPersonaAction = authActionClient
  .schema(getPersonaSchema)
  .metadata({
    name: "get-persona",
  })
  .action(async ({ parsedInput: { personaId } }) => {
    const result = await getUserPersona(personaId);
    return result;
  });

export const getPersonasAction = authActionClient
  .schema(getPersonasSchema)
  .metadata({
    name: "get-personas",
  })
  .action(async ({ parsedInput: { applicationId } }) => {
    const result = await getUserPersonas(applicationId);
    return result;
  });
