import { Scenes } from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

export interface TContext extends Scenes.SceneContext {
  i18n: TelegrafI18n;
}
