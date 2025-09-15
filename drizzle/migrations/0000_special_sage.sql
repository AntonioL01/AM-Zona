CREATE TABLE "carImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"carListingId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "carListing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listingTitle" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"price" varchar(50) NOT NULL,
	"category" varchar(100) NOT NULL,
	"condition" varchar(100) NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" varchar(10) NOT NULL,
	"driveType" varchar(100) NOT NULL,
	"transmission" varchar(50) NOT NULL,
	"fuelType" varchar(50) NOT NULL,
	"mileage" varchar(20) NOT NULL,
	"engineSize" varchar(50),
	"power" varchar(10),
	"color" varchar(50) NOT NULL,
	"door" varchar(10) NOT NULL,
	"vin" varchar(100),
	"offerType" varchar(50) NOT NULL,
	"listingDescription" varchar(1000) NOT NULL,
	"county" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"phoneNumber" varchar(30) NOT NULL,
	"features" json,
	"createdBy" varchar(255) NOT NULL,
	"postedOn" varchar(50)
);
--> statement-breakpoint
ALTER TABLE "carImages" ADD CONSTRAINT "carImages_carListingId_carListing_id_fk" FOREIGN KEY ("carListingId") REFERENCES "public"."carListing"("id") ON DELETE no action ON UPDATE no action;