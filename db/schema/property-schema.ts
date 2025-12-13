import {
  index,
  integer,
  numeric,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { timeStamps, users } from "./user-schema";

// Property
export const property = pgTable(
  "property",
  {
    id: uuid().primaryKey().defaultRandom(),

    title: text().notNull(),
    description: text().notNull(),

    price: numeric().notNull(),
    currency: text().notNull().default("INR"),

    type: text().notNull(), // VILLA, APARTMENT  etc.
    bhk: integer().notNull(),
    baths: integer().notNull(),
    area: integer().notNull(), // sqft

    // user relation
    ownerId: uuid().references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    listedById: uuid("listed_by_id").references(() => users.id, {
      onDelete: "set null",
    }),

    ...timeStamps,
  },
  (d) => [
    index("property_owner_idx").on(d.ownerId),
    index("property_listed_by__idx").on(d.listedById),
    index("property_price__idx").on(d.price),
    index("property_bhk__idx").on(d.bhk),
    index("property_baths__idx").on(d.baths),
    index("property_area__idx").on(d.area),
    index("property_type__idx").on(d.type),
    index("property_created__idx").on(d.createdAt),
    index("property_title__idx").on(d.title),
    index("property_description__idx").on(d.description),
  ]
);

// property address
export const propertyAddress = pgTable(
  "property_address",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    locality: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
  },
  (d) => [
    index("property_address_property_id_idx").on(d.propertyId),
    index("property_address_locality_idx").on(d.locality),
    index("property_address_city_idx").on(d.city),
    index("property_address_state_idx").on(d.state),
  ]
);

// property location
export const propertyLocation = pgTable(
  "property_location",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    lat: numeric({ precision: 9, scale: 6 }).notNull(),
    lon: numeric({ precision: 9, scale: 6 }).notNull(),
  },
  (d) => [
    index("property_location_property_id_idx").on(d.propertyId),
    index("property_location_geo_idx").on(d.lat, d.lon),
  ]
);

// property details
export const propertyDetails = pgTable(
  "property_details",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    possessionStatus: text(),
    listedBy: text(), // OWNER, AGENT,
    furnishedStatus: text(),
  },
  (d) => [
    index("property_details_property_id_idx").on(d.propertyId),
    index("property_details_possession_idx").on(d.possessionStatus),
    index("property_details_listed_by_idx").on(d.listedBy),
    index("property_details_furnished_idx").on(d.furnishedStatus),
  ]
);

// property amenities
export const propertyAmenities = pgTable(
  "property_amenities",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    name: text().notNull(), // swimming pool, etc
  },
  (d) => [
    index("property_amenities_property_id_idx").on(d.propertyId),
    index("property_amenities_name_idx").on(d.name),
  ]
);

// property images
export const propertyImages = pgTable(
  "property_images",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    url: text().notNull(),
  },
  (d) => [index("property_images_property_id_idx").on(d.propertyId)]
);

// property favorites
export const propertyFavorites = pgTable(
  "property_favorites",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    userId: uuid()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    ...timeStamps,
  },
  (d) => [
    uniqueIndex("property_favorites_unique_idx").on(d.propertyId, d.userId),
    index("property_favorites_user_id_idx").on(d.userId),
  ]
);

// property Enquiry
export const propertyEnquiry = pgTable(
  "property_enquiry",
  {
    id: uuid().primaryKey().defaultRandom(),
    // foreign key
    userId: uuid().references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    propertyId: uuid().references(() => property.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    message: text().notNull(),
    ...timeStamps,
  },
  (d) => [
    index("property_enquiry_user_id_idx").on(d.userId),
    index("property_enquiry_property_id_idx").on(d.propertyId),
    index("property_enquiry_property_created_idx").on(d.createdAt),
  ]
);
