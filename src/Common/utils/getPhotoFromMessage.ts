import { PhotoSize } from 'typegram';

import { TMessage } from '@sendByBot/Common/types/TMessage';

export const getPhotoFromMessage = (
  message: TMessage,
): PhotoSize | undefined => {
  if (!('photo' in message)) {
    return;
  }
  const [SMALL_PHOTO, MEDIUM_PHOTO, LARGE_PHOTO] = message.photo;

  return LARGE_PHOTO || MEDIUM_PHOTO || SMALL_PHOTO;
};
