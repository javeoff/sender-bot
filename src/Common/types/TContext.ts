import { Scenes } from 'telegraf';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TContext extends Scenes.SceneContext {
  i18n: {
    t(data: string, keys?: Record<string, string>): string;
  }
}
