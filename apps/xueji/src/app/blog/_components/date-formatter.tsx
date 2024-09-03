import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

// {new Date(item.meta.date).toLocaleDateString("cn", {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric",
// })}
export default DateFormatter
