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
import { EventUrl } from "./event-url";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const EventAnalytics = ({ event, attendees }) => {
  const router = useRouter();
  const handleEventLinkClick = (event) => {
    router.push(`/events/${event.id}`);
  };

  return (
    <>
      <div className="w-[45vh] md:w-[60vh] flex flex-col gap-4">
        <div className="flex items-center justify-center mb-6">
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
            <CardTitle>
              <h2 className="text-2xl">Attendees</h2>
            </CardTitle>
            <CardDescription>
              <p>
                {attendees.length > 0
                  ? `Total attendees - ${attendees.length}`
                  : " Share your event Link to enroll some attendees"}
              </p>
            </CardDescription>
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
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">No attendees yet</h1>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
