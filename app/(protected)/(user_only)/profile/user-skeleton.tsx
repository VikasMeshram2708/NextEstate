import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileCardSkeleton() {
  return (
    <Card className="mx-auto max-w-5xl">
      {/* Header */}
      <CardHeader className="flex items-center gap-4 sm:flex-row">
        <Skeleton className="h-14 w-14 rounded-full" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-10 pt-8">
        {/* Stats */}
        <section>
          <Skeleton className="mb-4 h-4 w-40" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        </section>

        <Separator />

        {/* Account Details */}
        <section>
          <Skeleton className="mb-4 h-4 w-32" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InfoSkeleton />
            <InfoSkeleton />
            <InfoSkeleton />
            <InfoSkeleton />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

/* -------------------------- Skeleton Helpers -------------------------- */

function StatSkeleton() {
  return (
    <div className="rounded-lg border px-4 py-6 text-center space-y-2">
      <Skeleton className="mx-auto h-6 w-12" />
      <Skeleton className="mx-auto h-3 w-24" />
    </div>
  );
}

function InfoSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-4 w-full max-w-260px" />
    </div>
  );
}
