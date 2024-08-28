'use client'

import { UIContext } from '../../lib/context'
import { FC, useEffect, useState } from 'react'

interface GlobalStateProps {
  children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const [isDemo, setIsDemo] = useState<boolean>(false)

  useEffect(() => {
    setIsDemo(true)
  }, [])

  return (
    <UIContext.Provider
      value={{
        isDemo,
        setIsDemo,
      }}>
      {children}
    </UIContext.Provider>
  )
}
