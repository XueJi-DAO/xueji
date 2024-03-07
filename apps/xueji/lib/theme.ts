import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
// import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3377dd',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#cfc2ae', //'#e5e5e5',
    },
    divider: 'rgba(88,88,88,0.12)',
    text: {
      primary: 'rgba(18,18,18,0.87)',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
