import { InlineKeyboardButton } from 'typegram/markup';

export class KeyboardBuilder {
  private readonly rows = [[]];
  public rowIndex = 0;

  public add(button: InlineKeyboardButton): void {
    this.rows[this.rowIndex].push(button);
  }

  public addRow(): void {
    this.rows.push([]);
  }

  public create(): { inline_keyboard: InlineKeyboardButton[][] } {
    return {
      inline_keyboard: this.rows,
    };
  }
}
