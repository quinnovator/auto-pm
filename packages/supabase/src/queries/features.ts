import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";

export async function getFeatures(applicationId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .eq("application_id", applicationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching features:", error);
    throw new Error("Failed to fetch features");
  }
}

export async function getFeature(id: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching feature:", error);
    throw new Error("Failed to fetch feature");
  }
}
