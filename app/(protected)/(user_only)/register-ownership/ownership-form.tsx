"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { z } from "zod";

import { RegisterOwnershipSchema } from "./ownership-schema";
import { registerOwnerShip } from "@/lib/actions/ownership-action";

type FormValues = z.infer<typeof RegisterOwnershipSchema>;

type ActionState = {
  success: boolean;
  message: string;
  error?: string;
};

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function OwnershipForm() {
  const { data } = useSession();

  const [state, formAction, isPending] = useActionState(
    registerOwnerShip,
    initialState
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterOwnershipSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      panNumber: "",
      address: "",
      phone: "",
    },
  });

  // Prefill user data
  useEffect(() => {
    if (data?.user) {
      form.reset({
        name: data.user.name ?? "Anon",
        email: data.user.email ?? "",
        panNumber: "",
        address: "",
        phone: "",
      });
    }
  }, [data?.user, form]);
  return (
    <Card className="w-full max-w-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Register Ownership
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Server feedback */}
        {state.message && (
          <div
            className={`rounded-md p-3 text-sm ${
              state.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}

        <Form {...form}>
          <form
            action={formAction}
            className="space-y-4"
            onSubmitCapture={(e) => {
              if (!form.formState.isValid) {
                e.preventDefault();
                form.trigger();
              }
            }}
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAN */}
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
