import { createClient } from "../clients/server";

/**
 * Get all applications for a user
 * 
 * @param userId - The id of the user to get applications for
 * @returns All applications for the user with the given id
 */
export async function getApplications(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("applications")
    .select("id, title, description, icon")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications");
  }

  return data;
}

/**
 * Get a single application by id. Access protected by RLS.
 * 
 * @param id - The id of the application to get
 * @returns The application with the given id
 */
export async function getApplication(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("applications")
    .select("id, title, description, icon")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching application:", error);
    throw new Error("Failed to fetch application");
  }

  return data;
}