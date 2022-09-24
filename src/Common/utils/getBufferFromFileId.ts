import { TContext } from '@sendByBot/Common/types/TContext';

export const getBufferFromFileId = async (
  ctx: TContext,
  fileId: string,
): Promise<Buffer> => {
  const link = await ctx.tg.getFileLink(fileId);
  const response = await fetch(link);

  return Buffer.from(await response.arrayBuffer());
};
