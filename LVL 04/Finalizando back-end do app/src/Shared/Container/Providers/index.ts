import { container } from 'tsyringe'
import mailConfig from '@Config/mail'

import IStorageProvider from './StorageProvider/Models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/Models/IMailProvider'
import SESMailProvider from './MailProvider/Implementations/SESMailProvider'
import EtherealMailProvider from './MailProvider/Implementations/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/Models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/Implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
)
