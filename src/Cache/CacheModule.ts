import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@sendByBot/Config/services/ConfigService';
import { CachePagesService } from '@sendByBot/Cache/services/CachePagesService';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { CacheCallbackQueryService } from '@sendByBot/Cache/services/CacheCallbackQueryService';
import { CacheScenesService } from '@sendByBot/Cache/services/CacheScenesService';
import redisStore from 'cache-manager-redis-store';

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
