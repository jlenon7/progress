const { ApolloServer, gql } = require('apollo-server')

const perfis = [
    { id: 1, nome: 'comum' },
    { id: 2, nome: 'administrador' }
]

const usuarios = [{
        id: 1,
        nome: 'João Silva',
        email: 'jsilva@zemail.com',
        idade: 29,
        perfil_id: 1,
    },
    {
        id: 2,
        nome: 'Rafael Junior',
        email: 'rafajun@wemail.com',
        idade: 31,
        perfil_id: 2,
    },
    {
        id: 3,
        nome: 'Daniela Smith',
        email: 'danismi@uemail.com',
        idade: 24,
        perfil_id: 1,
    },
]

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
    
    type Perfil {
        id: Int
        nome: String
    }
    
    type Usuario {
        id: Int!
        nome: String
        email: String
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
    }
    
    # Pontos de entrada da API
    type Query {
        ola: String
        horaAtual: Date
        me: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
      salario(usuario) {
        return usuario.salario_real
      },
      perfil(usuario) {
          return perfis.find(p => p.id === usuario.perfil_id)
      }
    },
    Query: {
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
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
