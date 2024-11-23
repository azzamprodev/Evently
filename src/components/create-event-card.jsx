"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { createEvent } from "@/app/dashboard/actions";
import { EventUrl } from "./event-url";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long." })
    .max(200, { message: "Description must not exceed 200 characters." }),

  date: z.date(),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(200, { message: "Location must not exceed 200 characters." }),
});

export const CreateEventCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);
  const [jsConfetti, setJsConfetti] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  useEffect(() => {
    // Ensure JSConfetti is only initialized on the client
    // ChatGPT code
    if (typeof window !== "undefined") {
      import("js-confetti").then((module) => {
        setJsConfetti(new module.default());
      });
    }
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    console.log(data.date);
    try {
      const response = await createEvent(data);

      if (response.success) {
        setSuccess(true);
        form.reset();
        jsConfetti.addConfetti();
        setCreatedEventId(response.eventId);
      } else {
        setError(response.message);
        console.log(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container max-w-lg mx-auto px-4">
        <Card>
          {!success ? (
            <div>
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Create Event</h1>
                </CardTitle>
                <CardDescription>
                  <p>Create an event with all of the needed details</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex flex-col gap-2">
                        {/* Title Field */}
                        <FormField
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  name="title"
                                  placeholder="Event Title"
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.firstName?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        {/* Description Field */}
                        <FormField
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  name="description"
                                  placeholder="Event Description"
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.firstName?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* Location and date container */}
                      <div className="w-full flex gap-1 items-start">
                        {/* Location Field */}
                        <FormField
                          name="location"
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  name="location"
                                  placeholder="Event Location"
                                  className="text-sm"
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.firstName?.message}
                              </FormMessage>
                            </FormItem>
                          )}
                        />
                        {/* Date Field */}
                        <FormField
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <FormLabel>Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => {
                                      const today = new Date();
                                      today.setHours(0, 0, 0, 0);
                                      return date < today;
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="w-full"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Create Event"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </div>
          ) : (
            <div>
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Success</h1>
                </CardTitle>
                <CardDescription>
                  <p>Your event has been created successfully</p>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <EventUrl eventId={createdEventId} />
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};
