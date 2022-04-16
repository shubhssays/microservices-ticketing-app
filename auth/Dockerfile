FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only
COPY . .

CMD ["npm", "start"]