import { Suspense } from "react";
import ApproverList from "./approver-list";
import { Skeleton } from "@/components/ui/skeleton";

type ApproverParams = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ApproversPage({ searchParams }: ApproverParams) {
  const params = (await searchParams).page ?? "1";
  console.log("params", params);

  const page = Number(params) ? params : 1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      <Suspense fallback={<ListSkeletonLoader />}>
        <ApproverList page={Number(page)} />
      </Suspense>
    </div>
  );
}

function ListSkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="p-4 space-y-3">
          {/* Header row */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          {/* Data rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
