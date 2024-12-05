import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { Navbar } from "@/components/navbar";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="container mx-auto max-w-md px-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
