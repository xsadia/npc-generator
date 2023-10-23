import type { Config } from "drizzle-kit";

export default {
  schema: "src/db/schema/*",
  out: "src/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "",
    authToken: "",
  },
} satisfies Config;
