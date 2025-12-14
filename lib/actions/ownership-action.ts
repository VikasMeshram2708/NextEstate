"use server";

import { connection } from "next/server";
import { isAuthenticated } from "../is-authenticated";
import { RegisterOwnershipSchema } from "@/app/(protected)/(user_only)/register-ownership/ownership-schema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

type ActionResult = {
  success: boolean;
  message: string;
  error?: string;
};

export async function registerOwnerShip(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    await connection();

    const user = await isAuthenticated();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const raw = {
      name: user.name ?? "Anon",
      email: user.email ?? "",
      panNumber: formData.get("panNumber"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    const parsed = RegisterOwnershipSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join(", "),
      };
    }

    const { address, panNumber, phone } = parsed.data;

    await db
      .update(users)
      .set({
        address,
        panNumber,
        phone,
        verficiationStatus: "PENDING",
      })
      .where(eq(users.id, user?.id));

    revalidatePath("/register-ownership");

    return {
      success: true,
      message: "Ownership registered. We'll review and notify you via email.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong",
      error: (err as Error).message,
    };
  }
}
