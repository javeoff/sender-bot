import { ErrorCode } from '../enums/ErrorCode';

export class SystemError<Data extends Record<string, unknown> = Record<string, unknown>> extends Error {
  public systemCode!: ErrorCode;

  public systemAdditionalData!: Data;

  public constructor(public readonly message: string = '') {
    super(message);

    this.name = 'SystemError';
  }
}
