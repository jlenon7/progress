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
  token: new Token().generate('atc'),
  title: 'Meu CPF',
  icon: 'icons/fontawesome',
  type: 'cpf',
  mime: {
    pathFront: {
      path: 'img-date-type',
      size: '10mb',
      originalName: 'original',
      extension: 'png',
    },
    pathBack: {
      path: 'img-date-type',
      size: '10mb',
      originalName: 'original',
      extension: 'png',
    },
  },
  document: {
    number: '09245710094',
    emission: new Date(),
    expirationDate: new Date(),
  },
  status: 'actived',
}

const createPayload = {
  ownerId: '1',
  title: 'Meu CPF',
  icon: 'icons/fontawesome',
  type: 'cpf',
  document: {
    number: '09245710094',
    emission: `${new Date()}`,
    expirationDate: `${new Date()}`,
  },
}

export { apiRequest, payload, createPayload, apiKey, secret }
