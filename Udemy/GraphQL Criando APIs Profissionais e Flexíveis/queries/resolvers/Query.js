const { usuarios, perfis } = require('../database/mock')

module.exports = {
  ola() {
    return 'retornar string obrigatoriamente'
  },
  horaAtual() {
      return new Date()
  },
  me(obj) {
      console.log(obj)
      return {
          id: 1,
          nome: 'João Lenon',
          email: 'jlenon7@hotmail.com',
          idade: 23,
          salario_real: 6000.00,
          vip: true,
      }
  },
  produtoEmDestaque() {
      return {
          nome: 'Notebook Gamer',
          preco: 4890.89,
          desconto: 0.5
      }
  },
  numerosMegaSena() {
      return Array(6).fill(0).map(() => parseInt(Math.random() * 60 + 1)).sort((a, b) => a - b)
  },
  usuarios() {
      return usuarios
  },
  usuario(_, { id }) {
      return usuarios.find(u => u.id === id)
  },
  perfis() {
      return perfis
  },
  perfil(_, { id }) {
      return perfis.find(p => p.id === id)
  }
}
