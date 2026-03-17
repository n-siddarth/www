import z from "zod";

export const env = z
  .object({
    MODE: z.enum(["development", "production"]),
    VITE_SITE_URL: z.string(),
  })
  .parse(import.meta.env);
