import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/Models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/Models/IMailProvider'
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
  container.resolve(EtherealMailProvider),
)
