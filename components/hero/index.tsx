// app/components/PuneHeroSection.tsx
"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Building,
  Filter,
  ChevronRight,
  Star,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function PuneHeroSection() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bhk: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("🏠 Pune Property Search:", {
    //   location: searchParams.location,
    //   propertyType: searchParams.propertyType,
    //   priceRange: searchParams.priceRange,
    //   bhk: searchParams.bhk,
    //   market: "Pune",
    //   timestamp: new Date().toLocaleString("en-IN", {
    //     timeZone: "Asia/Kolkata",
    //   }),
    // });

    alert(
      "Search parameters logged to console! Check developer tools for Pune-specific search data."
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Pune-specific locations
  const puneLocalities = [
    "Koregaon Park",
    "Baner",
    "Hinjewadi",
    "Wakad",
    "Kothrud",
    "Viman Nagar",
    "Aundh",
    "Magarpatta",
    "Hadapsar",
    "Kharadi",
  ];

  return (
    <section className="py-24 relative flex items-center">
      {/* Modern geometric background with Indian-inspired patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        {/* Subtle mandala-inspired pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <div className="grid grid-cols-4 gap-12 rotate-45">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-6 h-6 border border-primary rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Pune Focused */}
            <div className="space-y-8">
              <div>
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-2 border-primary/40 bg-primary/10"
                >
                  <TrendingUp className="mr-2 h-3 w-3" />
                  <span className="text-primary font-medium">
                    PUNE&apos;S #1 REAL ESTATE PLATFORM
                  </span>
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Your Dream Home in <span className="text-primary">Pune</span>
                  <br />
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                  NextEstate connects you with premium residential and
                  commercial properties across Pune&apos;s most sought-after
                  localities. From luxury apartments in Koregaon Park to smart
                  homes in Hinjewadi.
                </p>
              </div>

              {/* Pune-specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-primary">
                      5,000+
                    </div>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pune Listings
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">₹850Cr+</div>
                  <div className="text-sm text-muted-foreground">
                    Property Value
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-primary">4.8</div>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Customer Rating
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="text-3xl font-bold text-primary">100%</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Verified Listings
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Pune Search Interface */}
            <Card className="border border-border/50 bg-card/90 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        Find Your Pune Property
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Search across 50+ premium localities in Pune
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                  {/* Pune Location Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Search Pune Localities
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="e.g., Koregaon Park, Baner, Hinjewadi..."
                        value={searchParams.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="pl-10 bg-background border-border/50"
                      />
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Pune Localities */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs text-muted-foreground">
                        Popular in Pune:
                      </span>
                      {puneLocalities.slice(0, 5).map((locality) => (
                        <Badge
                          key={locality}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary text-xs"
                          onClick={() =>
                            handleInputChange("location", locality)
                          }
                        >
                          {locality}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pune-specific Filters */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Property Type - Indian terminology */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Property Type
                      </label>
                      <Select
                        value={searchParams.propertyType}
                        onValueChange={(value) =>
                          handleInputChange("propertyType", value)
                        }
                      >
                        <SelectTrigger className="bg-background border-border/50">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2bhk">2 BHK Apartment</SelectItem>
                          <SelectItem value="3bhk">3 BHK Apartment</SelectItem>
                          <SelectItem value="4bhk">4 BHK Apartment</SelectItem>
                          <SelectItem value="villa">
                            Independent Villa
                          </SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="builder-floor">
                            Builder Floor
                          </SelectItem>
                          <SelectItem value="plot">Residential Plot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range in INR */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        Budget Range (₹)
                      </label>
                      <Select
                        value={searchParams.priceRange}
                        onValueChange={(value) =>
                          handleInputChange("priceRange", value)
                        }
                      >
                        <SelectTrigger className="bg-background border-border/50">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-50">
                            Under ₹50 Lakh
                          </SelectItem>
                          <SelectItem value="50-75">₹50L - ₹75L</SelectItem>
                          <SelectItem value="75-1.5">₹75L - ₹1.5 Cr</SelectItem>
                          <SelectItem value="1.5-3">₹1.5 Cr - ₹3 Cr</SelectItem>
                          <SelectItem value="3-5">₹3 Cr - ₹5 Cr</SelectItem>
                          <SelectItem value="5+">₹5 Cr+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* BHK Configuration */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        BHK Configuration
                      </label>
                      <Select
                        value={searchParams.bhk}
                        onValueChange={(value) =>
                          handleInputChange("bhk", value)
                        }
                      >
                        <SelectTrigger className="bg-background border-border/50">
                          <SelectValue placeholder="Select BHK" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="1.5">1.5 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="2.5">2.5 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="3+">3+ BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pune-specific Features */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Premium Features
                      </label>
                      <Select
                        onValueChange={(value) =>
                          console.log("Pune feature:", value)
                        }
                      >
                        <SelectTrigger className="bg-background border-border/50">
                          <SelectValue placeholder="Desired amenities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clubhouse">Club House</SelectItem>
                          <SelectItem value="gym">
                            Fully-equipped Gym
                          </SelectItem>
                          <SelectItem value="pool">Swimming Pool</SelectItem>
                          <SelectItem value="security">
                            24/7 Security
                          </SelectItem>
                          <SelectItem value="parking">
                            Covered Parking
                          </SelectItem>
                          <SelectItem value="modular">
                            Modular Kitchen
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search Actions */}
                  <div className="space-y-4 pt-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Search Pune Properties
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-primary">
                          RERA Approved:
                        </span>{" "}
                        All listings comply with Maharashtra RERA regulations
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
