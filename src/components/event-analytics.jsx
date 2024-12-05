"use client";
import { EventDetails } from "./event-details-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { EventUrl } from "./event-url";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteAttendant } from "@/app/dashboard/actions";
import { set } from "date-fns";

export const EventAnalytics = ({ event, attendees }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showEditDrawer, setEditDrawer] = useState(false);
  const router = useRouter();
  const handleEventLinkClick = (event) => {
    router.push(`/events/${event.id}`);
  };

  const handleDeleteAttendant = async (attendantId) => {
    setLoading(true);
    try {
      const response = await deleteAttendant(attendantId);
      if (response) {
        setEditDrawer(false);
        toast({
          title: "Attendant deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to delete attendant",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-[45vh] flex-col gap-4 md:w-[60vh]">
        <div className="mb-6 flex items-center justify-center">
          <h1 className="text-4xl font-bold">Event Analytics</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="link"
                      className="text-2xl text-foreground"
                      onClick={() => handleEventLinkClick(event)}
                    >
                      {event.event_title}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p>Visit Event Landing page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EventDetails event={event} />
          </CardContent>
          <CardFooter>
            <EventUrl eventId={event.id} />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  <h2 className="text-2xl">Attendees</h2>
                </CardTitle>
                <CardDescription>
                  <p>
                    {attendees.length > 0
                      ? `Total attendees : ${attendees.length}`
                      : " Share your event Link to enroll some attendees"}
                  </p>
                </CardDescription>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="py-5"
                  onClick={() => {
                    setEditDrawer(true);
                  }}
                >
                  <Pencil />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {attendees && attendees.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Enrolled at</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendees.map((attendant) => (
                    <TableRow key={attendant.id}>
                      <TableCell>{attendant.first_name}</TableCell>
                      <TableCell>{attendant.last_name}</TableCell>
                      <TableCell>{attendant.email}</TableCell>
                      <TableCell>{attendant.enrolled_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 pb-4 text-center">
                <h1 className="text-xl">
                  No{" "}
                  <span className="rounded-sm bg-primary p-1">
                    attendees Yet
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  Share your event link to enroll some attendees and see them
                  here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Drawer open={showEditDrawer} onOpenChange={setEditDrawer}>
        <DrawerContent className="flex items-center justify-center p-4">
          <div className="container max-w-md">
            <div className="py-2">
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl">Attendees</h2>
                  </CardTitle>
                  <CardDescription>
                    <p>
                      Edit the attendees of the event. You can delete them also
                      from the attendees table.
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {attendees && attendees.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendees.map((attendant) => (
                          <TableRow key={attendant.id}>
                            <TableCell>
                              {attendant.first_name + " " + attendant.last_name}
                            </TableCell>
                            <TableCell>{attendant.email}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  handleDeleteAttendant(attendant.id);
                                }}
                              >
                                {loading ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  "Delete"
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 pb-4 text-center">
                      <h1 className="text-xl">
                        No{" "}
                        <span className="rounded-sm bg-primary p-1">
                          attendees Yet
                        </span>
                      </h1>
                      <p className="text-muted-foreground">
                        Share your event link to enroll some attendees and see
                        them here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
