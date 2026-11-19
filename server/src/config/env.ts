import { config } from "dotenv";
config();

import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DATABASE_URL_TEST: z.string().optional().or(z.literal("")),
  PORT: z.string().default("4000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

type Env = z.infer<typeof schema>;

function parseEnv(): Env {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error(
      "❌ Missing or invalid environment variables:\n",
      JSON.stringify(result.error.flatten().fieldErrors, null, 2)
    );
    process.exit(1);
  }
  return result.data;
}

export const env = parseEnv();
