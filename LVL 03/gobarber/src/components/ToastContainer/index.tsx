import React from 'react'

import { Container } from './styles'

import Toast from './Toast'

import { ToastMessage } from '../../hooks/toast'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}

export default ToastContainer
