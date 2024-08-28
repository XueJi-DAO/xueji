/** @jsxImportSource @emotion/react */

import Link from 'next/link'
import Button from '@mui/material/Button'
import styles from './ui.module.scss'

/* eslint-disable-next-line */
export interface MetaUiProps { }

export function MetaUi(props: MetaUiProps) {
  return (
    <div>
      <h1 className="mb-2 bg-gray-600 text-white">Welcome to Meta Ui!</h1>
      <Button variant="contained">Mui Button</Button>
      <Button variant="contained" component={Link} href="/">
        Go to the home page
      </Button>
      <div className={styles.hello}>I am being styled using SCSS Modules!</div>
    </div>
  )
}

export default MetaUi
