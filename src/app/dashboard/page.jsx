import { Navbar } from "@/components/navbar";
import { EventList } from "@/components/events-list";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select(`*, profiles(full_name)`);

  if (!events) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center">
        <EventList events={events} />
      </div>
    </>
  );
}
