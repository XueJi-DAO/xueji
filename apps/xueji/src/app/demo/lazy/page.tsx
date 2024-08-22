'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Client Components:
const ComponentA = dynamic(() => import('../../../components/demo/A'))
const ComponentB = dynamic(() => import('../../../components/demo/B'))
const ComponentC = dynamic(() => import('../../../components/demo/C'), { ssr: false })

// const WithCustomLoading = dynamic(() => import('../components/WithCustomLoading'), {
//   loading: () => <p>Loading...</p>,
// })

// Importing Named Exports
// const ClientComponent = dynamic(() => import('../components/ClientComponent').then((mod) => mod.Hello))

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div>
      {/* Load immediately, but in a separate client bundle */}
      <ComponentA />

      {/* Load on demand, only when/if the condition is met */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>

      {/* Load only on the client side */}
      <ComponentC />

      {/* <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default;
          const fuse = new Fuse(names);

          setResults(fuse.search(value));
        }}
      /> */}
    </div>
  )
}
