import { Injectable } from '@nestjs/common';
import { SystemError } from '@sendByBot/SystemError/dto/SystemError';
import { ErrorCode } from '@sendByBot/SystemError/enums/ErrorCode';

@Injectable()
export class SystemErrorFactory {
  public create(
    errorCode: ErrorCode,
    message = '',
    data: Record<string, unknown> = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.systemCode = errorCode;
    systemError.systemAdditionalData = data;

    return systemError;
  }
}
