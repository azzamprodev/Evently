import ThemeToggle from "./theme-toggle";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/auth/login/actions";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "./user-button";

export const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <div className="text-2xl font-bold">Evently</div>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <ThemeToggle />
            {user ? (
              <UserButton user={user} />
            ) : (
              <div>
                <Link href="/auth/login">
                  <Button>Sign in</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
