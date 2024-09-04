import { Post } from '@/types/post'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const POSTS_PATH = join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
}

function checkFileExists(path: string) {
  try {
    fs.accessSync(path)
    return true
  } catch (error) {
    return false
  }
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '')
  let fullPath = join(POSTS_PATH, `${realSlug}.md`)
  if (!checkFileExists(fullPath)) {
    fullPath = join(POSTS_PATH, `${realSlug}.mdx`)
  }
  let fileContents = null
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8')
  } catch (error) {
    return null
  }
  const { data, content } = matter(fileContents)
  return { ...data, slug: realSlug, content } as Post
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
