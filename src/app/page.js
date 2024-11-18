import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function page() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex gap-8 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">
          Full auth system with supabase 🚀
        </h1>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2 text-sm">
            <Check className="h-3 w-3" />
            <span>Sign in with magic link</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Check className="h-3 w-3" />
            <span>OAuth sign in</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Check className="h-3 w-3" />
            <span>Sign out functionality</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Check className="h-3 w-3" />
            <span>Supabase user management</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Check className="h-3 w-3" />
            <span>Protected routes</span>
          </li>
        </ul>
        <Link href={"/dashboard"}>
          <Button className="px-20">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
