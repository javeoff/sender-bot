interface IBaseCallbackQueryCache {
  id: string;
  messageId?: string;
  chatId?: string;
}

interface ICallbackQueryStickerCache extends IBaseCallbackQueryCache {
  variant: 'sticker';
  uniqueStickerId: string;
  stickerId: string;
}

interface ICallbackQueryImageCache extends IBaseCallbackQueryCache {
  variant: 'image';
  imageId: string;
  uniqueImageId: string;
}

interface ICallbackQueryVideoCache extends IBaseCallbackQueryCache {
  variant: 'video';
  videoId: string;
  uniqueVideoId: string;
}

export type ICallbackQueryCache =
  | ICallbackQueryStickerCache
  | ICallbackQueryImageCache
  | ICallbackQueryVideoCache;
