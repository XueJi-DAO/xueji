export type PromiseWithResolvers<T> = {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function polyfillPromiseWithResolvers() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!Promise.withResolvers) {
    // @ts-ignore
    Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
      let resolve: (value: T | PromiseLike<T>) => void
      let reject: (reason?: any) => void

      const promise = new Promise<T>((res, rej) => {
        resolve = res
        reject = rej
      })

      return { promise, resolve: resolve!, reject: reject! }
    }
  }
}
