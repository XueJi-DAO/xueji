import { serialize } from 'next-mdx-remote/serialize'

export default async function getMdxSource(content, scope) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope,
  })
  console.log('====', mdxSource)
  return mdxSource
}
