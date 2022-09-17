import { TMessage } from '@sendByBot/Common/types/TMessage';

type TMessageWithContent = TMessage & { text: string };

export const isMessageWithText = (
  message: unknown,
): message is TMessageWithContent => {
  return typeof message === 'object' && 'text' in message;
};
