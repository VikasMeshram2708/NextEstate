interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number; // in INR
  currency: string;
  type: "Apartment" | "Independent House" | "Villa" | "Penthouse";
  bhk: number;
  baths: number;
  area: number; // in sq.ft
  address: {
    locality: string;
    city: string;
    state: string;
  };
  // Array of direct Pexels image URLs
  images: string[];
  details: {
    possessionStatus: "Ready to Move" | "Under Construction";
    listedBy: "Owner" | "Builder" | "Verified Agent";
    furnishedStatus: "Fully Furnished" | "Semi Furnished" | "Unfurnished";
    amenities: string[];
  };
}
