import { BackButton } from "@/components/back-button";
import { CreateEventCard } from "@/components/create-event-card";
import { Navbar } from "@/components/navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <BackButton content={"Back to Dashboard"} url={"/dashboard"} />
      <div className="flex-grow flex flex-col justify-center">
        <CreateEventCard />
      </div>
    </>
  );
}
