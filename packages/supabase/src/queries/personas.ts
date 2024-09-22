import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";

export async function getUserPersonas(applicationId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("user_personas")
      .select("*")
      .eq("application_id", applicationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching user personas:", error);
    throw new Error("Failed to fetch user personas");
  }
}

export async function getUserPersona(id: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("user_personas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching user persona:", error);
    throw new Error("Failed to fetch user persona");
  }
}
