CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobRole" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" timestamp NOT NULL,
	"mockId" varchar NOT NULL
);
