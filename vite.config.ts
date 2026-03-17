import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    ignorePatterns: ["routeTree.gen.ts"],
    sortImports: { order: "asc" },
    sortTailwindcss: { stylesheet: "./src/styles.css" },
  },
  plugins: [
    contentCollections(),
    devtools(),
    nitro(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    { enforce: "pre", ...mdx() },
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});

export default config;
