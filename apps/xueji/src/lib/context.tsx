import { Dispatch, SetStateAction, createContext } from 'react'

interface UIContext {
  isDemo: boolean | null
  setIsDemo: Dispatch<SetStateAction<boolean | null>>
}
// 示例：React Context
export const UIContext = createContext<UIContext>({
  isDemo: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  setIsDemo: () => { },
})
