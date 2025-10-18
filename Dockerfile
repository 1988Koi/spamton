FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

RUN npm install -g ts-node typescript tsconfig-paths

COPY . .

CMD ["ts-node", "-r", "tsconfig-paths/register", "src/index.ts"]
