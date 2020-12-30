import React, { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup'

import { FiLogIn, FiMail } from 'react-icons/fi'

import { useToast } from '../../hooks/toast'

import { Link } from 'react-router-dom'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import getValidationErrors from '../../utils/getValidationErrors'

import { Container, Background, AnimationContainer, Content } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/apiClient'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        // recuperação de senha

        await api.post('/password/forgot', {
          email: data.email,
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de sneha, cheque sua caixa de entrada',
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
