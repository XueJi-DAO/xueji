import Avatar from './avatar'
import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import { PostTitle } from './post-title'
import { type Author } from '@/types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  words: number
  readTime: number
}

export function PostHeader({ title, coverImage, date, author, words, readTime }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-12 flex ">
        <p className="mr-12 mt-2 text-[13px] text-gray-500 dark:text-gray-300">字数：{words}</p>
        <p className="mt-2 text-[13px] text-gray-500 dark:text-gray-300">预计阅读时间：{readTime}分钟</p>
      </div>
      <div className="hidden md:mb-12 md:block">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 block md:hidden">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg text-gray-500">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
