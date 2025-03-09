import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const mockInterview = pgTable("mockInterview", {
	id: serial().primaryKey().notNull(),
	jsonMockResp: text().notNull(),
	jobRole: varchar().notNull(),
	jobDesc: varchar().notNull(),
	createdBy: varchar().notNull(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	mockId: varchar().notNull(),
});
