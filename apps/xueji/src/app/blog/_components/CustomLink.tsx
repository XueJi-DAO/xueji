'use client'

import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <>
      <Link as={as} href={href} legacyBehavior>
        <a {...otherProps} className="font-bold" />
      </Link>
    </>
  )
}
