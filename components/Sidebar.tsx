"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Writing Docs", href: "/docs/writing-docs" },
      { title: "Components", href: "/docs/components" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Configuration", href: "/docs/configuration" },
      { title: "CLI", href: "/docs/cli" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/docs") {
    return pathname === "/docs";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-zinc-200 bg-white/85 md:min-h-screen md:w-72 md:shrink-0 md:border-r md:border-b-0 md:bg-white/70">
      <div className="sticky top-0 px-5 py-6 backdrop-blur">
        <Link
          href="/"
          className="inline-flex text-sm font-semibold tracking-[0.22em] text-zinc-500 uppercase transition-colors hover:text-zinc-900"
        >
          My Docs
        </Link>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-900">Documentation</p>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            A simple left navigation menu for your docs site.
          </p>
        </div>

        <nav className="mt-6 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActiveLink(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center rounded-xl px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-zinc-900 text-white shadow-sm"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
