import { Skeleton } from "../ui/skeleton";

interface SmartPhoneCardProps {
  cardView: boolean;
}

const SmartphoneSkeleton = ({ cardView }: SmartPhoneCardProps) => {
  return (
    <>
      {cardView ? (
        <div className="transition-all duration-200">
          <Skeleton className="h-56 rounded-lg" />
          <Skeleton className="h-6 mt-1 rounded-lg" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <Skeleton className="h-2 mt-2 rounded-full" />
          <div className="flex justify-between items-center gap-4 mt-2">
            <Skeleton className="h-11 rounded-sm w-full" />
            <Skeleton className="h-11 rounded-sm w-full" />
          </div>
        </div>
      ) : (
        <div className="transition-all duration-200 flex justify-start gap-5">
          <Skeleton className="w-60 rounded-lg" />
          <div className="flex-1 w-full">
            <Skeleton className="h-6 w-full mt-1 rounded-lg" />
            <Skeleton className="h-2 w-[90%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[85%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[80%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[75%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[70%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[60%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[50%] mt-2 rounded-full" />
            <Skeleton className="h-2 w-[40%] mt-2 rounded-full" />
            <div className="flex justify-between items-center gap-4 mt-2 w-1/2 ml-auto">
              <Skeleton className="h-11 rounded-sm w-full" />
              <Skeleton className="h-11 rounded-sm w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartphoneSkeleton;
