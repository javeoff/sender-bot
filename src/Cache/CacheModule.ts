import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { CacheCallbackQueryService } from './services/CacheCallbackQueryService';
import { CacheScenesService } from './services/CacheScenesService';
import { CachePagesService } from './services/CachePagesService';
import * as redisStore from 'cache-manager-redis-store';
import { externalConfigService } from '../Config/services/ConfigService';
import { ConfigName } from '../Config/enums/ConfigName';

@Module({
  providers: [
    CacheCallbackQueryService,
    CacheScenesService,
    CachePagesService,
  ],
  exports: [
    CacheCallbackQueryService,
    CacheScenesService,
    CachePagesService,
  ],
  imports: [
    NestCacheModule.register({
      isGlobal: true,
      store: redisStore,

      host: externalConfigService.get(ConfigName.REDIS_HOST),
      // host: 'myredis',
      // host: 'localhost',
      // port: 6379,
      port: Number(externalConfigService.get(ConfigName.REDIS_PORT))
    })
  ],
})
export class CacheModule {}
