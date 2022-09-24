interface IBaseScenesCache {
  messageId?: string;
  chatId?: string;
}

interface IVideoScenesCache extends IBaseScenesCache {
  videoId: string;
  thumbId: string;
  uniqueVideoId: string;
}

interface IImageScenesCache extends IBaseScenesCache {
  photoId: string;
  uniquePhotoId: string;
}

interface IStickerScenesCache extends IBaseScenesCache {
  stickerId: string;
  uniqueStickerId: string;
}

interface IRenameCodeScenesCache extends IBaseScenesCache {
  test: string;
}

export type IScenesCache =
  | IVideoScenesCache
  | IImageScenesCache
  | IStickerScenesCache
  | IRenameCodeScenesCache;
