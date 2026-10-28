CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"author" text,
	"url" text,
	"likes" integer DEFAULT 0
);
