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
        className="ml-2 text-sm decoration-foreground underline-offset-4 hover:underline"
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
