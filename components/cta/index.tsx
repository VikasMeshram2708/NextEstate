// app/components/MinimalCTA.tsx
"use client";

import { Phone, ArrowRight, Sparkles, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MinimalCTA() {
  return (
    <section className="py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/5 -z-10" />
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-secondary/5 blur-3xl -z-10" />

      <div className="max-w-7xl px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge
              variant="outline"
              className="px-4 py-2 mb-6 border-primary/40 bg-primary/10"
            >
              <Sparkles className="mr-2 h-3 w-3" />
              <span className="text-primary font-medium">PUNE REAL ESTATE</span>
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your <span className="text-primary">Perfect</span>{" "}
              Pune Home?
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with our local experts for personalized property
              recommendations and exclusive Pune market insights.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="flex items-center justify-center">
            <Button size="lg" className="px-10 py-7 text-lg">
              <Phone className="mr-3 h-5 w-5" />
              Connect With Pune Expert
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
