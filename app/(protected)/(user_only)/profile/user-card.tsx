import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isAuthenticated } from "@/lib/is-authenticated";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function UserProfileCard() {
  const user = await isAuthenticated();
  if (!user) notFound();

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id as string),
    with: {
      favorites: true,
      listedProperties: true,
    },
  });

  if (!dbUser) notFound();

  return (
    <Card className="mx-auto max-w-5xl shadow">
      {/* Identity */}
      <CardHeader className="flex items-center gap-4 sm:flex-row">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CardTitle className="text-xl capitalize">{user.name}</CardTitle>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">Ownership Status</Badge>
            <Badge variant="outline">{dbUser.verficiationStatus}</Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-10 pt-8">
        {/* Activity Stats */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Marketplace activity
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat
              label="Listings posted"
              value={dbUser.listedProperties.length}
            />
            <Stat label="Favorites" value={dbUser.favorites.length} />
            <Stat
              label="Joined"
              value={formatDate(
                dbUser.createdAt ? new Date(dbUser.createdAt) : null
              )}
            />
          </div>
        </section>

        <Separator />

        {/* Account Details */}
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Account details
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Phone number" value={dbUser.phone} />
            <InfoItem label="Address" value={dbUser.address} />
            <InfoItem label="PAN number" value={dbUser.panNumber} />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ Helpers ------------------------------ */

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border px-4 py-6 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value ?? "—"}</p>
    </div>
  );
}

function formatDate(date?: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
