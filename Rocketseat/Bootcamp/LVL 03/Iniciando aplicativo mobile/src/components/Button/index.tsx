import React from 'react'
import { Container, ButtonText } from './styles'

import { RectButtonProperties } from 'react-native-gesture-handler'

interface ButtonProps extends RectButtonProperties {
  children: string
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
)

export default Button
