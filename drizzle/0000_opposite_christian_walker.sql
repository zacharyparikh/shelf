CREATE TABLE IF NOT EXISTS "ratings" (
	"movie_id" integer,
	"user_id" integer,
	"rating" text,
	"rated_at" timestamp,
	CONSTRAINT "ratings_movie_id_user_id_pk" PRIMARY KEY("movie_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "watchlisted_movies" (
	"movie_id" integer,
	"watchlist_id" integer,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "watchlisted_movies_movie_id_watchlist_id_pk" PRIMARY KEY("movie_id","watchlist_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "watchlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "watchlisted_movies" ADD CONSTRAINT "watchlisted_movies_watchlist_id_watchlists_id_fk" FOREIGN KEY ("watchlist_id") REFERENCES "public"."watchlists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
