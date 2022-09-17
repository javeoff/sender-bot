import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import path from 'node:path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      formatter: (template: string) => template,
      loaderOptions: {
        path: path.join(__dirname, '/data/'),
        watch: true,
      },
    }),
  ],
})
export class LocaleModule {}
