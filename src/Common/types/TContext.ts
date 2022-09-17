import { Scenes } from 'telegraf';

export interface TContext extends Scenes.SceneContext {
  i18n: {
    t(data: string, keys?: Record<string, string>): string;
  };
}
