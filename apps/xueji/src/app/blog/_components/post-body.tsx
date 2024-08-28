import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
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
