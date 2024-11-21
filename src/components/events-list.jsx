"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { EventDetails } from "./event-details-list";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const EventList = ({ events }) => {
  const router = useRouter();

  const handleStatusButtonClick = (event) => {
    router.push(`/events/${event.id}`);
  };

  return (
    <div
      className={`grid grid-cols-1 gap-2 ${
        events.length > 0 ? "md:grid-cols-2" : ""
      }`}
    >
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>
              <Button
                variant="link"
                className="text-xl text-foreground"
                onClick={() => handleStatusButtonClick(event)}
              >
                {event.event_title}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EventDetails event={event} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
