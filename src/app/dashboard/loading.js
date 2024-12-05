import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[40vh] w-[45vh] rounded-xl md:w-[60vh]" />
          <div className="space-y-2">
            <Skeleton className="h-[2vh] w-[40vh] md:w-[55vh]" />
            <Skeleton className="h-[2vh] w-[40vh] md:w-[55vh]" />
          </div>
        </div>
      </div>
    </>
  );
}
