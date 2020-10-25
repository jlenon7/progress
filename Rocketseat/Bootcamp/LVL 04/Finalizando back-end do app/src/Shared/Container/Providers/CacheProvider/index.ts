import { container } from 'tsyringe'

import ICacheProvider from './Models/ICacheProvider'
import RedisCacheProvider from './Implementations/RedisCacheProvider'

const providers = {
  redis: RedisCacheProvider,
}

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis)
