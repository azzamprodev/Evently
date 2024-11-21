"use client";

import {
  Card,
  CardContent,
  CardDescription,
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

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(500, { message: "Description must not exceed 500 characters." }),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD (e.g., 2024-12-25).",
    }),

  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(200, { message: "Location must not exceed 200 characters." }),
});

export const CreateEventCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    console.log(data);
  };

  return (
    <>
      <div className="container max-w-lg mx-auto px-4">
        <Card>
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
                    <Button type="submit" className="w-full">
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
        </Card>
      </div>
    </>
  );
};
