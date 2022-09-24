import TelegrafTest from 'telegraf-test';

import { loadDotenv } from '@sendByBot/Common/utils/loadDotenv';

loadDotenv();

test('testing bot execution', async () => {
  const test = new TelegrafTest({
    url: `http://127.0.0.1:3001/secret`,
    token: process.env.BOT_TOKEN,
  });

  await test.startServer();

  test.setUser({
    id: 1_047_424_072,
    username: '@daniil_jave',
  });

  test.setChat({
    id: 1_047_424_072,
    type: 'sender',
  });

  const msg = await test.sendMessageWithText('/help');

  console.log(msg);

  expect(msg.data.text).toBe('test log');
});
