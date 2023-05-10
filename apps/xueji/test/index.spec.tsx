import { render } from '@testing-library/react'

import IndexPage from '../pages/index'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndexPage />)
    expect(baseElement).toBeTruthy()
  })
})
