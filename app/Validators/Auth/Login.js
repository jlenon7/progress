'use strict'

class Login {
  get rules() {
    return {
      // validation rules
      email: 'required|email',
      password: 'required',
    }
  }

  get messages() {
    return {
      'email.required': 'O email é obrigatório',
      'email.email': 'O valor informado no campo email não é um email',
      'password.required': 'A senha é obrigatória',
    }
  }
}

module.exports = Login
