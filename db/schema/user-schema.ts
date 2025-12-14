import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const timeStamps = {
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow(),
};

export const Role = pgEnum("role", ["SUPER_ADMIN", "ADMIN", "MEMBER"]);

export const VerificationStatus = pgEnum("verification_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "INITIATED",
]);

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    image: text(),
    password: text(),
    phone: text(),
    panNumber: text(),
    address: text(),
    role: Role().default("MEMBER"),
    isVerified: boolean().default(false),
    verficiationStatus: VerificationStatus().default("INITIATED"),
    ...timeStamps,
  },
  (d) => [
    index("users_role_idx").on(d.role),
    index("users_email_idx").on(d.email),
    index("users_pan_no_idx").on(d.panNumber),
  ]
);
