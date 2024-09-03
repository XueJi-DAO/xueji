import { ProductsClient } from './ProductsClient'
import { ProductRSC } from './ProductRSC'

export default async function Home() {
  return (
    <>
      <article>
        <h2>
          Latest mission: <ProductRSC />
        </h2>
      </article>
      <article>
        <h2>Five Rockets:</h2>
        <ProductsClient />
      </article>
    </>
  )
}
