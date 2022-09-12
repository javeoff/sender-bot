interface IBaseCallbackQueryCache {
  id: string;
}

interface ICallbackQueryStickerCache extends IBaseCallbackQueryCache {
  variant: 'sticker';
  uniqueStickerId: string;
}

interface ICallbackQueryImageCache extends IBaseCallbackQueryCache {
  variant: 'image';
  uniqueImageId: string;
}

interface ICallbackQueryVideoCache extends IBaseCallbackQueryCache {
  variant: 'video';
  uniqueVideoId: string;
}

export type ICallbackQueryCache = ICallbackQueryStickerCache
  | ICallbackQueryImageCache
  | ICallbackQueryVideoCache;
