import { EventOverview } from "@/components/event-overview";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import { BackButton } from "@/components/back-button";

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

  const {
    data: {
      user: { id: userId },
    },
  } = await supabase.auth.getUser();

  console.log(userId);
  console.log(event.organizer_id);

  return (
    <>
      <div className="container mx-auto flex items-center justify-between p-4">
        {userId === event.organizer_id ? (
          <BackButton content="Back to dashboard" url={"/dashboard"} />
        ) : (
          ""
        )}
        <ThemeToggle />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <EventOverview event={event} eventId={eventId} />
      </div>
    </>
  );
}
