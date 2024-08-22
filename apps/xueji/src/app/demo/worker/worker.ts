import { pi } from '@xueji/utils'

addEventListener('message', (event: MessageEvent<number>) => {
  postMessage(pi(event.data))
})
