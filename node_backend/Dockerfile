FROM node:14

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .
COPY ormconfig.docker.ts ./ormconfig.ts
EXPOSE 4000

CMD ["npm", "run", "dev"]