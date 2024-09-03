import markdownStyles from './markdown-styles.module.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import getMdxSource from '@/lib/blog/mdx'
import CustomLink from './CustomLink'

type Props = {
  content: string
}

export async function PostBody({ content }: Props) {
  const components = {
    a: CustomLink,
    h1: (props) => (
      <h1 {...props} className="text-2xl">
        {props.children}
      </h1>
    ),
    TestComponent: (await import('./TestComponent')).default,
  }

  const source = getMdxSource(content, {})

  return (
    <div className="mx-auto max-w-4xl">
      {/* <MDXRemote
        source={`# Hello World
                [link](https://nextjs.org)
                <TestComponent name="next-mdx-remote" />
                This is from Server Components!
              `}
        components={{ ...components }}
      /> */}
      {/* 使用 remark 解析 markdown 文件*/}
      {/* <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} /> */}

      <MDXRemote {...source} components={{ ...components }} />
    </div>
  )
}

// export default function PostBody({ content }) {
//   return (
//     <div className="prose lg:prose-xl mx-auto max-w-2xl">
//       <div className="mb-6 block md:hidden">
//         {content.author.length ? (
//           <Avatar
//             name={`${content.author[0].firstName} ${content.author[0].lastName}`}
//             picture={content.author[0].profilePhoto}
//           />
//         ) : null}
//       </div>
//       <div className="mb-6 text-lg">
//         {content.postingDate !== 'now' ? (
//           <div className="mb-6 text-lg">
//             Posted <DateComponent dateString={content.postingDate} />
//           </div>
//         ) : null}
//       </div>
//       <ContentBlocks content={content.blogContent.json.content} />
//     </div>
//   )
// }
