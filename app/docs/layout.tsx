import type { ReactNode } from "react";
import { getPageMap } from "nextra/page-map";
import { Layout } from "nextra-theme-docs";

export default async function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  return (
    <Layout
      docsRepositoryBase="https://github.com"
      editLink={null}
      feedback={{ content: null }}
      pageMap={pageMap}
      sidebar={{ defaultOpen: true }}
    >
      {children}
    </Layout>
  );
}
