import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  image: text(),
  password: text(),
  role: Role().default("MEMBER"),
  ...timeStamps,
});
