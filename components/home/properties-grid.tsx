import Image from "next/image";
import { sampleProperties } from "@/data";
import { Card } from "../ui/card";
import { Bath, BedDouble, MapPinIcon, Maximize2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function PropertiesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing 1-5 of total {sampleProperties?.length} properties
        </p>
        <div className="relative">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="property-type">Property Type</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price-range">Price Range</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
        {sampleProperties?.map((d) => (
          <PropertyCard key={d.id} property={d} />
        ))}
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: any }) {
  return (
    <Card className="rounded-2xl shadow-none border-none overflow-hidden p-0">
      <div className="">
        <div className="rounded-xl overflow-hidden bg-slate-100">
          <div className="relative aspect-video">
            <Image
              src={property.images?.[0] || "/placeholder.jpg"}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold leading-tight line-clamp-1">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPinIcon className="w-4 h-4" aria-hidden />
            <span>{property.address?.locality}</span>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <Feature icon={Maximize2} label={`${property.area} sq. ft.`} />
              <Feature icon={BedDouble} label={`${property.bhk} Bed`} />
              <Feature icon={Bath} label={`${property.baths} Bath`} />
            </div>

            <div className="flex items-center gap-4 justify-between">
              <div className="text-green-600 font-semibold">
                {formatPrice(property.expectedReturn ?? property.price)}
              </div>

              <button
                type="button"
                className="text-shadow-lg text-xs sm:text-sm border-green-400 px-4 py-2 bg-secondary"
              >
                Invest now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Feature({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-slate-400" aria-hidden />
      <span className="text-xs truncate">{label}</span>
    </div>
  );
}

function formatPrice(value: number | string | undefined) {
  if (!value) return "₹0";
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "₹0";
  return `${num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  })}`;
}
