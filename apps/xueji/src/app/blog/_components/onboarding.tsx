'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export default function Onboarding() {
  const target = useSyncExternalStore(
    emptySubscribe,
    () => (window.top === window ? undefined : '_blank'),
    () => '_blank',
  )

  return (
    <div className="grid grid-flow-row gap-6 py-60 text-center">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">No posts</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
      </div>

      <div>
        <Link
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="/blog"
          target={target}>
          <svg className="-ml-0.5 mr-1.5 size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Create Post
        </Link>
      </div>
    </div>
  )
}
