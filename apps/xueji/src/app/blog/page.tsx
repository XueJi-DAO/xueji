import Container from './_components/container'
import { HeroPost } from './_components/hero-post'
import { Intro } from './_components/intro'
import { MoreStories } from './_components/more-stories'
import Onboarding from './_components/onboarding'

import { getAllPosts } from '@/lib/blog/api'

export default async function Home() {
  const allPosts = getAllPosts()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Container>
        <Intro />
        {heroPost ? (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        ) : (
          <Onboarding />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  )
}
