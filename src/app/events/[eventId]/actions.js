"use server";
import { createClient } from "@/utils/supabase/server";

export async function enrollAttendee(formData, eventId) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    first_name: formData.firstName,
    last_name: formData.lastName,
  };

  const { error } = await supabase.from("attendees").insert([
    {
      event_id: eventId,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    },
  ]);

  if (error) {
    return { success: false, message: "Email already enrolled" };
  }

  return { success: true };
}
