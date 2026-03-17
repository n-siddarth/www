import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import z from "zod";

const articles = defineCollection({
  name: "article",
  directory: "content/article",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().array().min(1),
    published: z.string().transform((v) => new Date(v)),
    finalized: z.boolean(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  content: [articles],
});
