"use client";
import { emailLogin } from "@/app/auth/login/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import OAuthButtons from "@/app/auth/login/oauth";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await emailLogin(data);
      if (response.success) {
        setEmailSent(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {emailSent ? (
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">
                <span className="text-green-500">Email Sent</span>
              </h1>
            </CardTitle>
            <CardDescription>
              <p className="">
                Please check your inbox to complete the login process using
                magic link.
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <a
              href="https://mail.google.com"
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">Open Email</Button>
            </a>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">Login to the app</h1>
            </CardTitle>
            <CardDescription>
              Enter your email and sign in with Magic Link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* OAuth */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <OAuthButtons />
            </div>
            <div className="my-6 flex items-center justify-center">
              <hr className="w-full border" />
              <span className="mx-4 text-gray-700">OR</span>
              <hr className="w-full border" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full text-sm"
                          placeholder="m@example.com"
                          type="email"
                          name="email"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message || error}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Get Magic Link"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};
