"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = ({ content, url }) => {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.push(`${url}`);
  };

  return (
    <div className="container mx-auto pt-2">
      <button
        className="text-sm hover:underline underline-offset-4 decoration-foreground ml-2"
        onClick={() => handleBackButtonClick()}
      >
        <div className="flex items-center justify-center text-foreground">
          <ChevronLeft size={20} />
          <span>{content}</span>
        </div>
      </button>
    </div>
  );
};
