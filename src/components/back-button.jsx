import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const BackButton = ({ content }) => {
  return (
    <div className="container mx-auto pt-2">
      <Link href="/dashboard">
        <button className="text-sm hover:underline underline-offset-4 decoration-foreground ml-2">
          <div className="flex items-center justify-center text-foreground">
            <ChevronLeft size={20} />
            <span>{content}</span>
          </div>
        </button>
      </Link>
    </div>
  );
};
