"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ApproverListType = {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  phone: string;
  panNumber: string;
  address: string;
  role: string;
  isVerified: boolean;
  verficiationStatus: string;
  createdAt: string;
  updatedAt: string;
};

type GetListReturnType = {
  success: boolean;
  meta: {
    list: ApproverListType[];
    total: number;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
  };
};

const BASE_URL = "http://localhost:3000/api";

export async function getList(
  currPage: number
): Promise<GetListReturnType | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/approvers/get-all?page=${currPage}`);
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch approvers:", error);
    return undefined;
  }
}

export async function updateUserOwnershipStatus(
  status: "APPROVE" | "REJECT" | "PENDING",
  toUserId: string
): Promise<{ status: boolean; message: string }> {
  try {
    const session = await auth();

    if (session?.user?.role !== "SUPER_ADMIN") {
      return { status: false, message: "Unauthorized" };
    }

    const map = {
      APPROVE: "APPROVED",
      PENDING: "PENDING",
      REJECT: "REJECTED",
    } as const;

    await db
      .update(users)
      .set({ verficiationStatus: map[status] })
      .where(eq(users.id, toUserId));

    // revalidate
    revalidatePath("/approvers");

    return { status: true, message: "User status updated successfully" };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
