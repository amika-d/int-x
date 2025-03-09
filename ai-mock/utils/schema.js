import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobRole: varchar("jobRole").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});
