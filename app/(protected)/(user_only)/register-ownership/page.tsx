"use client";

import OwnershipForm from "./ownership-form";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CrownIcon, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterOwnershipSchemaPage() {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center flex-col justify-center">
        <Loader2Icon className="size-24 animate-spin" />;
      </div>
    );
  }

  const user = data?.user;
  // console.log("first", user);

  if (!user) {
    notFound();
  }

  if (user && !user.isVerified) {
    return (
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <OwnershipForm />;
        </div>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-linear-to-br from-yellow-400 to-yellow-500 p-3 rounded-full">
              <CrownIcon className="size-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name}! 🎉
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {"You're"} verified and ready to start listing properties
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold">
            Go to Dashboard
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Start listing your properties and connect with buyers
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
