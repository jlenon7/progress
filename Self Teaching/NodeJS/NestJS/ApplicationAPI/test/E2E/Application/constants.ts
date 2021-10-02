import { ApiRequestContract } from '@secjs/core/build/Contracts/ApiRequestContract'
import { Token } from '@secjs/core/build/Utils/Classes/Token'

const apiRequest = {
  where: [{ key: 'status', value: 'actived' }],
  orderBy: [],
  includes: [],
} as ApiRequestContract

const payload = {
  name: 'Make.pro',
  email: 'ti@make.pro.br',
  password: '12345678',
  prefix: 'mkp',
  token: new Token().generate('mkp'),
  status: 'actived',
}

const createPayload = {
  name: 'Make.pro',
  email: 'ti@make.pro.br',
  password: '12345678',
  prefix: 'mkp',
}

export { apiRequest, payload, createPayload }
