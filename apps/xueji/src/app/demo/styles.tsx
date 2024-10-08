import { css, Global, Keyframes, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0 1rem;
      }
    `}
  />
)

export const basicStyles = css({
  backgroundColor: 'white',
  color: 'cornflowerblue',
  border: '1px solid lightgreen',
  borderRight: 'none',
  borderBottom: 'none',
  boxShadow: '5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow',
  transition: 'all 0.1s linear',
  margin: '3rem 0',
  padding: '1rem 0.5rem',
})

// export const basicStyles = css`
//   background-color: white;
//   color: cornflowerblue;
//   border: 1px solid lightgreen;
//   border-right: none;
//   border-bottom: none;
//   box-shadow:
//     5px 5px 0 0 lightgreen,
//     10px 10px 0 0 lightyellow;
//   transition: all 0.1s linear;
//   margin: 1rem 0;
//   padding: 1rem 0.5rem;
// `

export const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow:
      -15px -15px 0 0 aqua,
      -30px -30px 0 0 cornflowerblue;
  }
`
export const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

export const Basic = styled.div`
  ${basicStyles};
`

export const Combined = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`

type AnimatedProps = {
  animation: Keyframes
}

export const Animated = styled.div<AnimatedProps>`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${({ animation }) => animation} 0.2s infinite ease-in-out alternate;
`
