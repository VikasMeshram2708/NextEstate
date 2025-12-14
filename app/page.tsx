import CTA from "@/components/cta";
import Hero from "@/components/hero";
import PropertiesGrid from "@/components/home/properties-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <Hero />
      <Suspense fallback={<PropertiesGridSkeleton />}>
        <PropertiesGrid />
      </Suspense>
      <CTA />
    </div>
  );
}

const PropertiesGridSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Skeleton className="h-6 w-1/4 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
