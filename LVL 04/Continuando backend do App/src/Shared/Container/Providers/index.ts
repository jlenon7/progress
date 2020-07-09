import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/Models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/Models/IMailProvider'
import EtherealMailProvider from './MailProvider/Implementations/EtherealMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
)
