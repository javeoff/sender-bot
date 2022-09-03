import { Telegraf } from 'telegraf';
import { UsersDatabase } from './db';

const cacheMap = new Map();

const getUserCache = (userId: string) => {
  const cache = cacheMap.get(userId)
  if (!cache) {
    const initialCache = {
      code: '',
      stickerId: '',
      imageId: '',
    }
    cacheMap.set(userId, initialCache)
    return initialCache;
  }

  return cache;
};
const setUserCache = (userId: string, cache: Record<string, string>) => {
  cacheMap.set(userId, cache);
}

const BOT_TOKEN = '5665848467:AAG7RFhma-dnWXH1lwzm7UNngwRRPi-s5zY'
const bot = new Telegraf(BOT_TOKEN);
const usersDb = new UsersDatabase();

bot.on('text', (ctx) => {
  const messageContent = ctx.message.text;
  const userId = String(ctx.message.from.id);
  const user = usersDb.getUser(userId);

  if (user === undefined) {
    usersDb.addUser({
      id: userId,
      stickers: [],
      videos: [],
      images: [],
    })
    ctx.reply(`
      Добро пожаловать в BotSender! 
      Отправь мне видео, стикер или фото и придумай ему имя. 
      Я буду тебе отправлять твои медиафайлы по твоим названиям.
      Теперь больше не нужно качать мемы или искать любимые стикеры среди огромной кучи!
    `);
    return;
  }

  const userCache = getUserCache(userId);

  if (userCache.videoId && !userCache.code) {
    user.addVideo(ctx.message.text, userCache.videoId);
    cacheMap.delete(userId);
    ctx.reply('Видео успешно сохранено в базе!');
    return;
  }

  if (userCache.stickerId && !userCache.code) {
    user.addSticker(ctx.message.text, userCache.stickerId);
    cacheMap.delete(userId);
    ctx.reply('Стикер успешно сохранен в базе!');
    return;
  }

  if (userCache.imageId && !userCache.code) {
    user.addImage(ctx.message.text, userCache.imageId);
    cacheMap.delete(userId);
    ctx.reply('Изображение успешно сохранено в базе!');
    return;
  }

  const stickerId = user.getStickerId(messageContent)

  if (stickerId) {
    ctx.replyWithSticker(stickerId);
    return;
  }

  const videoId = user.getVideoId(messageContent);

  if (videoId) {
    ctx.replyWithVideo(videoId);
    return;
  }

  const imageId = user.getImageId(messageContent);

  if (imageId) {
    ctx.replyWithPhoto(imageId);
    return;
  }

  ctx.reply('Отправь мне любой медиафайл');
})

bot.on('sticker', (ctx) => {
  const userId = String(ctx.message.from.id);
  const stickerId = ctx.message.sticker.file_id;
  const userCache = getUserCache(userId);

  if (!userCache.code && !userCache.stickerId) {
    void ctx.reply('Отлично! Отправь код для стикера, чтобы я сохранил его в базу.')
    setUserCache(userId, {
      stickerId,
      code: '',
    })
    return;
  }
});

bot.on('video', (ctx) => {
  const userId = String(ctx.message.from.id);
  const videoId = String(ctx.message.video.file_id);
  const userCache = getUserCache(userId);

  if (!userCache.code && !userCache.videoId) {
    void ctx.reply('Отлично! Отправь код для видео, чтобы я сохранил его в базу.')
    setUserCache(userId, {
      videoId,
      code: '',
    })
    return;
  }
})

bot.on('photo', (ctx) => {
  const userId = String(ctx.message.from.id);
  const imageId = String(ctx.message.photo[0].file_id);
  const userCache = getUserCache(userId);

  if (!userCache.code && !userCache.videoId) {
    void ctx.reply('Отлично! Отправь код для фотографии, чтобы я сохранил ее в базу.')
    setUserCache(userId, {
      imageId,
      code: '',
    })
    return;
  }
})

void bot.launch();
