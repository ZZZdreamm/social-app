import { ThemeProvider as Provider } from 'styled-components'
import { theme } from './constants'


interface Props {
  children: React.ReactNode
}
export default function ThemeProvider({ children }: Props) {
  return <Provider theme={theme}>{children}</Provider>
}
