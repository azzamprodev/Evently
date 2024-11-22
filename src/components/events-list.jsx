"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { EventDetails } from "./event-details-list";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteEvent } from "@/app/dashboard/actions";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export const EventList = ({ events }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showDeleteDrawer, setShowDeleteDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(false);

  const handleEventLinkClick = (event) => {
    router.push(`/events/${event.id}`);
  };

  const handleDetailsClick = (event) => {
    router.push(`/dashboard/event-analytics/${event.id}`);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteDrawer(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      setDeletingEvent(true);
      await deleteEvent(selectedEvent.id);
      setShowDeleteDrawer(false);
      toast({
        title: "Event deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting event",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingEvent(false);
    }
  };

  return (
    <>
      <div className="py-10 flex flex-col gap-4">
        <div
          className={`grid grid-cols-1 gap-3 ${
            events.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {events.map((event) => (
            <Card key={event.id} className="w-[45vh] md:w-[40vh] lg:w-[45vh]">
              <CardHeader>
                <CardTitle>
                  <Button
                    variant="link"
                    className="text-xl text-foreground"
                    onClick={() => handleEventLinkClick(event)}
                  >
                    {event.event_title}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventDetails event={event} />
              </CardContent>
              <CardFooter>
                <div className="w-full flex gap-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDetailsClick(event)}
                  >
                    Analytics
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteClick(event)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-full py-6"
          onClick={() => {
            router.push("/dashboard/create-event");
          }}
        >
          Create Event
        </Button>
      </div>

      <Drawer open={showDeleteDrawer} onOpenChange={setShowDeleteDrawer}>
        <DrawerContent className="flex items-center justify-center py-4">
          <div className="container max-w-md">
            <div className="py-2">
              <DrawerHeader>
                <DrawerTitle className="text-center text-xl">
                  Delete Event {selectedEvent?.event_title}
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  Are you sure you want to delete this event? <br />
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
            </div>
            <DrawerFooter>
              <Button variant="destructive" onClick={confirmDeleteEvent}>
                {deletingEvent ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
