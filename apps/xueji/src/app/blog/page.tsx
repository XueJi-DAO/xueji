import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CustomLink from './_components/CustomLink'
import Container from './_components/container'
import { HeroPost } from './_components/hero-post'
import { Intro } from './_components/intro'
import { MoreStories } from './_components/more-stories'
import { getAllPosts } from '@/lib/blog/api'

export default async function Home() {
  const components = {
    a: CustomLink,
    h1: (props) => (
      <h1 {...props} className="text-2xl">
        {props.children}
      </h1>
    ),
    TestComponent: (await import('./_components/TestComponent')).default,
  }

  const allPosts = getAllPosts()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <MDXRemote
          source={`# Hello World
          [link](https://nextjs.org)
          <TestComponent name="next-mdx-remote" />
          This is from Server Components!
        `}
          components={{ ...components }}
        />
      </Suspense>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  )
}
