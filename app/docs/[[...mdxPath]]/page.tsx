import type { Metadata } from "next";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export default async function Page(props: {
  params: Promise<{ mdxPath?: string[] }>;
}) {
  const Wrapper = getMDXComponents().wrapper;
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, metadata, sourceCode, toc } = result;

  return (
    <Wrapper metadata={metadata} sourceCode={sourceCode} toc={toc}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
