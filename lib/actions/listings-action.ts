"use server";

// Fetch properties that are available for rent/sale
// Add pagination

import { db } from "@/db";
import { property, propertyAddress, propertyImages } from "@/db/schema";
import { count } from "drizzle-orm";

export type PropertyType = typeof property.$inferSelect;
export type PropertyWithRelations = PropertyType & {
  address?: typeof propertyAddress.$inferInsert | null;
  images?: (typeof propertyImages.$inferInsert)[] | null;
};

type GetListedPropertiesParams = {
  limit?: number;
  offset?: number;
};

type GetListedPropertiesProps = {
  success: boolean;
  message: string;
  data: {
    properties: Array<
      PropertyType & {
        address?: typeof propertyAddress.$inferInsert | null;
        images?: (typeof propertyImages.$inferInsert)[] | null;
      }
    >;
    total: number;
    limit: number;
    offset: number;
  };
};

export async function getListedProperties({
  limit,
  offset,
}: GetListedPropertiesParams): Promise<GetListedPropertiesProps> {
  "use cache";

  const LIMIT = Math.min(50, Math.max(1, limit ?? 10));
  const OFFSET = Math.max(0, offset ?? 0);

  // total count
  const [{ value: total }] = await db.select({ value: count() }).from(property);

  // fetch properties
  const result = await db.query.property.findMany({
    limit: LIMIT,
    offset: OFFSET,
    orderBy: (d, { desc }) => desc(d.createdAt),
    with: {
      address: true,
      images: {
        limit: 1,
      },
    },
  });

  return {
    success: true,
    message: "Properties fetched successfully",
    data: {
      properties: result,
      total,
      limit: OFFSET,
      offset: LIMIT,
    },
  };
}

type GetLatestPropertiesType = {
  success: boolean;
  message: string;
  data: {
    properties: Array<
      PropertyType & {
        address?: typeof propertyAddress.$inferInsert | null;
        images?: (typeof propertyImages.$inferInsert)[] | null;
      }
    >;
    total: number;
  };
  error?: string | undefined;
};
// only return 5-10 properties for homepage
export async function getLatestProperties(): Promise<GetLatestPropertiesType> {
  "use cache";
  const LIMIT = 5;

  try {
    const [total, result] = await Promise.all([
      await db.select({ value: count() }).from(property),
      await db.query.property.findMany({
        limit: LIMIT,
        orderBy: (d, { desc }) => desc(d.createdAt),
        with: {
          address: true,
          images: {
            limit: 1,
          },
        },
      }),
    ]);

    return {
      success: true,
      message: "Latest properties fetched successfully",
      data: {
        properties: result,
        total: total[0].value,
      },
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: "Failed to fetch latest properties",
      data: {
        properties: [],
        total: 0,
      },
      error: err?.message ?? "Something went wrong",
    };
  }
}
