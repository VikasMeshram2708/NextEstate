"use server";

import { db } from "@/db";
import { isAuthenticated } from "@/lib/is-authenticated";

export async function getApproverUsersList() {
  "use cache";
  try {
    const user = await isAuthenticated();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const unverifiedUserList = await db.query.users.findMany({
      where: (d, { eq }) => eq(d.isVerified, false),
    });

    return {
      success: true,
      message: "Successfully fetch the unverified users.",
      data: {
        unverified_users: unverifiedUserList,
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
