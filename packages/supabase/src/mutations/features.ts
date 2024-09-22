import { logger } from "@v1/logger";
import { createClient } from "../clients/server";
import type { TablesInsert, TablesUpdate } from "../types";

export async function createFeature(feature: Omit<TablesInsert<"features">, "id">) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("features")
      .insert(feature)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating feature:", error);
    throw new Error("Failed to create feature");
  }
}

export async function updateFeature(feature: TablesUpdate<"features">) {
  const supabase = createClient();

  if (!feature.id) {
    throw new Error("Feature ID is required");
  }

  try {
    const { data, error } = await supabase
      .from("features")
      .update(feature)
      .eq("id", feature.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error updating feature:", error);
    throw new Error("Failed to update feature");
  }
}

export async function deleteFeature(featureId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("features")
      .delete()
      .eq("id", featureId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error deleting feature:", error);
    throw new Error("Failed to delete feature");
  }
}
