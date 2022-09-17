import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions } from 'nest-winston';
import path from 'node:path';
import { format, transports } from 'winston';
import Transport from 'winston-transport';

import { LoggerLevel } from '@sendByBot/Logger/enums/LoggerLevel';

@Injectable()
export class WinstonOptionsFactory {
  private readonly timestampFormat = 'DD.MM.YYYY HH:MM:SS';
  private get date(): string {
    // eslint-disable-next-line newline-per-chained-call
    return new Date().toISOString().split('T')[0];
  }
  private readonly logErrorFilename = path.join(
    process.cwd(),
    `/var/logs/error-${this.date}.log`,
  );
  private readonly logCombineFilename = path.join(
    process.cwd(),
    `/var/logs/combined-${this.date}.log`,
  );
  private readonly maxFiles = 14;

  public create(): WinstonModuleOptions {
    const myFormat = format.combine(
      format.timestamp({
        format: this.timestampFormat,
      }),
      format.printf(
        ({ level, message, timestamp }) =>
          `${timestamp as string} [${level}]: ${message}`,
      ),
    );

    const resultTransports: Transport[] = [
      new transports.Console({
        silent: false,
        format: format.combine(
          format.colorize({
            all: true,
          }),
          myFormat,
        ),
      }),

      new transports.File({
        silent: false,
        level: LoggerLevel.ERROR,
        filename: this.logErrorFilename,
        format: myFormat,
        maxFiles: this.maxFiles,
      }),

      new transports.File({
        silent: false,
        level: LoggerLevel.INFO,
        filename: this.logCombineFilename,
        format: myFormat,
        maxFiles: this.maxFiles,
      }),
    ];

    return {
      transports: resultTransports,
    };
  }
}
