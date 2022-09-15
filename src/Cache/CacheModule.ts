import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { CacheCallbackQueryService } from './services/CacheCallbackQueryService';
import { CacheScenesService } from './services/CacheScenesService';
import { CachePagesService } from './services/CachePagesService';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from '../Config/services/ConfigService';
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
    NestCacheModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          isGlobal: true,
          store: redisStore,
          host: configService.get(ConfigName.REDIS_HOST),
          port: Number(configService.get(ConfigName.REDIS_PORT))
        }
      },
      inject: [ConfigService],
    })
  ],
})
export class CacheModule {}
