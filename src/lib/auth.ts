import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { CloudflareBindings } from "../config/bindings";
import { drizzle } from "drizzle-orm/d1";
import * as authSchema from "../db/schema/auth-schema";

export const auth = (env: CloudflareBindings): ReturnType<typeof betterAuth> => {
  const db = drizzle(env.DB);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: authSchema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    advanced: {
      database: {
        // don't use better-auth's default uuid generation
        // because we will use sql-lite's primary key integers
        generateId: false
      },
    },
  })
}
