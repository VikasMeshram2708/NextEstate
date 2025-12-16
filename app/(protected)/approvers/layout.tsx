import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      <Suspense fallback={<Loader2Icon className="animate-spin size-5" />}>
        {children}
      </Suspense>
    </div>
  );
}
