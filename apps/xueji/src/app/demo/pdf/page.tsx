import { polyfillPromiseWithResolvers } from '@xueji/utils'
import 'core-js/full/promise/with-resolvers.js'
polyfillPromiseWithResolvers()

import Sample from './Sample'

export default function Page() {
  return <Sample />
}
