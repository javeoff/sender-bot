import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProviderName } from '@sendByBot/Common/enums/ProviderName';

@Injectable()
export class ListBuilder {
  constructor(
    @Inject(ProviderName.DATA_SOURCE)
    private readonly dataSource: DataSource
  ) {}

  async getList(
    userId: string,
    skip?: number,
    take?: number,
  ): Promise<{
    id: number;
    code: string;
    table_name: string;
  }[]> {
    let query = '';
    query += "SELECT id, code, 'video' AS table_name ";
    query += 'FROM "video-repository" ';
    query += `WHERE user_id='${userId}' `;
    query += "UNION ALL SELECT id, code, 'image' AS table_name ";
    query += 'FROM "image-repository" ';
    query += `WHERE user_id='${userId}' `;
    query += "UNION ALL SELECT id, code, 'sticker' AS table_name ";
    query += 'FROM "sticker-repository" ';
    query += `WHERE user_id='${userId}' `;
    query += 'ORDER BY id DESC ';
    if (take !== undefined) {
      query += `LIMIT ${take} `;
    }
    if (skip !== undefined) {
      query += `OFFSET ${skip} `;
    }
    query += ';';

    console.log(query);
    return this.dataSource.query(query)
  }
}
