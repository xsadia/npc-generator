import { sql } from "drizzle-orm";
import { v4 as uuidV4 } from "uuid";
import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const npcs = sqliteTable("npcs", {
  id: blob("id")
    .$default(() => uuidV4())
    .primaryKey(),
  gender: text("gender"),
  name: text("name"),
  surname: text("surname"),
  race: text("race"),
  appearance: text("appearance"),
  age: text("age"),
  build: text("build"),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});
