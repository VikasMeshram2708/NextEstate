import { Empty, EmptyHeader, EmptyTitle } from "../ui/empty";
import { PropertyCard } from "./property-card";
import { getLatestProperties } from "@/lib/actions/listings-action";

export default async function PropertiesGrid() {
  const res = await getLatestProperties();
  console.log("res", res);

  if (!res.success) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Failed to load properties.</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }
  const { properties } = res.data;

  if (!properties.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No properties available.</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between mb-6">
        <p className="text-lg sm:text-xl md:text-3xl">Latest in your area</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
        {properties?.map((d) => (
          <PropertyCard key={d.id} property={d} />
        ))}
      </div>
    </section>
  );
}
