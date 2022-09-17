import { Module } from '@nestjs/common';
import path from 'path';
import { I18nModule } from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      formatter: (template: string, ...args: any[]) => template,
      loaderOptions: {
        path: path.join(__dirname, '/data/'),
        watch: true,
      }
    }),
  ]
})
export class LocaleModule {}
