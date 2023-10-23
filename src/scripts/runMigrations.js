const { createClient } = require("@libsql/client");
const { migrate } = require("drizzle-orm/libsql/migrator");
const { join } = require("path");
const { readdir } = require("fs");
const { drizzle } = require("drizzle-orm/libsql");

const run = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: pnpm parse:csv <file_name> ...");
    process.exit(1);
  }
  const client = createClient({
    url: args[0],
    authToken: args[1],
  });

  const db = drizzle(client);
  await migrate(db, {
    migrationsFolder: join(process.cwd(), "src", "db", "migrations"),
  });
  console.log("done");
};

run();
