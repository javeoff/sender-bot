FROM node
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

ENV PORT 4200
EXPOSE $PORT

CMD ["npm", "start"]




