"use server";
import { createClient } from "@/utils/supabase/server";
import { set } from "date-fns";
import { revalidatePath } from "next/cache";

export async function createEvent(formData) {
  const supabase = await createClient();
  const data = {
    event_title: formData.title,
    event_description: formData.description,
    event_date: formData.date,
    event_location: formData.location,
  };

  const {
    data: {
      user: { id: organizerId },
    },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("events")
    .insert([
      {
        organizer_id: organizerId,
        event_title: data.event_title,
        event_description: data.event_description,
        event_date: data.event_date,
        event_location: data.event_location,
      },
    ])
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  const { data: lastCreatedEvent } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const lastCreatedEventId = lastCreatedEvent[0].id;

  revalidatePath("/dashboard");

  return { success: true, eventId: lastCreatedEventId };
}

export async function deleteEvent(eventId) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}

export async function deleteAttendant(attendantId) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("attendees")
    .delete()
    .eq("id", attendantId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/event-analytics/[eventId]");

  return { success: true };
}
