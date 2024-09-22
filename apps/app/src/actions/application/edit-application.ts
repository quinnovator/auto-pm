"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateApplication } from "@v1/supabase/mutations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editApplicationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const editApplicationAction = authActionClient
  .schema(editApplicationSchema)
  .metadata({
    name: "edit-application",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await updateApplication({
      id: input.id,
      title: input.title,
      description: input.description,
      icon: input.icon,
    });

    revalidatePath(`/applications`); 

    return result;
  });
