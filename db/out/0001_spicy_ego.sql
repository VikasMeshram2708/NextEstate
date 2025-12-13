CREATE TABLE "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"type" text NOT NULL,
	"bhk" integer NOT NULL,
	"baths" integer NOT NULL,
	"area" integer NOT NULL,
	"ownerId" uuid,
	"listed_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "property_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"locality" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"possessionStatus" text,
	"listedBy" text,
	"furnishedStatus" text
);
--> statement-breakpoint
CREATE TABLE "property_enquiry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"propertyId" uuid,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "property_favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"userId" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "property_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"lat" numeric(9, 6) NOT NULL,
	"lon" numeric(9, 6) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_listed_by_id_users_id_fk" FOREIGN KEY ("listed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_address" ADD CONSTRAINT "property_address_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_enquiry" ADD CONSTRAINT "property_enquiry_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_enquiry" ADD CONSTRAINT "property_enquiry_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_favorites" ADD CONSTRAINT "property_favorites_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_favorites" ADD CONSTRAINT "property_favorites_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "property_location" ADD CONSTRAINT "property_location_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "property_owner_idx" ON "property" USING btree ("ownerId");--> statement-breakpoint
CREATE INDEX "property_listed_by__idx" ON "property" USING btree ("listed_by_id");--> statement-breakpoint
CREATE INDEX "property_price__idx" ON "property" USING btree ("price");--> statement-breakpoint
CREATE INDEX "property_bhk__idx" ON "property" USING btree ("bhk");--> statement-breakpoint
CREATE INDEX "property_baths__idx" ON "property" USING btree ("baths");--> statement-breakpoint
CREATE INDEX "property_area__idx" ON "property" USING btree ("area");--> statement-breakpoint
CREATE INDEX "property_type__idx" ON "property" USING btree ("type");--> statement-breakpoint
CREATE INDEX "property_created__idx" ON "property" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "property_title__idx" ON "property" USING btree ("title");--> statement-breakpoint
CREATE INDEX "property_description__idx" ON "property" USING btree ("description");--> statement-breakpoint
CREATE INDEX "property_address_property_id_idx" ON "property_address" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_address_locality_idx" ON "property_address" USING btree ("locality");--> statement-breakpoint
CREATE INDEX "property_address_city_idx" ON "property_address" USING btree ("city");--> statement-breakpoint
CREATE INDEX "property_address_state_idx" ON "property_address" USING btree ("state");--> statement-breakpoint
CREATE INDEX "property_amenities_property_id_idx" ON "property_amenities" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_amenities_name_idx" ON "property_amenities" USING btree ("name");--> statement-breakpoint
CREATE INDEX "property_details_property_id_idx" ON "property_details" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_details_possession_idx" ON "property_details" USING btree ("possessionStatus");--> statement-breakpoint
CREATE INDEX "property_details_listed_by_idx" ON "property_details" USING btree ("listedBy");--> statement-breakpoint
CREATE INDEX "property_details_furnished_idx" ON "property_details" USING btree ("furnishedStatus");--> statement-breakpoint
CREATE INDEX "property_enquiry_user_id_idx" ON "property_enquiry" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "property_enquiry_property_id_idx" ON "property_enquiry" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_enquiry_property_created_idx" ON "property_enquiry" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "property_favorites_unique_idx" ON "property_favorites" USING btree ("propertyId","userId");--> statement-breakpoint
CREATE INDEX "property_favorites_user_id_idx" ON "property_favorites" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "property_images_property_id_idx" ON "property_images" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_location_property_id_idx" ON "property_location" USING btree ("propertyId");--> statement-breakpoint
CREATE INDEX "property_location_geo_idx" ON "property_location" USING btree ("lat","lon");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");