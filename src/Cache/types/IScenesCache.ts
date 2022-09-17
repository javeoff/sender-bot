interface IVideoScenesCache {
  videoId: string;
  thumbId: string;
  uniqueVideoId: string;
}

interface IImageScenesCache {
  photoId: string;
  uniquePhotoId: string;
}

interface IStickerScenesCache {
  stickerId: string;
  uniqueStickerId: string;
}

interface IRenameCodeScenesCache {
  test: string;
}

export type IScenesCache =
  | IVideoScenesCache
  | IImageScenesCache
  | IStickerScenesCache
  | IRenameCodeScenesCache;
