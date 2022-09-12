import { ConfigService } from '../../Config/services/ConfigService';
import { ConfigName } from '../../Config/enums/ConfigName';
import { Injectable } from '@nestjs/common';
const sha1 = require('sha1');

@Injectable()
export class EncodingService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public hash(text: string): string {
    return sha1(text + this.configService.get(ConfigName.SECRET_KEY))
  }
}
