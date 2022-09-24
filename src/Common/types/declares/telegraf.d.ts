import { InputFile as FileInput } from 'typegram';

declare module 'telegraf/types' {
  type InputFile = FileInput;
}
