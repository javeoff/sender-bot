export const loadDotenv = () => {
  require('dotenv').config({
    path: `.env${process.env.NODE_ENV !== 'production' ? '.local' : ''}`
  })
}
