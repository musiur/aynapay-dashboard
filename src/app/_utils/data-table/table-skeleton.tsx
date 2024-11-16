import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-8">
        <Skeleton className="w-[360px] h-8 rounded-full" />
        <Skeleton className="w-[120px] h-8 rounded-full" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => {
          return <Skeleton key={item} className="w-full h-8 rounded-full" />;
        })}
      </div>
      <div className="flex items-center justify-between gap-8">
        <Skeleton className="w-[200px] h-8 rounded-full" />
        <Skeleton className="w-[200px] h-8 rounded-full" />
      </div>
    </div>
  );
};

export default TableSkeleton;
