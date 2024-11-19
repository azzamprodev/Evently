"use server";
import { createClient } from "@/utils/supabase/server";

export async function createUsername(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "user not authenticated" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username: formData.username,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "username created successfully" };
}
