import { CreateEventCard } from "@/components/create-event-card";
import { Navbar } from "@/components/navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="flex-grow flex flex-col justify-center">
        <CreateEventCard />
      </div>
    </>
  );
}
