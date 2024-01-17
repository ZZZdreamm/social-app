import { styled } from 'styled-components'
import { ThemeColor, theme } from '../../globals/constants'

export interface TextProps {
  fontSize?: number
  fontWeight?: 'bold' | 'normal' | 'light'
  color?: ThemeColor
  lineHeight?: number
  isUnderlined?: boolean
  opacity?: number
  children: React.ReactNode
}

const weight = {
  bold: 800,
  normal: 600,
  light: 400,
}

export function Text({
  fontSize = 14,
  fontWeight,
  color,
  lineHeight = 100,
  isUnderlined = false,
  opacity = 1,
  children,
  ...props
}: TextProps) {
  return (
    <ContentContainer
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      lineHeight={lineHeight}
      isUnderlined={isUnderlined}
      opacity={opacity}
      {...props}
    >
      {children}
    </ContentContainer>
  )
}

const ContentContainer = styled.div<TextProps>`
  display: inline-block;
  line-height: ${(props) => props.lineHeight}%;
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => weight[props.fontWeight || 'normal']};
  font-family:
    PP Mori,
    sans-serif;
  color: ${({ color }) => (color ? theme.colors[color] : 'black')};
  text-decoration: ${(props) => (props.isUnderlined ? 'underline' : 'none')};
  opacity: ${(props) => props.opacity};
`
