import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

import { ICallbackQueryCache } from '@sendByBot/Cache/types/ICallbackQueryCache';

@Injectable()
export class CacheCallbackQueryService {
  private readonly prefix: string = 'cq';

  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public get(userId: string): Promise<ICallbackQueryCache> {
    return this.cacheManager.get<ICallbackQueryCache>(this.prefix + userId);
  }

  public set(
    userId: string,
    data: ICallbackQueryCache,
    options?: CachingConfig,
  ): void {
    void this.cacheManager.set<ICallbackQueryCache>(
      this.prefix + userId,
      data,
      options,
    );
  }
}
