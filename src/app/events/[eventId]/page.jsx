import { EventOverview } from "@/components/event-overview";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

export default async function page({ params }) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select(`*, profiles(full_name)`)
    .eq("id", eventId);

  if (!data) {
    redirect("/");
  }

  const event = data[0];

  return (
    <>
      <div className="p-2 flex justify-end">
        <ThemeToggle />
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <EventOverview event={event} eventId={eventId} />
      </div>
    </>
  );
}
