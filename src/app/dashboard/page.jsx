import { Navbar } from "@/components/navbar";
import { EventList } from "@/components/events-list";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select(`*, profiles(full_name)`);

  return (
    <>
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <EventList events={events} />
      </div>
    </>
  );
}
