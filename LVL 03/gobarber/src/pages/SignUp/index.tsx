import React, { useCallback, useRef } from 'react'

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { useToast } from '../../hooks/toast'

import apiClient from '../../services/apiClient'

import { Link, useHistory } from 'react-router-dom'

import getValidationErrors from '../../utils/getValidationErrors'

import * as Yup from 'yup'

import { Container, Background, AnimationContainer, Content } from './styles'
import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await apiClient.post('/users', data)

        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer o login na aplicação',
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer o seu cadastro, tente novamente',
        })
      }
    },
    [addToast, history],
  )

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
