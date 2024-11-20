"use client";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { EnrollmentForm } from "./event-enrollment-form";
import { useState } from "react";
import { EventDetails } from "./event-details-list";
import Link from "next/link";

export const EventOverview = ({ event, eventId }) => {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  return (
    <>
      {/* Containers Wrapper */}
      <div className="flex flex-col gap-8 py-6">
        {/* Container */}
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <h1 className="text-5xl font-bold">{event.event_title}</h1>
          <EventDetails event={event} />
        </div>
        {/* Container */}
        <div className="container max-w-xl mx-auto px-4">
          <Card>
            <CardHeader>
              <h1 className="text-2xl">Ticket</h1>
              <p>{event.event_description}</p>
            </CardHeader>
            <CardContent>
              <EventDetails event={event} />
            </CardContent>
            <CardFooter>
              {showEnrollmentForm ? (
                <EnrollmentForm eventId={eventId} event={event} />
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowEnrollmentForm(true)}
                  className="w-full"
                >
                  Get your Ticket
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-center items-center">
          <p>
            powered by{" "}
            <Link href={"/"} className="text-primary">
              Evently
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
