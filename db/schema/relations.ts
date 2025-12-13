import { relations } from "drizzle-orm";
import {
  property,
  propertyAddress,
  propertyAmenities,
  propertyDetails,
  propertyEnquiry,
  propertyFavorites,
  propertyImages,
  propertyLocation,
} from "./property-schema";
import { users } from "./user-schema";

// user relations
export const userRelations = relations(users, ({ many }) => ({
  ownedProperties: many(property, {
    relationName: "owner",
  }),
  listedProperties: many(property, {
    relationName: "listedBy",
  }),
  favorites: many(propertyFavorites),
  enquiries: many(propertyEnquiry),
}));

// property relations
export const propertyRelations = relations(property, ({ many, one }) => ({
  // users
  owner: one(users, {
    fields: [property.ownerId],
    references: [users.id],
    relationName: "owner",
  }),
  listedBy: one(users, {
    fields: [property.listedById],
    references: [users.id],
    relationName: "listedBy",
  }),

  // 1-1
  address: one(propertyAddress),
  location: one(propertyLocation),
  details: one(propertyDetails),

  // 1-many
  amenities: many(propertyAmenities),
  images: many(propertyImages),

  // joins
  favorites: many(propertyFavorites),
  enquiries: many(propertyEnquiry),
}));

// Address
export const propertyAddressRelations = relations(
  propertyAddress,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyAddress.propertyId],
      references: [property.id],
    }),
  })
);

// Locations
export const propertyLocationRelations = relations(
  propertyLocation,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyLocation.propertyId],
      references: [property.id],
    }),
  })
);

// Details
export const propertyDetailsRelations = relations(
  propertyDetails,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyDetails.propertyId],
      references: [property.id],
    }),
  })
);

// Images
export const propertyImageRelations = relations(propertyImages, ({ one }) => ({
  property: one(property, {
    fields: [propertyImages.propertyId],
    references: [property.id],
  }),
}));

// Amenities
export const propertyAmenityRelations = relations(
  propertyAmenities,
  ({ one }) => ({
    property: one(property, {
      fields: [propertyAmenities.propertyId],
      references: [property.id],
    }),
  })
);

// Favorites
export const propertyFavoriteRelations = relations(
  propertyFavorites,
  ({ one }) => ({
    user: one(users, {
      fields: [propertyFavorites.userId],
      references: [users.id],
    }),
    property: one(property, {
      fields: [propertyFavorites.propertyId],
      references: [property.id],
    }),
  })
);

// Enquiry
export const propertyEnquiryRelations = relations(
  propertyEnquiry,
  ({ one }) => ({
    user: one(users, {
      fields: [propertyEnquiry.userId],
      references: [users.id],
    }),
    property: one(property, {
      fields: [propertyEnquiry.propertyId],
      references: [property.id],
    }),
  })
);
