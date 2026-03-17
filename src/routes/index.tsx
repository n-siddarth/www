import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allArticles } from "content";

import { env } from "#/env";

export const Route = createFileRoute("/")({ component: App });

function App() {
  let sortedArticles = allArticles.sort((a, b) => +b.published - +a.published);
  if (env.MODE === "production") {
    // If we are building for production, only show finalized articles
    sortedArticles = sortedArticles.filter((a) => a.finalized);
  }
  return (
    <main className="mx-auto w-4xl max-w-full p-6 md:p-8 lg:p-16">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">Hi 👋, I'm</p>
        <h4>Siddarth Narayanan</h4>
        <p className="text-sm text-muted">
          I am currently building{" "}
          <a href="https://tondova.com" target="_blank">
            Tondova <ArrowSquareOutIcon className="mb-px inline" />
          </a>
          , a knowledge management tool for interconnected thought. I am also a student at Rutgers
          University studying Computer Science. Starting July, I will be working full-time as a
          Software Engineer at Prudential.
        </p>
      </div>
      <div className="mt-20 flex flex-col gap-2">
        {sortedArticles.map((a) => (
          <div key={a._meta.path} className="flex flex-row items-center">
            <p className="w-32 text-muted">
              {Intl.DateTimeFormat("en-us", {
                dateStyle: "medium",
              }).format(a.published)}
            </p>
            <Link className="px-1.5 py-0.5" to="/article/$id" params={{ id: a._meta.path }}>
              <p>{a.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
