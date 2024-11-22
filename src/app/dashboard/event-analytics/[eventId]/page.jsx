import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { EventAnalytics } from "@/components/event-analytics";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/back-button";

export default async function page({ params }) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: eventData } = await supabase
    .from("events")
    .select(`*, profiles(full_name)`)
    .eq("id", eventId);

  const { data: attendees } = await supabase
    .from("attendees")
    .select("*")
    .eq("event_id", eventId);

  if (attendees) {
    console.log(attendees);
  }

  if (!eventData) {
    redirect("/");
  }

  const event = eventData[0];

  return (
    <>
      <Navbar />
      <BackButton content={"Back to Dashboard"} url={"/dashboard"} />
      <div className="flex-grow flex flex-col items-center justify-center">
        <EventAnalytics event={event} attendees={attendees} />
      </div>
    </>
  );
}
