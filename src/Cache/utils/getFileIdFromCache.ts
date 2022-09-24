import { ICallbackQueryCache } from '@sendByBot/Cache/types/ICallbackQueryCache';

export const getFileIdFromCache = (cache: ICallbackQueryCache): string => {
  switch (cache.variant) {
    case 'sticker':
      return cache.stickerId;
    case 'image':
      return cache.imageId;
    case 'video':
      return cache.videoId;
  }
};
