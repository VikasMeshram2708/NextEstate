"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function getApproverUsersList() {
  try {
    // TODO: add pagination later
    const unverifiedUserList = await db
      .select()
      .from(users)
      .where(eq(users.verficiationStatus, "PENDING"))
      .limit(10);

    const [totalResult] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.verficiationStatus, "PENDING"));

    const total = totalResult.count;

    return {
      success: true,
      message: "Successfully fetch the unverified users.",
      data: {
        total: total,
        list: unverifiedUserList,
      },
    };
  } catch (error) {
    const err = (error as Error).message;
    return {
      success: false,
      error: err ?? "Something went wrong",
    };
  }
}
