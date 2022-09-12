import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { IScenesCache } from '../types/IScenesCache';

@Injectable()
export class CacheScenesService {
  private readonly prefix: string = 'sc';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  get(userId: string): Promise<IScenesCache> {
    return this.cacheManager.get<IScenesCache>(this.prefix + userId);
  }

  set(userId: string, data: IScenesCache, options?: CachingConfig): void {
    void this.cacheManager.set<IScenesCache>(this.prefix + userId, data, options);
  }
}
