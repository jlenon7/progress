const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date
    
    type User {
        id: ID!
        nome: String
        email: String
        idade: Int
        salario: Float
        vip: Boolean
    }
    
    # Pontos de entrada da API
    type Query {
        ola: String
        horaAtual: Date
        me: User
    }
`

const resolvers = {
    User: {
      salario(user) {

      }
    },
    Query: {
        ola() {
            return 'retornar string obrigatoriamente'
        },
        horaAtual() {
            return new Date()
        },
        me() {
            return {
                id: 1,
                nome: 'João Lenon',
                email: 'jlenon7@hotmail.com',
                idade: 23,
                salario: 6000.00,
                vip: true,
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
