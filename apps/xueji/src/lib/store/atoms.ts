import { atom, selector } from 'recoil'

export const countState = atom({
  key: 'count',
  default: 0,
})

export const incrementCount = selector({
  key: 'incrementCount',
  get: ({ get }) => get(countState),
  set: ({ set }) => set(countState, (currCount) => currCount + 1),
})

export const decrementCount = selector({
  key: 'decrementCount',
  get: ({ get }) => get(countState),
  set: ({ set }) => set(countState, (currCount) => currCount - 1),
})

export type Point = [number, number]
export const dotsAtom = atom<Point[]>({
  key: 'dotsAtom',
  default: [],
})

export const drawingAtom = atom({
  key: 'drawingAtom',
  default: false,
})

export const stopDrawing = selector({
  key: 'stopDrawing',
  get: ({ get }) => get(drawingAtom),
  set: ({ set }) => set(drawingAtom, false),
})
export const startDrawing = selector({
  key: 'startDrawing',
  get: ({ get }) => get(drawingAtom),
  set: ({ set }) => set(drawingAtom, true),
})

export const handleMouseMove = selector({
  key: 'handleMouseMove',
  get: ({ get }) => get(dotsAtom),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  set: ({ get, set }, point) => set(dotsAtom, (prev) => (get(drawingAtom) ? [...prev, ...point] : prev)),
})
