import Image from "next/image";
import { Card } from "../ui/card";
import { formatPrice } from "@/lib/format-price";
import { Feature } from "./feature";
import { Bath, BedDouble, MapPinIcon, Maximize2 } from "lucide-react";
import { PropertyWithRelations } from "@/lib/actions/listings-action";

export function PropertyCard({
  property,
}: {
  property: PropertyWithRelations;
}) {
  const isCoverImg =
    property.images?.[0]?.url ??
    "https://ik.imagekit.io/kxstc2rku/NextEstate/image-not-found.png";

  return (
    <Card className="rounded-2xl shadow-none border-none overflow-hidden p-0">
      <div className="">
        <div className="rounded-xl overflow-hidden bg-slate-100">
          <div className="relative aspect-video">
            <Image
              src={isCoverImg || "/placeholder.jpg"}
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
                {formatPrice(property.price ?? property.price)}
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
