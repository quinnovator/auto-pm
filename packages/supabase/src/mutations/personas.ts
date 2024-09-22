import { logger } from "@v1/logger";
import { createClient } from "../clients/server";
import type { TablesInsert, TablesUpdate } from "../types";

export async function createUserPersona(userPersona: Omit<TablesInsert<"user_personas">, "id">) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("user_personas")
      .insert(userPersona)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating user persona:", error);
    throw new Error("Failed to create user persona");
  }
}

export async function updateUserPersona(persona: TablesUpdate<"user_personas">) {
  const supabase = createClient();

  if (!persona.id) {
    throw new Error("User persona ID is required");
  }

  try {
    const { data, error } = await supabase
      .from("user_personas")
      .update(persona)
      .eq("id", persona.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error updating user persona:", error);
    throw new Error("Failed to update user persona");
  }
}

export async function deleteUserPersona(personaId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("user_personas")
      .delete()
      .eq("id", personaId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error deleting user persona:", error);
    throw new Error("Failed to delete user persona");
  }
}
