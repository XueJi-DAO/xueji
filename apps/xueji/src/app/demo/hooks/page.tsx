'use client'

import { useState } from 'react'
import Parent from './UseMemo'
import Counter from './UseReducer'
import MeasureExample, { ProductPage } from './UseCallback'
import { Stopwatch, VideoPlayer } from './UseRef'
import PasswordField from './UseId'
import ChatRoom, { PointerMove } from './UseEffect'

export default function Page() {
  const [isDark, setIsDark] = useState(false)
  return (
    <div>
      <h1 className="text-xl">React 内置 hooks 示例</h1>
      <h3>UseMemo 示例</h3>
      <Parent />
      <h3>UseReducer 示例</h3>
      <Counter />
      <h3>UseCallback 示例</h3>
      <MeasureExample />
      <label>
        <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
        Dark mode
      </label>
      <hr />
      <ProductPage referrer="wizard_of_oz" productId={123} theme={isDark ? 'dark' : 'light'} />
      <h3>UseRef 示例</h3>
      <Stopwatch />
      <VideoPlayer />
      <h3>UseId 示例</h3>
      <PasswordField />
      <h3>UseEffect 示例</h3>
      <ChatRoom />
      <PointerMove />
    </div>
  )
}
