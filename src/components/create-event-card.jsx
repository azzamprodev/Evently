"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createEvent } from "@/app/dashboard/actions";
import JSConfetti from "js-confetti";
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

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD (e.g., 2024-12-25).",
  }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(200, { message: "Location must not exceed 200 characters." }),
});

export const CreateEventCard = () => {
  const jsConfetti = new JSConfetti();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
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
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-4xl font-bold">Create Event</h1>
      </div>
      <div className="container max-w-lg mx-auto px-4">
        <Card>
          {!success ? (
            <div>
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Event Details</h1>
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
                      <div className="w-full flex gap-1">
                        <FormField
                          name="location"
                          render={({ field }) => (
                            <FormItem className="w-full">
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
                        <FormField
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Date</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  name="date"
                                  placeholder="YYYY-MM-DD"
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
