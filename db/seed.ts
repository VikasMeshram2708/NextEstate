import "dotenv/config";
import { randomUUID } from "crypto";

import { db } from ".";
import { sampleProperties } from "@/data";

import {
  property,
  propertyAddress,
  propertyLocation,
  propertyDetails,
  propertyImages,
  propertyAmenities,
  propertyFavorites,
  propertyEnquiry,
  users,
} from "./schema";

/* -------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------- */

const now = () => new Date().toISOString();

/* -------------------------------------------------- */
/* Truncate (ORDER MATTERS) */
/* -------------------------------------------------- */

async function truncateAll() {
  console.log("🧹 Truncating tables...");

  await db.delete(propertyFavorites);
  await db.delete(propertyEnquiry);
  await db.delete(propertyImages);
  await db.delete(propertyAmenities);
  await db.delete(propertyDetails);
  await db.delete(propertyLocation);
  await db.delete(propertyAddress);
  await db.delete(property);
  await db.delete(users);
}

/* -------------------------------------------------- */
/* Seed */
/* -------------------------------------------------- */

async function seedMyDB() {
  console.log("🌱 Seeding database...");

  /* 1️⃣ Clean slate */
  await truncateAll();

  /* 2️⃣ Create Seed User */
  const userId = randomUUID();

  await db.insert(users).values({
    id: userId,
    name: "Seed Admin",
    email: "admin@estate.app",
    role: "ADMIN",
    createdAt: now(),
    updatedAt: now(),
  });

  /* 3️⃣ Seed Properties + Relations */
  for (const chunk of sampleProperties) {
    /* ---------- Property ---------- */

    const [inserted] = await db
      .insert(property)
      .values({
        title: chunk.title,
        description: chunk.description,
        price: chunk.price.toString(), // numeric → string
        currency: chunk.currency,
        type: chunk.type,
        bhk: chunk.bhk,
        baths: chunk.baths,
        area: chunk.area,

        ownerId: userId,
        listedById: userId,

        createdAt: now(),
        updatedAt: now(),
      })
      .returning({ id: property.id });

    const propertyId = inserted.id;

    /* ---------- Address ---------- */

    await db.insert(propertyAddress).values({
      propertyId,
      locality: chunk.address.locality,
      city: chunk.address.city,
      state: chunk.address.state,
    });

    /* ---------- Location ---------- */

    await db.insert(propertyLocation).values({
      propertyId,
      lat: chunk.location.lat.toString(),
      lon: chunk.location.lng.toString(),
    });

    /* ---------- Details ---------- */

    await db.insert(propertyDetails).values({
      propertyId,
      possessionStatus: chunk.details.possessionStatus,
      listedBy: chunk.details.listedBy,
      furnishedStatus: chunk.details.furnishedStatus,
    });

    /* ---------- Images ---------- */

    if (chunk.images?.length) {
      await db.insert(propertyImages).values(
        chunk.images.map((url) => ({
          propertyId,
          url,
        }))
      );
    }

    /* ---------- Amenities ---------- */

    if (chunk.details.amenities?.length) {
      await db.insert(propertyAmenities).values(
        chunk.details.amenities.map((name) => ({
          propertyId,
          name,
        }))
      );
    }

    /* ---------- Favorites (demo) ---------- */

    await db.insert(propertyFavorites).values({
      propertyId,
      userId,
      createdAt: now(),
      updatedAt: now(),
    });
  }

  console.log("✅ Database seeded successfully");
}

/* -------------------------------------------------- */
/* Run */
/* -------------------------------------------------- */

seedMyDB()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed", err);
    process.exit(1);
  });
