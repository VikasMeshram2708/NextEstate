import { db } from "@/db";
import { users } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const pageParams = params.get("page") ?? "1";

    const page = Number(pageParams);
    const limit = 5;
    const offset = (page - 1) * limit;

    const list = await db
      .select()
      .from(users)
      .where(eq(users.verficiationStatus, "PENDING"))
      .limit(limit)
      .offset(offset);

    const [totalResult] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.verficiationStatus, "PENDING"));

    const total = totalResult.count;
    const totalPages = Math.ceil(total / limit);

    return new Response(
      JSON.stringify({
        success: true,
        meta: {
          list,
          total,
          page,
          limit,
          offset,
          totalPages,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong. Please try again",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
