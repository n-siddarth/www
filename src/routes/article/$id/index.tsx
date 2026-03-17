import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { allArticles } from "content";
import type { HTMLProps } from "react";

import { CodeBlock } from "#/components/mdx";
import { NotFoundArticle } from "#/components/not-found-article";
import { env } from "#/env";
import { getCollectionEntry } from "#/lib/get-collection-entry";

import styles from "./styles.css?url";

export const Route = createFileRoute("/article/$id/")({
  loader: ({ params: { id } }) => {
    const article = getCollectionEntry(allArticles, id);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? [
            { title: `${loaderData.article.title} | ${loaderData.article.author.join(", ")}` },
            { name: "description", content: loaderData.article.description },

            // Open Graph
            { property: "og:title", content: loaderData.article.title },
            { property: "og:description", content: loaderData.article.description },
            { property: "og:type", content: "article" },

            // Twitter
            { property: "twitter:card", content: "summary" },
            { property: "twitter:title", content: loaderData.article.title },
            { property: "twitter:description", content: loaderData.article.description },
            { property: "twitter:type", content: "article" },
          ]
        : [],
      links: [
        {
          rel: "stylesheet",
          href: styles,
        },
      ],
    };
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFoundArticle />,
});

function RouteComponent() {
  const { article } = Route.useLoaderData();

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1>{article.title}</h1>
        <div className="flex flex-row items-center gap-2 text-sm text-muted">
          <p>{article.author.join(", ")}</p>|
          <p>
            {Intl.DateTimeFormat("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(article.published)}
          </p>
        </div>
      </div>
      <hr className="text-border-card" />
      <div className="article">
        <MDXContent
          code={article.mdx}
          components={{
            a: (props) => {
              const url = new URL(props.href, env.VITE_SITE_URL);
              // Ensure proper rel and target if linking to external site
              if (url.origin !== env.VITE_SITE_URL) {
                return <a {...props} rel="noreferrer noopener" target="_blank" />;
              }
              return <a {...props} />;
            },
            pre: (props: HTMLProps<HTMLPreElement>) => {
              const codeChild = props.children;
              // @ts-expect-error
              const code = codeChild.props.children.trim() || "";
              // @ts-expect-error
              const language = codeChild.props.className.replace("language-", "") || "text";
              if (!code && !language) return <pre {...props} />;
              return <CodeBlock lang={language} code={code} />;
            },
          }}
        />
      </div>
    </>
  );
}
