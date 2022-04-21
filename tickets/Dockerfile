FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only --production --force
COPY . .

CMD ["npm", "start"]