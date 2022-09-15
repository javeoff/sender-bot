import path from 'path';

export const loadDotenv = () => {
  require('dotenv').config({
    path: path.join(process.cwd(), `.env${process.env.NODE_ENV !== 'production' ? '.local' : ''}`),
  })
}
