import { IUser } from '../types/entities/IUser';
import * as fs from 'fs';
import * as path from 'path';

interface IDatabase {
  users: IUser[];
}

export class Database<Database extends Object = Object> {
  public initialize() {
    fs.writeFileSync(
      path.resolve(__dirname, this.fileUrl),
      JSON.stringify(Object.assign({}, this.data))
    );
  }

  public constructor(
    private readonly fileUrl: string,
    public data: Database = require(path.resolve(__dirname, fileUrl)) || {
      users: [],
    }
  ) {}
}

export class UsersDatabase extends Database<IDatabase> {
  public constructor() {
    super('./data/users.json');
  }

  public addUser(user: IUser): void {
    this.data.users.push(user);
    this.initialize()
  }

  public getUser(userId: string): User | undefined {
    const user = this.data.users.find((user) => user.id === userId);

    if (!user) {
      return;
    }

    return new User(user);
  }
}

export class User {
  public constructor(
    public readonly user: IUser,
    public db = new Database<IDatabase>('./data/users.json'),
    private dbUser = db.data.users.find(({id}) => id === user.id),
  ) {
  }

  public addSticker(stickerName: string, stickerId: string) {
    if (!this.dbUser) {
      return;
    }

    this.dbUser.stickers.push([stickerName, stickerId]);
    this.db.initialize();
  }

  public addVideo(videoName: string, videoId: string) {
    if (!this.dbUser) {
      return;
    }

    this.dbUser.videos.push([videoName, videoId]);
    this.db.initialize();
  }

  public addImage(imageName: string, imageId: string) {
    if (!this.dbUser) {
      return;
    }

    this.dbUser.images.push([imageName, imageId]);
    this.db.initialize();
  }

  public getStickerId(stickerName: string): string | undefined {
    return this.dbUser.stickers.find(([name]) => name === stickerName)?.[1];
  }

  public getVideoId(videoName: string): string | undefined {
    return this.dbUser.videos.find(([name]) => name === videoName)?.[1];
  }

  public getImageId(imageName: string): string | undefined {
    return this.dbUser.images.find(([name]) => name === imageName)?.[1];
  }
}


