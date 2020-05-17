import React, { useCallback, useRef } from 'react'
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
// eslint-disable-next-line no-unused-vars
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErros'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

import logoImg from '../../assets/logo.png'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        // await signIn({ email: data.email, password: data.password })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais'
        )
      }
    }, [])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Faça seu login</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                // eslint-disable-next-line no-unused-expressions
                passwordInputRef.current?.focus()
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                // eslint-disable-next-line no-unused-expressions
                formRef.current?.submitForm()
              }}
            />

            <Button
              onPress={() => {
                // eslint-disable-next-line no-unused-expressions
                formRef.current?.submitForm()
              }}
            >
              Entrar
            </Button>
          </Form>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000"/>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  )
}

export default SignIn
