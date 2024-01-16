import styled from 'styled-components'
import { ButtonIconSize, ThemeColor } from '../../globals/constants'

interface Props {
  onClick: () => void
  icon: React.ReactNode
  color: ThemeColor
  inCircle?: boolean
  size?: ButtonIconSize
  count?: number
}

export function ButtonIcon({
  icon,
  onClick,
  color = 'ecru',
  count = 0,
  inCircle = true,
  size = ButtonIconSize.medium,
}: Props) {
  return (
    <Container
      type="button"
      size={size}
      color={color}
      inCircle={inCircle}
      onClick={onClick}
    >
      {icon}
    </Container>
  )
}

const Container = styled.button<{
  inCircle: boolean
  color: ThemeColor
  size: number
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => (props.inCircle ? '50%' : '0')};
  background: ${(props) => props.inCircle && props.theme.colors[props.color]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  position: relative;
  padding: 0;
`
