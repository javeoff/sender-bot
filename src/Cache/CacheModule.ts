import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { CacheCallbackQueryService } from './services/CacheCallbackQueryService';
import { CacheScenesService } from './services/CacheScenesService';
import * as redisStore from 'cache-manager-redis-store';
import { CachePagesService } from './services/CachePagesService';

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

      host: 'myredis',
      // host: 'localhost',
      port: 6379,
    }),
  ],
})
export class CacheModule {}
