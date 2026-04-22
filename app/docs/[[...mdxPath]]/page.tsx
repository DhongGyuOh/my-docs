import Link from "next/link";
import { getPageMap } from "nextra/page-map";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type { PageMapItem } from "nextra";

type DocsPageProps = {
  params: Promise<{
    mdxPath?: string[];
  }>;
};

type NavPage = {
  route: string;
  title: string;
};

export const generateStaticParams = generateStaticParamsFor("mdxPath");

function isFolder(item: PageMapItem): item is Extract<PageMapItem, { children: PageMapItem[] }> {
  return "children" in item;
}

function isPage(item: PageMapItem): item is Extract<PageMapItem, { route: string; name: string }> {
  return "route" in item && "name" in item;
}

function getItemTitle(item: PageMapItem) {
  if ("title" in item && typeof item.title === "string") {
    return item.title;
  }

  if ("frontMatter" in item && item.frontMatter && typeof item.frontMatter.title === "string") {
    return item.frontMatter.title;
  }

  if ("name" in item) {
    return item.name === "index"
      ? "Overview"
      : item.name.charAt(0).toUpperCase() + item.name.slice(1);
  }

  return "Untitled";
}

function flattenPages(items: PageMapItem[]): NavPage[] {
  const pages: NavPage[] = [];

  for (const item of items) {
    if (isFolder(item)) {
      pages.push(...flattenPages(item.children));
      continue;
    }

    if (isPage(item)) {
      pages.push({
        route: item.route,
        title: getItemTitle(item),
      });
    }
  }

  return pages;
}

function renderSidebar(items: PageMapItem[], currentRoute: string, depth = 0): React.ReactNode {
  return (
    <ul className={depth === 0 ? "space-y-2" : "mt-2 space-y-2 border-l border-zinc-200/80 pl-4"}>
      {items.map((item, index) => {
        if (isFolder(item)) {
          return (
            <li key={`${item.route}-${index}`}>
              <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-zinc-400 uppercase">
                  {getItemTitle(item)}
                </p>
                {renderSidebar(item.children, currentRoute, depth + 1)}
              </div>
            </li>
          );
        }

        if (!isPage(item)) {
          return null;
        }

        const active = currentRoute === item.route;

        return (
          <li key={item.route}>
            <Link
              href={item.route}
              className={`block rounded-2xl border px-4 py-3 text-sm transition ${
                active
                  ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_16px_30px_rgba(24,24,27,0.16)]"
                  : "border-zinc-200/80 bg-white/70 text-zinc-700 backdrop-blur hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white"
              }`}
            >
              {getItemTitle(item)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { mdxPath } = await params;
  const segments = mdxPath ?? [];
  const currentRoute = `/docs${segments.length ? `/${segments.join("/")}` : ""}`;

  const [{ default: MDXContent, metadata, toc }, pageMap] = await Promise.all([
    importPage(segments),
    getPageMap("/docs"),
  ]);

  const pages = flattenPages(pageMap);
  const currentIndex = pages.findIndex((page) => page.route === currentRoute);
  const previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage =
    currentIndex >= 0 && currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fff8df_0%,#f7f0e4_36%,#dde9eb_68%,#f3efe7_100%)] text-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-6rem] left-[-5rem] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute top-20 right-[-5rem] h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(24,24,27,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-6 md:px-8 lg:px-10">
        <header className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/50 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.35em] text-zinc-400 uppercase">
              Documentation
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
              {metadata.title}
            </h1>
            {metadata.description ? (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">
                {metadata.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-zinc-900/10 bg-white/75 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Back Home
            </Link>
            <Link
              href="/docs"
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Docs Index
            </Link>
          </div>
        </header>

        <div className="grid flex-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_240px]">
          <aside className="xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="mb-4 border-b border-zinc-200/80 pb-4">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
                  Browse
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Move through the docs with a calmer, cleaner reading flow.
                </p>
              </div>
              <nav className="h-[calc(100%-5.5rem)] overflow-y-auto pr-1">
                {renderSidebar(pageMap, currentRoute)}
              </nav>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-[2.25rem] border border-white/75 bg-white/60 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.09)] backdrop-blur md:px-10 md:py-10">
              <div className="flex flex-col gap-5 border-b border-zinc-200/80 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-zinc-400 uppercase">
                    {currentRoute}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
                    {metadata.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
                  <span className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5">
                    {pages.length} pages mapped
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5">
                    Nextra + Next.js
                  </span>
                </div>
              </div>

              <article className="nextra-content mt-8 max-w-none">
                <MDXContent params={{ mdxPath: segments }} />
              </article>

              {(previousPage || nextPage) && (
                <div className="mt-10 grid gap-4 border-t border-zinc-200/80 pt-8 md:grid-cols-2">
                  {previousPage ? (
                    <Link
                      href={previousPage.route}
                      className="rounded-[1.75rem] border border-zinc-200/80 bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white"
                    >
                      <p className="text-[11px] font-semibold tracking-[0.24em] text-zinc-400 uppercase">
                        Previous
                      </p>
                      <p className="mt-3 text-lg font-semibold text-zinc-950">
                        {previousPage.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextPage ? (
                    <Link
                      href={nextPage.route}
                      className="rounded-[1.75rem] border border-zinc-200/80 bg-zinc-950 p-5 text-white transition hover:-translate-y-1 hover:bg-zinc-800"
                    >
                      <p className="text-[11px] font-semibold tracking-[0.24em] text-zinc-400 uppercase">
                        Next
                      </p>
                      <p className="mt-3 text-lg font-semibold">{nextPage.title}</p>
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </section>

          <aside className="hidden xl:block xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="mb-4 border-b border-zinc-200/80 pb-4">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-zinc-400 uppercase">
                  On This Page
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Jump directly to the important sections.
                </p>
              </div>

              <ul className="space-y-2">
                {toc.length === 0 ? (
                  <li className="rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3 text-sm text-zinc-500">
                    This page is short and does not need a table of contents.
                  </li>
                ) : (
                  toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-2xl border border-zinc-200/80 bg-white/70 px-4 py-3 text-sm text-zinc-700 transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        {typeof item.value === "string" ? item.value : item.id}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
