"use client";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUsername } from "@/app/auth/create-username/actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

export const UsernameForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await createUsername(data);
      if (response.success) {
        router.push("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">Create a username</h1>
        </CardTitle>
        <CardDescription>
          You need to create a username for creating events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="username"
                      type="text"
                      name="username"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.username?.message || error}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create username"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
