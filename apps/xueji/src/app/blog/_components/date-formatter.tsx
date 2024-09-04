import { parseISO, format } from 'date-fns'
import { useFormatter, useNow } from 'next-intl'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const format = useFormatter()
  const now = useNow()
  const date = parseISO(dateString)
  // return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  return (
    <time dateTime={dateString}>
      {format.dateTime(date, 'long')} {format.relativeTime(date, now)}
    </time>
  )
}

// {new Date(item.meta.date).toLocaleDateString("cn", {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric",
// })}
export default DateFormatter
