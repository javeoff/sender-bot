import path from 'node:path';

export const loadDotenv = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({
    path: path.join(
      process.cwd(),
      `.env${process.env.NODE_ENV !== 'production' ? '.local' : ''}`,
    ),
  });
};
