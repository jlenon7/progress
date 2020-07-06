import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/Models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/Implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)
