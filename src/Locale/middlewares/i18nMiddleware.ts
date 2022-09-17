import path from 'node:path';
import TelegrafI18n from 'telegraf-i18n';

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  allowMissing: false,
  useSession: true,
  directory: path.resolve(__dirname, '../data'),
});

export const i18nMiddleware = i18n.middleware();
