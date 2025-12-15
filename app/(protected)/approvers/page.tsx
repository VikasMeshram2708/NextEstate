import { Suspense } from "react";
import ApproverList from "./approver-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApproversPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      <Suspense fallback={<ApproverListSkeleton />}>
        <ApproverList />
      </Suspense>
    </div>
  );
}

const ApproverListSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* Table */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
};
