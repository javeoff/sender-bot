import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

import { IPagesCache } from '@sendByBot/Cache/types/IPagesCache';

@Injectable()
export class CachePagesService {
  private readonly prefix: string = 'cache_pages_';

  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public get(userId: string): Promise<IPagesCache> {
    return this.cacheManager.get<IPagesCache>(this.prefix + userId);
  }

  public set(userId: string, data: IPagesCache, options?: CachingConfig): void {
    void this.cacheManager.set<IPagesCache>(this.prefix + userId, data, {
      ...options,
      ttl: 100,
    });
  }
}
