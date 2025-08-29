import { Skeleton } from "../ui/skeleton";
export function SkeletonCard() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 mt-20">
      <div>
        <Skeleton className="h-[400px] w-[450px] md:w-[650px] rounded-xl" />
      </div>
      <div className="">
        <Skeleton className="h-[32px] w-[500px] mb-5" />
        <Skeleton className="h-[24px] w-[100px] mb-5" />
        <Skeleton className="h-[24px] w-full mb-5" />
        <Skeleton className="h-[24px] w-[50px] mb-5" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
