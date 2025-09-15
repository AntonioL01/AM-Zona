import { pgTable, serial, varchar, integer, json } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }),
  price: varchar("price", { length: 50 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  condition: varchar("condition", { length: 100 }).notNull(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: varchar("year", { length: 10 }).notNull(),
  driveType: varchar("driveType", { length: 100 }).notNull(),
  transmission: varchar("transmission", { length: 50 }).notNull(),
  fuelType: varchar("fuelType", { length: 50 }).notNull(),
  mileage: varchar("mileage", { length: 20 }).notNull(),
  engineSize: varchar("engineSize", { length: 50 }),
  power: varchar("power", { length: 10 }),
  color: varchar("color", { length: 50 }).notNull(),
  door: varchar("door", { length: 10 }).notNull(),
  vin: varchar("vin", { length: 100 }),
  offerType: varchar("offerType", { length: 50 }).notNull(),
  listingDescription: varchar("listingDescription", { length: 1000 }).notNull(),
  county: varchar("county", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 30 }).notNull(),
  features: json("features"),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  postedOn: varchar("postedOn", { length: 50 }),
});

export const CarImages = pgTable("carImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId").notNull().references(() => CarListing.id),
});

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  role: varchar("role", { length: 50 }).default("user").notNull(),
});
