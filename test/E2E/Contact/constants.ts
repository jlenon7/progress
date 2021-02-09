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
  ownerId: '1',
  serviceToken: 'mkp-697aa3b8-60a0-43c7-9330-9bcf90f83a0a',
  title: 'Meu email',
  contact: 'jlenon7@hotmail.com',
  type: 'email',
  token: new Token().generate('con'),
  status: 'actived',
}

const createPayload = {
  ownerId: '1',
  contact: 'jlenon7@hotmail.com',
  type: 'email',
}

export { apiRequest, payload, createPayload, apiKey, secret }
