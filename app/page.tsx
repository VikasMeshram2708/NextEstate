import CTA from "@/components/cta";
import Hero from "@/components/hero";
import PropertiesGrid from "@/components/home/properties-grid";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <Hero />
      <PropertiesGrid />
      <CTA />
    </div>
  );
}
