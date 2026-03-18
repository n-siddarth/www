import { ArrowSquareOutIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
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
    <main className="mx-auto flex h-screen w-4xl max-w-full flex-col gap-6 p-6 pb-0 md:p-8 lg:p-16">
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
      <div className="mt-20 flex grow flex-col gap-2">
        {sortedArticles.map((a) => (
          <div key={a._meta.path} className="flex flex-row items-center">
            <p className="w-32 text-muted">
              {Intl.DateTimeFormat("en-us", {
                dateStyle: "medium",
              }).format(a.published)}
            </p>
            <Link to="/article/$id" params={{ id: a._meta.path }}>
              <p>{a.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center gap-3 text-sm text-muted">
        <a
          href="https://linkedin.com/in/siddarth-narayanan1"
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedinLogoIcon className="inline" /> @siddarth-narayanan1
        </a>
        <a href="https://github.com/n-siddarth" target="_blank" rel="noreferrer noopener">
          <GithubLogoIcon className="inline" /> @n-siddarth
        </a>
        <a
          className="ml-auto"
          href="https://github.com/n-siddarth/www"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubLogoIcon className="inline" /> Source
        </a>
      </div>
    </main>
  );
}
