"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { useState } from "react";
import { enrollAttendee } from "@/app/events/[eventId]/actions";
import JSConfetti from "js-confetti";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

export const EnrollmentForm = ({ eventId, event }) => {
  const jsConfetti = new JSConfetti();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await enrollAttendee(data, eventId);

      if (response.success) {
        setSuccess(true);
        jsConfetti.addConfetti();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!success ? (
        <div className="flex flex-col w-full gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <div className="w-full flex gap-1">
                <FormField
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          name="firstName"
                          placeholder="First Name"
                          className="w-full text-sm"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          name="lastName"
                          placeholder="Last Name"
                          className="w-full text-sm"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.lastName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="m@example.com"
                        type="email"
                        name="email"
                        className="w-full text-sm"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message || error}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Get your Ticket"
                )}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full">
          <Card className="">
            <CardHeader>
              <div className="flex flex-col gap-2">
                <MailCheck className="h-10 w-10" />
                <CardTitle>Enrollment Successful!</CardTitle>
              </div>
              <CardDescription>
                Thank you for enrolling in {event.event_title} event! We’re
                excited to see you there. You’ll receive a confirmation email
                with all the event details shortly.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="w-full"
              >
                Enroll Another Attendee
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};
