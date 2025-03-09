import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://mock-int_owner:npg_QeDqES4La6fK@ep-delicate-poetry-a1jzw4rf-pooler.ap-southeast-1.aws.neon.tech/mock-int?sslmode=require',
  }
})
