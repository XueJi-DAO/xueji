import { polyfillPromiseWithResolvers } from '@xueji/utils'
// eslint-disable-next-line import/no-unresolved
import 'core-js/full/promise/with-resolvers.js'
polyfillPromiseWithResolvers()

import Sample from './Sample'

export default function Page() {
  return <Sample />
}
