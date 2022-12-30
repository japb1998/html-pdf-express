FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
RUN npm install
COPY . .
RUN npm run build
ENV PORT=3000
EXPOSE $PORT
CMD ["node", "index.js"]