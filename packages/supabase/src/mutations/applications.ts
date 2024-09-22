import { createClient } from "../clients/server";
import { TablesInsert, TablesUpdate } from "../types";
import { logger } from "@v1/logger";

export async function createApplication(userId: string, application: Omit<TablesInsert<"applications">, "user_id">) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("applications")
    .insert({
      ...application,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }

  return data;
}

export async function updateApplication(application: TablesUpdate<"applications">) {
  const supabase = createClient();

  if (!application.id) {
    throw new Error("Application ID is required");
  }

  try {
    const { data, error } = await supabase
      .from("applications")
      .update(application)
      .eq("id", application.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error updating application:", error);
    throw new Error("Failed to update application");
  }
}