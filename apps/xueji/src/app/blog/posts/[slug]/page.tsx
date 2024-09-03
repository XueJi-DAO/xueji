import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog/api'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/blog/markdownToHtml'
import Alert from '../../_components/alert'
import Container from '../../_components/container'
import Header from '../../_components/header'
import { PostBody } from '../../_components/post-body'
import { PostHeader } from '../../_components/post-header'

type Params = {
  params: {
    slug: string
  }
}

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const content = await markdownToHtml(post.content || '')

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return notFound()
  }

  const title = `${post.title} | ${CMS_NAME}`

  return {
    title,
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
