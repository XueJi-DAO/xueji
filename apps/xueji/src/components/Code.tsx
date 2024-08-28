import styles from './styles.module.scss'

type CodeProps = {
  children: React.ReactNode
}

export default function Code({ children }: CodeProps) {
  return <code className={styles.inlineCode}>{children}</code>
}
