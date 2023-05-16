import { render } from '@testing-library/react'

import MetaUi from './meta-ui'

describe('MetaUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetaUi />)
    expect(baseElement).toBeTruthy()
  })
})
