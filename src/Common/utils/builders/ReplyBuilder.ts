import { Readable } from 'node:stream';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { CommonMessageBundle } from 'typegram/message';

import { TContext } from '@sendByBot/Common/types/TContext';
import { KeyboardBuilder } from '@sendByBot/Common/utils/builders/KeyboardBuilder';

export class ReplyBuilder {
  private text: string;
  private keyboardBuilder = new KeyboardBuilder();
  private keyboard: InlineKeyboardMarkup;
  private image: Readable;

  public setImage(image: Readable): void {
    this.image = image;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public setKeyboard(keyboard: InlineKeyboardMarkup): void {
    this.keyboard = keyboard;
  }

  public addCallbackButton(
    text: string,
    callbackData: string,
    rowIndex = 0,
  ): void {
    if (rowIndex > this.keyboardBuilder.rowIndex) {
      this.keyboardBuilder.addRow();
      return this.addCallbackButton(text, callbackData, rowIndex);
    }

    this.keyboardBuilder.add({
      text,
      callback_data: callbackData,
    });
  }

  public async send(ctx: TContext): Promise<CommonMessageBundle> {
    const initialOptions = {
      reply_markup: this.keyboard || this.keyboardBuilder.create(),
    };

    if (this.image) {
      return ctx.replyWithPhoto(
        { source: this.image },
        {
          caption: this.text,
          ...initialOptions,
        },
      );
    }

    return ctx.reply(this.text, initialOptions);
  }
}
