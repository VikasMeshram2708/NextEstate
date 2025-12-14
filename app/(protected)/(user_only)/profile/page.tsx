// Show the verificatoin status also.

import { Suspense } from "react";
import UserCard from "./user-card";
import UserProfileCardSkeleton from "./user-skeleton";

export default function ProfilePage() {
  return (
    <div className="px-6 py-10 lg:py-20">
      <Suspense fallback={<UserProfileCardSkeleton />}>
        <UserCard />
      </Suspense>
    </div>
  );
}
