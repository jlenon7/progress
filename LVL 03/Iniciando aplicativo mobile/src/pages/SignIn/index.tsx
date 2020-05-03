import React from 'react'
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu login</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail"/>
            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={() => { console.log('Deu') }}>Entrar</Button>
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
    </>
  )
}

export default SignIn
