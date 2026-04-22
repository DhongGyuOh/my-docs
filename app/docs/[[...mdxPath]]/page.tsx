import { notFound } from 'next/navigation'
import { getPageMap } from 'nextra/page-map'
// import { useMDXComponents } from '@/components/mdx-components'

export default async function Page() {
  const pageMap = await getPageMap()

  if (!pageMap) return notFound()

  return <div>Docs Page</div>
}