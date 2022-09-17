import { ConfigService } from '@sendByBot/Config/services/ConfigService';
import { ConfigName } from '@sendByBot/Config/enums/ConfigName';
import { Injectable } from '@nestjs/common';
import sha1 from 'sha1';

@Injectable()
export class EncodingService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public hash(text: string): string {
    return sha1(text + this.configService.get(ConfigName.SECRET_KEY))
  }
}
