import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { ApiRequestContract } from '@secjs/core/build/Contracts/ApiRequestContract'

const apiRequest = {
  where: [{ key: 'status', value: 'actived' }],
  orderBy: [],
  includes: [],
} as ApiRequestContract

const apiKey =
  'jxU7OARiyRxzKfU7YPwrGcMTh3Ps3RCRtpFcG2Zefq3hUzSPB6dUhyDBuait5iUz'
const secret =
  'lXbujFkvi5z9HN24vH7GMivL1Br8VKCOnQeUgtfHGrXNwbxnrFiuAPTiiiYmqiIA'

const payload = {
  owner_id: '1',
  street: 'Rua mirandopolis',
  number: '408',
  district: 'Jardim IPÊ III',
  complement: 'Casa',
  city: 'Foz do Iguaçu',
  state: 'Parána',
  country: 'Brazil',
  zip_code: '85869676',
  service_token: 'mkp-697aa3b8-60a0-43c7-9330-9bcf90f83a0a',
  token: new Token().generate('adr'),
  status: 'actived',
}

const createPayload = {
  owner_id: '1',
  street: 'Rua mirandopolis',
  number: '408',
  district: 'Jardim IPÊ III',
  complement: 'Casa',
  city: 'Foz do Iguaçu',
  state: 'Parána',
  country: 'Brazil',
  zip_code: '85869676',
}

export { apiRequest, payload, createPayload, apiKey, secret }
