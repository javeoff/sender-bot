import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

import { IScenesCache } from '@sendByBot/Cache/types/IScenesCache';

@Injectable()
export class CacheScenesService {
  private readonly prefix: string = 'sc';

  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public get(userId: string): Promise<IScenesCache> {
    return this.cacheManager.get<IScenesCache>(this.prefix + userId);
  }

  public async set(
    userId: string,
    data: IScenesCache,
    options?: CachingConfig,
  ): Promise<void> {
    await this.cacheManager.set<IScenesCache>(
      this.prefix + userId,
      data,
      options,
    );
  }
}
