import { Hono } from "hono";
import { npcFactory } from "./lib/npc";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import * as schema from "./db/schema";

const app = new Hono();

app.get("/npc", async (c) => {
  const client = createClient({
    url: c.env?.DATABASE_URL as string,
    authToken: c.env?.DATABASE_AUTH_TOKEN as string,
  });

  const db = drizzle(client);

  const newNpc = npcFactory();
  const [npc] = await db
    .insert(schema.npcs)
    .values({ ...newNpc })
    .returning();

  return c.json(npc);
});

app.get("/npc/:id", async (c) => {
  const { id } = c.req.param();
  const client = createClient({
    url: c.env?.DATABASE_URL as string,
    authToken: c.env?.DATABASE_AUTH_TOKEN as string,
  });

  const db = drizzle(client, { schema });

  const npc = await db.query.npcs.findFirst({
    where: eq(schema.npcs.id, id),
  });

  if (!npc) {
    return c.json({ error: "NPC not found." }, 404);
  }

  return c.json(npc);
});

export default app;
