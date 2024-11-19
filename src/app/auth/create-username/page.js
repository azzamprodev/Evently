import { UsernameForm } from "@/components/username-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreateUsernamePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("username");

  if (data.length > 0 && data[0].username) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="container max-w-md mx-auto px-4">
        <UsernameForm />
      </div>
    </div>
  );
}
