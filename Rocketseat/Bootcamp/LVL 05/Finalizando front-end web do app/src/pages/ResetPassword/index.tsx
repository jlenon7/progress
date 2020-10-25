import React, { useCallback, useRef } from 'react'
import * as Yup from 'yup'

import { FiLock } from 'react-icons/fi'

import { useToast } from '../../hooks/toast'

import { useHistory, useLocation } from 'react-router-dom'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Background, AnimationContainer, Content } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/apiClient'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const location = useLocation()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha incorreta',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { password, password_confirmation } = data
        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password: password,
          password_confirmation: password_confirmation,
          token,
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        })
      }
    },
    [addToast, history, location.search],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />
            <Button type="submit">Alterar Senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
